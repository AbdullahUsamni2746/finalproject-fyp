import emailjs from "@emailjs/browser";

const sendEmail = async (user) => {
  // EmailJS Configuration
  const emailJSUserId = "odhgHYDVkndvIaatG";

  const emailJSTemplateId = "template_4z6giv5";
  const emailJSServiceId = "service_t8o76qz";

  try {
    await emailjs.send(
      emailJSServiceId,
      emailJSTemplateId,
      {
        to_name: user.userName,
        user_email: "afaaaek@gmail.com",
        reply_to: "abdullah.usmani.2746@gmail.com",

        // Add more placeholders as needed for email template data
        // bill_amount: billData.amount,
      },
      emailJSUserId
    );

    console.log("Bill sent to user via email.");
  } catch (error) {
    console.error("Error sending bill via email:", error);
  }
};

export default sendEmail;
