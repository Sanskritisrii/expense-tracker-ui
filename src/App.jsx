import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Expenses from "./pages/Expenses.jsx";
import ExpenseDetails from "./pages/ExpenseDetails.jsx";
import { currentUser } from "./data/store.js";

// Only logged-in users can open the inner pages
function Protected({ children }) {
  return currentUser() ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/expenses" element={<Protected><Expenses /></Protected>} />
      <Route path="/expenses/:id" element={<Protected><ExpenseDetails /></Protected>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
