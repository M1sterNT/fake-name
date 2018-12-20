const express = require('express')
const app = express()
const port = 3000
const getFake = require('./controllers/fake.controller');
app.get('/', getFake)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

