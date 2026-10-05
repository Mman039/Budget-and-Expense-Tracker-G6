// Keeping categories in one place makes icons and colors consistent everywhere.
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

// Finds a category by id and falls back to Other for unknown ids.
export function getCategory(categoryId) {
  return (
    categories.find((category) => category.id === categoryId) ||
    categories[categories.length - 1]
  );
}
