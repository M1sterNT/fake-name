const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const axios = require('axios');


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
        password:password
    } 
   
  //  console.log(dom.window.document.getElementsByClassName('dl-horizontal')[9].querySelector("dd").textContent);
    return parameter
}
module.exports = getFake;