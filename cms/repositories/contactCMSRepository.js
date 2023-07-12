import contactCMS from "../models/contactCMS.js";

export default class contactCMSRepository {
  /**
   * Add contact cms
   * @param {Object} data - Banner data including image
   * @returns contactCMS
   */
  async addContactCMS(data) {
    const contactCMSData = new contactCMS();
    Object.keys(data).forEach((key) => {
      contactCMSData[key] = data[key];
    });
    contactCMSData.save();
    return contactCMSData;
  }

  /**
   * Get contact cms
   * @param Integer id
   * @return contactCMS
   */
  async getContactCMS(cmsId) {
    return contactCMS.findById(cmsId);
  }

  /**
   * List contact cmss
   * @param Integer id
   */
  async listContactCMSs() {
    return contactCMS.find();
  }

  /**
   * Update contact cms
   * @param Integer id,
   * @param String name,
   * @param String address,
   * @param String country_code,
   * @param String phone,
   * @param String email,
   * @param String timings,
   * @return quickLink quickLink
   */
  async updateContactCMS(cmsDetails) {
    const cmsData = await contactCMS.findById(cmsDetails._id);
    if (!cmsData) {
      return null;
    }
    Object.assign(cmsData, cmsDetails);
    await cmsData.save();
    return cmsData;
  }

  /**
   * Delete contact cms
   * @param Integer cmsId
   * @return contactCMS
   */
  async deleteContactCMS(cmsId) {
    const cmsData = await contactCMS.findById(cmsId);
    if (!cmsData) {
      return null;
    }
    await contactCMS.deleteOne(cmsId);
    return true;
  }
}
