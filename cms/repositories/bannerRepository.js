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
  async deleteBanner(bannerId) {
    const bannerData = await banner.findById(bannerId);
    if (!bannerData) {
      return null;
    }
    await bannerData.deleteOne(bannerId);
    return true;
  }

  /**
   * Get banner
   * @param Integer bannerId
   * @return Banner banner
   */
  async getBanner(bannerId) {
    return banner.findById(bannerId);
  }

  /**
   * Update banner link
   * @param banner data
   */
  async updateBanner(bannerDetails) {
    const bannerData = await banner.findById(bannerDetails._id);
    if (!bannerData) {
      return null;
    }
    Object.assign(bannerData, bannerDetails);
    await bannerData.save();
    return bannerData;
  }

}
