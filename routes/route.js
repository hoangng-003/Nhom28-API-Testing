const userController = require("../controller/user");

const router = (app) => {

    app.post("/api/register", async (req, res, next) => {
        userController.register(req, res);
    })

    app.post("/api/login", async (req, res, next) => {
        userController.login(req, res);
    })

    app.get("/api/getUserInfo", async (req, res, next) => {
        userController.getUserInfo(req, res);
    })
    
    app.post("/api/setUserInfo", async (req, res, next) => {
        userController.setUserInfo(req, res);
    })
    
    app.get("/", async (req, res, next) => {
        res.json({ message: "hello world" })
    })
    
}

module.exports = router;