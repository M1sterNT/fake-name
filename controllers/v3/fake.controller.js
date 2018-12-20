const Fakerator = require("fakerator");

const getFake = function (req, res) {
    const fakerator = Fakerator();
    let parameter = {
        firstName:fakerator.names.firstName(),
        lasttName:fakerator.names.lastName(),
        email:fakerator.internet.email(),
        avatar:fakerator.internet.avatar()	
    }
    res.status(200).json(parameter);
}

module.exports = getFake;