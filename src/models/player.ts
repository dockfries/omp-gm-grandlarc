import { CityEnum } from "@/enums/city";
import { GameMode, Player } from "@infernus/core";

// Class selection globals
interface ICitySelection {
  selectedCity: CityEnum;
  hasSelected: boolean;
  lastSelTime: number;
}

export class MyPlayer extends Player {
  public citySelection: ICitySelection = {
    // class selection init vars
    selectedCity: CityEnum.LOS_SANTOS,
    hasSelected: false,
    lastSelTime: Date.now(),
  };
}
