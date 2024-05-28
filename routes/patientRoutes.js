const { Router } = require("express");
const {
  preview_prescription,
  get_patient,
  get_medcine
} = require("../controllers/patientControllers");
const { requirePatientAuth } = require("../middlewares/patientAuthMiddleware");
const router = Router();

router.get("/prescription/:id", requirePatientAuth, preview_prescription);
router.get("/getpatient", requirePatientAuth, get_patient);
router.get("/getmedicine", requirePatientAuth, get_medcine);
router.put('/reset-token', requirePatientAuth, get_patient)

module.exports = router;
