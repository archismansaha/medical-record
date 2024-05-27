
async function getDoctorReports(req, res) {
    try {
        const prescriptions = req.doctor.prescriptions
        res.status(200).json({ prescriptions })
    } catch(err) {
        console.log('Error while getting doctor reports: ', err)
        res.status(500).send({ error: 'Internal server error' })
    }
}

module.exports = getDoctorReports