const Patient = require("../models/patient");

module.exports.preview_prescription = async (req, res) => {
  // console.log('Prescription controller: ', req.patient)
  const id = req.params.id;
  const healthID = req.patient.healthID;
  
  if(!id) {
    res.status(400).json({ error: "Prescription ID not found" });
    return
  }

  try {
    const patient = await Patient.findOne({ healthID });
    const prescription = patient.prescriptions.filter((pres) => pres._id == id);
    res.status(200).json({ prescription });
  } catch (err) {
    res.status(404).json({ error: "Something went wrong..." });
  }
};

module.exports.get_patient = async (req, res) => {
  let patient = req.patient;
  // console.log(req.patient)
  res.status(200).json({ patient });
};
