import {
  ClassSel_HandleCitySelection,
  ClassSel_SetupCharSelection,
} from "@/controllers/selection";
import { classSelHelperTD } from "@/controllers/textdraw";
import { CityEnum } from "@/enums/city";
import {
  gRandomSpawns_LasVenturas,
  gRandomSpawns_LosSantos,
  gRandomSpawns_SanFierro,
  gSpawnPosition,
} from "@/config/spawn";
import { ColorEnum } from "@/enums/color";
import { $t } from "@/i18n";
import { MyPlayer } from "@/models/player";
import {
  BaseGameText,
  BasePlayerEvent,
  ICmdErr,
  InvalidEnum,
  PlayerStateEnum,
  SpecialActionsEnum,
  WeaponEnum,
  WeaponSkillsEnum,
} from "omp-node-lib";
import { chooseLanguage } from "@/controllers/dialog";

class MyPlayerEvent extends BasePlayerEvent<MyPlayer> {
  async onConnect(player: MyPlayer) {
    await chooseLanguage(player);
    const gt = new BaseGameText("~w~Grand Larceny", 3000, 4);
    gt.forPlayer(player);
    player.sendClientMessage(
      ColorEnum.White,
      $t("server.welcome", [player.getName()], player.locale)
    );
    return true;
  }
  onText(player: MyPlayer, text: string) {
    MyPlayer.sendClientMessageToAll(
      this.getPlayersArr(),
      ColorEnum.White,
      `${player.getName()}(${player.id}): ${text}`
    );
    return false;
  }
  onCommandError(player: MyPlayer, command: string, err: ICmdErr) {
    player.sendClientMessage(
      ColorEnum.White,
      $t(
        `error.command${err.code ? "Undefined" : "Format"}`,
        [command],
        player.locale
      )
    );
    return true;
  }
  onDeath(player: MyPlayer, killer: MyPlayer | InvalidEnum.PLAYER_ID) {
    if (killer === InvalidEnum.PLAYER_ID) {
      player.resetMoney();
      return true;
    }
    const playercash = player.getMoney();
    if (playercash <= 0) return true;
    killer.giveMoney(playercash);
    player.resetMoney();
    return true;
  }
  onRequestClass(player: MyPlayer) {
    if (player.citySelection.hasSelected)
      return ClassSel_SetupCharSelection(player);
    if (player.getState() !== PlayerStateEnum.SPECTATING) {
      player.toggleSpectating(true);
      classSelHelperTD.show(player);
      player.citySelection.selectedCity = CityEnum.NONE;
    }
    return false;
  }
  onSpawn(player: MyPlayer) {
    if (player.isNpc()) return true;
    player.setInterior(0);
    player.toggleClock(false);
    player.resetMoney();
    player.giveMoney(30000);
    player.citySelection.hasSelected = false;

    let whichCitySpawn: gSpawnPosition[];
    switch (player.citySelection.selectedCity) {
      case CityEnum.LOS_SANTOS:
        whichCitySpawn = gRandomSpawns_LosSantos;
        break;
      case CityEnum.LAS_VENTURAS:
        whichCitySpawn = gRandomSpawns_LasVenturas;
        break;
      default:
        whichCitySpawn = gRandomSpawns_SanFierro;
        break;
    }
    const rand: number = Math.floor(Math.random() * whichCitySpawn.length);
    const [x, y, z, a]: number[] = whichCitySpawn[rand];
    player.setPos(x, y, z);
    player.setFacingAngle(a);
    player.setSkillLevel(WeaponSkillsEnum.PISTOL, 200);
    player.setSkillLevel(WeaponSkillsEnum.PISTOL_SILENCED, 200);
    player.setSkillLevel(WeaponSkillsEnum.DESERT_EAGLE, 200);
    player.setSkillLevel(WeaponSkillsEnum.SHOTGUN, 200);
    player.setSkillLevel(WeaponSkillsEnum.SAWNOFF_SHOTGUN, 200);
    player.setSkillLevel(WeaponSkillsEnum.SPAS12_SHOTGUN, 200);
    player.setSkillLevel(WeaponSkillsEnum.MICRO_UZI, 200);
    player.setSkillLevel(WeaponSkillsEnum.MP5, 200);
    player.setSkillLevel(WeaponSkillsEnum.AK47, 200);
    player.setSkillLevel(WeaponSkillsEnum.M4, 200);
    player.setSkillLevel(WeaponSkillsEnum.SNIPERRIFLE, 200);
    player.giveWeapon(WeaponEnum.COLT45, 100);
    return true;
  }
  onUpdate(player: MyPlayer) {
    // changing cities by inputs
    if (
      !player.citySelection.hasSelected &&
      player.getState() === PlayerStateEnum.SPECTATING
    ) {
      ClassSel_HandleCitySelection(player);
      return true;
    }

    // No weapons in interiors
    if (player.getInterior() && player.getWeapon()) {
      player.setArmedWeapon(0); // fists
      return false; // no syncing until they change their weapon
    }

    // Don't allow minigun
    if (player.getWeapon() === WeaponEnum.MINIGUN) {
      player.kick();
      return false;
    }

    // No jetpacks allowed
    if (player.getSpecialAction() === SpecialActionsEnum.USEJETPACK) {
      player.kick();
      return false;
    }

    return true;
  }
}

export const playerEvent = new MyPlayerEvent((id) => new MyPlayer(id));
