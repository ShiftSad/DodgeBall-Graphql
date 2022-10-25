import mongoose, { Schema } from "mongoose";

const UserGamesSchema = new mongoose.Schema({
    kills: {
        type: Number,
        default: 0
    },
    deaths: {
        type: Number,
        default: 0
    },
    money: {
        type: Number,
        default: 0
    },
    game: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "game"
    }
});

const UserGames = mongoose.model("userGames", UserGamesSchema);
module.exports = UserGames;
