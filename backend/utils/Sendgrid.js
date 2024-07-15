const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('YOUR_ACTUAL_SENDGRID_API_KEY');

const sendOtpEmail = (recipientEmail, otp,res,next) => {
  const msg = {
    to: recipientEmail,
    from: 'your-email@example.com', // Use the email address or domain you verified with SendGrid
    subject: 'Your OTP Code',
    text: `Your OTP code is: ${otp}`,
    html: `<strong>Your OTP code is: ${otp}</strong>`,
  };

  sgMail
    .send(msg)
    .then(() => {
      return R(res, true, "OTP sent successfully! Please check your email", {},200)
    })
    .catch((error) => {
      return R(res, false, "Error sending OTP email", error,200)
    });
};

module.exports = sendOtpEmail

// Generate a random OTP (for demonstration purposes)
