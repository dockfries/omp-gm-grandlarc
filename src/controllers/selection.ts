import { CityEnum } from "@/enums/city";
import { MyPlayer } from "@/models/player";
import { CameraCutStylesEnum, KeysEnum } from "omp-node-lib";
import {
  txtClassSelHelper,
  txtLasVenturas,
  txtLosSantos,
  txtSanFierro,
} from "./textdraw";

export const ClassSel_SetupCharSelection = (p: MyPlayer): number => {
  switch (p.citySelection.selectedCity) {
    case CityEnum.LOS_SANTOS:
      p.setInterior(11);
      p.setPos(508.7362, -87.4335, 998.9609);
      p.setFacingAngle(0.0);
      p.setCameraPos(508.7362, -83.4335, 998.9609);
      p.setCameraLookAt(508.7362, -87.4335, 998.9609, CameraCutStylesEnum.CUT);
      break;
    case CityEnum.SAN_FIERRO:
      p.setInterior(3);
      p.setPos(-2673.8381, 1399.7424, 918.3516);
      p.setFacingAngle(181.0);
      p.setCameraPos(-2673.2776, 1394.3859, 918.3516);
      p.setCameraLookAt(
        -2673.8381,
        1399.7424,
        918.3516,
        CameraCutStylesEnum.CUT
      );
      break;
    default:
      p.setInterior(3);
      p.setPos(349.0453, 193.2271, 1014.1797);
      p.setFacingAngle(286.25);
      p.setCameraPos(352.9164, 194.5702, 1014.1875);
      p.setCameraLookAt(349.0453, 193.2271, 1014.1797, CameraCutStylesEnum.CUT);
      break;
  }
  return 1;
};

export const ClassSel_HandleCitySelection = (p: MyPlayer): void => {
  const { id: playerid } = p;
  const { keys, leftright: lr } = p.getKeys();

  if (p.citySelection.selectedCity === CityEnum.NONE) {
    ClassSel_SwitchToNextCity(p);
    return;
  }

  // only allow new selection every ~500 ms
  if (Date.now() - p.citySelection.lastSelTime < 500) return;

  if (keys & KeysEnum.FIRE) {
    p.citySelection.hasSelected = true;
    TextDrawHideForPlayer(playerid, txtClassSelHelper);
    TextDrawHideForPlayer(playerid, txtLosSantos);
    TextDrawHideForPlayer(playerid, txtSanFierro);
    TextDrawHideForPlayer(playerid, txtLasVenturas);
    p.toggleSpectating(false);
    return;
  }

  if (lr > 0) ClassSel_SwitchToNextCity(p);
  else if (lr < 0) ClassSel_SwitchToPreviousCity(p);
};

const ClassSel_SwitchToNextCity = (p: MyPlayer): void => {
  const { id: playerid } = p;
  p.citySelection.selectedCity++;
  if (p.citySelection.selectedCity > CityEnum.LAS_VENTURAS) {
    p.citySelection.selectedCity = CityEnum.LOS_SANTOS;
  }
  p.playSound(1052);
  p.citySelection.lastSelTime = Date.now();
  ClassSel_SetupSelectedCity(p);
};

const ClassSel_SwitchToPreviousCity = (p: MyPlayer): void => {
  p.citySelection.selectedCity--;
  if (p.citySelection.selectedCity < CityEnum.LOS_SANTOS) {
    p.citySelection.selectedCity = CityEnum.LAS_VENTURAS;
  }
  p.playSound(1053);
  p.citySelection.lastSelTime = Date.now();
  ClassSel_SetupSelectedCity(p);
};

const ClassSel_SetupSelectedCity = (p: MyPlayer) => {
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
      p.setCameraPos(1630.6136, -2286.0298, 110.0);
      p.setCameraLookAt(
        1887.6034,
        -1682.1442,
        47.6167,
        CameraCutStylesEnum.CUT
      );
      TextDrawShowForPlayer(playerid, txtLosSantos);
      break;
    case CityEnum.SAN_FIERRO:
      p.setCameraPos(-1300.8754, 68.0546, 129.4823);
      p.setCameraLookAt(
        -1817.9412,
        769.3878,
        132.6589,
        CameraCutStylesEnum.CUT
      );
      TextDrawShowForPlayer(playerid, txtSanFierro);
      break;

    default:
      p.setCameraPos(1310.6155, 1675.9182, 110.739);
      p.setCameraLookAt(2285.2944, 1919.3756, 68.2275, CameraCutStylesEnum.CUT);
      TextDrawShowForPlayer(playerid, txtLasVenturas);
      break;
  }
};
