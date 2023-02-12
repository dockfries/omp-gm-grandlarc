import { MyPlayer } from "@/models/player";
import { MyTextDraw } from "@/models/textdraw";
import { BaseTextDrawEvent } from "omp-node-lib";
import { playerEvent } from "./player";

class MyTextDrawEvent extends BaseTextDrawEvent<MyPlayer, MyTextDraw> {}

new MyTextDrawEvent(playerEvent.getPlayersMap());
