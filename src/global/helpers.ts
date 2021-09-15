import moment from "moment";

export function formatTime(time: string) {
  return moment(time).format("DD-MMM-YYYY");
}

export function currencyFormat(value: number) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "SGD",
  }).format(value);
}

export function amort(balance: number, interestRate: number, terms: number) {
  //Calculate the interest percent
  const interestPercent = interestRate / 100;

  //Calculate the per month interest rate
  const monthlyRate = interestPercent / 12;

  //Calculate the payment
  const payment =
    balance * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -terms)));

  return payment;
}
