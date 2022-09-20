import DBConnection from "../configs/DBConnection";

let showRequests= (req, res) => {
    var obj = {user: req.user, printRequest: null}
    try {
        DBConnection.query(
            'SELECT * FROM `request`,`drug`,`patient` WHERE `patient_id` = ? AND drug.id = request.drug_id AND patient.id = request.doctor_id AND isDoctor = 1 ORDER BY date DESC', req.user.id,
            function(err, rows) {
                if (err) {
                    res.render("error.ejs", obj)
                }
                else {
                    obj = {user: req.user, printRequest: rows}
                    res.render('requests.ejs',obj)
                }
                // Render requests was here - if there is an error
            }
        );
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    showRequests: showRequests
}

