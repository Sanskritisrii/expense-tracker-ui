import { useState } from "react";
import Icon from "./Icon.jsx";

// Used for both adding a new item and editing an existing one.
// When `item` is given, the fields start with its values.
export default function ItemPopup({ item, onSave, onClose }) {
  const [name, setName] = useState(item ? item.name : "");
  const [amount, setAmount] = useState(item ? String(item.amount) : "");
  const [quantity, setQuantity] = useState(item ? String(item.quantity) : "1");
  const [error, setError] = useState("");

  function handleSave() {
    if (!name.trim()) return setError("Please enter the item name.");
    if (!(Number(amount) > 0)) return setError("Amount must be more than 0.");
    if (!(Number(quantity) >= 1) || !Number.isInteger(Number(quantity))) {
      return setError("Quantity must be a whole number, 1 or more.");
    }
    onSave({ name: name.trim(), amount: Number(amount), quantity: Number(quantity) });
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="card popup" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="popup-top">
          <div className="popup-title">
            <div className="circle" style={{ background: "#0f766e", width: 44, height: 44 }}>
              <Icon name="coin" size={24} />
            </div>
            <h2>{item ? "Edit Item" : "Add Item"}</h2>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close"><Icon name="close" color="#6b7280" size={20} /></button>
        </div>

        <label className="field">
          <span className="lab">Item name</span>
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} autoFocus />
        </label>
        <div className="two-col">
          <label className="field">
            <span className="lab">Amount (₹)</span>
            <input className="input" type="number" min="0" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </label>
          <label className="field">
            <span className="lab">Quantity</span>
            <input className="input" type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          </label>
        </div>

        <div className="error">{error}</div>
        <div className="actions">
          <button className="btn outline" onClick={onClose}>Cancel</button>
          <button className="btn gradient" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}
