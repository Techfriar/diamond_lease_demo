import employee from "../models/employee.js";

export default class employeeRepository {

  /**
   * Add employee
   * @param String name,
   * @param String email,
   * @param String phone,
   * @param Boolean true|false
   * @return employee
   */
  async addEmployee(data) {
    const newEmployee = new employee();

    Object.keys(data).forEach((key) => {
      newEmployee[key] = data[key];
    });
    newEmployee.save();
    return newEmployee;
  }

  /**
   * Get employee
   * @param Integer employeeId
   * @return employee
   */
  async getEmployee(userId) {
    return employee.findById(userId);
  }

  /**
   * Update employee
   * @param String name,
   * @param String email,
   * @param String phone,
   * @param Boolean true|false
   * @return employee
   */
  async updateEmployee(employeeDetails) {
    const employeeData = await employee.findById(employeeDetails._id);
    if (!employeeData) {
      return null; 
    }
    Object.assign(employeeData, employeeDetails); 
    await employeeData.save(); 
    return employeeData;
  }

  /**
   * List employees
   * @return Collection employee
   */
  async listEmployees() {
    return employee.find();
  }

  /**
   * Delete employee
   */
  async deleteEmployee(employeeId) {
    const employeeData = await employee.findById(employeeId);
    if (!employeeData) {
      return null; 
    }
    await employee.deleteOne(employeeData); 
    return true; 
  }
}
