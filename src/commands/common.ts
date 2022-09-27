import ColorEnum from "@/enums/color";
import { playerEvent } from "@/events/player";
import { $t } from "@/i18n";

playerEvent.cmdBus.on("kill", function () {
  this.setHealth(0);
  return 1;
});

playerEvent.cmdBus.on("changecity", function () {
  this.citySelection.hasSelected = false;
  this.sendClientMessage(
    this,
    ColorEnum.White,
    $t("tips.changecity", [], this.locale)
  );
  this.forceClassSelection();
  this.toggleSpectating(true);
  return 1;
});
