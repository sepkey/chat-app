import dayjs from "dayjs";

export const formatDateTime = (date: string): string => {
  const now = dayjs();
  const messageDate = dayjs(date);

  if (now.diff(messageDate, "minute") < 1) return "just now";
  if (now.diff(messageDate, "hour") < 1)
    return `${now.diff(messageDate, "minute")} minutes ago`;
  if (now.diff(messageDate, "day") < 1) return messageDate.format("hh:mm A");
  if (now.diff(messageDate, "year") < 1)
    return messageDate.format("MMM DD hh:mm A");

  return messageDate.format("DDD MM YYYY hh:mm A");
};
