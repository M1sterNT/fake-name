const Fakerator = require("fakerator");

const getFake = function (req, res) {
    const fakerator = Fakerator();
    let parameter = {
        firstName:fakerator.names.firstName(),
        lasttName:fakerator.names.lastName()
    }
    res.status(200).json(parameter);
}

module.exports = getFake;