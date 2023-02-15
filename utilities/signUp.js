const multer = require("multer");
const createError = require("http-errors");
const path = require("path");

const Uploads = function (
  folder_path,
  allow_file_formet,
  max_file_size,
  error_msg
) {
  //folder path
  const folderPath = `${__dirname}/../public/uplods/${folder_path}`;

  //create a storage

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, folderPath);
    },
    filename: function (req, file, cb) {
     
      // console.log(file);
      // {
      //   fieldname: 'avatar',
      //   originalname: '603156.png',
      //   encoding: '7bit',
      //   mimetype: 'image/png'
      // }


      const fileExt = path.extname(file.originalname);
      const fileName =
        file.originalname
          .replace(fileExt, "")
          .toLowerCase()
          .split(" ")
          .join("-") +
        "-" +
        Date.now();

      cb(null, fileName + fileExt);
    },
  });

  //prepare the file multar upload object
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: max_file_size,
    },
    fileFilter: (req, file, cb) => {
      if (allow_file_formet.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(createError(error_msg));
      }
    },
  });
  return upload;
};

module.exports = Uploads;
