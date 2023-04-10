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
  GameText,
  PlayerEvent,
  ICmdErr,
  InvalidEnum,
  PlayerStateEnum,
  SpecialActionsEnum,
  WeaponEnum,
  WeaponSkillsEnum,
} from "@infernus/core";
import { chooseLanguage } from "@/controllers/dialog";

class MyPlayerEvent extends PlayerEvent<MyPlayer> {
  async onConnect(player: MyPlayer) {
    await chooseLanguage(player);
    const gt = new GameText("~w~Grand Larceny", 3000, 4);
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
  onRequestSpawn() {
    return true;
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
    const skills = [
      WeaponSkillsEnum.PISTOL,
      WeaponSkillsEnum.PISTOL_SILENCED,
      WeaponSkillsEnum.DESERT_EAGLE,
      WeaponSkillsEnum.SHOTGUN,
      WeaponSkillsEnum.SAWNOFF_SHOTGUN,
      WeaponSkillsEnum.SPAS12_SHOTGUN,
      WeaponSkillsEnum.MICRO_UZI,
      WeaponSkillsEnum.MP5,
      WeaponSkillsEnum.AK47,
      WeaponSkillsEnum.M4,
      WeaponSkillsEnum.SNIPERRIFLE,
    ];
    skills.forEach((s) => player.setSkillLevel(s, 200));
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
