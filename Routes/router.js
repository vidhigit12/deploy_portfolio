const express = require("express");
const router = new express.Router();
const users = require("../models/userSchema");
const nodemailer = require("nodemailer");

// email config
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    }
});

// Register user details
router.post("/register", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email) {
        return res.status(400).json({ status: 400, error: "All inputs are required" });
    }

    try {
        const preuser = await users.findOne({ email: email });

        // Check if user exists, else create a new one
        if (preuser) {
            const userMessage = await preuser.Messagesave(message);
            console.log(userMessage);
        } else {
            const finalUser = new users({
                name,
                email,
                messages: [{ message }]
            });

            await finalUser.save();
        }

        // Send the email after storing the message
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Response Submission",
            text: "Your response has been submitted successfully."
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
        
        return res.status(201).json({ status: 201, message: "Email sent successfully" });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ status: 500, error: "Something went wrong" });
    }
});

module.exports = router;
