const settingsResource = (logo) => {
    return {
      _id: logo?._id,
      logo_path:logo?.logo_path,
      link: logo?.link,
    };
  };
  
  export default settingsResource;
  