/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  ClassSel_HandleCitySelection,
  ClassSel_SetupCharSelection,
  playerSelections,
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
import {
  GameText,
  PlayerEvent,
  InvalidEnum,
  PlayerStateEnum,
  SpecialActionsEnum,
  WeaponEnum,
  WeaponSkillsEnum,
  Player,
} from "@infernus/core";
import { chooseLanguage } from "@/controllers/dialog";

PlayerEvent.onConnect(({ player, next }) => {
  playerSelections.set(player, {
    selectedCity: CityEnum.LOS_SANTOS,
    hasSelected: false,
    lastSelTime: Date.now(),
  });
  return next();
});

PlayerEvent.onConnect(async ({ player, next }) => {
  await chooseLanguage(player);
  const gt = new GameText("~w~Grand Larceny", 3000, 4);
  gt.forPlayer(player);
  player.sendClientMessage(
    ColorEnum.White,
    $t("server.welcome", [player.getName()], player.locale)
  );
  return next();
});

PlayerEvent.onDisconnect(({ player, next }) => {
  playerSelections.delete(player);
  return next();
});

PlayerEvent.onText(({ player, text, next }) => {
  Player.sendClientMessageToAll(
    ColorEnum.White,
    `${player.getName()}(${player.id}): ${text}`
  );
  next();
  return false;
});

PlayerEvent.onCommandError(({ player, command, error, next }) => {
  player.sendClientMessage(
    ColorEnum.White,
    $t(
      `error.command${error.code ? "Undefined" : "Format"}`,
      [command],
      player.locale
    )
  );
  next();
  return true;
});

PlayerEvent.onDeath(({ player, killer, next }) => {
  if (killer === InvalidEnum.PLAYER_ID) {
    player.resetMoney();
    return next();
  }

  const cash = player.getMoney();
  if (cash <= 0) return next();

  killer.giveMoney(cash);
  player.resetMoney();

  return next();
});

PlayerEvent.onRequestClass(({ player, next }) => {
  const s = playerSelections.get(player)!;

  if (s.hasSelected) {
    ClassSel_SetupCharSelection(player);
    return next();
  }
  if (player.getState() !== PlayerStateEnum.SPECTATING) {
    player.toggleSpectating(true);
    classSelHelperTD.show(player);
    s.selectedCity = CityEnum.NONE;
  }
  next();
  return false;
});

PlayerEvent.onSpawn(({ player, next }) => {
  const s = playerSelections.get(player)!;

  if (player.isNpc()) return next();
  player.setInterior(0);
  player.toggleClock(false);
  player.resetMoney();
  player.giveMoney(30000);
  s.hasSelected = false;

  let whichCitySpawn: gSpawnPosition[];
  switch (s.selectedCity) {
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
  return next();
});

PlayerEvent.onUpdate(({ player, next }) => {
  const s = playerSelections.get(player)!;

  // changing cities by inputs
  if (!s.hasSelected && player.getState() === PlayerStateEnum.SPECTATING) {
    ClassSel_HandleCitySelection(player);
    return next();
  }

  // No weapons in interiors
  if (player.getInterior() && player.getWeapon()) {
    player.setArmedWeapon(0); // fists
    next();
    return false; // no syncing until they change their weapon
  }

  // Don't allow minigun
  if (player.getWeapon() === WeaponEnum.MINIGUN) {
    player.kick();
    next();
    return false;
  }

  // No jetpacks allowed
  if (player.getSpecialAction() === SpecialActionsEnum.USEJETPACK) {
    player.kick();
    next();
    return false;
  }

  return next();
});
