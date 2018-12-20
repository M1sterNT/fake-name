const express = require('express')
const app = express()
const port = (process.env.PORT || '3000');
const getFake = require('./controllers/v1/fake.controller');
const getFakeV2 = require('./controllers/v2/fake.controller');
const getFakeV3 = require('./controllers/v3/fake.controller');
const getInbox = require('./controllers/email.controller');

app.all('/', getFake)
app.all('/v2', getFakeV2)
app.all('/v3', getFakeV3)
app.all('/inbox/:email', getInbox)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
