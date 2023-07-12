const bannerResource = (banner) => {
  return {
    _id: banner?._id,
    banner_path: banner?.banner_path,
    link: banner?.link,
  };
};

export default bannerResource;
