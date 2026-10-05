// Keeps money formatting consistent across the whole app.
// The helper ensures every displayed value uses the same Peso symbol and two decimal places.
export const formatAmount = (amount) => `₱${amount.toFixed(2)}`;
