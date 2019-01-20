const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const axios = require('axios');
const Fakerator = require("fakerator");

const getFake = async function (req, res) {

    let data = await getData();
    res.status(200).json(data);
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
        password:password,
        email: await getEmail()
    } 
  //  console.log(dom.window.document.getElementsByClassName('dl-horizontal')[9].querySelector("dd").textContent);
    return parameter
}
async function getEmail() {
    const fakerator = Fakerator();
    let firstName = fakerator.names.firstName()
    let lastName = fakerator.names.lastName()
    let instance = axios.create({ baseURL: 'https://generator.email' });
    let result = await instance.get('/index.php');
    const dom = new JSDOM(result.data);
   // let userName  = dom.window.document.getElementById("userName").value
    let domainName = dom.window.document.getElementById("domainName2").value
    let temp = fakerator.internet.email(firstName,lastName,domainName)
   // console.log(temp)
   // let email = userName + "@"+ domainName
   return temp
}
module.exports = getFake;