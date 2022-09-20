import DBConnection from "../configs/DBConnection";

let statisticsInfo =async (req, res) => {
    try {
        // let obj = {}
        // let id = -1
        let statistic_string = ""
        let doc_id_result = new Promise((resolve, reject) => {
            DBConnection.query('SELECT doctor_id FROM (SELECT MAX(sum) as max FROM (SELECT COUNT(status) AS sum, doctor_id FROM request GROUP BY doctor_id) as innerTable) AS maxTable, (SELECT COUNT(status) AS sum, doctor_id FROM request GROUP BY doctor_id) AS countTable WHERE sum = max',
                function (err, rows) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows[0].doctor_id)
                    }
                }
            );
        }).then(id => {
            DBConnection.query('SELECT firstName, lastName FROM patient WHERE id = ?', id,
                function(err, rows) {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        if (rows.length !== 0) {
                            statistic_string = statistic_string+"\n"+"Best doctor is : " + rows[0].firstName + " " + rows[0].lastName + "!."
                        }
                    }
                }
            );
        })
        await doc_id_result
        let drug_id_result = new Promise((resolve, reject) => {
            DBConnection.query('SELECT drug_id FROM (SELECT MAX(sum) as max FROM (SELECT COUNT(serialNumber) AS sum, drug_id FROM request GROUP BY drug_id) as innerTable) AS maxTable, (SELECT COUNT(serialNumber) AS sum, drug_id FROM request GROUP BY drug_id) AS countTable where sum=max',
                function (err, rows) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows[0].drug_id)
                    }
                }
            );
        }).then(drug_id => {
            DBConnection.query('SELECT name FROM drug WHERE id = ?', drug_id,
                function(err, rows) {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        if (rows.length !== 0) {
                            statistic_string = statistic_string+"\n"+"Best med is : " + rows[0].name + "!."
                            res.send(statistic_string)
                        }
                    }
                }
            );
        })


    } catch (err) {
        console.log(err);
    }
}
module.exports = {
    statisticsInfo: statisticsInfo
}