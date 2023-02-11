import { MyPlayer } from "@/models/player";
import { BaseVehicle, BaseVehicleEvent, TCommonCallback } from "omp-node-lib";
import { playerEvent } from "./player";

class MyVehicleEvent extends BaseVehicleEvent<MyPlayer, BaseVehicle> {
  protected onDamageStatusUpdate(
    vehicle: BaseVehicle,
    player: MyPlayer
  ): TCommonCallback {
    return true;
  }
  protected onDeath(vehicle: BaseVehicle, killer: MyPlayer): TCommonCallback {
    return true;
  }
  protected onMod(
    player: MyPlayer,
    vehicle: BaseVehicle,
    componentid: number
  ): TCommonCallback {
    return true;
  }
  protected onPaintjob(
    player: MyPlayer,
    vehicle: BaseVehicle,
    paintjobid: number
  ): TCommonCallback {
    return true;
  }
  protected onRespray(
    player: MyPlayer,
    vehicle: BaseVehicle,
    color1: number,
    color2: number
  ): TCommonCallback {
    return true;
  }
  protected onSirenStateChange(
    player: MyPlayer,
    vehicle: BaseVehicle,
    newstate: boolean
  ): TCommonCallback {
    return true;
  }
  protected onSpawn(vehicle: BaseVehicle): TCommonCallback {
    return true;
  }
  protected onStreamIn(
    vehicle: BaseVehicle,
    forplayer: MyPlayer
  ): TCommonCallback {
    return true;
  }
  protected onStreamOut(
    vehicle: BaseVehicle,
    forplayer: MyPlayer
  ): TCommonCallback {
    return true;
  }
  protected onPlayerEnter(
    player: MyPlayer,
    vehicle: BaseVehicle,
    isPassenger: boolean
  ): TCommonCallback {
    return true;
  }
  protected onPlayerExit(
    player: MyPlayer,
    vehicle: BaseVehicle
  ): TCommonCallback {
    return true;
  }
  protected onNpcEnter(vehicle: BaseVehicle, seatid: number): TCommonCallback {
    return true;
  }
  protected onNpcExit(): TCommonCallback {
    return true;
  }
  protected onTrailerUpdate(
    player: MyPlayer,
    vehicle: BaseVehicle
  ): TCommonCallback {
    return true;
  }
}

new MyVehicleEvent(playerEvent.getPlayersMap());
