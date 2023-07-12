const quickLinkResource = (link) => {
    return {
      _id: link?._id,
      title:link?.title,
      link: link?.link,
    };
  };
  
  export default quickLinkResource;
  