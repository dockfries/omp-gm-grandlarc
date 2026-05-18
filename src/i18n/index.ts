import { LanguageEnum } from "@/enums/language";
import { I18n, TLocales } from "@infernus/core";
import zh_CN from "./locales/zh-CN.json";
import en_US from "./locales/en-US.json";

export const locales: TLocales = {
  [LanguageEnum.Chinese]: zh_CN,
  [LanguageEnum.English]: en_US,
};

export const localesTitle = {
  [LanguageEnum.Chinese]: {
    [LanguageEnum.Chinese]: "简体中文(中国)",
    [LanguageEnum.English]: "Simplified Chinese(China)",
  },
  [LanguageEnum.English]: {
    [LanguageEnum.Chinese]: "英文(美国)",
    [LanguageEnum.English]: "English(United States)",
  },
};

export const { $t } = new I18n(LanguageEnum.English, locales);
