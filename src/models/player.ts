import config from "@/config";
import { CityEnum } from "@/enums/city";
import { LanguageEnum } from "@/enums/language";

interface ISettings {
  locale: LanguageEnum;
  charset: string;
}

// Class selection globals
interface ICitySelection {
  selectedCity: CityEnum;
  hasSelected: boolean;
  lastSelTime: number;
}

// It is currently inherited because some function api depend on it and should be removed later
class Player {
  public static Players: Map<Number, Player> = new Map();
  public id: number;
  public name: string = "";
  public citySelection: ICitySelection = {
    // class selection init vars
    selectedCity: CityEnum.LOS_SANTOS,
    hasSelected: false,
    lastSelTime: Date.now(),
  };
  public settings: ISettings = {
    locale: config.language,
    charset: config.charset,
  };
  constructor(id: number, settings?: ISettings) {
    this.id = id;
    if (settings) this.settings = settings;
  }
  get charset() {
    return this.settings.charset;
  }
  set charset(charset: string) {
    this.settings.charset = charset;
  }
  get locale(): LanguageEnum {
    return this.settings.locale;
  }
  set locale(language: LanguageEnum) {
    this.settings.locale = language;
  }
}

export default Player;
