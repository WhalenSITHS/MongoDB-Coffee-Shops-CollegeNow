const Shop = require("../Models/Stores");
const path = require("path");
const multer = require("multer");
const multerOptions = {
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "Uploads");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  }),
  fileFilter: function (req, file, next) {
    //can also set limit in multer
    const isPhoto = file.mimetype.startsWith("image/");
    if (isPhoto) {
      next(null, true); //callback function, first value is error, second value gets passed on if no error
    } else
      ({
        message: "That filetype is not allowed",
      }),
        false;
  },
};
exports.upload = multer(multerOptions).single("photo");
exports.homePage = (req, res) => {
  const stores = ["Dunkin", "Tim Hortons", "Starbucks"];
  try {
    console.log(req.name); //we get req.name from the middleware but WE MUST call it in index
    res.json([stores, req.name]); //if we want to send multiple "things" back to the user we need to use an array or object. Can't simply use , as that denotes status codes
  } catch (error) {
    console.log(error);
  }
};

exports.createShop = async (req, res) => {
  try {
    const shop = new Shop(req.body);
    shop.photo = req.file.path;
    await shop.save();
    res.json(shop);
  } catch (error) {
    res.status(500).json(error);
  }
};
