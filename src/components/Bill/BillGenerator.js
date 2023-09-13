const BillGenerator = (user, billingData) => {
  console.log("user : ", user + "  billingData : ", billingData);
  return billingData.map((data) => {
    if (data) {
      return {
        userId: user.id,
        userName: user.displayName,
        product: user.macAddress,
        userAddress: user.address,
        email: user.email,
        phone: user.phone,
        username: user.username,
        Total: data.Total,
        amount: data.Amount,
        dueDate: "15 September 2023",
        period: data.month + " " + data.year,
        month: data.month,
        status: "Not paid",
      };
    } else {
      return null;
    }
  });
};

export default BillGenerator;
