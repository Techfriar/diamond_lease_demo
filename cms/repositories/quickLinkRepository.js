import quickLink from "../models/quickLink.js";

export default class quickLinkRepository {
  /**
   * Add quick link
   * @param {Object} data
   * @returns quickLInk
   */
  async addQuickLink(data) {
    const quickLinkData = new quickLink();
    Object.keys(data).forEach((key) => {
      quickLinkData[key] = data[key];
    });
    quickLinkData.save();
    return quickLinkData;
  }

  /**
   * get quick link
   * @param Integer linkId
   * @returns quickLInk
   */
  async getQuickLink(linkId) {
    return quickLink.findById(linkId);
  }

  /**
   * Update quick link
   * @param Integer id,
   * @param String title,
   * @param String link,
   * @return quickLink 
   */
  async updateQuickLink(linkDetails) {
    const quickLinkData = await quickLink.findById(linkDetails._id);
    if (!quickLinkData) {
      return null;
    }
    Object.assign(quickLinkData, linkDetails);
    await quickLinkData.save();
    return quickLinkData;
  }

  /**
   * List quick links
   * @return quickLinks quickLink
   */
  async listQuickLinks() {
    return quickLink.find();
  }
  
  /**
   * Delete quick link
   */
  async deleteQuickLink(linkId) {
    const linkData = await quickLink.findById(linkId);
    if (!linkData) {
      return null;
    }
    await quickLink.deleteOne(linkData);
    return true;
  }
}
