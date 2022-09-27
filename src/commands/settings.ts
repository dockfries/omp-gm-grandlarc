import { chooseLanguage } from "@/controllers/dialog";
import { playerEvent } from "@/events/player";

playerEvent.onCommandText(["language", "lang"], function (player) {
  chooseLanguage(player);
  return 1;
});
