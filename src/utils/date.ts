export const timeDifference = (setDate: Date): string => {
  const ONE_DAY_IN_MS = 86400000;

  const pad = (num: number): string => (num < 10 ? "0" : "") + num.toString();

  const pluralize = (setNumber: number) => (setNumber > 1 ? "s" : "");

  const now = new Date();
  const diff = now.getTime() - setDate.getTime();

  const days = Math.floor(Math.abs(diff) / ONE_DAY_IN_MS);

  const timeRemainder = Math.abs(diff) % ONE_DAY_IN_MS;

  const hours = Math.floor(timeRemainder / 36e5);
  const minutes = Math.floor(((timeRemainder % 36e5) * 60) / 6e4) % 60;
  const seconds = Math.floor((timeRemainder % (36e5 * 60)) / 1000) % 60;

  const sign = diff < 0 ? "-" : ""; // Just in case, but setDate should always be a past date

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
