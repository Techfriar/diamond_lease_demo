const contactCMSResource = (cms) => {
    return {
      _id: cms?._id,
      name: cms?.name,
      address: cms?.address,
      country_code: cms?.country_code,
      phone: cms?.phone,
      email: cms?.email,
      timings: cms?.timings
    };
  };
  
  export default contactCMSResource;
  