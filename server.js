const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

app.use(cors());

app.use(bodyParser.json())

const apiDirectoryPath = path.join(__dirname, 'api');
const apiFileNames = fs.readdirSync(apiDirectoryPath);

apiFileNames.forEach((fileName) => {
  const filePath = path.join(apiDirectoryPath, fileName);
  const routePath = '/' + fileName.replace('.js', '');
  const router = require(filePath);
  app.use(routePath, router);
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
