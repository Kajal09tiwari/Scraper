//const mongoose = require('mongoose');

//const connectDB = async () => {
 //try {
  //  await mongoose.connect('mongodb://127.0.0.1:27017/jobScraper', {
   //   useNewUrlParser: true,
    //  useUnifiedTopology: true,
   // });
   // console.log('MongoDB connected');
 // } catch (err) {
  //  console.error(err.message);
 //   process.exit(1);
//  }
//};

//module.exports = connectDB;
//

// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     await mongoose.connect(
//       "mongodb+srv://kajaltiwari7408:spsu@cluster0.ck4rgyk.mongodb.net/jobscaper?retryWrites=true&w=majority",
//     );
//     console.log("MongoDB Atlas connected");
//   } catch (error) {
//     console.error("MongoDB connection failed:", error.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

