const path = require('path');
const publicPath = path.join(__dirname, '../public');
const experss = require('express');

var app = experss();
const port = process.env.PORT || 3000;

app.use(experss.static(publicPath));


app.listen(port, () => {
    console.log('Server is up on port: ', port)
});

