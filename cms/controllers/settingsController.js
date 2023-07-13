import asyncHandler from "express-async-handler";
import settingsResource from "../resoureces/settingsResource.js";
import settingsRepository from "../repositories/settingsRepository.js";
import { deleteImage } from "../utils/fileDeletion.js";
import uploadSingleFile from "../utils/uploadSingle.js";

const settingsRepo = new settingsRepository();

/**
 * Add logo
 * @swagger
 * /settings/add_logo:
 *   post:
 *     tags:
 *       - Settings
 *     summary: Add New Logo
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Logo image
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
const addLogo = asyncHandler(async (req, res) => {
  try {
    const existingLogo = await settingsRepo.getLogo();
    if (existingLogo) {
      // Logo exists in minio then delete it
      await deleteImage("test", existingLogo.logo_path.split("/test/")[1]);
      // Logo exists in settings collection, delete it
      await settingsRepo.deleteLogo();
    }
    // add logo to minio
    await uploadSingleFile(req, res);

    if (!req.uploadedFile) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    const logoData = {
      logo_path: "/test/" + req.uploadedFile.filename,
    };

    //add logo to collection
    const logoDetails = await settingsRepo.addLogo(logoData);
    if (logoDetails) {
      const logo = settingsResource(logoDetails);
      res.json(logo);
    } else {
      res.status(404);
      throw new Error("Unable to add logo");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}); 

export { addLogo };
