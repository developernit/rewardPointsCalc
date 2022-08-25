import { totalAmount, convertMonths, getTransactionData } from "./utils";

describe("totalAmount", () => {
  it("should return the total amount of all transactions", () => {
    const transactions = [
      {
        transactionDate: 1614588800,
        purchases: [
          {
            price: 10,
            quantity: 1,
          },
          {
            price: 20,
            quantity: 1,
          },
        ],
      },
      {
        transactionDate: 1614588800,
        purchases: [
          {
            price: 30,
            quantity: 1,
          },
          {
            price: 40,
            quantity: 1,
          },
        ],
      },
    ];
    expect(totalAmount(transactions)).toBe(100);
  });
});

describe("convertMonths", () => {
  it("should return the correct month", () => {
    expect(convertMonths(1)).toBe("January");
    expect(convertMonths(2)).toBe("February");
    expect(convertMonths(3)).toBe("March");
  });
});

describe("getTransactionData", () => {
  it("should return the correct data", () => {
    const result = getTransactionData(1);
    expect(result.monthName).toBe("January");
    expect(result.spent).toBe("563.91");
    expect(result.points).toBe(977);
    expect(result.totalPoints).toBe(8773);
    expect(result.purchases.length).toBe(5);
  });
});
