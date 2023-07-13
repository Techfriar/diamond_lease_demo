import multer from "multer";
import util from "util";
import { minioClient } from "../server.js";
import { Readable } from "stream";

// Set the project location based on the environment variable
const projectLocation = process.env.PROJECT_ENV || "local";

let storage = multer.memoryStorage();

// Initialize multer middleware
const upload = multer({
  storage: storage,
});

/**
 * Upload to minio
 */
const uploadToMinio = (req, res, next) => {
  const files = req.files;
  const filePromises = [];

  for (const file of files) {
    const fileBuffer = file.buffer;
    const timestamp = Date.now();
    const uniqueFileName = `${timestamp}_${file.originalname}`;

    const readableStream = Readable.from(fileBuffer);

    const promise = new Promise((resolve, reject) => {
      minioClient.putObject(
        "test",
        uniqueFileName,
        readableStream,
        function (error, etag) {
          if (error) {
            console.log(error);
            reject(error);
          } else {
            const objectUrl =
              minioClient.protocol +
              "//" +
              "localhost:9000" +
              "/" +
              "test" +
              "/" +
              uniqueFileName;
            resolve({
              path: objectUrl, // Include the object URL in req.uploadedFile as the path
              filename: uniqueFileName,
            });
          }
        }
      );
    });

    filePromises.push(promise);
  }

  Promise.all(filePromises)
    .then((uploadedFiles) => {
      req.uploadedFiles = uploadedFiles; // Store the uploaded files details in req.uploadedFiles
      next();
    })
    .catch((error) => {
      res.status(500).json({ message: "Internal Server Error" });
    });
};

const uploadMultipleFile = util.promisify((req, res, next) => {
  if (projectLocation === "local") {
    upload.array("files")(req, res, function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      uploadToMinio(req, res, next);
    });
  } else {
    // Handle S3 upload
    // ...
  }
});

export default uploadMultipleFile;
