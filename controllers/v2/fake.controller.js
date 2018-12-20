const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const axios = require('axios');


const getFake = async function (req, res) {
    let data = await getData();
  
    res.status(200).json(data);
}
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
async function getData() {
    let size = 1300
    let instance = axios.create({ baseURL: 'https://konrakpa.fun' });
    let ListFnameresult = await instance.get('/fname.json');
    let ListLnameresult = await instance.get('/lname.json');
    let parameter ={
        firstName:ListFnameresult.data[getRandomInt(size)],
        lastName:ListLnameresult.data[getRandomInt(size)]
    } 
  //  console.log(dom.window.document.getElementsByClassName('dl-horizontal')[9].querySelector("dd").textContent);
    return parameter
}

module.exports = getFake;