const Patient = require("../models/patient");
const Doctor = require("../models/doctor");
module.exports.search_patient = async (req, res) => {
  const healthID = req.params.healthID;
  try {
    const patient = await Patient.findOne({ healthID });
    res.status(200).json({ patient });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong..." });
  }
};

module.exports.get_doctor = async (req, res) => {
  let doctor = await Doctor.findOne({});
  res.status(200).json({ doctor });
};
