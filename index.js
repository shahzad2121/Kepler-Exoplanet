// Import the required modules
const { parse } = require("csv-parse"); // Parses CSV data
const fs = require("fs"); // Handles file system operations

// Initialize an empty array to store habitable planets
const habitable = [];

// Function to check if a planet is habitable based on certain conditions
function isHabitaable(planet) {
  // Checks if the planet is confirmed, has the right amount of sunlight, and a suitable radius
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 && // Planet's sunlight must be between 0.36 and 1.11
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  ); // Planet's radius must be smaller than 1.6
}

// Read the CSV file and parse it line by line
fs.createReadStream("kepler_data.csv")
  .pipe(
    parse({
      comment: "#", // Ignore any line starting with "#" (comments)
      columns: true, // Treat the first row as column headers
    })
  )
  .on("data", (data) => {
    // For each row (planet data), check if the planet is habitable
    // For each row (planet data), check if the planet is habitable
    if (isHabitaable(data)) {
      habitable.push(data); // If it's habitable, add it to the habitable array
    }
  })
  .on("error", (err) => {
    // Handle any errors that occur while reading or parsing the file
    console.log("no data found", err);
  })
  .on("end", () => {
    // Once the parsing is complete, log the names of habitable planets
    console.log(
      habitable.map((planet) => {
        return planet["kepler_name"]; // Map over habitable planets and return their names
      })
    );

    // Log how many planets are habitable
    console.log(`${habitable.length} planets are habitable`);
    // Optional: Log a message indicating the end of processing
    // console.log("no more data");
  });
