import { MyPlayer } from "@/models/player";
import { Vehicle, VehicleEvent } from "@infernus/core";
import { playerEvent } from "./player";

class MyVehicleEvent extends VehicleEvent<MyPlayer, Vehicle> {}

new MyVehicleEvent(playerEvent.getPlayersMap());
