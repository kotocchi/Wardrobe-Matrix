import { useEffect, useState, useCallback } from "react";
import { supabase, supabaseReady } from "./supabaseClient.js";
import { CATEGORIES } from "./data/categories.js";
import AddItemModal from "./components/AddItemModal.jsx";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function App() {
  const [tab, setTab] = useState("wardrobe"); // wardrobe | wishlist
  const [activeCategory, setActiveCategory] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const loadItems = useCallback(async () => {
    if (!supabaseReady) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from("items")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setItems(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const wardrobeItems = items.filter((i) => !i.is_wishlist);
  const wishlistItems = items.filter((i) => i.is_wishlist);

  const countFor = (catId) => wardrobeItems.filter((i) => i.category_id === catId).length;

  const handleAddItem = async (item) => {
    if (!supabaseReady) return;
    const { data, error } = await supabase.from("items").insert(item).select();
    if (!error && data) setItems((prev) => [data[0], ...prev]);
    setModalOpen(false);
  };

  const handleRemoveItem = async (id) => {
    if (!supabaseReady) return;
    await supabase.from("items").delete().eq("id", id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleToggleBought = async (item) => {
    if (!supabaseReady) return;
    const { data, error } = await supabase
      .from("items")
      .update({ is_wishlist: false, bought: true })
      .eq("id", item.id)
      .select();
    if (!error && data) {
      setItems((prev) => prev.map((i) => (i.id === item.id ? data[0] : i)));
    }
  };

  if (!supabaseReady) {
    return (
      <div className="app">
        <div className="header">
          <p className="header-small">{getGreeting()}</p>
          <h1 className="header-title">Wardrobe</h1>
        </div>
        <div className="banner">
          Not connected to Supabase yet. Add VITE_SUPABASE_URL and
          VITE_SUPABASE_ANON_KEY to a .env file (or your Vercel project's
          environment variables) to enable saving and syncing across devices.
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="header">
        <p className="header-small">{getGreeting()}</p>
        <h1 className="header-title">Wardrobe</h1>
      </div>

      <div className="tabs">
        <button
          className={`tab-btn ${tab === "wardrobe" ? "active" : ""}`}
          onClick={() => {
            setTab("wardrobe");
            setActiveCategory(null);
          }}
        >
          Wardrobe
        </button>
        <button
          className={`tab-btn ${tab === "wishlist" ? "active" : ""}`}
          onClick={() => setTab("wishlist")}
        >
          Wishlist {wishlistItems.length > 0 ? `(${wishlistItems.length})` : ""}
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : tab === "wardrobe" ? (
        activeCategory ? (
          <>
            <div className="back-row">
              <button className="back-btn" onClick={() => setActiveCategory(null)}>
                ←
              </button>
              <h2 style={{ fontSize: 16, margin: 0 }}>
                {CATEGORIES.find((c) => c.id === activeCategory)?.name}
              </h2>
            </div>
            <div className="section">
              {countFor(activeCategory) === 0 ? (
                <div className="empty-state">
                  <p>Nothing here yet. Add your first item.</p>
                </div>
              ) : (
                <div className="item-grid">
                  {wardrobeItems
                    .filter((i) => i.category_id === activeCategory)
                    .map((item) => (
                      <div className="item-card" key={item.id}>
                        <button className="remove-x" onClick={() => handleRemoveItem(item.id)}>
                          ✕
                        </button>
                        <div className="swatch" style={{ background: item.color_hex }} />
                        <p className="item-name">{item.name}</p>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="section">
            <div className="category-grid">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  className="category-card"
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <span className="category-emoji">{cat.emoji}</span>
                  <p className="category-name">{cat.name}</p>
                  <p className="category-count">{countFor(cat.id)} items</p>
                </button>
              ))}
            </div>
          </div>
        )
      ) : (
        <div className="section">
          {wishlistItems.length === 0 ? (
            <div className="empty-state">
              <p>Nothing on your wishlist. Add something you're eyeing.</p>
            </div>
          ) : (
            wishlistItems.map((item) => (
              <div className="wishlist-item" key={item.id}>
                <button
                  className="checkbox"
                  onClick={() => handleToggleBought(item)}
                  title="Mark as bought"
                >
                  ✓
                </button>
                <div className="swatch" style={{ width: 34, height: 34, flexShrink: 0, background: item.color_hex, marginBottom: 0 }} />
                <div className="wishlist-info">
                  <p className="wishlist-name">{item.name}</p>
                  <p className="wishlist-meta">
                    {item.price && <span>{item.price}</span>}
                    {item.link && (
                      <a href={item.link} target="_blank" rel="noreferrer">
                        View
                      </a>
                    )}
                  </p>
                </div>
                <button className="remove-x" style={{ position: "static" }} onClick={() => handleRemoveItem(item.id)}>
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
      )}

      <button className="fab" onClick={() => setModalOpen(true)}>
        + Add {tab === "wardrobe" ? "item" : "to wishlist"}
      </button>

      {modalOpen && (
        <AddItemModal
          mode={tab}
          defaultCategoryId={activeCategory}
          onClose={() => setModalOpen(false)}
          onSave={handleAddItem}
        />
      )}
    </div>
  );
}
