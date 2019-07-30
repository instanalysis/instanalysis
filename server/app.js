require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const errorHandler = require('./middlewares/errorhandler');

app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

app.post('/', (req, res, next) => {
	console.log(req.body)
	res.end()
});
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));