export const getRoundedNum = (number: number, suffixNum: number) => {
  return number.toFixed(suffixNum).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};
