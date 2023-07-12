import express from 'express';
import { addMainBanner, addMultipleBanners, deleteBanner } from '../controllers/bannerController.js';
import { addLogo, updateLogo } from '../controllers/settingsController.js';
import { addQuickLink, deleteQuickLink, getQuickLink, listQuickLinks, updateQuickLink } from '../controllers/quickLinkController.js';
import { addContactCMS, deleteContactCMS, getContactCMS, listContactCMSs, updateContactCMS } from '../controllers/contactCMSController.js';
const router = express.Router();


/**
 * banner routes
 */
router.route("/banner/add").post(addMainBanner);
router.route("/banner/multiple_add").post(addMultipleBanners);
router.route("/banner/delete").post(deleteBanner);

/**
 * Settings routes
 */
router.route("/settings/add_logo").post(addLogo);
router.route("/settings/update_logo").post(updateLogo);

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