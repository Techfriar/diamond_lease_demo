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

//Upload to minio
const uploadToMinio = (req, res, next) => {
  const fileBuffer = req.file.buffer;
  const timestamp = Date.now();
  const uniqueFileName = `${timestamp}_${req.file.originalname}`;

  const readableStream = Readable.from(fileBuffer);

  minioClient.putObject(
    "test",
    uniqueFileName,
    readableStream,
    function (error, etag) {
      if (error) {
        return res.status(500).json({ message: "Internal Server Error" });
      }

      const objectUrl =
        minioClient.protocol +
        "//" +
        "localhost:9000" +
        "/" +
        "test" +
        "/" +
        uniqueFileName;
      req.uploadedFile = {
        path: objectUrl, // Include the object URL in req.uploadedFile as the path
        filename: uniqueFileName,
      };
      next();
    }
  );
};

const uploadSingleFile = util.promisify((req, res, next) => {
  if (projectLocation === "local") {
    upload.single("file")(req, res, function (err) {
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

export default uploadSingleFile;
