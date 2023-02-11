import { ColorEnum } from "@/enums/color";
import { MyTextDraw } from "@/models/textdraw";

export const losSantosTD = new MyTextDraw({
  x: 10.0,
  y: 380.0,
  text: "Los Santos",
});
export const sanFierroTD = new MyTextDraw({
  x: 10.0,
  y: 380.0,
  text: "San Fierro",
});
export const lasVenturasTD = new MyTextDraw({
  x: 10.0,
  y: 380.0,
  text: "Las Venturas",
});

export const classSelHelperTD = new MyTextDraw({
  x: 10.0,
  y: 415.0,
  text: "Press ~b~~k~~GO_LEFT~ ~w~or ~b~~k~~GO_RIGHT~ ~w~to switch cities.~n~ Press ~r~~k~~PED_FIREWEAPON~ ~w~to select.",
});

// Used to init textdraws of city names
const ClassSel_InitCityNameText = (td: MyTextDraw) => {
  td.create()
    ?.useBox(true)
    ?.setLetterSize(1.25, 3.0)
    ?.setFont(0)
    ?.setShadow(0)
    ?.setOutline(1)
    ?.setColour(ColorEnum.Gray);
};

export const ClassSel_InitTextDraws = (): void => {
  ClassSel_InitCityNameText(losSantosTD);
  ClassSel_InitCityNameText(sanFierroTD);
  ClassSel_InitCityNameText(lasVenturasTD);
  classSelHelperTD
    .create()
    ?.useBox(true)
    ?.setBoxColours(ColorEnum.LightBlack)
    ?.setLetterSize(0.3, 1.0)
    ?.setTextSize(400.0, 40.0)
    ?.setFont(2)
    ?.setShadow(0)
    ?.setOutline(1)
    ?.setBackgroundColours(ColorEnum.Black)
    ?.setColour(ColorEnum.White);
};
