import express from "express";
import homePageController from "../controllers/homePageController";
import registerController from "../controllers/registerController";
import loginController from "../controllers/loginController";
import auth from "../validation/authValidation";
import passport from "passport";
import DBConnection from "./../configs/DBConnection";
import initPassportLocal from "../controllers/passportLocalController";
import prescriptionPageController from "../controllers/prescriptionPageController"
import requestPageController from "../controllers/requestPageController"
import addRequestPageController from "../controllers/addRequestPageController"
import reviewsPageController from "../controllers/reviewsPageController"
import purchasePageController from "../controllers/purchasePageController"
import addReviewPageController from "../controllers/addReviewPageController"
import doctorGatewayController from "../controllers/doctorGatewayController"
import clientGatewayController from "../controllers/clientGatewayController"
import doctorQueuePageController from "../controllers/doctorQueuePageController"
import patientHistoryPageController from "../controllers/patientHistoryPageController"
import addManualPrescriptionController from "../controllers/addManualPrescriptionController"
import statisticsPageController from  "../controllers/statisticsPageController"

initPassportLocal();

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/manual_pres", loginController.checkLoggedIn, clientGatewayController.checkIsPatientToHomepage, addManualPrescriptionController.showOptionsManual)
    router.get("/statistics_info", loginController.checkLoggedIn, clientGatewayController.checkIsPatientToHomepage, statisticsPageController.statisticsInfo)
    router.post("/manual_pres", loginController.checkLoggedIn, clientGatewayController.checkIsPatientToHomepage, addManualPrescriptionController.addManual)
    router.post("/doc_queue", loginController.checkLoggedIn, clientGatewayController.checkIsPatientToHomepage, doctorQueuePageController.approve)
    router.get("/approve/:requestId", loginController.checkLoggedIn, clientGatewayController.checkIsPatientToHomepage, )
    router.get("/deny/:requestId", loginController.checkLoggedIn, clientGatewayController.checkIsPatientToHomepage, doctorQueuePageController.deny)
    router.get("/patient_history/:patientId", loginController.checkLoggedIn, clientGatewayController.checkIsPatientToHomepage, patientHistoryPageController.showHistory)
    router.get("/doc_queue", loginController.checkLoggedIn, clientGatewayController.checkIsPatientToHomepage, doctorQueuePageController.showQueue)
    router.get("/new_review/:drugID",loginController.checkLoggedIn,doctorGatewayController.checkIsDoctorToHomepage, addReviewPageController.createReview)
    router.post("/new_review/:drugID",loginController.checkLoggedIn, doctorGatewayController.checkIsDoctorToHomepage, addReviewPageController.addReview)
    router.post("/purchase/:prescriptionID", loginController.checkLoggedIn, doctorGatewayController.checkIsDoctorToHomepage, purchasePageController.postNewPurchase)
    router.get("/purchase/:prescriptionID", loginController.checkLoggedIn, doctorGatewayController.checkIsDoctorToHomepage, purchasePageController.newPurchase)
    router.get("/new_request", loginController.checkLoggedIn, doctorGatewayController.checkIsDoctorToHomepage, addRequestPageController.createRequest)
    router.post("/new_request", loginController.checkLoggedIn, doctorGatewayController.checkIsDoctorToHomepage, addRequestPageController.addRequest)
    router.get("/requests", loginController.checkLoggedIn, doctorGatewayController.checkIsDoctorToHomepage, requestPageController.showRequests)
    router.get("/prescriptions", loginController.checkLoggedIn, doctorGatewayController.checkIsDoctorToHomepage, prescriptionPageController.showPrescription)
    router.get("/reviews/:drugId", loginController.checkLoggedIn, doctorGatewayController.checkIsDoctorToHomepage, reviewsPageController.showReviews) // HANDLER CAN USE req.params.drugId
    router.get("/", loginController.checkLoggedIn, doctorGatewayController.checkIsDoctorFromHomepage, homePageController.handleHelloWorld);
    router.get("/login",loginController.checkLoggedOut, loginController.getPageLogin);
    router.post("/login", passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        successFlash: true,
        failureFlash: true
    }));


    router.get("/register", loginController.checkLoggedOut, registerController.getPageRegister);
    router.post("/register", auth.validateRegister, registerController.createNewUser);
    router.post("/logout", loginController.postLogOut);

    return app.use("/", router);
};
module.exports = initWebRoutes;
