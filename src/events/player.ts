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
  BodyPartsEnum,
  ICmdErr,
  InvalidEnum,
  KeysEnum,
  PlayerStateEnum,
  SpecialActionsEnum,
  WeaponEnum,
  WeaponSkillsEnum,
} from "omp-node-lib";
import { chooseLanguage } from "@/controllers/dialog";

class MyPlayerEvent extends BasePlayerEvent<MyPlayer> {
  protected newPlayer(playerid: number): MyPlayer {
    return new MyPlayer(playerid);
  }
  protected onConnect(player: MyPlayer): number {
    (async () => {
      await chooseLanguage(player);
      const gt = new BaseGameText("~w~Grand Larceny", 3000, 4);
      gt.forPlayer(player);
      player.sendClientMessage(
        ColorEnum.White,
        $t("server.welcome", [player.getName()], player.locale)
      );
    })();
    return 1;
  }
  protected onDisconnect(player: MyPlayer, reason: number): number {
    return 1;
  }
  protected onText(player: MyPlayer, text: string): number {
    MyPlayer.sendClientMessageToAll(
      this.getPlayersArr(),
      ColorEnum.White,
      `${player.getName()}(${player.id}): ${text}`
    );
    return 1;
  }
  protected onCommandError(
    player: MyPlayer,
    command: string,
    err: ICmdErr
  ): number {
    player.sendClientMessage(
      ColorEnum.White,
      $t(
        `error.command${err.code ? "Undefined" : "Format"}`,
        [command],
        player.locale
      )
    );
    return 1;
  }
  protected onEnterExitModShop(
    player: MyPlayer,
    enterexit: number,
    interiorid: number
  ): number {
    return 1;
  }
  protected onClickMap(
    player: MyPlayer,
    fX: number,
    fY: number,
    fZ: number
  ): number {
    return 1;
  }
  protected onClickPlayer(
    player: MyPlayer,
    clickedPlayer: MyPlayer,
    source: number
  ): number {
    return 1;
  }
  protected onDeath(
    player: MyPlayer,
    killer: MyPlayer | InvalidEnum.PLAYER_ID,
    reason: number
  ): number {
    if (killer === InvalidEnum.PLAYER_ID) {
      player.resetMoney();
      return 1;
    }
    const playercash = player.getMoney();
    if (playercash <= 0) return 1;
    killer.giveMoney(playercash);
    player.resetMoney();
    return 1;
  }
  protected onGiveDamage(
    player: MyPlayer,
    damage: MyPlayer,
    amount: number,
    weaponid: WeaponEnum,
    bodypart: BodyPartsEnum
  ): number {
    return 1;
  }
  protected onKeyStateChange(
    player: MyPlayer,
    newkeys: KeysEnum,
    oldkeys: KeysEnum
  ): number {
    return 1;
  }
  protected onRequestClass(player: MyPlayer): number {
    if (player.citySelection.hasSelected)
      return ClassSel_SetupCharSelection(player);
    if (player.getState() !== PlayerStateEnum.SPECTATING) {
      player.toggleSpectating(true);
      classSelHelperTD.show(player);
      player.citySelection.selectedCity = CityEnum.NONE;
    }
    return 0;
  }
  protected onRequestSpawn(player: MyPlayer): number {
    return 1;
  }
  protected onSpawn(player: MyPlayer): number {
    if (player.isNpc()) return 1;
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
    return 1;
  }
  protected onStateChange(
    player: MyPlayer,
    newstate: PlayerStateEnum,
    oldstate: PlayerStateEnum
  ): number {
    return 1;
  }
  protected onStreamIn(player: MyPlayer, forPlayer: MyPlayer): number {
    return 1;
  }
  protected onStreamOut(player: MyPlayer, forPlayer: MyPlayer): number {
    return 1;
  }
  protected onTakeDamage(
    player: MyPlayer,
    damage: MyPlayer | InvalidEnum.PLAYER_ID,
    amount: number,
    weaponid: WeaponEnum,
    bodypart: BodyPartsEnum
  ): number {
    return 1;
  }
  protected onUpdate(player: MyPlayer): number {
    // changing cities by inputs
    if (
      !player.citySelection.hasSelected &&
      player.getState() === PlayerStateEnum.SPECTATING
    ) {
      ClassSel_HandleCitySelection(player);
      return 1;
    }

    // No weapons in interiors
    if (player.getInterior() && player.getWeapon()) {
      player.setArmedWeapon(0); // fists
      return 0; // no syncing until they change their weapon
    }

    // Don't allow minigun
    if (player.getWeapon() === WeaponEnum.MINIGUN) {
      player.kick();
      return 0;
    }

    // No jetpacks allowed
    if (player.getSpecialAction() === SpecialActionsEnum.USEJETPACK) {
      player.kick();
      return 0;
    }

    return 1;
  }
  protected onInteriorChange(
    player: MyPlayer,
    newinteriorid: number,
    oldinteriorid: number
  ): number {
    return 1;
  }
  protected onPause(player: MyPlayer, timestamp: number): number {
    return 1;
  }
  protected onResume(player: MyPlayer, pauseMs: number): number {
    return 1;
  }
  protected onRequestDownload(
    player: MyPlayer,
    type: number,
    crc: number
  ): number {
    return 1;
  }
  protected onFinishedDownloading(
    player: MyPlayer,
    virtualworld: number
  ): number {
    return 1;
  }
}

export const playerEvent = new MyPlayerEvent();
