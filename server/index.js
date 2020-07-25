const express = require('express');
const morgan = require('morgan');

const PORT = 3000;

const app = express();

app.use(morgan('dev'));

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
