// Keeps currency formatting consistent across every expense display.
export const formatAmount = (amount) => `₱${amount.toFixed(2)}`;
//P${amount.toFixed(2)} makes it so that it rounds up to 2 decimal places and add the Peso sign in front of the amount.
