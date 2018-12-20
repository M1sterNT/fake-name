const Fakerator = require("fakerator");

const getFake = function (req, res) {
    const fakerator = Fakerator();
    let firstName = fakerator.names.firstName()
    let lastName = fakerator.names.lastName()
    let parameter = {
        firstName:firstName,
        lastName:lastName,
        email:fakerator.internet.email(firstName,lastName   ),
        password:fakerator.internet.password(10),
        ip:fakerator.internet.ip(),
        mac:fakerator.internet.mac(),
        avatar:fakerator.internet.avatar()	
    }
    res.status(200).json(parameter);
}

module.exports = getFake;