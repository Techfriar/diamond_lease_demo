import asyncHandler from "express-async-handler";
import bannerRepository from "../repositories/bannerRepository.js";
import bannerResource from "../resoureces/bannerResource.js";
import uploadMultipleFileMiddleware from "../middleware/uploadMultiple.js";
import uploadSingleFileMiddleware from "../middleware/uploadSingle.js";
import fs from "fs";
import path from "path";

const bannerRepo = new bannerRepository();

/**
 * Add main banner
 * @swagger
 * /banner/add:
 *   post:
 *     tags:
 *       - Banner
 *     summary: Add New Main Banner
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
 *                 description: Banner image
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
const addMainBanner = async (req, res) => {
  try {
    // Handle the file upload
    await uploadSingleFileMiddleware(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    const bannerDetails = {
      banner_path: req.file.path,
      link: req.file.filename,
    };

    const bannerData = await bannerRepo.addBanner(bannerDetails);
    if (bannerData) {
      const bannerDetails = bannerResource(bannerData);
      res.json(bannerDetails);
    } else {
      res.status(404);
      throw new Error("Unable to add employee");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Add multiple banners
 * @swagger
 * /banner/multiple_add:
 *   post:
 *     tags:
 *       - Banner
 *     summary: Add multiple banners
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Banner images
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
const addMultipleBanners = async (req, res) => {
  try {
    // Handle the file uploads
    await uploadMultipleFileMiddleware(req, res);

    //Process each uploaded file
    const bannerPaths = req.files.map((file) => {
      const fileName = file.filename;
      return {
        path: file.path,
        originalFilename: fileName,
      };
    });

    //add to collection
    const bannerDataPromises = bannerPaths.map((banner) => {
      const bannerDetails = {
        banner_path: banner.path,
        link: banner.originalFilename,
      };
      return bannerRepo.addBanner(bannerDetails);
    });

    // Wait for all the banner data to be added
    const bannerData = await Promise.all(bannerDataPromises);
    const bannerDetails = bannerData.map((data) => bannerResource(data));

    res.status(200).json({
      success: true,
      data: bannerDetails,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Delete banner
 *
 * @swagger
 * /banner/delete:
 *   post:
 *     tags:
 *       - Banner
 *     summary: Delete banner
 *     produces:
 *       - application/json
 *     parameters:
 *        - in: query
 *          name: link
 *          description: Enter link
 *          type: string
 *     responses:
 *       200:
 *         description: Success
 *       422:
 *         description: Unprocessable Entity
 *       401:
 *         description: Unauthenticated
 */
const deleteBanner = asyncHandler(async (req, res) => {
  const filename = req.query.link;

  try {
    // Check if the filename is provided
    if (!filename) {
      return res.status(400).json({ message: "Invalid filename" });
    }

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

      try {
        // Remove the image entry from the collection
        const deletedImage = bannerRepo.deleteBanner({ link: filename });

        if (!deletedImage) {
          return res
            .status(404)
            .json({ message: "Image not found in collection" });
        }

        // File and collection entry deleted successfully
        res.status(200).json({ message: "Image deleted successfully" });
      } catch (error) {
        console.error("Error deleting image from collection:", error);
        res.status(500).json({ message: "Error deleting image" });
      }
    });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ message: "Error deleting image" });
  }
});

export { addMainBanner, addMultipleBanners, deleteBanner };
