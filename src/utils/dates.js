export function formatExpenseDate(date, today) {
  if (date === today) return "Today";
  const [year, month, day] = date.split("-");
  return `${month}/${day}/${year}`;
}

export function getLocalDate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getStartOfWeek(date = new Date()) {
  const start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
  return getLocalDate(start);
}

export function getLastSevenDays(date = new Date()) {
  return Array.from({ length: 7 }, (_, index) => {
    const day = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    day.setDate(day.getDate() - (6 - index));
    return getLocalDate(day);
  });
}
