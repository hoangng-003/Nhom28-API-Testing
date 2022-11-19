const users = require('../models/user');
const userInfo = require('../models/userInfo');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    let schema = Joi.object({
        username: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().required().min(8),
    });
    const { body } = req;
    const { err } = schema.validate(body);

    if (err) {
        return res.status(400).send(err);
    }

    let user = await users.findOne({
        where: {
            username: body.username
        }
    });

    if (user) {
        return res.status(400).json({
            username: user.username
        })
    }

    const password = await bcrypt.hash(body.password, 8);

    const newUser = await users.create({
        username: body.username,
        password: password
    })
    return res.status(200).json({
        create: "success"
    })
}

const login = async (req, res) => {
    let schema = Joi.object({
        username: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().required().min(8),
    });
    const { body } = req;
    const { err } = schema.validate(body);

    if (err) {
        return res.status(400).send(err);
    }

    let user = await users.findOne({
        where: {
            username: body.username
        }
    });

    if (!user) {
        return res.status(400).json({
            message: "dont have username"
        })
    }

    const password = await bcrypt.compareSync(body.password, user.password);

    if (!password) return res.status(400).json({ message: "invalid password" });

    let objToHash = {
        username: user.username,
    }

    const accessToken = jwt.sign(objToHash, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 86400 });
    const refreshToken = jwt.sign(objToHash, process.env.REFRESH_TOKEN_SECRET);

    let okResponse = {
        username: user.username,
        accessToken,
        refreshToken
    };
    return res.json(okResponse);

}


const getUserInfo = async (req, res) => {
    let username;
    jwt.verify(req.headers['authorization'], process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        username = data.username;
    });
    let info = await userInfo.findByPk(username);
    res.json(info);
}

const setUserInfo = async (req, res) => {
    const { body } = req;
    let username;

    jwt.verify(req.headers['authorization'], process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        username = data.username;
    });

    let user = await userInfo.findByPk(username);

    if (user) {
        user.phoneNumber = body.phoneNumber;
        user.fullName = body.fullName;
        user.nationality = body.nationality;
        return res.json({ message: "Set information of user successfully" });
    }

    await userInfo.create({
        username: username,
        phoneNumber: body.phoneNumber,
        fullName: body.fullName,
        nationality: body.nationality
    });
    res.json({ message: "Set information of user successfully" });
}

var userController = {
    register,
    login,
    getUserInfo,
    setUserInfo
}
module.exports = userController;