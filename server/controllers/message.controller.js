const Message = require("../models/Message");

async function getAllMessage() {
    try {
        return await Message.find({});
    } catch (err) {
        console.log(err.message)
        throw new Error(err)
    }
}


async function getMessageById(id) {
    try {
        return await Message.findById(id);
    } catch (err) {
        console.log(err.message)
        throw new Error(err)
    }
}


async function createMessage(data) {
    const messageData = data
    try {
        return await Message.create(messageData);
    } catch (err) {
        console.log(err.message)
        throw new Error(err)
    }
}


async function updateMessageById(id, data) {
    try {
        return await Message.findByIdAndUpdate(id, data, { new: true });
    } catch (err) {
        console.log(err.message)
        throw new Error(err)
    }
}


async function deleteMessageById(id) {
    try {
        return await Message.findByIdAndDelete(id);
    } catch (err) {
        console.log(err.message)
        throw new Error(err)
    }
}

module.exports = {
    getAllMessage,
    getMessageById,
    createMessage,
    updateMessageById,
    deleteMessageById,
}