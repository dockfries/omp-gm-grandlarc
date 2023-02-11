import { MyPlayer } from "@/models/player";
import { MyTextDraw } from "@/models/textdraw";
import { BaseTextDrawEvent, InvalidEnum, TCommonCallback } from "omp-node-lib";
import { playerEvent } from "./player";

class MyTextDrawEvent extends BaseTextDrawEvent<MyPlayer, MyTextDraw> {
  protected onPlayerClick(
    player: MyPlayer,
    textdraw: MyTextDraw | InvalidEnum.PLAYER_ID
  ): TCommonCallback {
    return true;
  }
}

new MyTextDrawEvent(playerEvent.getPlayersMap());
