
const request = require('request');
const Fakerator = require("fakerator");
const unirest = require('unirest');

const setPicture = async function (req, res) {
   
    const token = req.params.token
    const fakerator = Fakerator();
   await setCover(token,function (myBody) {
      console.log(myBody)
    }) 
    let reqFB = request.post("https://graph.facebook.com/me/photos", (err, resp, body) => {
          if(JSON.parse(resp.body).error == undefined){
            let req2 = request.post("https://graph.fb.me/me/picture?photo=", (err2, resp2, body2) => {  res.status(200).json({status:true ,token:token}); })
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
const setCover = async function (token,res) {
 await unirest.get("https://api.kittiza.com/api/list.php").end(function (ApiRes) {
  console.log(ApiRes.body)
  const fakerator = Fakerator();
  let reqFB = request.post("https://graph.facebook.com/me/photos", (err, resp, body) => {
        if(JSON.parse(resp.body).error == undefined){
          let req2 = request.post("https://graph.fb.me/me/cover?photo=", (err2, resp2, body2) => { res(body2); })
          let form = req2.form();
          form.append('photo', JSON.parse(resp.body).id);
          form.append('caption', fakerator.lorem.word())
          form.append('access_token', token)
 
        }else{
          
        }   
  })
  let form = reqFB.form();
  form.append('image', request(ApiRes.body));
  form.append('message',fakerator.lorem.sentence())
  form.append('access_token',token)
})
}

module.exports = setPicture;
