const emailService = require("../services/emailService");

exports.bookAppointment = async (req, res) => {

    try {

        const {
            name,
            email,
            phone,
            company,
            service,
            budget,
            meetingDate,
            meetingTime,
            description
        } = req.body;

        // ===========================
        // Validation
        // ===========================

        if (
            !name ||
            !email ||
            !phone ||
            !service ||
            !budget ||
            !meetingDate ||
            !meetingTime ||
            !description
        ) {

            return res.status(400).json({
                success: false,
                message: "Please fill all required fields."
            });

        }

        // ===========================
        // Email to Admin
        // ===========================

        await emailService.sendAdminEmail({

            name,
            email,
            phone,
            company,
            service,
            budget,
            meetingDate,
            meetingTime,
            description

        });

        // ===========================
        // Confirmation Email
        // ===========================

        await emailService.sendCustomerEmail({

            name,
            email

        });

        return res.status(200).json({

            success: true,
            message: "Appointment booked successfully."

        });

    }

    catch (error) {

    console.error("BOOK APPOINTMENT ERROR:", error);

    return res.status(500).json({
        success: false,
        message: error.message
    });

}

};