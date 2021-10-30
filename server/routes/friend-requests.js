const { Router } = require("express");
const { ObjectId } = require("mongodb");
const FriendRequestStatus = require('../constant/FriendRequestStatus');
const db = require("../mongo/MongoSingleton");

const friendRequestsRouter = Router();

/**
 * Create a new friend request
 */
friendRequestsRouter.post("/", async (req, res) => {
    const collection = db.getInstance().collection("friend-requests");
    if (!req.user) {
        return res.status(404).send("NOT_LOGGED_IN");
    }
    const fromUserId = req.user._id;
    const { toUserId } = req.body;

    await collection.insertOne({
        fromUsername: req.user.username,
        fromUserId: new ObjectId(fromUserId),
        toUserId: new ObjectId(toUserId),
        createdAt: new Date(),
        status: FriendRequestStatus.Pending
    });
    return res.status(201);
});

/**
 * Fetch all received pending friend requests
 */
friendRequestsRouter.get('/', async (req, res) => {
    const collection = db.getInstance().collection("friend-requests");
    if (!req.user) {
        return res.status(404).send("NOT_LOGGED_IN");
    }
    const results = await collection.find({ toUserId: req.user._id, status: FriendRequestStatus.Pending }).toArray();
    return res.json(results);
})

friendRequestsRouter.patch("/accept/:friendRequestId", async (req, res) => {
    const friendRequestsCollection = db.getInstance().collection("friend-requests");
    const usersCollection = db.getInstance().collection("users");

    if (!req.user) {
        return res.status(404).send("NOT_LOGGED_IN");
    }

    const { friendRequestId } = req.params;
    const friendRequest = await friendRequestsCollection.findOne({ _id: ObjectId(friendRequestId) });

    // add each user to each other's friends lists
    // delete the friend request
    const becameFriendsOn = new Date();
    await usersCollection.updateOne(
        { _id: ObjectId(friendRequest.fromUserId) },
        { $push: { friends: { userId: new ObjectId(friendRequest.toUserId), createdAt: becameFriendsOn } } });
    await usersCollection.updateOne(
        { _id: ObjectId(friendRequest.toUserId) },
        { $push: { friends: { userId: new ObjectId(friendRequest.fromUserId), createdAt: becameFriendsOn } } });
    await friendRequestsCollection.updateOne({ _id: friendRequest._id }, { $set: { status: FriendRequestStatus.Accepted } });
    return res.status(201);
});

friendRequestsRouter.patch("/reject/:friendRequestId", async (req, res) => {
    const friendRequestsCollection = db.getInstance().collection("friend-requests");

    if (!req.user) {
        return res.status(404).send("NOT_LOGGED_IN");
    }

    const { friendRequestId } = req.params;
    const friendRequest = await friendRequestsCollection.findOne({ _id: ObjectId(friendRequestId) });

    await friendRequestsCollection.updateOne({ _id: friendRequest._id }, { $set: { status: FriendRequestStatus.Rejected } });
    return res.status(201);
});

module.exports = friendRequestsRouter;
