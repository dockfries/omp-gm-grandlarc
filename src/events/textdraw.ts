import { MyPlayer } from "@/models/player";
import { MyTextDraw } from "@/models/textdraw";
import { TextDrawEvent } from "@infernus/core";
import { playerEvent } from "./player";

class MyTextDrawEvent extends TextDrawEvent<MyPlayer, MyTextDraw> {}

new MyTextDrawEvent(playerEvent.getPlayersMap());
