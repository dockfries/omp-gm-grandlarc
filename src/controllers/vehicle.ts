import { Vehicle } from "@infernus/core";
import fs from "fs";
import path from "path";

const vehicleFolder = path.resolve("scriptfiles/vehicles");
const vehicleFiles = [
  "trains",
  "pilots",
  "lv_law",
  "lv_airport",
  "lv_gen",
  "sf_law",
  "sf_airport",
  "sf_gen",
  "ls_law",
  "ls_airport",
  "ls_gen_inner",
  "ls_gen_outer",
  "whetstone",
  "bone",
  "flint",
  "tierra",
  "red_county",
];

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
    const promiseList = vehicleFiles.map((fileName) => {
      return LoadStaticVehiclesFromFile(
        path.join(vehicleFolder, fileName + ".txt"),
      );
    });
    const vehicleDataList = await Promise.all(promiseList);
    let fileIndex = 0;
    let vehicles_loaded = 0;
    vehicleDataList.forEach((vehicles: string[]) => {
      let index = 0;
      vehicles.forEach((vehicle: string) => {
        index++;
        if (vehicle.trim().length === 0) {
          return;
        }
        const realData = vehicle.substring(0, vehicle.indexOf(" ;")).split(",");
        const [modelId, spawnX, spawnY, spawnZ, spawnRot, color1, color2] =
          realData;
        const veh = new Vehicle(
          {
            modelId: parseInt(modelId),
            x: parseFloat(spawnX),
            y: parseFloat(spawnY),
            z: parseFloat(spawnZ),
            zAngle: parseFloat(spawnRot),
            color: [+color1, +color2],
            respawnDelay: 30 * 60,
            addSiren: false,
          },
          true,
        ); // respawn 30 minutes
        veh.create();
        if (veh.id !== -1) {
          vehicles_loaded++;
        } else {
          console.log(
            "Failed to create vehicle",
            realData,
            vehicleFiles[fileIndex],
            index,
          );
        }
      });
      fileIndex++;
    });
    return vehicles_loaded;
  } catch (err) {
    console.log(err);
  }
  return 0;
};
