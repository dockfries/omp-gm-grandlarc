import {
  AddPlayerClass,
  DisableInteriorEnterExits,
  EnableStuntBonusForAll,
  GameModeExit,
  OnGameModeExit,
  OnGameModeInit,
  SetGameModeText,
  SetNameTagDrawDistance,
  SetWeather,
  ShowNameTags,
  ShowPlayerMarkers,
} from "samp-node-lib";
import { $t } from "@/utils/i18n";

// register all commands
import "@/commands";
// register all events without gamemode
import "./events";
import { ClassSel_InitTextDraws } from "./textdraw";
import { PlayerMarkersMode } from "@/enums/samp";
import { loadAllStaticVehicles } from "./vehicle";

class GameMode {
  private static instance: GameMode;
  private initialized: boolean = false;
  private constructor() {}
  public static getInstance(): GameMode {
    if (!GameMode.instance) GameMode.instance = new GameMode();
    return GameMode.instance;
  }

  public init(func: () => void): void {
    if (this.initialized) {
      throw new Error($t("error.initTwice"));
    }
    this.initialized = true;
    OnGameModeInit((): void => {
      // do something during initialization, such as load some objects

      SetGameModeText("Grand Larceny");
      ShowPlayerMarkers(PlayerMarkersMode.GLOBAL);
      ShowNameTags(1);
      SetNameTagDrawDistance(40.0);
      EnableStuntBonusForAll(0);
      DisableInteriorEnterExits();
      SetWeather(2);
      ClassSel_InitTextDraws();
      AddPlayerClassList();
      loadAllStaticVehicles().then((total: number) => {
        console.log(`Total vehicles from files: ${total}`);
      });
      // final callback to main.ts
      func();
    });

    OnGameModeExit((): void => {
      // do something during close/restart server, such as storage of player data
    });
  }

  public exit(func: () => void): void {
    if (!this.initialized) return;
    this.initialized = false;
    GameModeExit();
    func();
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
    AddPlayerClass(
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

export { GameMode };
