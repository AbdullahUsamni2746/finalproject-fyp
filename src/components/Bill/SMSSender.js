// import { Twilio } from "twilio";

// const sendSMS = async (user, billData) => {
//   // Twilio Configuration
//   const twilioAccountSid = "your_twilio_account_sid";
//   const twilioAuthToken = "your_twilio_auth_token";
//   const twilioPhoneNumber = "your_twilio_phone_number";

//   try {
//     const twilioClient = new Twilio(twilioAccountSid, twilioAuthToken);
//     await twilioClient.messages.create({
//       body: `Hello ${user.displayName}, your bill amount is ${billData.Total}. Please pay before the due date.`,
//       from: twilioPhoneNumber,
//       to: user.phone,
//     });

//     console.log("Bill sent to user via SMS.");
//   } catch (error) {
//     console.error("Error sending bill via SMS:", error);
//   }
// };

// export default sendSMS;
