const Fakerator = require("fakerator");

const getFake = function (req, res) {
    let data = await getData();
    const fakerator = Fakerator();
    let firstName = fakerator.names.firstName()
    let lastName = fakerator.names.lastName()
    let parameter = {
        firstName:data.firstName,
        lastName:data.lastName,
        email:fakerator.internet.email(firstName,lastName   ),
        password:fakerator.internet.password(10),
        ip:fakerator.internet.ip(),
        mac:fakerator.internet.mac(),
        avatar:fakerator.internet.avatar()	
    }
    res.status(200).json(parameter);
}
async function getData() {
    let instance = axios.create({ baseURL: 'https://www.fakenamegenerator.com' });
    let result = await instance.get('/gen-male-th-uk.php');
    const dom = new JSDOM(result.data);
    let name = dom.window.document.getElementsByClassName('address')[0].querySelector("h3").textContent.split(" ")
    let password = dom.window.document.getElementsByClassName('dl-horizontal')[9].querySelector("dd").textContent
    let parameter ={
        firstName:name[0],
        lastName:name[1],
        password:password
        //email: await getEmail()
    } 
  //  console.log(dom.window.document.getElementsByClassName('dl-horizontal')[9].querySelector("dd").textContent);
    return parameter
}
module.exports = getFake;