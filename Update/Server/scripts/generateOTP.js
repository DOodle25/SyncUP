const crypto=require("crypto");
const Otp=require("../model/Otp.model")

function generateSixDigitCode(destination) {
    const randomNumber = crypto.randomInt(0, 1000000);
    const sixDigitCode = String(randomNumber).padStart(6, '0');
    saveCodeToDb(sixDigitCode,destination)
    return sixDigitCode;
}

function saveCodeToDb(code,destination)
{
    const newEntry=new Otp({code:String(code),destination:destination});
    newEntry.save().then(()=>
    {
        console.log("otp saved on db");
    }).catch(()=>
    {
        console.log("otp not saved in db");
    })
}

module.exports=generateSixDigitCode;