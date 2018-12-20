const express = require('express')
const app = express()
const port = (process.env.PORT || '3000');
const getFake = require('./controllers/fake.controller');
const getInbox = require('./controllers/email.controller');

app.get('/', getFake)
app.get('/inbox/:email', getInbox)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
