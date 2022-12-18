import { MyPlayer } from "@/models/player";
import { BaseVehicle, BaseVehicleEvent, TCommonCallback } from "omp-node-lib";
import { playerEvent } from "./player";

class MyVehicleEvent extends BaseVehicleEvent<MyPlayer, BaseVehicle> {
  protected onDamageStatusUpdate(
    vehicle: BaseVehicle,
    player: MyPlayer
  ): TCommonCallback {
    return 1;
  }
  protected onDeath(vehicle: BaseVehicle, killer: MyPlayer): TCommonCallback {
    return 1;
  }
  protected onMod(
    player: MyPlayer,
    vehicle: BaseVehicle,
    componentid: number
  ): TCommonCallback {
    return 1;
  }
  protected onPaintjob(
    player: MyPlayer,
    vehicle: BaseVehicle,
    paintjobid: number
  ): TCommonCallback {
    return 1;
  }
  protected onRespray(
    player: MyPlayer,
    vehicle: BaseVehicle,
    color1: number,
    color2: number
  ): TCommonCallback {
    return 1;
  }
  protected onSirenStateChange(
    player: MyPlayer,
    vehicle: BaseVehicle,
    newstate: boolean
  ): TCommonCallback {
    return 1;
  }
  protected onSpawn(vehicle: BaseVehicle): TCommonCallback {
    return 1;
  }
  protected onStreamIn(
    vehicle: BaseVehicle,
    forplayer: MyPlayer
  ): TCommonCallback {
    return 1;
  }
  protected onStreamOut(
    vehicle: BaseVehicle,
    forplayer: MyPlayer
  ): TCommonCallback {
    return 1;
  }
  protected onPlayerEnter(
    player: MyPlayer,
    vehicle: BaseVehicle,
    isPassenger: boolean
  ): TCommonCallback {
    return 1;
  }
  protected onPlayerExit(
    player: MyPlayer,
    vehicle: BaseVehicle
  ): TCommonCallback {
    return 1;
  }
  protected onNpcEnter(vehicle: BaseVehicle, seatid: number): TCommonCallback {
    return 1;
  }
  protected onNpcExit(): TCommonCallback {
    return 1;
  }
  protected onTrailerUpdate(
    player: MyPlayer,
    vehicle: BaseVehicle
  ): TCommonCallback {
    return 1;
  }
}

export const vehicleEvent = new MyVehicleEvent(playerEvent.getPlayersMap());
