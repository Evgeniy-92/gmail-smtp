const express = require('express')
const nodemailer = require("nodemailer");
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
let port = process.env.PORT || 3010
let smtp_login = process.env.SMTP_LOGIN
let smtp_password = process.env.SMTP_PASSWORD

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: smtp_login,
        pass: smtp_password,
    },
});

app.get('/', async (req, res) => {
    res.send('Hello World!')
})
app.post('/sendMessage', async (req, res) => {
    const {name, email, message} = req.body
    let info = await transporter.sendMail({
        from: 'HR WANTS ME',
        to: "ev.drozd.2020@gmail.com",
        subject: "HR WANTS ME",
        html: `<b>Сообщение с моего portfolio page</b>
            <div>
                name: ${name}
            </div>
            <div>
                email: ${email}
            </div>
            <div>
                message: ${message}
            </div>`,
    });
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


