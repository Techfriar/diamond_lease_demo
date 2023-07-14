import express from 'express';
import { addLinkToBanner, addMainBanner, addMultipleBanners, deleteBanner, listBanners } from '../controllers/bannerController.js';
import { addLogo, listLogo } from '../controllers/settingsController.js';
import { addQuickLink, deleteQuickLink, getQuickLink, listQuickLinks, updateQuickLink } from '../controllers/quickLinkController.js';
import { addContactCMS, deleteContactCMS, getContactCMS, listContactCMSs, updateContactCMS } from '../controllers/contactCMSController.js';
const router = express.Router();


/**
 * banner routes
 */
router.route("/banner/list").post(listBanners);

/**
 * Settings routes
 */
router.route("/settings/list_logo").post(listLogo);

/**
 * Quick link routes
 */
router.route("/quick_link/list").post(listQuickLinks);

/**
 * Contact cms routes
 */
router.route("/contact_cms/list").post(listContactCMSs);

export default router;