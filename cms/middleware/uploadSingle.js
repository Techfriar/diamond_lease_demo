import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import multer from 'multer';
import util from 'util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set the destination directory path
const uploadDirectory = join(__dirname, '..', 'files');

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    // Generate a unique file name
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const uniqueFileName = `${timestamp}-${randomString}-${file.originalname}`;

    cb(null, uniqueFileName);
  }
});

const upload = multer({ storage: storage });

  const uploadSingleFileMiddleware = util.promisify((req, res, next) => {  
    upload.single("file")(req, res, next);
  });
  
  export default uploadSingleFileMiddleware;
  
