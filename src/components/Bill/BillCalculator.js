const BillCalculator = (data) => {
  const billingRate = 0.025;
  return data.map((item) => ({
    ...item,
    Amount: item.Total * billingRate,
  }));
};

export default BillCalculator;
