const employeeResource = (employee) => {
    return {
      _id: employee?._id,
      name: employee?.name,
      email: employee?.email,
      phone: employee?.phone,
      status: employee?.status
    };
  };
  
  export default employeeResource;
  