import ColorEnum from "@/enums/color";
import CmdBus from "@/utils/CmdBus";
import { SendClientMessage } from "@/utils/helper";
import { $t } from "@/utils/i18n";
import { SetPlayerHealth } from "samp-node-lib";

CmdBus.on("kill", function () {
  SetPlayerHealth(this.id, 0);
});

CmdBus.on("changecity", function () {
  this.citySelection.hasSelected = false;
  SendClientMessage(
    this,
    ColorEnum.White,
    $t("tips.changecity", [], this.locale)
  );
  // ForceClassSelection(this.id);
});
