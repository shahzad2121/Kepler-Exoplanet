const { parse } = require("csv-parse");
const fs = require("fs");

const HabitablePlanet = [];

function isHabitableplanet(planet) {
  return (
    planet["koi_disposition"] == "CONFIRMED" &&
    planet["koi_teq"] > -93 &&
    planet["koi_teq"] < 37 &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

fs.createReadStream("kepler_latestData.csv")
  .pipe(
    parse({
      comment: "#",
      columns: true,
    })
  )
  .on("data", (data) => {
    if (isHabitableplanet(data)) {
      HabitablePlanet.push(data);
    }
  })
  .on('error', (err) => {
    console.log(err);
  })
  .on("end", () => {
    console.log(`${HabitablePlanet.length} planets are habitable`);
    console.log("no more data");
  });

