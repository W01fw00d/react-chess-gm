export const timeDifference = (setDate: Date): string => {
  /*
  This would be an important function to unit test.

  Althought, in a real world scenario,
  we would use a js library for Date manipulations,
  instead of this custom implementation.
  */
  const ONE_DAY_IN_MS = 86400000;

  const pad = (num: number): string => (num < 10 ? "0" : "") + num.toString();

  const pluralize = (setNumber: number) => (setNumber > 1 ? "s" : "");

  const now = new Date();
  const diff = now.getTime() - setDate.getTime();

  const days = Math.floor(Math.abs(diff) / ONE_DAY_IN_MS);

  const timeRemainder = Math.abs(diff) % ONE_DAY_IN_MS;

  const seconds = Math.floor((timeRemainder / 1000) % 60);
  const minutes = Math.floor((timeRemainder / (1000 * 60)) % 60);
  const hours = Math.floor((timeRemainder / (1000 * 60 * 60)) % 24);

  // Just in case, but `setDate` should always be a past date, so `diff` should not be a negative number
  const sign = diff < 0 ? "-" : "";

  const daysToString = () =>
    `${sign}${days} day${pluralize(days)} ${
      hours > 0 ? `${hours} hour${pluralize(hours)} ` : ""
    } ago`;

  const hoursToString = () =>
    `${sign}${pad(hours)}:${pad(minutes)}:${pad(seconds)} hour${pluralize(
      hours
    )} ago`;

  return (days > 0 ? daysToString : hoursToString)();
};
