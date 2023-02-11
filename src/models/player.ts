import { CityEnum } from "@/enums/city";
import { BaseGameMode, BasePlayer } from "omp-node-lib";

// Class selection globals
interface ICitySelection {
  selectedCity: CityEnum;
  hasSelected: boolean;
  lastSelTime: number;
}

export class MyPlayer extends BasePlayer {
  public citySelection: ICitySelection = {
    // class selection init vars
    selectedCity: CityEnum.LOS_SANTOS,
    hasSelected: false,
    lastSelTime: Date.now(),
  };
}
