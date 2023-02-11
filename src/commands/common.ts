import { playerEvent } from "@/events/player";

playerEvent.onCommandText("kill", function (player) {
  player.setHealth(0);
  return true;
});

playerEvent.onCommandText("changecity", function (player) {
  player.citySelection.hasSelected = false;
  player.forceClassSelection();
  player.toggleSpectating(true);
  player.toggleSpectating(false);
  return true;
});
