const settingsResource = (logo) => {
    return {
      _id: logo?._id,
      logo_path:logo?.logo_path,
    };
  };
  
  export default settingsResource;
  