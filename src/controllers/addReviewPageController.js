import DBConnection from "../configs/DBConnection";

let createReview= async (req, res) => {
    let drug_id = req.params.drugID
    let obj = {drugID: drug_id}
    let drugNamePromise = new Promise(async (resolve,reject)=>{
        try {
            DBConnection.query(
                'SELECT name FROM drug WHERE drug.id = ?', drug_id,
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
            reject(err)
        }
    }).catch(err => {
        console.log(err)
    })

    try {

        let name_response = await drugNamePromise
        obj.drugName = name_response
        res.render("new_review.ejs", obj)
    } catch(err) {
        console.log(err)
        res.render("error.ejs")
    }
}

let addReview = async (req, res) => {
    let drug_id = req.params.drugID
    let rating = req.body.rating
    let review_text = req.body.review_text
    let condition = req.body.condition
    try{
        let drugNamePromise =  new Promise(async (resolve,reject)=>{
            try {
                DBConnection.query(
                    'SELECT name FROM drug WHERE drug.id = ?', drug_id,
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
                reject(err)
            }
        })

        let response_for_drugName = await drugNamePromise
        if (response_for_drugName) {
            response_for_drugName = response_for_drugName[0].name
            let insertPromise = new Promise(async (resolve, reject) => {
                let new_review_row = {
                    drugName: response_for_drugName,
                    revCondition: condition,
                    text: review_text,
                    rating: rating,
                    date: new Date().toISOString().slice(0, 19).replace('T', ' '),
                    drugID: drug_id
                }
                try {
                    DBConnection.query("START TRANSACTION")
                    DBConnection.query(" INSERT INTO review set ? ", new_review_row, function (err, rows) {
                            if (err) {
                                DBConnection.query("ROLLBACK")
                                console.log(err)
                                reject(err)
                            }
                        }
                    );
                    DBConnection.query(" UPDATE drug set drug.rating = (SELECT AVG(rating) FROM review WHERE drugID = ?) WHERE drug.id = ?", [drug_id, drug_id], function (err, rows) {
                            if (err) {
                                DBConnection.query("ROLLBACK")
                                console.log(err)
                                reject(err)
                            }
                            DBConnection.query("COMMIT")
                            resolve("Rating was succesfully updated!");
                        }
                    );
                } catch (err) {
                    DBConnection.query("ROLLBACK")
                    console.log(err)
                    reject(err);
                }
            })
            try {
                let response = await insertPromise
            } catch(err) {
                console.log("failure! (second promise)")
            }

        }
        else {
            console.log("failure! (first promise)")
        }
        // return res.redirect("/prescriptions")
        return res.send('thank you for your review. please close this tab.')
    }
    catch (error)
    {
        console.log(error)
    }

}





module.exports = {
    createReview: createReview,
    addReview: addReview
}