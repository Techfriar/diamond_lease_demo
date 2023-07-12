import asyncHandler from "express-async-handler";
import uploadSingleFileMiddleware from "../middleware/uploadSingle.js";
import settingsResource from "../resoureces/settingsResource.js";
import settingsRepository from "../repositories/settingsRepository.js";
import fs from "fs";
import path from "path";

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
    // Handle the file upload
    await uploadSingleFileMiddleware(req, res);

    if (!req.file) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    const logoData = {
      logo_path: req.file.path,
      link: req.file.filename,
    };

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

/**
 * Update logo
 * @swagger
 * /settings/update_logo:
 *   post:
 *     tags:
 *       - Settings
 *     summary: Update Logo
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
const updateLogo = asyncHandler(async (req, res) => {
  const existingLogo = await settingsRepo.getLogo();
  if (existingLogo !== null) {
    const deleteExistingLogo = await settingsRepo.deleteLogo();
    const filename = existingLogo.link;
    // Construct the path to the image file
    const imagePath = path.join(process.cwd(), "files", filename);
    // Check if the image file exists
    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Delete the image file from the folder
    fs.unlink(imagePath, async (err) => {
      if (err) {
        console.error("Error deleting image file:", err);
        return res.status(500).json({ message: "Error deleting image" });
      }
    });
  }
  await uploadSingleFileMiddleware(req, res);
  //add image to collection
  if (req.file) {
    try {
      const logoData = {
        logo_path: req.file.path,
        link: req.file.filename,
      };

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
  }
  return res.status(200).json({ message: "Logo updated successfully" });
});

export { addLogo, updateLogo };
