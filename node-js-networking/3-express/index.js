const express = require('express');
const router = require('./routes');
const bodyParser = require('./midlewares/bodyParser');
const auth = require('./midlewares/auth');

const app = express();

//app.use(auth);
app.use(bodyParser);
app.use(router);

app.listen(8080, () => console.log('listening'));