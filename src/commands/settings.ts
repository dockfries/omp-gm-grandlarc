import { chooseLanguage } from "@/controllers/dialog";
import { PlayerEvent } from "@infernus/core";

PlayerEvent.onCommandText(["language", "lang"], ({ player, next }) => {
  chooseLanguage(player);
  return next();
});
