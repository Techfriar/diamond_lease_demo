import settings from "../models/settings.js";

export default class settingsRepository {

  /**
   * Add logo
   * @param {Object} data 
   * @returns logo
   */
  async addLogo(data) {
    const logoData = new settings();
    Object.keys(data).forEach((key) => {
      logoData[key] = data[key];
    });
    logoData.save();
    return logoData;
  }

  /**
   * Get logo
   * @return logo
   */
  async getLogo()
  {
    return settings.findOne();
  }

  /**
   * Update logo
   * @return logo
   */
  async deleteLogo() {
   return settings.deleteOne();
  }
}
