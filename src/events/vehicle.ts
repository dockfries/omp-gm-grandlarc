import { MyPlayer } from "@/models/player";
import { BaseVehicle, BaseVehicleEvent } from "omp-node-lib";
import { playerEvent } from "./player";

class MyVehicleEvent extends BaseVehicleEvent<MyPlayer, BaseVehicle> {}

new MyVehicleEvent(playerEvent.getPlayersMap());
