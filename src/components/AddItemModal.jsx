import { useState } from "react";
import { CATEGORIES, COLORS } from "../data/categories.js";

export default function AddItemModal({ mode, defaultCategoryId, onClose, onSave }) {
  const [categoryId, setCategoryId] = useState(defaultCategoryId || CATEGORIES[0].id);
  const [name, setName] = useState("");
  const [colorId, setColorId] = useState(COLORS[0].id);
  const [price, setPrice] = useState("");
  const [link, setLink] = useState("");

  const isWishlist = mode === "wishlist";

  const handleSave = () => {
    if (!name.trim()) return;
    const colorHex = COLORS.find((c) => c.id === colorId)?.hex || "#888";
    onSave({
      category_id: categoryId,
      name: name.trim(),
      color_hex: colorHex,
      price: price.trim() || null,
      link: link.trim() || null,
      is_wishlist: isWishlist,
      bought: false,
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{isWishlist ? "Add to wishlist" : "Add item"}</h2>

        <div className="field-label">Category</div>
        <div className="pill-row">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              className={`pill ${categoryId === c.id ? "active" : ""}`}
              onClick={() => setCategoryId(c.id)}
            >
              {c.emoji} {c.name}
            </button>
          ))}
        </div>

        <div className="field-label">Name</div>
        <input
          className="text-input"
          placeholder={isWishlist ? "e.g. Uniqlo Oxford Shirt" : "e.g. White Tee"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="field-label">Color</div>
        <div className="color-swatch-row">
          {COLORS.map((c) => (
            <button
              key={c.id}
              className={`color-dot ${colorId === c.id ? "active" : ""}`}
              style={{ background: c.hex }}
              title={c.label}
              onClick={() => setColorId(c.id)}
            />
          ))}
        </div>

        {isWishlist && (
          <>
            <div className="field-label">Price (optional)</div>
            <input
              className="text-input"
              placeholder="e.g. Rp 350.000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <div className="field-label">Link (optional)</div>
            <input
              className="text-input"
              placeholder="https://..."
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </>
        )}

        <div className="modal-actions">
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn primary" onClick={handleSave} disabled={!name.trim()}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
