import DBConnection from "../configs/DBConnection";

let createRequest= async (req, res) => {
    try {
        let docNamesPromise = new Promise(async (resolve, reject) => {
            try {
                DBConnection.query(
                    'SELECT id, firstName, lastName FROM `patient` WHERE isDoctor = 1',
                    function(err, rows) {
                        if (err) {
                            reject(err)
                        }
                        else {
                            resolve(rows)
                        }
                    }
                );
            } catch (err) {
                reject(err);
            }
        })
        let drugNamesPromise = new Promise(async (resolve, reject) => {
            try {
                DBConnection.query(
                    'SELECT id, name, rating FROM `drug`',
                    function(err, rows) {
                        if (err) {
                            reject(err)
                        }
                        else {
                            resolve(rows)
                        }
                    }
                );


            } catch (err) {
                reject(err);
            }
        })
        let result_array = await Promise.all([drugNamesPromise, docNamesPromise])
        if (result_array[0] && result_array[1])
            var obj = { user: req.user, docNames: result_array[1], drugNames: result_array[0] }
        res.render("new_request.ejs", obj)
    }
    catch (error){
        console.log(error)
    }
}

let addRequest = async (req, res) => {
    try{
        let insertPromise = new Promise(async (resolve, reject) => {
            let new_request_row = {
                doctor_id: req.body.doctorNames,
                patient_id: req.user.id,
                date: new Date().toISOString().slice(0, 19).replace('T', ' '),
                status: null,
                drug_id: req.body.drugNames
            }
            try {
                DBConnection.query(" INSERT INTO request set ? ", new_request_row, function (err, rows) {
                        if (err) {
                            reject(err)
                        }
                        resolve("Your request was added successfully!");
                    }
                );
            } catch (err) {
                reject(err);
            }
        })
        let response_from_promise = await insertPromise
        if (response_from_promise) {
            console.log(response_from_promise)
        }
        else {
            console.log("failure!")
        }
        return res.redirect("/requests")
    }
    catch (error){
        console.log(error)
    }
}





module.exports = {
    createRequest: createRequest,
    addRequest: addRequest
}