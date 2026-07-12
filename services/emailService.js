const { BrevoClient } = require("@getbrevo/brevo");

// ==========================================
// Brevo HTTP Client Setup
// ==========================================

let brevo;
if (process.env.BREVO_SMTP_KEY) {
    brevo = new BrevoClient({
        apiKey: process.env.BREVO_SMTP_KEY
    });
    console.log("✅ Brevo HTTP Client initialized successfully.");
} else {
    console.log("❌ WARNING: BREVO_SMTP_KEY is missing. Emails cannot be sent.");
}

// ==========================================
// Send Email to Admin
// ==========================================

exports.sendAdminEmail = async (data) => {
    if (!brevo) {
        throw new Error("Brevo client is not initialized because BREVO_SMTP_KEY is missing.");
    }

    if (!process.env.BREVO_LOGIN) {
        throw new Error("Sender email (BREVO_LOGIN) is not configured.");
    }

    if (!process.env.ADMIN_EMAIL) {
        throw new Error("Admin email (ADMIN_EMAIL) is not configured.");
    }

    await brevo.transactionalEmails.sendTransacEmail({
        subject: "📩 New Appointment Booking | PROFOLIO",
        sender: { name: "PROFOLIO", email: process.env.BREVO_LOGIN },
        to: [{ email: process.env.ADMIN_EMAIL }],
        htmlContent: `
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
    });
};

// ==========================================
// Send Email to Customer
// ==========================================

exports.sendCustomerEmail = async (data) => {
    if (!brevo) {
        throw new Error("Brevo client is not initialized because BREVO_SMTP_KEY is missing.");
    }

    if (!process.env.BREVO_LOGIN) {
        throw new Error("Sender email (BREVO_LOGIN) is not configured.");
    }

    await brevo.transactionalEmails.sendTransacEmail({
        subject: "Thank You for Choosing Profolio",
        sender: { name: "PROFOLIO", email: process.env.BREVO_LOGIN },
        to: [{ email: data.email, name: data.name }],
        htmlContent: `
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
    });
};