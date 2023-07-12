import asyncHandler from "express-async-handler";
import contactCMSRepository from "../repositories/contactCMSRepository.js";
import addContactCMSRequest from "../requests/contactCMS/addContactCMSRequest.js";
import contactCMSResource from "../resoureces/contactCMSResource.js";
import getContactCMSRequest from "../requests/contactCMS/getContactCMSRequest.js";
import updateContactCMSRequest from "../requests/contactCMS/updateContactCMSRequest.js";
import deleteContactCMSRequest from "../requests/contactCMS/deleteContactCMSRequest.js";
const contactCMSRepo = new contactCMSRepository();

/**
 * Add conatct CMS
 *
 * @swagger
 * /contact_cms/add:
 *   post:
 *     tags:
 *       - Contact CMS
 *     summary: Add Contact CMS
 *     produces:
 *       - application/json
 *     parameters:
 *        - in: query
 *          name: name
 *          description: Enter title
 *          type: string
 *        - in: query
 *          name: address
 *          description: Enter address
 *          type: string
 *        - in: query
 *          name: country_code
 *          description: Enter country code
 *          type: string
 *        - in: query
 *          name: phone
 *          description: Enter phone
 *          type: string
 *        - in: query
 *          name: email
 *          description: Enter email
 *          type: string
 *        - in: query
 *          name: timings
 *          description: Enter timings
 *          type: string
 *     responses:
 *       200:
 *         description: Success
 *       422:
 *         description: Unprocessable Entity
 *       401:
 *         description: Unauthenticated
 */
const addContactCMS = asyncHandler(async (req, res) => {
  const { name, address, country_code, phone, email, timings } = req.query;
  const contactCMSRequest = new addContactCMSRequest({
    name,
    address,
    country_code,
    phone,
    email,
    timings,
  });

  try {
    const validatedData = contactCMSRequest.validate();
    const contactCMSData = await contactCMSRepo.addContactCMS(validatedData);

    if (contactCMSData) {
      const contactCMS = contactCMSResource(contactCMSData);
      res.status(200).json({
        status: true,
        message: "Successfully added",
        data: contactCMS,
      });
    } else {
      res.status(400);
      throw new Error("Unable to add contact cms");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * Get conatct CMS
 *
 * @swagger
 * /contact_cms/get:
 *   post:
 *     tags:
 *       - Contact CMS
 *     summary: Get Contact CMS
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
const getContactCMS = asyncHandler(async (req, res) => {
  const { _id } = req.query;
  const contactCMSRequest = new getContactCMSRequest({
    _id,
  });

  try {
    const validatedData = contactCMSRequest.validate();
    const contactCMSData = await contactCMSRepo.getContactCMS(validatedData);

    if (contactCMSData) {
      const contactCMS = contactCMSResource(contactCMSData);
      res.status(200).json({
        status: true,
        message: "Successfully fetched",
        data: contactCMS,
      });
    } else {
      res.status(400);
      throw new Error("Unable to fetch contact cms");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * List conatct CMSs
 *
 * @swagger
 * /contact_cms/list:
 *   post:
 *     tags:
 *       - Contact CMS
 *     summary: List Contact CMSs
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
const listContactCMSs = asyncHandler(async (req, res) => {
  try {
    const contactCMSDatas = await contactCMSRepo.listContactCMSs();

    if (contactCMSDatas) {
      const contactCMSs = contactCMSDatas.map((cms) => contactCMSResource(cms));
      res.status(200).json({
        status: true,
        message: "Successfully listed",
        data: contactCMSs,
      });
    } else {
      res.status(400);
      throw new Error("Unable to fetch contact cms");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * Update conatct CMS
 *
 * @swagger
 * /contact_cms/update:
 *   post:
 *     tags:
 *       - Contact CMS
 *     summary: Update Contact CMS
 *     produces:
 *       - application/json
 *     parameters:
 *        - in: query
 *          name: _id
 *          description: Enter id
 *          type: string
 *        - in: query
 *          name: name
 *          description: Enter title
 *          type: string
 *        - in: query
 *          name: address
 *          description: Enter address
 *          type: string
 *        - in: query
 *          name: country_code
 *          description: Enter country code
 *          type: string
 *        - in: query
 *          name: phone
 *          description: Enter phone
 *          type: string
 *        - in: query
 *          name: email
 *          description: Enter email
 *          type: string
 *        - in: query
 *          name: timings
 *          description: Enter timings
 *          type: string
 *     responses:
 *       200:
 *         description: Success
 *       422:
 *         description: Unprocessable Entity
 *       401:
 *         description: Unauthenticated
 */
const updateContactCMS = asyncHandler(async (req, res) => {
  const { _id, name, address, country_code, phone, email, timings } = req.query;
  const contactCMSRequest = new updateContactCMSRequest({
    _id,
    name,
    address,
    country_code,
    phone,
    email,
    timings,
  });

  try {
    const validatedData = contactCMSRequest.validate();
    const contactCMSData = await contactCMSRepo.updateContactCMS(validatedData);

    if (contactCMSData) {
      const contactCMS = contactCMSResource(contactCMSData);
      res.status(200).json({
        status: true,
        message: "Successfully updated",
        data: contactCMS,
      });
    } else {
      res.status(400);
      throw new Error("Unable to update contact cms");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * Delete conatct CMS
 *
 * @swagger
 * /contact_cms/delete:
 *   post:
 *     tags:
 *       - Contact CMS
 *     summary: Delete Contact CMS
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
const deleteContactCMS = asyncHandler(async (req, res) => {
  const { _id } = req.query;
  const contactCMSRequest = new deleteContactCMSRequest({
    _id,
  });

  try {
    const validatedData = contactCMSRequest.validate();
    const contactCMSData = await contactCMSRepo.deleteContactCMS(validatedData);

    if (contactCMSData) {
      res.status(200).json({
        status: true,
        message: "Successfully deleted",
      });
    } else {
      res.status(400);
      throw new Error("Unable to delete contact cms");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export {
  addContactCMS,
  getContactCMS,
  listContactCMSs,
  updateContactCMS,
  deleteContactCMS,
};
