import { vehicleEvent } from "@/events/vehicle";
import { MyVehicle } from "@/models/vehicle";
import fs from "fs";
import path from "path";

const vehicleFiles = path.resolve(__dirname, "../scriptfiles/vehicles");

export const loadAllStaticVehicles = async (): Promise<number> => {
  try {
    const files = fs.readdirSync(vehicleFiles);
    const promiseList = files.map((fileName) => {
      return LoadStaticVehiclesFromFile(path.join(vehicleFiles, fileName));
    });
    const vehicleDataList = await Promise.all(promiseList);
    let vehicles_loaded = 0;
    vehicleDataList.forEach((vehicles: string[]) => {
      vehicles.forEach((vehicle: string) => {
        const realData = vehicle.substring(0, vehicle.indexOf(" ;")).split(",");
        const [vehicletype, SpawnX, SpawnY, SpawnZ, SpawnRot, Color1, Color2] =
          realData;
        new MyVehicle(
          {
            modelid: parseInt(vehicletype),
            x: parseFloat(SpawnX),
            y: parseFloat(SpawnY),
            z: parseFloat(SpawnZ),
            z_angle: parseFloat(SpawnRot),
            color1: Color1,
            color2: Color2,
            respawn_delay: 30 * 60,
            addsiren: false,
          },
          vehicleEvent,
          true
        ).create(); // respawn 30 minutes
        vehicles_loaded++;
      });
    });
    return vehicles_loaded;
  } catch (err) {
    console.log(err);
  }
  return 0;
};

const LoadStaticVehiclesFromFile = (path: string) => {
  return new Promise<string[]>((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) reject(err);
      resolve(data.toString().split("\n"));
    });
  });
};
