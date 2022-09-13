import {
  GameTextForPlayer,
  GetPlayerInterior,
  GetPlayerMoney,
  GetPlayerSpecialAction,
  GetPlayerState,
  GetPlayerWeapon,
  GivePlayerMoney,
  GivePlayerWeapon,
  IsPlayerNPC,
  Kick,
  OnPlayerConnect,
  OnPlayerDeath,
  OnPlayerDisconnect,
  OnPlayerRequestClass,
  OnPlayerSpawn,
  OnPlayerUpdate,
  PLAYER_STATE,
  ResetPlayerMoney,
  SampPlayer,
  SetPlayerArmedWeapon,
  SetPlayerFacingAngle,
  SetPlayerInterior,
  SetPlayerPos,
  SetPlayerSkillLevel,
  SPECIAL_ACTION,
  TextDrawShowForPlayer,
  TogglePlayerClock,
  TogglePlayerSpectating,
  WEAPON,
  WEAPONSKILL,
} from "samp-node-lib";
import { $t } from "@/utils/i18n";
import {
  OnPlayerText,
  SendClientMessage,
  SendClientMessageToAll,
} from "@/utils/helper";
import ColorEnum from "@/enums/color";
import Player from "@/models/player";
import { chooseLanguage } from "@/commands";
import { PlayerEnum } from "@/enums/samp";
import {
  ClassSel_HandleCitySelection,
  ClassSel_SetupCharSelection,
} from "./selection";
import { txtClassSelHelper } from "./textdraw";
import { CityEnum } from "@/enums/city";
import {
  gRandomSpawns_LasVenturas,
  gRandomSpawns_LosSantos,
  gRandomSpawns_SanFierro,
  gSpawnPosition,
} from "@/config/spawn";

OnPlayerConnect(async (connector: SampPlayer) => {
  const p = new Player(connector.playerid);
  Player.Players.set(connector.playerid, p);
  await chooseLanguage(p);

  GameTextForPlayer(p.id, "~w~Grand Larceny", 3000, 4);
  SendClientMessage(
    p,
    ColorEnum.White,
    $t("server.welcome", [p.name], p.locale)
  );
});

OnPlayerDisconnect((player: SampPlayer): void => {
  if (Player.Players.has(player.playerid))
    Player.Players.delete(player.playerid);
});

OnPlayerText((player: Player, text: string): void => {
  SendClientMessageToAll(
    ColorEnum.White,
    `${player.name}(${player.id}): ${text}`
  );
});

OnPlayerDeath((player: SampPlayer, killer: SampPlayer): void => {
  if (killer.playerid == PlayerEnum.INVALID_PLAYER_ID) {
    ResetPlayerMoney(player.playerid);
    return;
  }
  const playercash = GetPlayerMoney(player.playerid);
  if (playercash <= 0) return;
  GivePlayerMoney(killer.playerid, playercash);
  ResetPlayerMoney(player.playerid);
});

OnPlayerRequestClass((player: SampPlayer): number => {
  if (IsPlayerNPC(player.playerid)) return 0;
  const p = Player.Players.get(player.playerid);
  if (!p) return 0;
  const { id } = p;
  if (p.citySelection.hasSelected) return ClassSel_SetupCharSelection(p);
  if (GetPlayerState(id) != PLAYER_STATE.SPECTATING) {
    TogglePlayerSpectating(id, 1);
    TextDrawShowForPlayer(id, txtClassSelHelper);
    p.citySelection.selectedCity = CityEnum.NONE;
  }
  return 0;
});

OnPlayerSpawn((player: SampPlayer): void => {
  const p = Player.Players.get(player.playerid);
  if (!p) return;
  const { id: playerid } = p;

  if (IsPlayerNPC(playerid)) return;

  SetPlayerInterior(playerid, 0);
  TogglePlayerClock(playerid, 0);
  ResetPlayerMoney(playerid);
  GivePlayerMoney(playerid, 30000);

  p.citySelection.hasSelected = false;

  let whichCitySpawn: gSpawnPosition[];
  switch (p.citySelection.selectedCity) {
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
  SetPlayerPos(playerid, x, y, z);
  SetPlayerFacingAngle(playerid, a);

  SetPlayerSkillLevel(playerid, WEAPONSKILL.PISTOL, 200);
  SetPlayerSkillLevel(playerid, WEAPONSKILL.PISTOL_SILENCED, 200);
  SetPlayerSkillLevel(playerid, WEAPONSKILL.DESERT_EAGLE, 200);
  SetPlayerSkillLevel(playerid, WEAPONSKILL.SHOTGUN, 200);
  SetPlayerSkillLevel(playerid, WEAPONSKILL.SAWNOFF_SHOTGUN, 200);
  SetPlayerSkillLevel(playerid, WEAPONSKILL.SPAS12_SHOTGUN, 200);
  SetPlayerSkillLevel(playerid, WEAPONSKILL.MICRO_UZI, 200);
  SetPlayerSkillLevel(playerid, WEAPONSKILL.MP5, 200);
  SetPlayerSkillLevel(playerid, WEAPONSKILL.AK47, 200);
  SetPlayerSkillLevel(playerid, WEAPONSKILL.M4, 200);
  SetPlayerSkillLevel(playerid, WEAPONSKILL.SNIPERRIFLE, 200);

  GivePlayerWeapon(playerid, WEAPON.COLT45, 100);
});

OnPlayerUpdate((player: SampPlayer) => {
  const p = Player.Players.get(player.playerid);
  if (!p) return;
  const { id: playerid } = p;

  // changing cities by inputs
  if (
    !p.citySelection.hasSelected &&
    GetPlayerState(playerid) == PLAYER_STATE.SPECTATING
  ) {
    ClassSel_HandleCitySelection(p);
    return 1;
  }

  // No weapons in interiors
  if (GetPlayerInterior(playerid) != 0 && GetPlayerWeapon(playerid) != 0) {
    SetPlayerArmedWeapon(playerid, 0); // fists
    return 0; // no syncing until they change their weapon
  }

  // Don't allow minigun
  if (GetPlayerWeapon(playerid) == WEAPON.MINIGUN) {
    Kick(playerid);
    return 0;
  }

  // No jetpacks allowed
  if (GetPlayerSpecialAction(playerid) == SPECIAL_ACTION.USEJETPACK) {
    Kick(playerid);
    return 0;
  }

  return 1;
});
