const models = require('../models');

const Chirp = models.Chirp;

const makerPage = (req, res) => {
    Chirp.ChirpModel.findByOwner(req.session.account._id, (err, docs) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ error: 'An error occurred' });
        }

        return res.render('app', { csrfToken: req.csrfToken(), chirps: docs });
    });
};

const makeChirp = (req, res) => {
    if (!req.body.chirp) {
        return res.status(400).json({ error: 'A chirp is required' });
    }

    const chirpData = {
        chirp: req.body.chirp,
        owner: req.session.account._id,
    };

    const newChirp = new Chirp.ChirpModel(chirpData);

    const chirpPromise = newChirp.save();

    chirpPromise.then(() => res.json({ redirect: '/maker' }));

    chirpPromise.catch((err) => {
        console.log(err);
        return res.status(400).json({ error: 'An error occurred' });
    });

    return chirpPromise;
};

module.exports.makerPage = makerPage;
module.exports.make = makeChirp;