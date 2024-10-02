const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, subject, message } = req.body;

        // Set up Nodemailer transporter
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL, // Use Vercel environment variables
                pass: process.env.EMAIL_PASS
            }
        });

        // Set up email options
        let mailOptions = {
            from: email,
            to: process.env.EMAIL, 
            subject: `Contact Form Submission: ${subject}`,
            text: `You have received a new message from ${name}. \n\n Email: ${email} \n Subject: ${subject} \n Message: \n ${message}`
        };

        try {
            await transporter.sendMail(mailOptions);
            return res.status(200).json({ message: 'Message sent successfully!' });
        } catch (error) {
            return res.status(500).json({ error: 'Error sending email: ' + error });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
