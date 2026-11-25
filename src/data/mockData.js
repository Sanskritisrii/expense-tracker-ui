// Temporary data for Component 2 (UI only).
// In Component 3 these three things become database collections.

export const users = [
  // The real app will store a hashed password in the database
  { userId: 1, username: "demo_user", password: "demo123", name: "Demo User" },
];

// Category -> its sub categories
export const categoryMap = {
  Food: ["Groceries", "Eating out", "Chai and snacks"],
  Travel: ["Auto fare", "Bus", "Train"],
  Study: ["Books", "Tuition", "Stationery"],
  Bills: ["Mobile recharge", "Electricity", "Internet"],
};

export const categoryStyle = {
  Food: { color: "#f97316", bg: "#ffedd5" },
  Travel: { color: "#2563eb", bg: "#dbeafe" },
  Study: { color: "#7c3aed", bg: "#ede9fe" },
  Bills: { color: "#db2777", bg: "#fce7f3" },
};

export const paymentModes = ["UPI", "Cash", "Debit card", "Credit card", "Net banking"];

export const initialExpenses = [
  { id: 1, userId: 1, title: "Weekly groceries", date: "2026-11-20", paymentMode: "UPI",
    categories: ["Food"], subCategories: ["Groceries"],
    items: [{ name: "Rice (5 kg)", amount: 450, quantity: 1 }, { name: "Vegetables", amount: 220, quantity: 2 }] },
  { id: 2, userId: 1, title: "Auto fare to college", date: "2026-11-19", paymentMode: "Cash",
    categories: ["Travel"], subCategories: ["Auto fare"],
    items: [{ name: "Auto (both ways)", amount: 80, quantity: 2 }] },
  { id: 3, userId: 1, title: "Mobile recharge", date: "2026-11-15", paymentMode: "UPI",
    categories: ["Bills"], subCategories: ["Mobile recharge"],
    items: [{ name: "28 day plan", amount: 299, quantity: 1 }] },
  { id: 4, userId: 1, title: "Notebook and pens", date: "2026-11-12", paymentMode: "Cash",
    categories: ["Study"], subCategories: ["Stationery"],
    items: [{ name: "Notebook", amount: 95, quantity: 1 }, { name: "Pens (pack of 5)", amount: 50, quantity: 1 }] },
  { id: 5, userId: 1, title: "Chai and snacks", date: "2026-11-10", paymentMode: "Cash",
    categories: ["Food"], subCategories: ["Chai and snacks"],
    items: [{ name: "Chai", amount: 40, quantity: 2 }, { name: "Samosa", amount: 20, quantity: 1 }] },
];
