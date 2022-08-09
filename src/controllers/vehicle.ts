import fs from "fs";
import path from "path";
import { AddStaticVehicleEx } from "samp-node-lib";

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
        AddStaticVehicleEx(
          parseInt(vehicletype),
          parseFloat(SpawnX),
          parseFloat(SpawnY),
          parseFloat(SpawnZ),
          parseFloat(SpawnRot),
          parseInt(Color1),
          parseInt(Color2),
          30 * 60,
          0
        ); // respawn 30 minutes
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
