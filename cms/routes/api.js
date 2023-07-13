import express from 'express';
import { addLinkToBanner, addMainBanner, addMultipleBanners, deleteBanner } from '../controllers/bannerController.js';
import { addLogo } from '../controllers/settingsController.js';
import { addQuickLink, deleteQuickLink, getQuickLink, listQuickLinks, updateQuickLink } from '../controllers/quickLinkController.js';
import { addContactCMS, deleteContactCMS, getContactCMS, listContactCMSs, updateContactCMS } from '../controllers/contactCMSController.js';
const router = express.Router();


/**
 * banner routes
 */
router.route("/banner/add").post(addMainBanner);
router.route("/banner/multiple_add").post(addMultipleBanners);
router.route("/banner/delete").post(deleteBanner);
router.route("/banner/add_link").post(addLinkToBanner);

/**
 * Settings routes
 */
router.route("/settings/add_logo").post(addLogo);

/**
 * Quick link routes
 */
router.route("/quick_link/add").post(addQuickLink);
router.route("/quick_link/get").post(getQuickLink);
router.route("/quick_link/update").post(updateQuickLink);
router.route("/quick_link/list").post(listQuickLinks);
router.route("/quick_link/delete").post(deleteQuickLink);

/**
 * Contact cms routes
 */
router.route("/contact_cms/add").post(addContactCMS);
router.route("/contact_cms/get").post(getContactCMS);
router.route("/contact_cms/list").post(listContactCMSs);
router.route("/contact_cms/update").post(updateContactCMS);
router.route("/contact_cms/delete").post(deleteContactCMS);

export default router;