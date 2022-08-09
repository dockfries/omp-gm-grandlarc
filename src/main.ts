//----------------------------------------------------------
//
//  GRAND LARCENY  1.0
//  A freeroam gamemode for OMP
//
//----------------------------------------------------------

import { GameMode } from "@/controllers";
import { $t } from "@/utils/i18n";
const app = GameMode.getInstance();
app.init(() => {
  console.log("\n---------------------------------------");
  console.log($t("server.running"));
  console.log("---------------------------------------\n");
});
