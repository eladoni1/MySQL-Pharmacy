import DBConnection from "../configs/DBConnection";

let showPrescription= (req, res) => {
    var obj = {user: req.user, print: null}
    try {
        DBConnection.query(
            'SELECT * FROM `prescription`,`drug` WHERE `patientID` = ? AND drug.id = prescription.drugID ORDER BY date DESC', req.user.id,
            function(err, rows) {
                if (err) {
                    res.render("error.ejs", obj)
                }
                else {
                    obj = {user: req.user, print: rows}
                    res.render('prescriptions.ejs',obj)
                }
                // Render prescriptions was here - if there is an error
            }
        );
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    showPrescription: showPrescription
}