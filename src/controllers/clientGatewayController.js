let checkIsPatientToHomepage = (req, res, next) => {
    let is_doctor = req.user.isDoctor
    if (is_doctor) {
        next()
    } else {
        res.redirect("/")
    }
}

module.exports = {
    checkIsPatientToHomepage: checkIsPatientToHomepage
}