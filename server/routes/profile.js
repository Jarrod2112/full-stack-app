const { Router } = require("express");
const db = require("../mongo/MongoSingleton");

const profileRouter = Router();

profileRouter.post("/", async function (req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const birthday = req.body.birthday;
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.email;
    const profile = {
        user: {
            username: req.user.username,
            id: req.user._id,
        },
        firstName: firstName,
        lastName: lastName,
        birthday: birthday,
        phoneNumber: phoneNumber,
        email: email,
    },
    const collection = await db.getInstance().collection("profile");
    await collection.insertOne(profile)
    return res.status(201).send({});
});
