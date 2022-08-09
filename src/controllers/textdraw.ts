import ColorEnum from "@/enums/color";
import {
  TextDrawBackgroundColor,
  TextDrawBoxColor,
  TextDrawColor,
  TextDrawCreate,
  TextDrawFont,
  TextDrawLetterSize,
  TextDrawSetOutline,
  TextDrawSetShadow,
  TextDrawTextSize,
  TextDrawUseBox,
} from "samp-node-lib";

export let txtLosSantos: number = -1;
export let txtSanFierro: number = -1;
export let txtLasVenturas: number = -1;
export let txtClassSelHelper: number = -1;

export const ClassSel_InitTextDraws = (): void => {
  // Init our observer helper text display
  txtLosSantos = TextDrawCreate(10.0, 380.0, "Los Santos");
  ClassSel_InitCityNameText(txtLosSantos);
  txtSanFierro = TextDrawCreate(10.0, 380.0, "San Fierro");
  ClassSel_InitCityNameText(txtSanFierro);
  txtLasVenturas = TextDrawCreate(10.0, 380.0, "Las Venturas");
  ClassSel_InitCityNameText(txtLasVenturas);

  // Init our observer helper text display
  txtClassSelHelper = TextDrawCreate(
    10.0,
    415.0,
    " Press ~b~~k~~GO_LEFT~ ~w~or ~b~~k~~GO_RIGHT~ ~w~to switch cities.~n~ Press ~r~~k~~PED_FIREWEAPON~ ~w~to select."
  );
  TextDrawUseBox(txtClassSelHelper, 1);
  TextDrawBoxColor(txtClassSelHelper, ColorEnum.LightBlack);
  TextDrawLetterSize(txtClassSelHelper, 0.3, 1.0);
  TextDrawTextSize(txtClassSelHelper, 400.0, 40.0);
  TextDrawFont(txtClassSelHelper, 2);
  TextDrawSetShadow(txtClassSelHelper, 0);
  TextDrawSetOutline(txtClassSelHelper, 1);
  TextDrawBackgroundColor(txtClassSelHelper, ColorEnum.Black);
  TextDrawColor(txtClassSelHelper, ColorEnum.White);
};

// Used to init textdraws of city names
const ClassSel_InitCityNameText = (txtInit: number) => {
  TextDrawUseBox(txtInit, 0);
  TextDrawLetterSize(txtInit, 1.25, 3.0);
  TextDrawFont(txtInit, 0);
  TextDrawSetShadow(txtInit, 0);
  TextDrawSetOutline(txtInit, 1);
  TextDrawColor(txtInit, ColorEnum.Gray);
};
