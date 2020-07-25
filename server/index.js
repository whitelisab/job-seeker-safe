const express = require('express');
const morgan = require('morgan');
const path = require('path');

const PORT = 3000;

const app = express();

app.use(morgan('dev'));
app.use('/static', express.static(path.join(__dirname, '../client/dist')));

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
