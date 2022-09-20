let handleHelloWorld = async (req, res) => {
    return res.render("homepage.ejs",{
        user: req.user,
        print: null
    });
};

module.exports = {
    handleHelloWorld: handleHelloWorld
};
