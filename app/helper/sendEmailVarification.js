const transporter = require("../config/emailConfig")


function generateRandomPassword(length = 12) {
    // Define the characters available for the password
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialCharacters = '!@#$%^&*()_-+=<>?';

    // Combine all characters into one string
    const allCharacters = uppercase + lowercase + numbers + specialCharacters;

    // Initialize the password variable
    let password = '';

    // Loop to generate the password
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allCharacters.length);
        password += allCharacters[randomIndex];
    }

    return password;
}
const sendEmailVerification = async (user, password) => {
    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: user.email,
        subject: "Password - Verify your account",
        html: `<p>Dear ${user.name},</p><p>Thank you for signing up with our website. Here is your password to login to your account.</p>
            <h2>Password: ${password}</h2>
            `
    })

    return password
}

module.exports={sendEmailVerification, generateRandomPassword}