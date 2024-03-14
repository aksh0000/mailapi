const express=require('express');
const app=express();
const cors=require('cors');
const nodemailer=require('nodemailer')
const bodyParser = require('body-parser')
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/',(req,res)=>{
    res.write("This shit is working fine!");
    res.end();
})
app.post('/api',(req,res)=>{
    
    let message_data=req.body;
    console.log(message_data);
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ruthlessdestroyer085@gmail.com', // Your email address
            pass: 'vhjh zzeo mkwr pqvp' // Your password
        }
    });
    
    // Define email options
    let mailOptions = {
        from: 'ruthlessdestroyer085@gmail.com', // Sender address
        to: 'ruthlessdestroyer085@gmail.com', // List of recipients
        subject: 'New JOB OFFER!!!', // Subject line
        text: 'NEW MESSAGE :'+req.body.message+"\n"+req.body.emailadress // Plain text body
        // You can also include HTML content as 'html' property
    };
    
    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error occurred: ', error);
        } else {
            console.log('Email sent successfully!');
            console.log('Message ID: ', info.messageId);
            res.status(200).json({data:message_data})
        }
    });


});

app.listen(8000);

