const db = require("../models");
const bc = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const register = async (req, res) => {
    const { username, password, name, image_url: imageUrl,email,tel,
        sex,birthdate,role } = req.body;
        console.log(username)
    const targetUser = await db.User.findOne({ where: { username } });

    if (targetUser) {
        res.status(400).send({ message: "Username already used" });
    } else {
        const salt = bc.genSaltSync(Number(process.env.ROUNDS));
        const hashedPW = bc.hashSync(password, salt);

        await db.User.create({
            password: hashedPW,
            image_url: imageUrl,
            username,
            name,
            email,
            tel,
            sex,
            birthdate,
            role
        });

        res.status(201).send({ message: "User created" });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    const targetUser = await db.User.findOne({ where: { username } });
    if (!targetUser) {
        res.status(400).send({ message: "Username or password is wrong." });
    } else {
        const isPWCorrect = bc.compareSync(password, targetUser.password);

        if (isPWCorrect) {
            const payload = { id: targetUser.id, name: targetUser.name };
            const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 36000 });
            console.log(token)
            res.status(200).send({
                message: "Successfully login.",
                access_token: token,
                accessToken: token,
            });
        } else {
            res.status(400).send({ message: "Username or password is wrong." });
        }
    }
};

module.exports = {
    register,
    login,
};