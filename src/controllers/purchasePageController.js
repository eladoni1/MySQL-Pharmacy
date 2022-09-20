import DBConnection from "../configs/DBConnection";

let newPurchase= async (req, res) => {
    var prescription_id_for_purchase = req.params.prescriptionID
    var user_id = req.user.id
    try{
        let p = new Promise(function (resolve, reject) {
            try {
                DBConnection.query(
                    'SELECT quantity - used AS available, drug.name, expDate FROM prescription, drug WHERE prescriptionID = ? AND id = drugID', prescription_id_for_purchase,
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
            let iterations = result[0]
            let obj = {iteration: iterations, prescriptionID: prescription_id_for_purchase}
            res.render('purchases.ejs', obj)
        } else {
            res.render("error.ejs")
        }
    }catch (error){
        console.log(error)
    }
}

 let postNewPurchase = async (req, res) => {
     let prescriptionId = req.params.prescriptionID
     let units = req.body.unitsToBuy
     let user_id = req.user.id
     try{
         let p = new Promise(function (resolve, reject) {
             try {
                 DBConnection.query("UPDATE `prescription` SET used = used + ? WHERE prescriptionID = ? AND patientID = ?",
                     [units, prescriptionId, user_id],
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
         try{
             let result = await p
             if (result) {
                 // res.redirect("/prescriptions")
                 res.send('thanks for buying! please close this tab.')
             } else {
                 res.render("error.ejs")
             }
         } catch (error) {
             console.log("error")
         }
     }catch (error){
         console.log(error)
     }
 }

module.exports = {
    newPurchase: newPurchase,
    postNewPurchase: postNewPurchase,
}
