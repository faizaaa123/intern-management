// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const supervisors = require("./supervisorSeed.json");
// //Load env vars
// dotenv.config({ path: "./config/.env" });

// //Load models
// const Supervisor = require("./server/models/supervisorModel");

// //Connect to DB
// mongoose.connect(process.env.Mongo_DB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// //Import into DB
// const importSupervisorData = async () => {
//   try {
//     await Supervisor.create(supervisors);

//     console.log(`Data Imported....`);
//     mongoose.connection.close();

//     process.exit();
//   } catch (err) {
//     console.log(err);
//   }
// };

// //Delete data

// const deleteSupervisorData = async () => {
//   try {
//     await Supervisor.deleteMany();
//     console.log(`Data Destroyed....`);
//     // process.exit();
//     mongoose.connection.close();
//   } catch (err) {
//     console.log(err);
//   }
// };

// if (process.argv[2] === "-i") {
//   importSupervisorData();
// } else if (process.argv[2] === "-d") {
//   deleteSupervisorData();
// }

// module.exports = {
//   importSupervisorData,
//   deleteSupervisorData,
// };
