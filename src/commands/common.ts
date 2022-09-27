import { ColorEnum } from "@/enums/color";
import { playerEvent } from "@/events/player";
import { $t } from "@/i18n";

playerEvent.onCommandText("kill", function (player) {
  player.setHealth(0);
  return 1;
});

playerEvent.onCommandText("changecity", function (player) {
  player.citySelection.hasSelected = false;
  player.sendClientMessage(
    ColorEnum.White,
    $t("tips.changecity", [], player.locale)
  );
  player.forceClassSelection();
  player.toggleSpectating(true);
  player.toggleSpectating(false);
  return 1;
});
