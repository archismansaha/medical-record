const Doctor = require("../models/doctor");
const { createToken } = require("../utils/createToken");
const maxAge = 3 * 24 * 60 * 60;

module.exports.doctor_register = async (req, res) => {

  try {
    const education =req.body.education;
    const specialization = req.body.specialization;
    const {
      name,
      org,
      orgAddress,
      dob,
      mobile,
      email,
      adharCard,
      bloodGroup,
      address,
      password,
      orgNumber,
      emergencyno,
    } = req.body;
    const doctor = await Doctor.create({
      name,
      org,
      orgAddress,
      dob,
      mobile,
      email,
      adharCard,
      bloodGroup,
      education,
      address,
      password,
      specialization,
      orgNumber,
      emergencyno,
    });

    res.status(200).json({ doctor });
  } catch (err) {
    console.log("Error in registering doctor", err)
    res.status(404).json({ err });
  }
};

module.exports.doctor_login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const doctor = await Doctor.login(email, password);
    const token = createToken(doctor._id);
    // res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.cookie("jwt", token, {
      maxAge: 90000000, // 14 minutes
      httpOnly: true,
      // for https sites only
      sameSite: "none",
      secure: true,
    });

    req.headers.authorization = token;
    res.status(200).json({ doctor });
  } catch (err) {
    res.status(500).json({ err });
  }
};
