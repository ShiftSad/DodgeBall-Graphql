import mongoose, { Schema } from "mongoose";

const GameSchema = new mongoose.Schema({
    matchId: {
        type: String,
        required: true,
    },
    blueTeam: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user"
    }],
    redTeam: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user"
    }],
    teamWinner: {
        type: String,
        required: true,
    },
    matchTime: {
        type: Number,
        default: 0
    }
});

const Game = mongoose.model("game", GameSchema);
module.exports = Game;
