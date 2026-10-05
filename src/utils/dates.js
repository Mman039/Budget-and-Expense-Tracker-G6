// This helper converts ISO dates into the short labels shown in the transactions list.
// It keeps date formatting consistent and makes the prototype easier to read.
export function formatExpenseDate(date, today) {
  if (date === today) return "Today";
  const [year, month, day] = date.split("-");
  return `${month}/${day}/${year}`;
}
