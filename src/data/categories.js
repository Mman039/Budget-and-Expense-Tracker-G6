// This file keeps every spending category in one place.
// Putting the names, icons, and colors together makes the code easier to reuse and keep consistent.
export const categories = [
  { id: "food", name: "Food", icon: "fast-food-outline", color: "#F59E0B" },
  {
    id: "transport",
    name: "Transport",
    icon: "bus-outline",
    color: "#0EA5E9",
  },
  { id: "school", name: "School", icon: "school-outline", color: "#8B5CF6" },
  {
    id: "shopping",
    name: "Shopping",
    icon: "bag-handle-outline",
    color: "#EC4899",
  },
  { id: "bills", name: "Bills", icon: "receipt-outline", color: "#10B981" },
  {
    id: "other",
    name: "Other",
    icon: "ellipsis-horizontal-circle-outline",
    color: "#64748B",
  },
];

/**
 * Looks up a category by id.
 * If a value is missing or unknown, it falls back to the "Other" category.
 */
export function getCategory(categoryId) {
  return (
    categories.find((category) => category.id === categoryId) ||
    categories[categories.length - 1]
  );
} //this function takes a categoryId as an argument and searches the categories array for a matching category object. If it finds one, it returns that object. If it doesn't find a match, it returns the last category in the array, which is the "Other" category. This ensures that the function always returns a valid category object, even if the input is invalid or missing.
