const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let ChirpModel = {};

const convertId = mongoose.Types.ObjectId;
const setChirp = (chirp) => _.escape(chirp).trim();

const ChirpSchema = new mongoose.Schema({
    chirp: {
        type: String,
        required: true,
        trim: true,
        set: setChirp,
    },

    owner: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Account',
    },

    createdData: {
        type: Date,
        default: Date.now,
    },
});

ChirpSchema.statics.toAPI = (doc) => ({
    chirp: doc.chirp,
});

ChirpSchema.statics.findByOwner = (ownerId, callback) => {
    const search = {
        owner: convertId(ownerId),
    };

    return ChirpModel.find(search).select('chirp').lean().exec(callback);
};

ChirpModel = mongoose.model('Chirp', ChirpSchema);

module.exports.ChirpModel = ChirpModel;
module.exports.ChirpSchema = ChirpSchema;