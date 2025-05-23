var express = require('express');
var cors = require('cors');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// Add multer for file upload handling
const multer = require('multer');
const upload = multer();

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Add file upload endpoint
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  if (!req.file) {
    return res.json({ error: 'Please upload a file' });
  }
  
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
