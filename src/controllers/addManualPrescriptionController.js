import DBConnection from "../configs/DBConnection";

let showOptionsManual = (req,res) => {
    // req.body.
    try {
        let p = new Promise(function(resolve, reject) {
            try {
                let obj = {}
                DBConnection.query(
                    'SELECT firstName, lastName, id FROM `patient` WHERE isDoctor = 0',
                    function(err, rows) {
                        if (err) {
                            reject(err)
                        }
                        else {
                            obj.patients = rows
                        }
                    }
                );
                DBConnection.query(
                    'SELECT name, id FROM `drug`',
                    function(err, rows) {
                        if (err) {
                            reject(err)
                        }
                        else {
                            obj.drugs = rows
                            resolve(obj)
                        }
                    }
                );
            } catch(err) {
                reject(err)
            }
        }).then(result => {
            res.render("manual_prescription.ejs", result)
        }).catch(error => {
            console.log(error)
            res.render("error.ejs",error)
        })
    }
    catch (error){
        console.log(error)
    }
}

let addManual = (req,res) => {
    try{
        let p = new Promise(function(resolve, reject) {
            try {
                let insert_set = {
                    expDate: req.body.expDate,
                    quantity: req.body.quantity,
                    mg: req.body.miligram,
                    patientID: req.body.patientId,
                    drugID: req.body.drugId,
                    used: 0,
                    date: new Date()
                }
                DBConnection.query(
                    'INSERT INTO prescription set ?',insert_set,
                    function(err, rows) {
                        if (err) {
                            reject(err)
                        }
                        else {
                            resolve("Success")
                        }
                    }
                );
            } catch(err) {
                reject(err)
            }
        }).then(result => {
            // res.redirect("/doc_queue")
            res.redirect("/manual_pres")
        }).catch(error => {
            console.log(error)
            res.render("error.ejs",error)
        })
    }
    catch (error){
        console.log(error)
    }

}

module.exports = {
    showOptionsManual: showOptionsManual,
    addManual: addManual
}