import express from "express";

const app = express();

app.get('/', function (req, res) {
    // res.send('<p>Hello World</p>')

    res.format({
        // 'text/plain': function () {
        //     res.send('<i>Hello World</i>')
        // }
        'application/json': function () {
            res.send({ 
                message: 'Hello Object JSON' 
            })
        }
    })
})

app.get('/contact', function (req, res) {
    res.send('<p>Halaman Contact</p>')
})

app.get('/about', function (req, res) {
    res.send('<p>Halaman About</p>')
})

app.get('/project', function (req, res) {
    res.send('<p>Halaman Project</p>')
})

app.get('/blog', function (req, res) {
    res.send('<p>Halaman Blog</p>')
})

app.listen(5000, function () {
    console.info("App is running in http://localhost:5000")
})