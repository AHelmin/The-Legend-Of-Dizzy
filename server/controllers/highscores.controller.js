const Highscores = require("../models/Highscores");



async function getAllHighscores() {
    try {
        return await Highscores.find({});
    } catch (err) {
        console.log(err.message)
        throw new Error(err)
    }
}


async function getHighscoresById(id) {
    try {
        return await Highscores.findById(id);
    } catch (err) {
        console.log(err.message)
        throw new Error(err)
    }
}


async function createHighscores(data) {
    const highscoresData = data
    try {
        return await Highscores.create(highscoresData);
    } catch (err) {
        console.log(err.message)
        throw new Error(err)
    }
}


async function updateHighscoresById(id, data) {
    try {
        return await Highscores.findByIdAndUpdate(id, data, { new: true });
    } catch (err) {
        console.log(err.message)
        throw new Error(err)
    }
}


async function deleteHighscoresById(id) {
    try {
        return await Highscores.findByIdAndDelete(id);
    } catch (err) {
        console.log(err.message)
        throw new Error(err)
    }
}

module.exports = {
    getAllHighscores,
    getHighscoresById,
    createHighscores,
    updateHighscoresById,
    deleteHighscoresById,
}