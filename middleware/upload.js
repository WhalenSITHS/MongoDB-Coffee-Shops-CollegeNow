const multer = require("multer");
const upload = multer({ dest: "uploads/" });

exports.profilePicture = async function (req, res, next) {
  try {
    let avatar = req.file;
    upload.single("avatar");
    res.json(req.body);
    //next();
  } catch (error) {}
};
