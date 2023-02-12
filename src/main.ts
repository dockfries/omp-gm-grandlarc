//----------------------------------------------------------
//
//  GRAND LARCENY  1.0
//  A freeroam gamemode for OMP
//
//----------------------------------------------------------

import { BaseGameMode, MarkerModesEnum } from "omp-node-lib";
import { $t } from "./i18n";

// register all commands
import "@/commands";

import { loadAllStaticVehicles } from "./controllers/vehicle";
import { ClassSel_InitTextDraws } from "./controllers/textdraw";
import "@/events/textdraw";
import { useA51BaseFS, useAdminSpecFs } from "omp-fs-all";
import { playerEvent } from "./events/player";

class MyGameMode extends BaseGameMode {
  onInit() {
    MyGameMode.setGameModeText("Grand Larceny");
    MyGameMode.showPlayerMarkers(MarkerModesEnum.GLOBAL);
    MyGameMode.showNameTags(true);
    MyGameMode.setNameTagDrawDistance(40.0);
    MyGameMode.enableStuntBonusForAll(false);
    MyGameMode.disableInteriorEnterExits();
    MyGameMode.setWeather(2);
    ClassSel_InitTextDraws();
    AddPlayerClassList();
    loadAllStaticVehicles().then((total: number) => {
      console.log(`Total vehicles from files: ${total}`);
    });

    console.log("\n---------------------------------------");
    console.log($t("server.running"));
    console.log("---------------------------------------\n");
  }
}

const AddPlayerClassList = (): void => {
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
  classIdList.forEach((modelid: number) => {
    MyGameMode.addPlayerClass(
      modelid,
      position.spawn_x,
      position.spawn_y,
      position.spawn_z,
      position.z_angel,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1
    );
  });
};

new MyGameMode()
  .use(useAdminSpecFs())
  .use(useA51BaseFS({ playerEvent, debug: true }));
