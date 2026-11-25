import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Select from "react-select";
import Header from "../components/Header.jsx";
import Icon from "../components/Icon.jsx";
import ItemPopup from "../components/ItemPopup.jsx";
import { currentUser, getExpense, saveExpense } from "../data/store.js";
import { categoryMap, categoryStyle, paymentModes } from "../data/mockData.js";

const rupees = (n) => "₹ " + Number(n).toLocaleString("en-IN");

// Coloured tags inside the dropdowns
const selectStyles = {
  control: (base) => ({ ...base, minHeight: 42, borderColor: "#cbd5e1", borderRadius: 8 }),
  multiValue: (base, { data }) => ({ ...base, backgroundColor: data.bg, borderRadius: 6 }),
  multiValueLabel: (base, { data }) => ({ ...base, color: data.color, fontWeight: 700, fontSize: 13 }),
  multiValueRemove: (base, { data }) => ({ ...base, color: data.color }),
};

export default function ExpenseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = currentUser();
  const isNew = id === "new";
  const existing = isNew ? null : getExpense(id);

  const [title, setTitle] = useState(existing ? existing.title : "");
  const [date, setDate] = useState(existing ? existing.date : "");
  const [paymentMode, setPaymentMode] = useState(existing ? existing.paymentMode : paymentModes[0]);
  const [categories, setCategories] = useState(existing ? existing.categories : []);
  const [subCategories, setSubCategories] = useState(existing ? existing.subCategories : []);
  const [items, setItems] = useState(existing ? existing.items : []);
  const [popup, setPopup] = useState(null); // null, "new", or the index of the item being edited
  const [errors, setErrors] = useState([]);

  // An id in the address that does not match any expense
  if (!isNew && (!existing || existing.userId !== user.userId)) {
    return (
      <>
        <Header />
        <div className="page">
          <p>This expense was not found.</p>
          <Link to="/expenses">Back to My Expenses</Link>
        </div>
      </>
    );
  }

  const categoryOptions = Object.keys(categoryMap).map((c) => ({ value: c, label: c, ...categoryStyle[c] }));
  const subCategoryOptions = categories.flatMap((c) =>
    categoryMap[c].map((s) => ({ value: s, label: s, ...categoryStyle[c] }))
  );

  function handleCategoryChange(selected) {
    const next = (selected || []).map((o) => o.value);
    setCategories(next);
    // keep only the sub categories that still belong to a selected category
    const allowed = next.flatMap((c) => categoryMap[c]);
    setSubCategories(subCategories.filter((s) => allowed.includes(s)));
  }

  function handleSubCategoryChange(selected) {
    setSubCategories((selected || []).map((o) => o.value));
  }

  function handleItemSave(item) {
    if (popup === "new") setItems([...items, item]);
    else setItems(items.map((it, i) => (i === popup ? item : it)));
    setPopup(null);
  }

  function handleItemDelete(index) {
    setItems(items.filter((_, i) => i !== index));
  }

  function handleSave() {
    const problems = [];
    if (!title.trim()) problems.push("Please enter a title.");
    if (!date) problems.push("Please choose a date.");
    if (categories.length === 0) problems.push("Please select at least one category.");
    if (items.length === 0) problems.push("Please add at least one item.");
    setErrors(problems);
    if (problems.length) return;

    saveExpense({
      ...(existing ? { id: existing.id } : {}),
      userId: user.userId,
      title: title.trim(),
      date,
      paymentMode,
      categories,
      subCategories,
      items,
    });
    navigate("/expenses");
  }

  const total = items.reduce((sum, it) => sum + it.amount, 0);

  return (
    <>
      <Header />
      <div className="page">
        <div className="crumb"><Link to="/expenses">Expenses</Link> › <b>Expense Details</b></div>

        <div className="card form-card">
          <h1>{isNew ? "New Expense" : "Expense Details"}</h1>

          <div className="three-col">
            <label className="field">
              <span className="lab">Title</span>
              <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <label className="field">
              <span className="lab">Date</span>
              <input className="input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </label>
            <label className="field">
              <span className="lab">Payment mode</span>
              <select className="input" value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}>
                {paymentModes.map((m) => <option key={m}>{m}</option>)}
              </select>
            </label>
          </div>

          <div className="two-col">
            <div className="field">
              <span className="lab">Expense Category</span>
              <Select isMulti isSearchable options={categoryOptions} styles={selectStyles}
                placeholder="Search and select categories"
                value={categoryOptions.filter((o) => categories.includes(o.value))}
                onChange={handleCategoryChange} />
            </div>
            <div className="field">
              <span className="lab">Expense Sub Category</span>
              <Select isMulti isSearchable options={subCategoryOptions} styles={selectStyles}
                placeholder={categories.length ? "Search and select sub categories" : "Select a category first"}
                noOptionsMessage={() => "No sub categories"}
                value={subCategoryOptions.filter((o) => subCategories.includes(o.value))}
                onChange={handleSubCategoryChange} />
            </div>
          </div>

          <div className="title-row small">
            <h2>Items</h2>
            <button className="btn outline" onClick={() => setPopup("new")}>+ Add Item</button>
          </div>

          {items.length === 0 && <p className="muted">No items yet.</p>}
          {items.map((it, index) => (
            <div className="item-row" key={index}>
              <span className="dot" />
              <span className="item-name">{it.name}{it.quantity > 1 ? ` (x${it.quantity})` : ""}</span>
              <span className="item-amount">{rupees(it.amount)}</span>
              <button className="icon-btn" onClick={() => setPopup(index)} aria-label={`Edit ${it.name}`}><Icon name="pen" color="#2457c5" size={18} /></button>
              <button className="icon-btn" onClick={() => handleItemDelete(index)} aria-label={`Delete ${it.name}`}><Icon name="close" color="#dc2626" size={18} /></button>
            </div>
          ))}
          <div className="total">Total <b>{rupees(total)}</b></div>

          {errors.length > 0 && (
            <ul className="error-list">{errors.map((e) => <li key={e}>{e}</li>)}</ul>
          )}
        </div>

        <div className="actions page-actions">
          <button className="btn outline" onClick={() => navigate("/expenses")}>Cancel</button>
          <button className="btn gradient" onClick={handleSave}>Save</button>
        </div>
      </div>

      {popup !== null && (
        <ItemPopup item={popup === "new" ? null : items[popup]} onSave={handleItemSave} onClose={() => setPopup(null)} />
      )}
    </>
  );
}
