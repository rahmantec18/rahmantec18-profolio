const nodemailer = require("nodemailer");

// ==========================================
// Gmail Transport
// ==========================================

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.BREVO_LOGIN,
        pass: process.env.BREVO_SMTP_KEY
    }
});

transporter.verify((error, success) => {

    if (error) {
        console.log("SMTP ERROR:", error);
    } else {
        console.log("SMTP READY");
    }

});

// ==========================================
// Send Email to Admin
// ==========================================

exports.sendAdminEmail = async (data) => {

    const mailOptions = {

        from: `"PROFOLIO" <${process.env.BREVO_LOGIN}>`,

        to: process.env.ADMIN_EMAIL,

        subject: "📩 New Appointment Booking | PROFOLIO",

        html: `

        <h2>New Appointment Booking</h2>

        <table border="1" cellpadding="10" cellspacing="0">

            <tr>
                <td><b>Name</b></td>
                <td>${data.name}</td>
            </tr>

            <tr>
                <td><b>Email</b></td>
                <td>${data.email}</td>
            </tr>

            <tr>
                <td><b>Phone</b></td>
                <td>${data.phone}</td>
            </tr>

            <tr>
                <td><b>Company</b></td>
                <td>${data.company || "N/A"}</td>
            </tr>

            <tr>
                <td><b>Service</b></td>
                <td>${data.service}</td>
            </tr>

            <tr>
                <td><b>Budget</b></td>
                <td>${data.budget}</td>
            </tr>

            <tr>
                <td><b>Meeting Date</b></td>
                <td>${data.meetingDate}</td>
            </tr>

            <tr>
                <td><b>Meeting Time</b></td>
                <td>${data.meetingTime}</td>
            </tr>

            <tr>
                <td><b>Project Description</b></td>
                <td>${data.description}</td>
            </tr>

        </table>

        `

    };

    await transporter.sendMail(mailOptions);

};

// ==========================================
// Send Email to Customer
// ==========================================

exports.sendCustomerEmail = async (data) => {

    const mailOptions = {

        from: `"PROFOLIO" <${process.env.BREVO_LOGIN}>`,

        to: data.email,

        subject: "Thank You for Choosing Profolio",

        html: `

        <div style="font-family:Arial;padding:25px;line-height:1.8">

            <h2>Hello ${data.name},</h2>

            <p>

                Thank you for choosing <b>PROFOLIO</b>.

            </p>

            <p>

                We've successfully received your appointment request.

            </p>

            <p>

                Our team will review your request and contact you shortly.

            </p>

            <br>

            <p>

                Regards,<br>

                <b>Team PROFOLIO</b>

            </p>

        </div>

        `

    };

    await transporter.sendMail(mailOptions);

};