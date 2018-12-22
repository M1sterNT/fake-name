
const request = require('request');
const Fakerator = require("fakerator");


const setPicture = function (req, res) {
    const token = req.params.token
    const fakerator = Fakerator();
    let reqFB = request.post("https://graph.facebook.com/me/photos", (err, resp, body) => {
          if(JSON.parse(resp.body).error == undefined){
            let req2 = request.post("https://graph.fb.me/me/picture?photo=", (err2, resp2, body2) => { res.status(200).json({status:true}); })
            let form = req2.form();
            form.append('photo', JSON.parse(resp.body).id);
            form.append('caption', fakerator.lorem.word())
        form.append('access_token', token)
          }else{
            res.status(200).json({status:false});
          }   
    })
    let form = reqFB.form();
    form.append('image', request(fakerator.internet.avatar()));
    form.append('message',fakerator.lorem.sentence())
    form.append('access_token',token)
}

module.exports = setPicture;
