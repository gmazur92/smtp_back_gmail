const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();

// ENV CONSTANTS
const PORT = process.env.PORT || 3010
const LOGIN = process.env.LOGIN || "fake-login"
const PASSWORD = process.env.PASSWORD || "fake-password"

// CORS
app.use(cors())

// BODY-PARSER
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// ROUTERS
app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/sendMessage', function (req, res) {
    console.log(req.body)
    const email = req.body.email
    const name = req.body.name
    const message = req.body.message
    console.log(`email: ${email}`, `name: ${name}`, `message: ${message}`)

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service: 'gmail',
        port: 465,
        secure: false,
        auth: {
        user: LOGIN,
            pass: PASSWORD
        },
        logger: true
    });

    let mailOptions = {
        from: email, // sender address
        to: 'georgiimazur@gmail.com',
        subject: 'Gmail Smtp NodeJs',
        html: `<div>
                    <h1>You have new message</h1>
                    <p>name: ${name}</p>
                    <p>email: ${email}</p>
                    <p>message: ${message}</p>
               </div> `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('error: ', error.message);
        }
        console.log('success');
    });
    res.send('email success')
});

// LISTEN APP
app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))