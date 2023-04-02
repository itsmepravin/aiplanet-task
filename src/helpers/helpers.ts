export const getDate = (dateArray: string[]) => {
  const day = dateArray![2];
  const month = dateArray![1];
  const year = dateArray![0];

  const dateObj = new Date(+year, +month - 1, +day);

  const readableMonth = dateObj.toString().split(" ")[1];
  const readableYear = dateObj.toString().split(" ")[3];

  return { day, readableMonth, readableYear };
};

export const handleDaysAgo = (value: string) => {
  var date1 = new Date(value);
  var date2 = new Date();
  //@ts-ignore
  var diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24), 10);
  return diffDays;
};
