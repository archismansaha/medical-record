const { Router } = require("express");
const {
  preview_prescription,
  get_patient,
} = require("../controllers/patientControllers");
const { requirePatientAuth } = require("../middlewares/patientAuthMiddleware");
const router = Router();

router.get("/prescription/:id", preview_prescription);
router.get("/getpatient",  get_patient);

module.exports = router;
