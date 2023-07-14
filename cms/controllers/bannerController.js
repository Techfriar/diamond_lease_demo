import asyncHandler from "express-async-handler";
import bannerRepository from "../repositories/bannerRepository.js";
import bannerResource from "../resoureces/bannerResource.js";
import deleteBannerRequest from "../requests/banner/deleteBannerRequest.js";
import { deleteImage } from "../utils/fileDeletion.js";
import addLinkToBannerRequest from "../requests/banner/addLinkToBannerRequest.js";
import uploadMultipleFile from "../utils/uploadMultiple.js";
import uploadSingleFile from "../utils/uploadSingle.js";
import { minioClient } from "../server.js";

const bannerRepo = new bannerRepository();

/**
 * Add main banner
 * @swagger
 * /api/banner/add:
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
 *               link:
 *                 type: string
 *                 description: Link
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
    await uploadSingleFile(req, res);
    if (!req.uploadedFile) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    const bannerDetails = {
      banner_path: "/test/" + req.uploadedFile.filename,
      link: req.body.link,
      is_main_banner: true,
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
 * /api/banner/multiple_add:
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
    await uploadMultipleFile(req, res);

    // Process each uploaded file
    const bannerPaths = req.uploadedFiles.map((file) => {
      return {
        path: "/test/" + file.filename,
      };
    });

    //add to collection
    const bannerDataPromises = bannerPaths.map((banner) => {
      const bannerDetails = {
        banner_path: banner.path,
        link: "",
        is_main_banner: false,
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
 * /api/banner/delete:
 *   post:
 *     tags:
 *       - Banner
 *     summary: Delete banner
 *     produces:
 *       - application/json
 *     parameters:
 *        - in: query
 *          name: _id
 *          description: Enter _id
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
  const { _id } = req.query;
  const bannerRequest = new deleteBannerRequest({
    _id,
  });
  try {
    const validatedData = bannerRequest.validate();
    const bannerData = await bannerRepo.getBanner(validatedData);
    const deletedImage = await bannerRepo.deleteBanner(validatedData);
    if (bannerData && deletedImage) {
      deleteImage("test", bannerData.banner_path.split("/test/")[1]);
      res
        .status(200)
        .json({ status: true, message: `Image deleted successfully` });
    }
  } catch (error) {
    console.error("Error deleting imageeeeeeee:", error);
    res.status(500).json({ message: "Error deleting image" });
  }
});

/**
 * Add link to banner
 *
 * @swagger
 * /api/banner/add_link:
 *   post:
 *     tags:
 *       - Banner
 *     summary: Add link to banner
 *     produces:
 *       - application/json
 *     parameters:
 *        - in: query
 *          name: _id
 *          description: Enter _id
 *          type: string
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
const addLinkToBanner = asyncHandler(async (req, res) => {
  const { _id, link } = req.query;
  const bannerRequest = new addLinkToBannerRequest({
    _id,
    link,
  });
  try {
    const validatedData = bannerRequest.validate();
    let bannerData = await bannerRepo.getBanner(validatedData);
    bannerData.link = link;
    const banner = await bannerRepo.updateBanner(bannerData);
    res.status(200).json({ status: true, message: `Image link added successfully`, data: banner });
  } catch (error) {
    console.error("Unable to add link", error);
    res.status(500).json({ message: "Error while adding link" });
  }
});

/**
 * List banners
 * @swagger
 * /public/banner/list:
 *   post:
 *     tags:
 *       - Banner
 *     summary: List Banners
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
const listBanners = asyncHandler(async (req, res) => {
  try {
    const bannerDatas = await bannerRepo.listBanners();
    if (bannerDatas) {
      bannerDatas.forEach((banner) => {
        banner.banner_path = minioClient.protocol + "//" + "localhost:9000" + banner.banner_path;
        bannerResource(banner);
      });
      res.json(bannerDatas);
    } else {
      res.status(404);
      throw new Error("Unable to add employee");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export { addMainBanner, addMultipleBanners, deleteBanner, addLinkToBanner,listBanners };
