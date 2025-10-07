import { Vehicle } from "@infernus/core";
import fs from "fs";
import path from "path";

const vehicleFiles = path.resolve("scriptfiles/vehicles");

const LoadStaticVehiclesFromFile = (path: string) => {
  return new Promise<string[]>((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) reject(err);
      resolve(data.toString().split("\n"));
    });
  });
};

export const loadAllStaticVehicles = async () => {
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
        const [modelId, spawnX, spawnY, spawnZ, spawnRot, color1, color2] =
          realData;
        new Vehicle({
          modelId: parseInt(modelId),
          x: parseFloat(spawnX),
          y: parseFloat(spawnY),
          z: parseFloat(spawnZ),
          zAngle: parseFloat(spawnRot),
          color: [+color1, +color2],
          respawnDelay: 30 * 60,
          addSiren: false,
        }).create(); // respawn 30 minutes
        vehicles_loaded++;
      });
    });
    return vehicles_loaded;
  } catch (err) {
    console.log(err);
  }
  return 0;
};
