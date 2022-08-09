import { CityEnum } from "@/enums/city";
import type Player from "@/models/player";
import {
  CAMERA_STYLE,
  GetPlayerKeys,
  KEY,
  PlayerPlaySound,
  SetPlayerCameraLookAt,
  SetPlayerCameraPos,
  SetPlayerFacingAngle,
  SetPlayerInterior,
  SetPlayerPos,
  TextDrawHideForPlayer,
  TextDrawShowForPlayer,
  TogglePlayerSpectating,
} from "samp-node-lib";
import {
  txtClassSelHelper,
  txtLasVenturas,
  txtLosSantos,
  txtSanFierro,
} from "./textdraw";

export const ClassSel_SetupCharSelection = (p: Player): void => {
  const { id: playerid } = p;
  switch (p.citySelection.selectedCity) {
    case CityEnum.LOS_SANTOS:
      SetPlayerInterior(playerid, 11);
      SetPlayerPos(playerid, 508.7362, -87.4335, 998.9609);
      SetPlayerFacingAngle(playerid, 0.0);
      SetPlayerCameraPos(playerid, 508.7362, -83.4335, 998.9609);
      SetPlayerCameraLookAt(
        playerid,
        508.7362,
        -87.4335,
        998.9609,
        CAMERA_STYLE.CUT
      );
      break;
    case CityEnum.SAN_FIERRO:
      SetPlayerInterior(playerid, 3);
      SetPlayerPos(playerid, -2673.8381, 1399.7424, 918.3516);
      SetPlayerFacingAngle(playerid, 181.0);
      SetPlayerCameraPos(playerid, -2673.2776, 1394.3859, 918.3516);
      SetPlayerCameraLookAt(
        playerid,
        -2673.8381,
        1399.7424,
        918.3516,
        CAMERA_STYLE.CUT
      );
      break;
    default:
      SetPlayerInterior(playerid, 3);
      SetPlayerPos(playerid, 349.0453, 193.2271, 1014.1797);
      SetPlayerFacingAngle(playerid, 286.25);
      SetPlayerCameraPos(playerid, 352.9164, 194.5702, 1014.1875);
      SetPlayerCameraLookAt(
        playerid,
        349.0453,
        193.2271,
        1014.1797,
        CAMERA_STYLE.CUT
      );
      break;
  }
};

export const ClassSel_HandleCitySelection = (p: Player): void => {
  const { id: playerid } = p;
  const [Keys, , lr] = GetPlayerKeys(playerid);

  if (p.citySelection.selectedCity === CityEnum.NONE) {
    ClassSel_SwitchToNextCity(p);
    return;
  }

  // only allow new selection every ~500 ms
  if (Date.now() - p.citySelection.lastSelTime < 500) return;

  if (Keys & KEY.FIRE) {
    p.citySelection.hasSelected = true;
    TextDrawHideForPlayer(playerid, txtClassSelHelper);
    TextDrawHideForPlayer(playerid, txtLosSantos);
    TextDrawHideForPlayer(playerid, txtSanFierro);
    TextDrawHideForPlayer(playerid, txtLasVenturas);
    TogglePlayerSpectating(playerid, 0);
    return;
  }

  if (lr > 0) ClassSel_SwitchToNextCity(p);
  else if (lr < 0) ClassSel_SwitchToPreviousCity(p);
};

const ClassSel_SwitchToNextCity = (p: Player): void => {
  const { id: playerid } = p;
  p.citySelection.selectedCity++;
  if (p.citySelection.selectedCity > CityEnum.LAS_VENTURAS) {
    p.citySelection.selectedCity = CityEnum.LOS_SANTOS;
  }
  PlayerPlaySound(playerid, 1052, 0.0, 0.0, 0.0);
  p.citySelection.lastSelTime = Date.now();
  ClassSel_SetupSelectedCity(p);
};

const ClassSel_SwitchToPreviousCity = (p: Player): void => {
  const { id: playerid } = p;
  p.citySelection.selectedCity--;
  if (p.citySelection.selectedCity < CityEnum.LOS_SANTOS) {
    p.citySelection.selectedCity = CityEnum.LAS_VENTURAS;
  }
  PlayerPlaySound(playerid, 1053, 0.0, 0.0, 0.0);
  p.citySelection.lastSelTime = Date.now();
  ClassSel_SetupSelectedCity(p);
};

const ClassSel_SetupSelectedCity = (p: Player) => {
  const { id: playerid } = p;

  if (p.citySelection.selectedCity === CityEnum.NONE) {
    p.citySelection.selectedCity = CityEnum.LOS_SANTOS;
  }

  TextDrawHideForPlayer(playerid, txtLosSantos);
  TextDrawHideForPlayer(playerid, txtSanFierro);
  TextDrawHideForPlayer(playerid, txtLasVenturas);
  SetPlayerInterior(playerid, 0);

  switch (p.citySelection.selectedCity) {
    case CityEnum.LOS_SANTOS:
      SetPlayerCameraPos(playerid, 1630.6136, -2286.0298, 110.0);
      SetPlayerCameraLookAt(
        playerid,
        1887.6034,
        -1682.1442,
        47.6167,
        CAMERA_STYLE.CUT
      );
      TextDrawShowForPlayer(playerid, txtLosSantos);
      break;
    case CityEnum.SAN_FIERRO:
      SetPlayerCameraPos(playerid, -1300.8754, 68.0546, 129.4823);
      SetPlayerCameraLookAt(
        playerid,
        -1817.9412,
        769.3878,
        132.6589,
        CAMERA_STYLE.CUT
      );
      TextDrawShowForPlayer(playerid, txtSanFierro);
      break;

    default:
      SetPlayerCameraPos(playerid, 1310.6155, 1675.9182, 110.739);
      SetPlayerCameraLookAt(
        playerid,
        2285.2944,
        1919.3756,
        68.2275,
        CAMERA_STYLE.CUT
      );
      TextDrawShowForPlayer(playerid, txtLasVenturas);
      break;
  }
};
