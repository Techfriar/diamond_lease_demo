
import { minioClient } from '../server.js';

//Delete file from minio
async function deleteImage(bucketName, objectName) {
  try {
    await minioClient.removeObject(bucketName, objectName);
  } catch (error) {
    console.error('Error deleting image:', error);
  }
}

export { deleteImage };
