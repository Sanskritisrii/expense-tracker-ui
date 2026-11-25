import { users, initialExpenses } from "./mockData.js";

// A small stand-in for the backend. Data is kept in localStorage so that
// Save works between pages. In Component 3 these functions will call the API.

const EXPENSES_KEY = "et_expenses";
const USER_KEY = "et_userId";

function read(key) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage can be blocked, the app still works for this session */
  }
}

export function login(username, password) {
  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) return null;
  write(USER_KEY, user.userId);
  return user;
}

export function logout() {
  try {
    localStorage.removeItem(USER_KEY);
  } catch {
    /* ignore */
  }
}

export function currentUser() {
  const id = read(USER_KEY);
  return users.find((u) => u.userId === id) || null;
}

function allExpenses() {
  return read(EXPENSES_KEY) || initialExpenses;
}

export function getExpenses(userId) {
  return allExpenses().filter((e) => e.userId === userId);
}

export function getExpense(id) {
  return allExpenses().find((e) => e.id === Number(id)) || null;
}

export function saveExpense(expense) {
  const list = allExpenses();
  if (expense.id) {
    write(EXPENSES_KEY, list.map((e) => (e.id === expense.id ? expense : e)));
  } else {
    const id = Math.max(0, ...list.map((e) => e.id)) + 1;
    write(EXPENSES_KEY, [...list, { ...expense, id }]);
  }
}

export function totalOf(expense) {
  return expense.items.reduce((sum, item) => sum + Number(item.amount), 0);
}
