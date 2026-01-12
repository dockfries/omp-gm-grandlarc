//----------------------------------------------------------
//
//  GRAND LARCENY  1.0
//  A freeroam gamemode for OMP
//
//----------------------------------------------------------

import { GameMode, MarkerModesEnum } from "@infernus/core";
import { $t } from "./i18n";

// register all events
import "@/commands";
import "@/events/player";

import { loadAllStaticVehicles } from "./controllers/vehicle";
import { ClassSel } from "./controllers/classSel";
import {
  Attachments,
  GlActions,
  GlMapIcon,
  GlRealTime,
  LSBeachSide,
  LSElevator,
  LsMall,
  SkinChanger,
  VSpawner,
  GlProperty,
  GlNpcs,
} from "@infernus/fs";

function addPlayerClassList() {
  const position = {
    spawn_x: 1759.0189,
    spawn_y: -1898.126,
    spawn_z: 13.5622,
    z_angel: 266.4503,
  };
  const classIdList: number[] = [
    1, 2, 269, 270, 271, 272, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58,
    68, 69, 70, 71, 72, 73, 75, 76, 78, 79, 80, 81, 82, 83, 84, 85, 87, 88, 89,
    91, 92, 93, 95, 96, 97, 98, 99,
  ];
  classIdList.forEach((modelId: number) => {
    GameMode.addPlayerClass(
      modelId,
      position.spawn_x,
      position.spawn_y,
      position.spawn_z,
      position.z_angel,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
    );
  });
}

GameMode.onInit(({ next }) => {
  GameMode.supportAllNickname();
  GameMode.setGameModeText("Grand Larceny");
  GameMode.showPlayerMarkers(MarkerModesEnum.GLOBAL);
  GameMode.showNameTags(true);
  GameMode.setNameTagDrawDistance(40.0);
  GameMode.enableStuntBonusForAll(false);
  GameMode.disableInteriorEnterExits();
  GameMode.setWeather(2);
  ClassSel.initTextDraws();
  addPlayerClassList();
  loadAllStaticVehicles().then((total: number) => {
    console.log(`Total vehicles from files: ${total}`);
  });

  console.log("\n---------------------------------------");
  console.log($t("server.running"));
  console.log("---------------------------------------\n");
  return next();
});

GameMode.use(GlActions)
  .use(GlRealTime)
  .use(GlMapIcon)
  .use(LSElevator)
  .use(Attachments)
  .use(SkinChanger)
  .use(VSpawner)
  .use(LsMall)
  .use(LSBeachSide)
  .use(GlProperty)
  .use(GlNpcs);
