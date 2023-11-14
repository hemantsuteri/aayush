const nodemailer = require("nodemailer");

export const sendMail = async(req, res) => {
    // let testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'florencio.nikolaus12@ethereal.email',
            pass: 'Pq9u17NAr7JN1bjPrz'
        }
    });

    const info = await transporter.sendMail({
        from: '"user" <sharma2000subodh@gmail.com>', // sender address
        to: "hemantsuteri@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });
      res.send(info);
    }


// async..await is not allowed in global scope, must use a wrapper
// async function main() {
    // send mail with defined transport object

  
    // console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    //
    // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
    //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
    //       <https://github.com/forwardemail/preview-email>
    //
    
//   }
  
//   main().catch(console.error);

