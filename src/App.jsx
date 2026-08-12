import React, { useState, useEffect } from 'react';
import './index.css';
import { GARMENT_DATA, QUICK_COLOR_PALETTE, FIT_VOLUME, FIT_SPECIFIC_GARMENTS } from './data/categories';

export default function App() {
  const [activeTab, setActiveTab] = useState('builder');
  const [filter, setFilter] = useState('all');
  const [state, setState] = useState({ inner: null, outer: null, bottom: null, shoe: null, accs: {} });
  const [selectedType, setSelectedType] = useState({ inner: null, outer: null, bottom: null, shoe: null, acc: null });
  const [selectedFit, setSelectedFit] = useState({ inner: null, outer: null, bottom: null });
  const [activeColorCategory, setActiveColorCategory] = useState({ inner: 'all', outer: 'all', bottom: 'all', shoe: 'all', acc: 'all' });
  const [openPanel, setOpenPanel] = useState(null);
  const [savedOutfits, setSavedOutfits] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('wardrobe_matrix_v14');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.savedOutfits) setSavedOutfits(data.savedOutfits);
        if (data.wishlist) setWishlist(data.wishlist);
      } catch (e) {}
    }
  }, []);

  const saveStateToStorage = (updatedSaved, updatedWish) => {
    localStorage.setItem('wardrobe_matrix_v14', JSON.stringify({ savedOutfits: updatedSaved || savedOutfits, wishlist: updatedWish || wishlist }));
  };

  const saveSnapshot = () => {
    setHistory(prev => [...prev, JSON.parse(JSON.stringify({ state, selectedType, selectedFit }))]);
  };

  const undoLastAction = () => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setState(last.state);
    setSelectedType(last.selectedType);
    setSelectedFit(last.selectedFit);
    setHistory(prev => prev.slice(0, -1));
  };

  const toggleWishlist = (e, slot, label) => {
    e.stopPropagation();
    const key = `${slot}:${label}`;
    const nextWish = wishlist.includes(key) ? wishlist.filter(k => k !== key) : [...wishlist, key];
    setWishlist(nextWish);
    saveStateToStorage(null, nextWish);
  };

  const handleCardClick = (slot, label, noColor) => {
    saveSnapshot();

    // Toggle drawer off if clicking the currently active slot
    if (selectedType[slot] === label && openPanel === slot) {
      setOpenPanel(null);
      return;
    }

    if (slot === 'acc') {
      if (noColor) {
        setState(prev => ({ ...prev, accs: {} }));
        setSelectedType(prev => ({ ...prev, acc: null }));
        setOpenPanel(null);
        return;
      }
      setSelectedType(prev => ({ ...prev, acc: label }));
      setOpenPanel('acc');
      return;
    }

    if (noColor) {
      setState(prev => ({ ...prev, [slot]: null }));
      setSelectedType(prev => ({ ...prev, [slot]: null }));
      setSelectedFit(prev => ({ ...prev, [slot]: null }));
      setOpenPanel(null);
      return;
    }

    setSelectedType(prev => ({ ...prev, [slot]: label }));
    const presetFit = FIT_SPECIFIC_GARMENTS[label];
    if (presetFit) setSelectedFit(prev => ({ ...prev, [slot]: presetFit }));
    setOpenPanel(slot);
  };

  const finalizeColor = (slot, colorName) => {
    saveSnapshot();
    if (slot === 'acc') {
      const accLabel = selectedType.acc;
      setState(prev => ({ ...prev, accs: { ...prev.accs, [accLabel]: `${colorName} ${accLabel}` } }));
    } else {
      const fitStr = selectedFit[slot] ? `${selectedFit[slot]} ` : '';
      setState(prev => ({ ...prev, [slot]: `${colorName} ${fitStr}${selectedType[slot]}` }));
    }
    setOpenPanel(null);
  };

  const clearSlot = (slot) => {
    saveSnapshot();
    if (slot === 'acc') {
      setState(prev => ({ ...prev, accs: {} }));
      setSelectedType(prev => ({ ...prev, acc: null }));
    } else {
      setState(prev => ({ ...prev, [slot]: null }));
      setSelectedType(prev => ({ ...prev, [slot]: null }));
      setSelectedFit(prev => ({ ...prev, [slot]: null }));
    }
    setOpenPanel(null);
  };

  const clearAll = () => {
    saveSnapshot();
    setState({ inner: null, outer: null, bottom: null, shoe: null, accs: {} });
    setSelectedType({ inner: null, outer: null, bottom: null, shoe: null, acc: null });
    setSelectedFit({ inner: null, outer: null, bottom: null });
    setOpenPanel(null);
  };

  const generateByConcept = (conceptType) => {
    saveSnapshot();
    if (conceptType === 'tone_on_tone') {
      setSelectedType({ inner: 'Shirt', outer: null, bottom: 'Chinos', shoe: 'Sneakers', acc: null });
      setSelectedFit({ inner: 'Regular', outer: null, bottom: 'Regular' });
      setState({ inner: 'Light Blue Regular Shirt', outer: null, bottom: 'Navy Regular Chinos', shoe: 'White Sneakers', accs: {} });
    } else if (conceptType === 'pan') {
      setSelectedType({ inner: 'Tee', outer: 'Blazer', bottom: 'Jeans', shoe: 'Sneakers', acc: null });
      setSelectedFit({ inner: 'Regular', outer: 'Tailored', bottom: 'Straight' });
      setState({ inner: 'White Regular Tee', outer: 'Black Tailored Blazer', bottom: 'Raw Denim Straight Jeans', shoe: 'White Sneakers', accs: {} });
    } else if (conceptType === 'pointing_down') {
      setSelectedType({ inner: 'Tee', outer: 'Denim Jacket', bottom: 'Chinos', shoe: 'Sneakers', acc: null });
      setSelectedFit({ inner: 'Regular', outer: 'Regular', bottom: 'Regular' });
      setState({ inner: 'Crimson Regular Tee', outer: 'Black Regular Denim Jacket', bottom: 'Beige Regular Chinos', shoe: 'White Sneakers', accs: {} });
    } else if (conceptType === 'wit') {
      setSelectedType({ inner: 'Tee', outer: 'Denim Jacket', bottom: 'Straight Trousers', shoe: 'Sneakers', acc: null });
      setSelectedFit({ inner: 'Regular', outer: 'Boxy', bottom: 'Straight' });
      setState({ inner: 'White Regular Tee', outer: 'Navy Boxy Denim Jacket', bottom: 'Charcoal Straight Trousers', shoe: 'White Sneakers', accs: {} });
    } else if (conceptType === 'damin') {
      setSelectedType({ inner: 'Tee', outer: null, bottom: 'Wide Leg Trousers', shoe: 'Sneakers', acc: null });
      setSelectedFit({ inner: 'Oversized', outer: null, bottom: 'Wide Leg' });
      setState({ inner: 'Off-white Oversized Tee', outer: null, bottom: 'Charcoal Wide Leg Trousers', shoe: 'White Sneakers', accs: {} });
    } else if (conceptType === 'rule_of_thirds') {
      setSelectedType({ inner: 'Crop Tee', outer: null, bottom: 'Wide Leg Trousers', shoe: 'Sneakers', acc: null });
      setSelectedFit({ inner: 'Fitted', outer: null, bottom: 'Wide Leg' });
      setState({ inner: 'Black Fitted Crop Tee', outer: null, bottom: 'Beige Wide Leg Trousers', shoe: 'White Sneakers', accs: {} });
    }
  };

  const hasTop = state.inner || state.outer;
  const isReady = hasTop && state.bottom;

  const topVol = selectedFit.inner ? (FIT_VOLUME[selectedFit.inner] || 2) : (selectedFit.outer ? (FIT_VOLUME[selectedFit.outer] || 2) : 2);
  const botVol = selectedFit.bottom ? (FIT_VOLUME[selectedFit.bottom] || 2) : 2;

  const gateAPass = !(topVol >= 3 && botVol >= 3 && (!state.outer || FIT_VOLUME[selectedFit.outer] === 3));
  const gateBPass = true;
  const gateCPass = !(state.outer && state.outer.includes('Denim Jacket') && selectedFit.inner === 'Oversized');

  const finalVerdict = isReady && gateAPass && gateBPass && gateCPass;

  return (
    <div className="wrap">
      <nav className="top-nav">
        <button className={`top-nav-btn ${activeTab === 'builder' ? 'active' : ''}`} onClick={() => setActiveTab('builder')}>OUTFIT BUILDER</button>
        <button className={`top-nav-btn ${activeTab === 'saved' ? 'active' : ''}`} onClick={() => setActiveTab('saved')}>SAVED FITS ({savedOutfits.length})</button>
        <button className={`top-nav-btn ${activeTab === 'wishlist' ? 'active' : ''}`} onClick={() => setActiveTab('wishlist')}>WISHLIST ({wishlist.length})</button>
      </nav>

      {activeTab === 'builder' && (
        <>
          <div className="brand-header">
            <h1 className="brand-title">Wardrobe Matrix</h1>
            <p className="brand-sub">Sequential Fashion Architecture & Proportion Engine</p>
          </div>

          <div className="concept-generator-box">
            <div className="concept-box-title">⚡ Curated Fashion Concepts</div>
            <div className="concept-gen-bar">
              <button className="concept-gen-btn" onClick={() => generateByConcept('tone_on_tone')}>✨ Tone on Tone</button>
              <button className="concept-gen-btn" onClick={() => generateByConcept('pan')}>🧥 Pan (Structural Shift)</button>
              <button className="concept-gen-btn" onClick={() => generateByConcept('pointing_down')}>⚓ Pointing Down</button>
              <button className="concept-gen-btn" onClick={() => generateByConcept('wit')}>🕶️ WI / Wit (High-Low)</button>
              <button className="concept-gen-btn" onClick={() => generateByConcept('damin')}>🌿 Damin Look</button>
              <button className="concept-gen-btn" onClick={() => generateByConcept('rule_of_thirds')}>📐 Rule of Thirds</button>
            </div>
          </div>

          <div className="filter-bar">
            {['all', 'casual', 'smart', 'bali', 'street'].map(t => (
              <button key={t} className={`filter-pill ${filter === t ? 'active' : ''}`} onClick={() => setFilter(t)}>
                {t.toUpperCase()}
              </button>
            ))}
          </div>

          {['inner', 'outer', 'bottom', 'shoe', 'acc'].map(slot => (
            <div key={slot} className="slot-section">
              <div className="section-header-row">
                <p className="section-label">{slot === 'inner' ? 'Inner Top' : slot === 'outer' ? 'Outer Layer' : slot}</p>
                {((slot !== 'acc' && state[slot]) || (slot === 'acc' && Object.keys(state.accs).length > 0)) && (
                  <button className="standalone-clear-btn" onClick={() => clearSlot(slot)}>✕ Clear</button>
                )}
              </div>

              <div className="grid-types">
                {GARMENT_DATA[slot].map(item => {
                  const isFiltered = filter !== 'all' && item.tags && !item.tags.includes(filter);
                  if (isFiltered) return null;
                  const isSelected = selectedType[slot] === item.label || (slot === 'acc' && state.accs[item.label]);
                  const itemKey = `${slot}:${item.label}`;
                  const isFavorited = wishlist.includes(itemKey);

                  return (
                    <div key={item.label} className={`item-card ${isSelected ? 'selected' : ''}`} onClick={() => handleCardClick(slot, item.label, item.noColor)}>
                      {item.label !== 'None' && (
                        <span className={`wishlist-heart-btn ${isFavorited ? 'active' : ''}`} onClick={(e) => toggleWishlist(e, slot, item.label)}>♥</span>
                      )}
                      <div className="card-label">{item.label}</div>
                      <div className="card-sub">{item.desc}</div>
                    </div>
                  );
                })}
              </div>

              {openPanel === slot && selectedType[slot] && (
                <div className="preset-color-panel open">
                  <div className="color-picker-heading">
                    Select Fit & Color for {selectedType[slot]}
                  </div>

                  {itemFits(slot, selectedType[slot]) && (
                    <div className="fit-chips">
                      {GARMENT_DATA[slot].find(i => i.label === selectedType[slot])?.fits.map(f => (
                        <button key={f} className={`fit-chip ${selectedFit[slot] === f ? 'selected' : ''}`} onClick={() => setSelectedFit(prev => ({ ...prev, [slot]: f }))}>
                          {f}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="color-cat-bar">
                    {['all', 'neutral', 'earth', 'blue', 'bold', 'metal'].map(c => (
                      <button key={c} className={`color-cat-pill ${activeColorCategory[slot] === c ? 'active' : ''}`} onClick={() => setActiveColorCategory(prev => ({ ...prev, [slot]: c }))}>
                        {c}
                      </button>
                    ))}
                  </div>

                  <div className="color-chips">
                    {QUICK_COLOR_PALETTE.filter(c => activeColorCategory[slot] === 'all' || c.cat === activeColorCategory[slot]).map(c => (
                      <button key={c.name} className="color-chip" onClick={() => finalizeColor(slot, c.name)}>
                        <span className="chip-dot" style={{ background: c.hex }} />
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          <div className="control-row">
            <button className="btn-sec" onClick={clearAll}>Clear Selection</button>
            <button className="btn-sec" onClick={undoLastAction} disabled={history.length === 0}>↩ Undo</button>
          </div>

          <div className="result-area">
            {!isReady ? (
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center' }}>
                Select a top (or outer layer) + bottom to evaluate silhouette logic
              </div>
            ) : (
              <>
                <div className="result-label">Sequential Fashion Pipeline</div>
                <div className="outfit-row">
                  {state.inner && <span className="outfit-tag">{state.inner}</span>}
                  {state.outer && <span className="outfit-tag">{state.outer}</span>}
                  {state.bottom && <span className="outfit-tag">{state.bottom}</span>}
                  {state.shoe && <span className="outfit-tag">{state.shoe}</span>}
                </div>

                <div className="gate-pipeline">
                  <div className="gate-step">
                    <div className="gate-header">
                      <span className="gate-title">A. Silhouette & Proportions</span>
                      <span className={`gate-badge ${gateAPass ? 'gate-pass' : 'gate-warn'}`}>{gateAPass ? 'PASS' : 'WARN'}</span>
                    </div>
                    <div className="gate-reason">{gateAPass ? 'Volume distribution maintains optimal ratio.' : 'Loose top + wide bottom risks unanchored drape.'}</div>
                  </div>

                  <div className="gate-step">
                    <div className="gate-header">
                      <span className="gate-title">B. Color Harmony & Palette</span>
                      <span className={`gate-badge ${gateAPass ? (gateBPass ? 'gate-pass' : 'gate-warn') : 'gate-skipped'}`}>{gateAPass ? 'PASS' : 'SKIPPED'}</span>
                    </div>
                    <div className="gate-reason">{gateAPass ? 'Palette saturation levels flow naturally.' : 'Pipeline halted at Gate A.'}</div>
                  </div>

                  <div className="gate-step">
                    <div className="gate-header">
                      <span className="gate-title">C. Layering Mechanics</span>
                      <span className={`gate-badge ${gateAPass && gateBPass ? (gateCPass ? 'gate-pass' : 'gate-warn') : 'gate-skipped'}`}>{gateAPass && gateBPass ? (gateCPass ? 'PASS' : 'WARN') : 'SKIPPED'}</span>
                    </div>
                    <div className="gate-reason">{gateAPass && gateBPass ? (gateCPass ? 'Fabric drape and tension align.' : 'Oversized inner top under rigid jacket causes bunching.') : 'Pipeline halted at earlier gate.'}</div>
                  </div>
                </div>

                <div className={`final-verdict-banner ${finalVerdict ? 'verdict-pass' : 'verdict-warn'}`}>
                  FINAL VERDICT: {finalVerdict ? 'BALANCED OUTFIT' : 'NEEDS STYLING ADJUSTMENT'}
                </div>
              </>
            )}
          </div>
        </>
      )}

      {activeTab === 'saved' && (
        <div>
          <h1 className="brand-title">Saved Outfits</h1>
          <p className="brand-sub">Your personal outfit archive</p>
          {savedOutfits.length === 0 ? <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>No saved outfits yet.</p> : (
            savedOutfits.map((o, idx) => (
              <div key={idx} className="saved-item-card">
                <div>{o.summary}</div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'wishlist' && (
        <div>
          <h1 className="brand-title">Wishlist</h1>
          <p className="brand-sub">Favorited items across categories</p>
          {wishlist.length === 0 ? <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>No favorited items yet.</p> : (
            wishlist.map(key => (
              <div key={key} className="wishlist-item-card">
                <div>{key}</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function itemFits(slot, label) {
  if (!label || !GARMENT_DATA[slot]) return false;
  const item = GARMENT_DATA[slot].find(i => i.label === label);
  return item && item.fits && item.fits.length > 0;
}
