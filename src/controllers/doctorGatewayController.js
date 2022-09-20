let checkIsDoctorToHomepage = (req, res, next) => {
    let is_doctor = req.user.isDoctor
    if (!is_doctor) {
        next()
    } else {
        res.redirect("/")
    }
}

let checkIsDoctorFromHomepage = (req, res, next) => {
    let is_doctor = req.user.isDoctor
    if (!is_doctor) {
        next()
    } else {
        let obj={user:req.user}
        res.render("you_are_a_doctor.ejs",obj)
    }
}
module.exports = {
    checkIsDoctorToHomepage: checkIsDoctorToHomepage,
    checkIsDoctorFromHomepage: checkIsDoctorFromHomepage
}