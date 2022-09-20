import DBConnection from "../configs/DBConnection";

let showQueue = (req, res) => {
    try {
        DBConnection.query(
            'SELECT * FROM `request`,`patient`,`drug` WHERE patient_id = patient.id AND doctor_id = ? AND request.status is NULL AND drug.id = request.drug_id  ORDER BY date ASC', req.user.id,
            function (err, rows) {
                if (err) {
                    res.render("error.ejs", obj)
                } else {
                    let obj = {user: req.user, requests: rows}
                    res.render('doc_queue.ejs', obj)
                }
                // Render requests was here - if there is an error
            }
        );
    } catch (err) {
        console.log(err);
    }
}
let deny = async (req, res) => {
    let requestId = req.params.requestId
    try {
        let p = new Promise(function (resolve, reject) {
            try {
                DBConnection.query('UPDATE `request` SET status = 0 WHERE serialNumber = ? ', requestId,
                    function (err, rows) {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(rows)
                        }
                        // Render requests was here - if there is an error
                    }
                );
            } catch (err) {
                reject(err)
            }
        })
        let result = await p // AWAIT CAN THROW REJECT VALUES!

        if (result) {
            res.redirect("/doc_queue")
        } else {
            res.render("error.ejs")
        }
    }
    catch (error){
        console.log(error)
    }
}
let approve = async (req, res) => {
    let expDate = req.body.expDate
    let quantity = req.body.quantity
    let miligram = req.body.miligram
    let serialNumber = req.body.serialNumber
    let patientId = req.body.patientId
    let drugId = req.body.drugId
    let current_date = new Date()
    try{
        let p = new Promise(function (resolve, reject) {
            try {
                DBConnection.query("START TRANSACTION")
                DBConnection.query('UPDATE `request` SET status = 1 WHERE serialNumber = ? ', serialNumber,
                    function (err, rows) {
                        if (err) {
                            DBConnection.query("ROLLBACK")
                            console.log(err)
                            reject(err)
                        }
                    }
                );
                let insert_this = {
                    expDate: expDate,
                    quantity: quantity,
                    mg: miligram,
                    patientID: patientId,
                    drugID: drugId,
                    date: current_date
                }
                DBConnection.query('INSERT INTO `prescription` set ?', insert_this,
                    function (err, rows) {
                        if (err) {
                            DBConnection.query("ROLLBACK")
                            console.log(err)
                            reject(err)
                        }
                        DBConnection.query("COMMIT")
                        resolve("prescription was succesfully updated!");
                    }
                );
            } catch (err) {
                DBConnection.query("ROLLBACK")
                console.log(err)
                reject(err);
            }
        })
        try {
            let result = await p
        } catch(err) {
            console.log("failure!")
        }
        res.redirect("/doc_queue")
    }
    catch (error){
        console.log(error)
    }

}


module.exports = {
    showQueue: showQueue,
    deny: deny,
    approve: approve
};