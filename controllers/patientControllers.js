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

module.exports.get_medcine = async (req, res) => {
  let patient = req.patient;
  // let patients = await Patient.find();
  // let patient=patients[1];
  const prescriptions=patient.prescriptions;

  const formattedPrescriptions = prescriptions.map(prescription => {
    const { doctor, updatedAt, medicines } = prescription;

    console.log('Current prescription: ', prescription)
    const formattedMedicines = medicines.map(medicine => {
      const { dosage, medicineName } = medicine;
      const { morning, afternoon, evening } = dosage;
  
   
      const totalDosage = morning.quantity + afternoon.quantity + evening.quantity;
  
      return {
        doctorName: doctor,
        updatedAt,
        medicineName,
        dosage: [
          { time: "Morning", quantity: morning.quantity },
          { time: "Afternoon", quantity: afternoon.quantity },
          { time: "Evening", quantity: evening.quantity },
        ],
        dosageQUantity: totalDosage, 
        duration: medicine.duration,
        diagnosis: medicine.diagnosis,
      };

    });  
    
    return formattedMedicines;
  });


  res.status(200).json(formattedPrescriptions );
  
};