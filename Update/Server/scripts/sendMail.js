const nodemailer=require("nodemailer");
const generateSixDigitCode=require("./generateOTP");
require('dotenv').config();
const transporter = nodemailer.createTransport({
  service:"gmail",
  secure:true,
  port: 465,
  auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
  }
});

async function sendMail(clientEmail)
{
    const OTP=generateSixDigitCode(clientEmail);
    let mailOptions = {
        from: `Slack ${process.env.EMAIL_USER}`,
        to: clientEmail,
        subject:"Email Verification - NotASlack",
        text: `${OTP} is your One Time Password for Slack`,
      };
    // transporter.sendMail(mailOptions,(err,info)=>
    // {
    //     if(err)
    //     {
    //         console.log(err);
    //         return -1;
    //     }
    //     console.log("mail sent"+info.messageId);
    //     return 1;
    // });
    const mailSender=async () => {
        return new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                console.log("Mail sent: " + info.messageId);
                resolve(info);
            });
        });
    };

    await mailSender();
    return 0;
}

module.exports=sendMail;