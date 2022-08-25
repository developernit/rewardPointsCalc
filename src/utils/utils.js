import { rewardData } from "../data/rewardData";

/**
 *
 * @param array - array of transactions as a parameter
 * @returns  the sum of all transactions made by the customer
 */
export const totalAmount = (array) => {
  let total = 0;

  for (const t of array) {
    for (const p of t.purchases) {
      total += p.price * p.quantity;
    }
  }
  return total;
};

/**
 *
 * @param amount - the amount for each transaction to calculate the points
 * @returns  the points calculated for the customer
 */
const rewardCalculator = (amount) =>
  Math.floor(Math.max(0, amount - 50) + Math.max(0, amount - 100));

const months = ["January", "February", "March"];

/**
 *
 * @param monthNum - the month number to convert to a string
 * @returns returns the month from the month number
 */
export const convertMonths = (monthNum) => months[monthNum - 1];

/**
 *
 * @param  selectedMonth - the month to calculate the points for
 * @returns the points earned for the selected month
 */
export const getTransactionData = (selectedMonth) => {
  const transactionsFilteredByMonth = rewardData.filter(
    (t) => new Date(t.transactionDate * 1000).getMonth() + 1 === selectedMonth
  );
  const spent = totalAmount(transactionsFilteredByMonth).toFixed(2);
  return {
    purchases: transactionsFilteredByMonth
      .flatMap((t) => t.purchases.map((p) => ({ ...t, ...p })))
      .sort((a, b) => a.transactionDate - b.transactionDate),
    spent,
    points: rewardCalculator(spent),
    totalPoints: rewardCalculator(totalAmount(rewardData)),
    monthName: convertMonths(selectedMonth),
  };
};
