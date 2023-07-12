import banner from "../models/banner.js";

export default class bannerRepository {

  /**
   * Add banner
   * @param {Object} data - Banner data including image
   * @returns {Promise} - Resolves to the saved banner
   */
  async addBanner(data) {

    const bannerData = new banner();
    Object.keys(data).forEach((key) => {
        bannerData[key] = data[key];
    });
    bannerData.save();
    return bannerData;
  }

  /**
   * Delete banner
   * @param  String link
   * @returns Boolean true|false
   */
  async deleteBanner(link) {
    return banner.findOneAndDelete(link);
  }

}
