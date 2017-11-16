const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname+'/dist'));
app.listen(process.env.PORT || 8081);


app.get('/*',function (req, res) {
    res.sendFile(path.join(__dirname+'/dist/index.html'));
    console.log(__dirname+'/dist/index.html');
});

console.log("Angular Tour Of Heroes Running on PORT : "+ (process.env.PORT || 8081) );