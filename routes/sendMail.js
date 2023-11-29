const nodemailer = require("nodemailer");

export const sendMail = async(req, res) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'florencio.nikolaus12@ethereal.email',
            pass: 'Pq9u17NAr7JN1bjPrz'
        }
    });
    }

