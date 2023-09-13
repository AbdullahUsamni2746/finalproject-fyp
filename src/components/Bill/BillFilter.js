const BillFilter = (deviceName, dataArray) => {
  return dataArray.filter(
    (item) => item.Total !== null && item.device === deviceName
  );
};

export default BillFilter;
