import DBConnection from "../configs/DBConnection";

let showHistory= (req, res) => {
    let patient_id = req.params.patientId
    try {
        DBConnection.query(
            'SELECT * FROM `prescription`, `drug` WHERE `patientID` = ? AND drug.id = prescription.drugID ORDER BY date DESC', patient_id,
            function(err, rows) {
                if (err) {
                    res.render("error.ejs", obj)
                }
                else {
                    let obj = {prescriptions: rows}
                    res.render('patient_history.ejs',obj)
                }
                // Render prescriptions was here - if there is an error
            }
        );
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    showHistory: showHistory
}