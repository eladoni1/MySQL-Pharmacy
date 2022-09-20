import DBConnection from "./../configs/DBConnection";
import bcrypt from "bcryptjs";


let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        // check email is exist or not
        let isIdExist = await checkExistID(data.userId);
        if (isIdExist) {
            reject(`This ID "${data.userId}" has already exist.`);
        } else {
            // hash password
            let salt = bcrypt.genSaltSync(10);
            let userItem = {
                // @@
                id: data.userId,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.city,
                gender: data.gender,
                birthDate: data.birthDate,
                phone: data.phone,
                email: data.email,
                password: bcrypt.hashSync(data.password, salt)
            };

            //create a new account
            //console.log("i am in DBConnection --->")
            DBConnection.query(" INSERT INTO patient set ? ", userItem, function(err, rows) {
                    if (err) {
                        console.log(err)
                        reject(false)
                    }
                    resolve("Create a new user successful");
                }
            );
        }
    });
};

let checkExistID = (userId) => {
    return new Promise( (resolve, reject) => {
        try {
            DBConnection.query(
                ' SELECT * FROM `patient` WHERE `id` = ?  ', userId,
                function(err, rows) {
                    if (err) {
                        reject(err)
                    }
                    if (rows.length > 0) {
                        resolve(true)
                    } else {
                        resolve(false)
                    }
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};
module.exports = {
    createNewUser: createNewUser
};
