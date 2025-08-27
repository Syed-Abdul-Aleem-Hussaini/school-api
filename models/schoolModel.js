import { query } from '../config/db.js';

const SchoolModel = {
  async addSchool(name, address, latitude, longitude) {
    const result = await query(
      "INSERT INTO schools (name, address, latitude, longitude) VALUES ($1, $2, $3, $4) RETURNING id",
      [name, address, latitude, longitude]
    );
    return result.rows[0].id;
  },

  async getAllSchools() {
    const result = await query("SELECT * FROM schools");
    return result.rows;
  }
};

export default SchoolModel;
