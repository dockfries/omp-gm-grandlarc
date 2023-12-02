import { playerSelections } from "@/controllers/selection";
import { PlayerEvent } from "@infernus/core";

PlayerEvent.onCommandText("kill", ({ player, next }) => {
  player.setHealth(0);
  return next();
});

PlayerEvent.onCommandText("changecity", ({ player, next }) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const s = playerSelections.get(player)!;

  s.hasSelected = false;
  player.forceClassSelection();
  player.toggleSpectating(true);
  player.toggleSpectating(false);
  return next();
});
