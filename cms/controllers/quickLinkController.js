import asyncHandler from "express-async-handler";
import addQuickLinkRequest from "../requests/quickLink/addQuickLinkRequest.js";
import quickLinkRepository from "../repositories/quickLinkRepository.js";
import quickLinkResource from "../resoureces/quickLinkResource.js";
import getQuickLinkRequest from "../requests/quickLink/getQuickLinkRequest.js";
import updateQuickLinkRequest from "../requests/quickLink/upadteQuickLinkRequest.js";
import deleteQuickLinkRequest from "../requests/quickLink/deleteQuickLinkRequest.js";

const quickLinkRepo = new quickLinkRepository();

/**
 * Add quick link
 *
 * @swagger
 * /api/quick_link/add:
 *   post:
 *     tags:
 *       - Quick Link
 *     summary: Add New Quick Link
 *     produces:
 *       - application/json
 *     parameters:
 *        - in: query
 *          name: title
 *          description: Enter title
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
const addQuickLink = asyncHandler(async (req, res) => {
  const { title, link } = req.query;
  const quickLinkRequest = new addQuickLinkRequest({
    title,
    link,
  });

  try {
    const validatedData = quickLinkRequest.validate();
    const quickLinkData = await quickLinkRepo.addQuickLink(validatedData);

    if (quickLinkData) {
      const quickLink = quickLinkResource(quickLinkData);
      res
        .status(200)
        .json({ status: true, message: "Successfully added", data: quickLink });
    } else {
      res.status(404);
      throw new Error("Unable to add quick link");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * Get quick link
 *
 * @swagger
 * /api/quick_link/get:
 *   post:
 *     tags:
 *       - Quick Link
 *     summary: Get Quick Link
 *     produces:
 *       - application/json
 *     parameters:
 *        - in: query
 *          name: _id
 *          description: Enter id
 *          type: string
 *     responses:
 *       200:
 *         description: Success
 *       422:
 *         description: Unprocessable Entity
 *       401:
 *         description: Unauthenticated
 */
const getQuickLink = asyncHandler(async (req, res) => {
  const { _id } = req.query;
  const quickLinkRequest = new getQuickLinkRequest({
    _id,
  });

  try {
    const validatedData = quickLinkRequest.validate();
    const quickLinkData = await quickLinkRepo.getQuickLink(validatedData);

    if (quickLinkData) {
      const quickLink = quickLinkResource(quickLinkData);
      res.status(200).json({
        status: true,
        message: "Successfully fetched",
        data: quickLink,
      });
    } else {
      res.status(200).json({ status: true, message: "Unable to fetch" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * Update quick link
 *
 * @swagger
 * /api/quick_link/update:
 *   post:
 *     tags:
 *       - Quick Link
 *     summary: Update Quick Link
 *     produces:
 *       - application/json
 *     parameters:
 *        - in: query
 *          name: _id
 *          description: Enter id
 *          type: string
 *        - in: query
 *          name: title
 *          description: Enter title
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
const updateQuickLink = asyncHandler(async (req, res) => {
  const { _id, title, link } = req.query;
  const quickLinkRequest = new updateQuickLinkRequest({
    _id,
    title,
    link,
  });

  try {
    const validatedData = quickLinkRequest.validate();
    const quickLinkData = await quickLinkRepo.updateQuickLink(validatedData);

    if (quickLinkData) {
      const quickLink = quickLinkResource(quickLinkData);
      res.status(200).json({
        status: true,
        message: "Successfully updated",
        data: quickLink,
      });
    } else {
      res.status(200).json({ status: true, message: "Unable to update" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * list quick links
 *
 * @swagger
 * /public/quick_link/list:
 *   post:
 *     tags:
 *       - Quick Link
 *     summary: List Quick Links
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success
 *       422:
 *         description: Unprocessable Entity
 *       401:
 *         description: Unauthenticated
 */
const listQuickLinks = asyncHandler(async (req, res) => {
  try {
    const quickLinkDatas = await quickLinkRepo.listQuickLinks();
    if (quickLinkDatas) {
      const quickLinks = quickLinkDatas.map((link) => quickLinkResource(link));
      res.status(200).json({
        status: true,
        message: "Successfully listed",
        data: quickLinks,
      });
    } else {
      res.status(200).json({ status: false, message: "Unable to list" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * Delete quick link
 *
 * @swagger
 * /api/quick_link/delete:
 *   post:
 *     tags:
 *       - Quick Link
 *     summary: Delete Quick Link
 *     produces:
 *       - application/json
 *     parameters:
 *        - in: query
 *          name: _id
 *          description: Enter id
 *          type: string
 *     responses:
 *       200:
 *         description: Success
 *       422:
 *         description: Unprocessable Entity
 *       401:
 *         description: Unauthenticated
 */
const deleteQuickLink = asyncHandler(async (req, res) => {
  const { _id } = req.query;
  const quickLinkRequest = new deleteQuickLinkRequest({
    _id,
  });

  try {
    const validatedData = quickLinkRequest.validate();
    const quickLink = await quickLinkRepo.deleteQuickLink(validatedData);

    if (quickLink) {
      res.status(200).json({ status: true, message: "Successfully deleted" });
    } else {
      res.status(200).json({ status: false, message: "Unable to delete" });
    }
  } catch (error) {
    res
      .status(200)
      .json({ status: false, message: "Unable to delete", data: error });
  }
});

export {
  addQuickLink,
  getQuickLink,
  updateQuickLink,
  listQuickLinks,
  deleteQuickLink,
};
