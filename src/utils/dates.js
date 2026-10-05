// Turns an ISO date into the short date label shown in transaction rows.
export function formatExpenseDate(date, today) {
  if (date === today) return "Today";
  const [year, month, day] = date.split("-");
  return `${month}/${day}/${year}`;
}
