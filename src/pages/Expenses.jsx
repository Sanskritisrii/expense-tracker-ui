import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import Icon from "../components/Icon.jsx";
import { currentUser, getExpenses, totalOf } from "../data/store.js";
import { categoryStyle } from "../data/mockData.js";

const rupees = (n) => "₹ " + Number(n).toLocaleString("en-IN");
const prettyDate = (iso) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function Expenses() {
  const navigate = useNavigate();
  const user = currentUser();
  const expenses = getExpenses(user.userId)
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const total = expenses.reduce((sum, e) => sum + totalOf(e), 0);

  // The category that appears in most expenses
  const counts = {};
  expenses.forEach((e) => e.categories.forEach((c) => (counts[c] = (counts[c] || 0) + 1)));
  const topCategory = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0] || "-";

  return (
    <>
      <Header />
      <div className="page">
        <section className="stats">
          <div className="stat" style={{ background: "linear-gradient(135deg,#0f766e,#14b8a6)" }}>
            <small>Total spent</small><b>{rupees(total)}</b>
          </div>
          <div className="stat" style={{ background: "linear-gradient(135deg,#1d4ed8,#60a5fa)" }}>
            <small>Expenses added</small><b>{expenses.length}</b>
          </div>
          <div className="stat" style={{ background: "linear-gradient(135deg,#ea580c,#fb923c)" }}>
            <small>Top category</small><b>{topCategory}</b>
          </div>
        </section>

        <div className="title-row">
          <h1>My Expenses</h1>
          <button className="btn amber" onClick={() => navigate("/expenses/new")}>+ Add New Expense</button>
        </div>

        {expenses.length === 0 && <p className="muted">No expenses yet. Click "Add New Expense" to add your first one.</p>}

        {expenses.map((e) => {
          const main = e.categories[0];
          const style = categoryStyle[main] || { color: "#6b7280", bg: "#f3f4f6" };
          return (
            <button key={e.id} className="row" onClick={() => navigate(`/expenses/${e.id}`)}>
              <div className="circle" style={{ background: style.color, width: 44, height: 44 }}>
                <Icon name={main ? main.toLowerCase() : "coin"} size={22} />
              </div>
              <div className="row-title">
                <b>{e.title}</b>
                <div>
                  {e.categories.map((c) => (
                    <span key={c} className="chip" style={{ background: categoryStyle[c].bg, color: categoryStyle[c].color }}>{c}</span>
                  ))}
                </div>
              </div>
              <div className="row-date">{prettyDate(e.date)}</div>
              <div className="row-amount">{rupees(totalOf(e))}</div>
              <Icon name="chevron" color="#9ca3af" size={20} />
            </button>
          );
        })}
      </div>
    </>
  );
}
