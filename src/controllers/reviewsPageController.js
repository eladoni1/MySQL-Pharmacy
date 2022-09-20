import DBConnection from "../configs/DBConnection";

let showReviews= (req, res) => {
    var drug_id_for_review = req.params.drugId
    try {
        let obj = {}
        DBConnection.query(
            'SELECT review.rating AS user_rating, drugName, revCondition, text AS the_review, date,drug.rating AS avg_rating FROM `review`,`drug` WHERE review.drugName = drug.name AND drug.id = ? ORDER BY date DESC ', drug_id_for_review,
            function(err, rows) {
                if (err) {
                    res.render("error.ejs")
                }
                else {
                    obj.reviews = rows
                    res.render('reviews.ejs',obj)
                }
                // Render requests was here - if there is an error
            }
        );
    } catch (err) {
        console.log(err);
    }
}
module.exports = {
    showReviews: showReviews
}

