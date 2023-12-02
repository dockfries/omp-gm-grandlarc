/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CityEnum } from "@/enums/city";
import { CameraCutStylesEnum, KeysEnum, Player } from "@infernus/core";
import {
  classSelHelperTD,
  lasVenturasTD,
  losSantosTD,
  sanFierroTD,
} from "./textdraw";

type CitySelection = {
  selectedCity: CityEnum;
  hasSelected: boolean;
  lastSelTime: number;
};

export const playerSelections = new Map<Player, CitySelection>();

export const ClassSel_SetupCharSelection = (p: Player) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const selectedCity = playerSelections.get(p)!.selectedCity;

  switch (selectedCity) {
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
  return true;
};

export const ClassSel_HandleCitySelection = (p: Player): void => {
  const { keys, leftRight: lr } = p.getKeys();

  const s = playerSelections.get(p)!;

  if (s.selectedCity === CityEnum.NONE) {
    ClassSel_SwitchToNextCity(p);
    return;
  }

  // only allow new selection every ~500 ms
  if (Date.now() - s.lastSelTime < 500) return;

  if (keys & KeysEnum.FIRE) {
    s.hasSelected = true;

    classSelHelperTD.hide(p);
    losSantosTD.hide(p);
    sanFierroTD.hide(p);
    lasVenturasTD.hide(p);
    p.toggleSpectating(false);
    return;
  }

  if (lr > 0) ClassSel_SwitchToNextCity(p);
  else if (lr < 0) ClassSel_SwitchToPreviousCity(p);
};

const ClassSel_SwitchToNextCity = (p: Player): void => {
  const s = playerSelections.get(p)!;

  s.selectedCity++;
  if (s.selectedCity > CityEnum.LAS_VENTURAS) {
    s.selectedCity = CityEnum.LOS_SANTOS;
  }
  p.playSound(1052);
  s.lastSelTime = Date.now();
  ClassSel_SetupSelectedCity(p);
};

const ClassSel_SwitchToPreviousCity = (p: Player): void => {
  const s = playerSelections.get(p)!;

  s.selectedCity--;
  if (s.selectedCity < CityEnum.LOS_SANTOS) {
    s.selectedCity = CityEnum.LAS_VENTURAS;
  }
  p.playSound(1053);
  s.lastSelTime = Date.now();
  ClassSel_SetupSelectedCity(p);
};

const ClassSel_SetupSelectedCity = (p: Player) => {
  const s = playerSelections.get(p)!;

  if (s.selectedCity === CityEnum.NONE) {
    s.selectedCity = CityEnum.LOS_SANTOS;
  }
  losSantosTD.hide(p);
  sanFierroTD.hide(p);
  lasVenturasTD.hide(p);
  p.setInterior(0);

  switch (s.selectedCity) {
    case CityEnum.LOS_SANTOS:
      p.setCameraPos(1630.6136, -2286.0298, 110.0);
      p.setCameraLookAt(
        1887.6034,
        -1682.1442,
        47.6167,
        CameraCutStylesEnum.CUT
      );
      losSantosTD.show(p);
      break;
    case CityEnum.SAN_FIERRO:
      p.setCameraPos(-1300.8754, 68.0546, 129.4823);
      p.setCameraLookAt(
        -1817.9412,
        769.3878,
        132.6589,
        CameraCutStylesEnum.CUT
      );
      sanFierroTD.show(p);
      break;

    default:
      p.setCameraPos(1310.6155, 1675.9182, 110.739);
      p.setCameraLookAt(2285.2944, 1919.3756, 68.2275, CameraCutStylesEnum.CUT);
      lasVenturasTD.show(p);
      break;
  }
};
