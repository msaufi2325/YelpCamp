const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp", {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 400; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "6522771d300ab1b85476dfba",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc venenatis mollis orci, id posuere tortor vehicula eget. Pellentesque ut sem sit amet massa placerat congue vitae nec lorem. Nulla commodo eget ligula ac tempus.",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dbhxydycj/image/upload/v1697028546/YelpCamp/ftiawrssprjliczdparx.jpg",
          filename: "YelpCamp/ftiawrssprjliczdparx",
        },
        {
          url: "https://res.cloudinary.com/dbhxydycj/image/upload/v1697028546/YelpCamp/fahplkbeas3dfvnenvsv.jpg",
          filename: "YelpCamp/fahplkbeas3dfvnenvsv",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
