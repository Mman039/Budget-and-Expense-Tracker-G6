// Keeps currency formatting consistent across every expense display.
export const formatAmount = (amount: number) => `₱${amount.toFixed(2)}`;