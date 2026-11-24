// Always show money with a Peso sign and two decimal places.
export const formatAmount = (amount) => `₱${amount.toFixed(2)}`;
