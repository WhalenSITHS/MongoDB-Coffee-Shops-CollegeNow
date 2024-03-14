const multer = require("multer");
/* const upload = multer({ dest: "uploads/" });

exports.profilePicture = async function (req, res, next) {
  try {
    let avatar = req.file;
    upload.single("avatar");
    res.json(req.body);
    //next();
  } catch (error) {}
};
 */

const multerOptions = {
  storage: multer.memoryStorage(),
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
