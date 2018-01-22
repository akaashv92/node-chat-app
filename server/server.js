const path = require('path');

const express = require('express');

const publicPath = path.join(__dirname,'../public');
const PORT = process.env.PORT || 3000;

var app = express();

app.use(express.static(publicPath));

// app.get('/', (req,res) => {
//   res.send()
// })

app.listen(PORT, () => {
  console.log('Server running on port 3000');
})
