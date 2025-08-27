import SchoolModel from '../models/schoolModel.js';

// Haversine formula to calculate distance
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat/2) ** 2 +
    Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) *
    Math.sin(dLon/2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

const SchoolController = {
  async addSchool(req, res) {
    try {
      const { name, address, latitude, longitude } = req.body;
      if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const id = await SchoolModel.addSchool(name, address, latitude, longitude);
      res.status(201).json({ message: "School added successfully", schoolId: id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async listSchools(req, res) {
    try {
      const { latitude, longitude } = req.query;
      if (!latitude || !longitude) {
        return res.status(400).json({ error: "Latitude and Longitude are required" });
      }

      const schools = await SchoolModel.getAllSchools();

      const sortedSchools = schools.map(school => ({
        ...school,
        distance: getDistance(latitude, longitude, school.latitude, school.longitude)
      }))
      .sort((a, b) => a.distance - b.distance);

      res.json(sortedSchools);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  async getAllSchools(req, res) {
  try {
    const schools = await SchoolModel.getAllSchools();
    res.json(schools);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

};

export default SchoolController;
