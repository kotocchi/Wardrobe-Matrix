// FIT VOLUME LOOKUP TABLE
const FIT_VOLUME = {
  'Fitted': 1, 'Slim': 1, 'Tailored': 1,
  'Regular': 2, 'Straight': 2, 'Tapered': 2, 'Cropped': 2,
  'Relaxed': 3, 'Oversized': 3, 'Boxy': 3, 'Baggy': 3, 'Wide Leg': 3, 'Longline': 3
};

const FIT_SPECIFIC_GARMENTS = {
  'Crop Tee': 'Fitted',
  'Muscle Tee': 'Fitted',
  'Kimono Jacket': 'Oversized',
  'Wide Cropped Pants': 'Wide Leg',
  'Wide Leg Trousers': 'Wide Leg'
};

// GARMENT CATALOGUE
const GARMENT_DATA = {
  inner: [
    { label: 'None', formality: 1, structure: 'soft', desc: 'Outer top only (e.g. Linen Shirt)', noColor: true, fits: [], tags: ['casual', 'smart', 'bali', 'street'] },
    { label: 'Tee', formality: 1, structure: 'soft', desc: 'Basic crewneck', fits: ['Regular', 'Slim', 'Oversized', 'Boxy', 'Longline'], tags: ['casual', 'street', 'bali'] }, 
    { label: 'Shirt', formality: 2, structure: 'soft', desc: 'Button-up shirt', fits: ['Regular', 'Slim', 'Relaxed', 'Oversized'], tags: ['smart', 'casual'] },
    { label: 'Overshirt', formality: 1, structure: 'structured', desc: 'Layering shirt', fits: ['Regular', 'Boxy', 'Oversized'], tags: ['street', 'casual'] }, 
    { label: 'Polo', formality: 2, structure: 'soft', desc: 'Knit / classic', fits: ['Regular', 'Slim'], tags: ['smart', 'casual'] },
    { label: 'Tank Top', formality: 1, structure: 'soft', desc: 'Sleeveless / ribbed', fits: ['Fitted', 'Relaxed'], tags: ['casual', 'bali'] },
    { label: 'Crop Tee', formality: 1, structure: 'soft', desc: 'Cropped hem (Fit preset)', fits: [], tags: ['street', 'casual'] },
    { label: 'Muscle Tee', formality: 1, structure: 'soft', desc: 'Sleeveless (Fit preset)', fits: [], tags: ['casual', 'bali'] },
    { label: 'Ringer Tee', formality: 1, structure: 'soft', desc: 'Contrast collar', fits: ['Regular', 'Slim', 'Oversized'], tags: ['casual', 'street'] },
    { label: 'Baseball Tee', formality: 1, structure: 'soft', desc: 'Raglan sleeves', fits: ['Regular', 'Oversized'], tags: ['casual', 'street'] },
    { label: 'Rugby Shirt', formality: 1, structure: 'structured', desc: 'Striped collar', fits: ['Regular', 'Boxy'], tags: ['street', 'casual'] },
    { label: 'Linen Shirt SS', formality: 2, structure: 'soft', desc: 'Breathable SS', fits: ['Regular', 'Relaxed'], tags: ['bali', 'casual', 'smart'] },
    { label: 'Mock Neck', formality: 2, structure: 'soft', desc: 'Cleaner than turtleneck', fits: ['Slim', 'Regular'], tags: ['smart', 'street'] },
    { label: 'Waffle Knit Top', formality: 1, structure: 'soft', desc: 'Textured base layer', fits: ['Slim', 'Regular'], tags: ['casual'] },
    { label: 'Long Sleeve', formality: 1, structure: 'soft', desc: 'Base layer', fits: ['Regular', 'Slim', 'Oversized'], tags: ['casual', 'street'] }, 
    { label: 'Henley', formality: 1, structure: 'soft', desc: 'Buttoned collar', fits: ['Regular', 'Slim'], tags: ['casual'] }, 
    { label: 'Turtleneck', formality: 2, structure: 'soft', desc: 'High collar', fits: ['Slim', 'Regular'], tags: ['smart'] },
    { label: 'Knit Sweater', formality: 2, structure: 'soft', desc: 'Pullover', fits: ['Regular', 'Oversized', 'Relaxed'], tags: ['smart', 'casual'] }, 
    { label: 'Hoodie', formality: 1, structure: 'soft', desc: 'Casual pullover', fits: ['Regular', 'Oversized', 'Boxy'], tags: ['street', 'casual'] }
  ],
  outer: [
    { label: 'None', formality: 1, structure: 'soft', desc: 'Single layer fit', noColor: true, fits: [], tags: ['casual', 'smart', 'bali', 'street'] }, 
    { label: 'Linen Shirt', formality: 2, structure: 'soft', desc: 'Open overshirt', fits: ['Regular', 'Relaxed'], tags: ['bali', 'casual', 'smart'] },
    { label: 'Denim Jacket', formality: 1, structure: 'structured', desc: 'Classic casual', fits: ['Regular', 'Boxy', 'Oversized'], tags: ['casual', 'street'] }, 
    { label: 'Cardigan', formality: 2, structure: 'soft', desc: 'Smart-casual knit', fits: ['Regular', 'Oversized'], tags: ['smart', 'casual'] },
    { label: 'Field Jacket', formality: 1, structure: 'structured', desc: 'Utility, mid-weight', fits: ['Regular', 'Boxy'], tags: ['street', 'casual'] },
    { label: 'Harrington Jacket', formality: 2, structure: 'structured', desc: 'Classic, zip-up, clean', fits: ['Regular', 'Slim'], tags: ['smart', 'casual'] },
    { label: 'Chore Coat', formality: 1, structure: 'structured', desc: 'Workwear-inspired, boxy', fits: ['Regular', 'Boxy'], tags: ['street', 'casual'] },
    { label: 'Vest / Gilet', formality: 1, structure: 'structured', desc: 'Sleeveless layer', fits: ['Regular', 'Slim'], tags: ['bali', 'street'] },
    { label: 'Kimono Jacket', formality: 1, structure: 'soft', desc: 'Drapey (Fit preset)', fits: [], tags: ['bali', 'street'] },
    { label: 'Fleece Jacket', formality: 1, structure: 'soft', desc: 'Casual warmth', fits: ['Regular', 'Oversized'], tags: ['casual'] },
    { label: 'Track Jacket', formality: 1, structure: 'soft', desc: 'Sporty zip layer', fits: ['Regular', 'Slim'], tags: ['street', 'casual'] },
    { label: 'Bomber Jacket', formality: 1, structure: 'structured', desc: 'Streetwear staple', fits: ['Regular', 'Boxy', 'Oversized'], tags: ['street', 'casual'] }, 
    { label: 'Blazer', formality: 3, structure: 'structured', desc: 'Tailored / sharp', fits: ['Tailored', 'Regular', 'Oversized'], tags: ['smart'] },
    { label: 'Trench Coat', formality: 3, structure: 'structured', desc: 'Long outerwear', fits: ['Regular', 'Oversized'], tags: ['smart'] }, 
    { label: 'Puffer Jacket', formality: 1, structure: 'structured', desc: 'Warm winter layer', fits: ['Regular', 'Oversized'], tags: ['street', 'casual'] }
  ],
  bottom: [
    { label: 'Chinos', formality: 2, structure: 'soft', desc: 'Smart-casual', fits: ['Slim', 'Regular', 'Relaxed'], tags: ['smart', 'casual'] }, 
    { label: 'Straight Trousers', formality: 3, structure: 'structured', desc: 'Tailored fit', fits: ['Straight', 'Slim'], tags: ['smart'] },
    { label: 'Jeans', formality: 1, structure: 'structured', desc: 'Denim classic', fits: ['Slim', 'Straight', 'Regular', 'Wide Leg', 'Baggy'], tags: ['casual', 'street'] }, 
    { label: 'Linen Trousers', formality: 2, structure: 'soft', desc: 'Breathable fit', fits: ['Relaxed', 'Straight'], tags: ['bali', 'smart', 'casual'] },
    { label: 'Wide Cropped Pants', formality: 1, structure: 'soft', desc: 'Culottes (Fit preset)', fits: [], tags: ['street', 'bali'] },
    { label: 'Track Pants', formality: 1, structure: 'soft', desc: 'Sporty', fits: ['Slim', 'Tapered', 'Regular'], tags: ['street', 'casual'] },
    { label: 'Carpenter Pants', formality: 1, structure: 'structured', desc: 'Utility loops', fits: ['Straight', 'Relaxed'], tags: ['street', 'casual'] },
    { label: 'Corduroy Trousers', formality: 2, structure: 'structured', desc: 'Textured, seasonal', fits: ['Straight', 'Tapered', 'Regular'], tags: ['casual', 'smart'] },
    { label: 'Pleated Trousers', formality: 3, structure: 'structured', desc: 'Dressier', fits: ['Tapered', 'Regular'], tags: ['smart'] },
    { label: 'Denim Shorts', formality: 1, structure: 'structured', desc: 'Casual warm-weather', fits: ['Regular', 'Slim'], tags: ['bali', 'casual'] },
    { label: 'Cargo Shorts', formality: 1, structure: 'structured', desc: 'Utility warm-weather', fits: ['Regular', 'Relaxed'], tags: ['bali', 'casual'] },
    { label: 'Cargo Pants', formality: 1, structure: 'structured', desc: 'Utility pockets', fits: ['Regular', 'Baggy', 'Relaxed'], tags: ['street', 'casual'] },
    { label: 'Wide Leg Trousers', formality: 2, structure: 'structured', desc: 'Relaxed (Fit preset)', fits: [], tags: ['street', 'smart'] }, 
    { label: 'Joggers', formality: 1, structure: 'soft', desc: 'Athletic wear', fits: ['Slim', 'Tapered', 'Regular', 'Oversized'], tags: ['casual'] },
    { label: 'Shorts', formality: 1, structure: 'soft', desc: 'Warm weather', fits: ['Regular', 'Slim'], tags: ['bali', 'casual'] }
  ],
  shoe: [
    { label: 'Sneakers', formality: 1, desc: 'Everyday athletic', fits: [], tags: ['casual', 'street'] }, 
    { label: 'Running Shoes', formality: 1, desc: 'Tech runners / Asics', fits: [], tags: ['street', 'casual'] },
    { label: 'Loafers', formality: 3, desc: 'Smart-casual', fits: [], tags: ['smart'] },
    { label: 'Boots', formality: 2, desc: 'Leather / Chelsea', fits: [], tags: ['smart', 'casual'] }, 
    { label: 'Sandals', formality: 1, desc: 'Open toe', fits: [], tags: ['bali', 'casual'] },
    { label: 'Derbies', formality: 3, desc: 'Formal leather', fits: [], tags: ['smart'] }
  ],
  acc: [
    { label: 'None', desc: 'Clear accessories', noColor: true, fits: [], tags: ['casual', 'smart', 'bali', 'street'] }, 
    { label: 'Cap', desc: 'Baseball / dad hat', fits: [], tags: ['casual', 'street'] },
    { label: 'Bucket Hat', desc: 'Streetwear headwear', fits: [], tags: ['street', 'bali'] },
    { label: 'Beanie', desc: 'Knit headwear', fits: [], tags: ['street', 'casual'] }, 
    { label: 'Sunglasses', desc: 'Eyewear accent', fits: [], tags: ['bali', 'casual', 'smart'] },
    { label: 'Eyeglasses', desc: 'Optical frames', fits: [], tags: ['smart', 'casual'] },
    { label: 'Watch', desc: 'Wristwear classic', fits: [], tags: ['smart', 'casual'] }, 
    { label: 'Bracelet', desc: 'Wrist accent', fits: [], tags: ['bali', 'casual'] },
    { label: 'Rings', desc: 'Silver / Gold accents', fits: [], tags: ['street', 'casual'] },
    { label: 'Necklace', desc: 'Pendant / chain', fits: [], tags: ['street', 'casual'] }, 
    { label: 'Belt', desc: 'Waist accent', fits: [], tags: ['smart', 'casual'] },
    { label: 'Socks', desc: 'Statement / Crew socks', fits: [], tags: ['street', 'casual'] },
    { label: 'Tote Bag', desc: 'Daily carry', fits: [], tags: ['bali', 'casual', 'street'] }
  ]
};

const COLOR_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'neutral', label: 'Neutrals' },
  { id: 'earth', label: 'Earth Tones' },
  { id: 'blue', label: 'Blues/Denim' },
  { id: 'bold', label: 'Bold/Accents' },
  { id: 'metal', label: 'Metals' }
];

const QUICK_COLOR_PALETTE = [
  { name: 'White', hex: '#f0f0ec', cat: 'neutral' }, { name: 'Ivory', hex: '#f0ead8', cat: 'neutral' }, { name: 'Off-white', hex: '#ede8dc', cat: 'neutral' },
  { name: 'Cream', hex: '#f0ead0', cat: 'neutral' }, { name: 'Oatmeal', hex: '#e3dac9', cat: 'neutral' }, { name: 'Heather Grey', hex: '#cfcfcf', cat: 'neutral' },
  { name: 'Grey', hex: '#9a9a9a', cat: 'neutral' }, { name: 'Charcoal', hex: '#3a3a3a', cat: 'neutral' }, { name: 'Off-black', hex: '#262626', cat: 'neutral' },
  { name: 'Black', hex: '#1a1a1a', cat: 'neutral' },
  { name: 'Sand', hex: '#d4b896', cat: 'earth' }, { name: 'Beige', hex: '#d6c5a8', cat: 'earth' }, { name: 'Tan', hex: '#c4a882', cat: 'earth' },
  { name: 'Khaki', hex: '#bfb28a', cat: 'earth' }, { name: 'Camel', hex: '#c4956a', cat: 'earth' }, { name: 'Taupe', hex: '#8a7f73', cat: 'earth' },
  { name: 'Cognac', hex: '#9e5b32', cat: 'earth' }, { name: 'Brown', hex: '#6e4f34', cat: 'earth' }, { name: 'Espresso', hex: '#3b281c', cat: 'earth' },
  { name: 'Terracotta', hex: '#c1634a', cat: 'earth' }, { name: 'Rust', hex: '#b35030', cat: 'earth' }, { name: 'Brick Red', hex: '#8c2d19', cat: 'earth' },
  { name: 'Sage', hex: '#9caf88', cat: 'earth' }, { name: 'Matcha', hex: '#a1b072', cat: 'earth' }, { name: 'Olive', hex: '#6b7c45', cat: 'earth' },
  { name: 'Dark Olive', hex: '#485431', cat: 'earth' }, { name: 'Forest Green', hex: '#2d4a3e', cat: 'earth' }, { name: 'Pine Green', hex: '#1c3b2b', cat: 'earth' },
  { name: 'Sky Blue', hex: '#a2c4c9', cat: 'blue' }, { name: 'Light Blue', hex: '#80a8c2', cat: 'blue' }, { name: 'Washed Indigo', hex: '#4b6b94', cat: 'blue' },
  { name: 'Raw Denim', hex: '#223859', cat: 'blue' }, { name: 'Navy', hex: '#1a2a4a', cat: 'blue' }, { name: 'Midnight Blue', hex: '#101726', cat: 'blue' },
  { name: 'Cobalt', hex: '#1f4ba6', cat: 'blue' }, { name: 'Slate Blue', hex: '#5a6b7c', cat: 'blue' },
  { name: 'Emerald', hex: '#107a48', cat: 'bold' }, { name: 'Butter Yellow', hex: '#f5e5a4', cat: 'bold' }, { name: 'Mustard', hex: '#d99b26', cat: 'bold' },
  { name: 'Soft Pink', hex: '#e8b5b5', cat: 'bold' }, { name: 'Lilac', hex: '#c5b0d5', cat: 'bold' }, { name: 'Lavender', hex: '#a69bb8', cat: 'bold' },
  { name: 'Plum', hex: '#4a2540', cat: 'bold' }, { name: 'Burgundy', hex: '#5c1b26', cat: 'bold' }, { name: 'Crimson', hex: '#8b0000', cat: 'bold' },
  { name: 'Silver', hex: '#c0c0c0', cat: 'metal' }, { name: 'Gold', hex: '#d4af37', cat: 'metal' }, { name: 'Bronze', hex: '#8c6d3b', cat: 'metal' }
];

// EXTENDED CONCEPT EVALUATOR
function getConcept(outfit) {
  const innerColor = outfit.items.inner ? extractColorName(outfit.items.inner) : null;
  const bottomColor = outfit.items.bottom ? extractColorName(outfit.items.bottom) : null;
  const outerColor = outfit.items.outer ? extractColorName(outfit.items.outer) : null;

  const primaryTopFit = outfit.fits.inner || outfit.fits.outer;
  const topVol = primaryTopFit ? (FIT_VOLUME[primaryTopFit] || 2) : 2;
  const botVol = outfit.fits.bottom ? (FIT_VOLUME[outfit.fits.bottom] || 2) : 2;

  const innerMeta = getItemMeta('inner', selectedType.inner);
  const outerMeta = getItemMeta('outer', selectedType.outer);
  const bottomMeta = getItemMeta('bottom', selectedType.bottom);

  // 1. Pan
  if (outerMeta && outerMeta.structure === 'structured' && innerMeta && innerMeta.structure === 'soft') {
    return "Pan — Structural shift: Sharp outer layer over a soft inner base";
  }

  // 2. WI / Wit
  const isFormalMix = checkFormalCasualMix([innerMeta, outerMeta, bottomMeta].filter(Boolean));
  if (isFormalMix) {
    return "WI (Wit) — High-low styling: Blending tailored pieces with casual basics";
  }

  // 3. Pointing Down
  if (outerColor && isDark(outerColor)) {
    const isInnerBold = innerColor && isBold(innerColor);
    const isBottomBold = bottomColor && isBold(bottomColor);
    if (isInnerBold || isBottomBold) {
      return "Pointing Down — Bold accent color grounded by dark outerwear";
    }
  }

  // 4. Tone on Tone
  const effectiveTopColor = innerColor || outerColor;
  if (effectiveTopColor && bottomColor) {
    const topFamily = getColorFamily(effectiveTopColor);
    const bottomFamily = getColorFamily(bottomColor);
    if (topFamily && bottomFamily && topFamily === bottomFamily && effectiveTopColor !== bottomColor) {
      return "Tone on Tone — " + capitalize(topFamily) + " color family in varying shades (" + effectiveTopColor + " + " + bottomColor + ")";
    }
  }

  // 5. Rule of Thirds
  if ((topVol === 1 && botVol >= 2) || (topVol >= 2 && botVol === 1)) {
    return "Rule of Thirds — Balanced 1:2 volume ratio";
  }

  // 6. Damin Look
  if (topVol >= 2 && botVol >= 2 && isNeutral(effectiveTopColor) && isNeutral(bottomColor)) {
    return "Damin Look — Minimalist loose-fit neutral basics";
  }

  // 7. Go
  if (!outfit.items.outer && topVol === botVol) {
    return "Go — Effortless, proportion-driven baseline look";
  }

  if (outerColor && innerColor) return "Layered Silhouette";
  return "Clean Minimal Baseline";
}

function extractColorName(itemString) {
  if (!itemString) return null;
  const match = QUICK_COLOR_PALETTE.find(c => itemString.toLowerCase().startsWith(c.name.toLowerCase()));
  return match ? match.name : itemString.split(' ')[0];
}

function getItemMeta(slot, label) {
  if (!label || !GARMENT_DATA[slot]) return null;
  return GARMENT_DATA[slot].find(i => i.label === label) || null;
}

function checkFormalCasualMix(metaList) {
  if (metaList.length < 2) return false;
  const ranks = metaList.map(m => m.formality || 1);
  return ranks.some(r => r === 3) && ranks.some(r => r === 1);
}

function getColorFamily(colorName) {
  if (!colorName) return null;
  const c = colorName.toLowerCase();
  if (['white', 'ivory', 'off-white', 'cream', 'oatmeal', 'heather grey', 'grey', 'charcoal', 'off-black', 'black'].some(x => c.includes(x))) return 'monochrome';
  if (['sky blue', 'light blue', 'washed indigo', 'raw denim', 'navy', 'midnight blue', 'cobalt', 'slate blue'].some(x => c.includes(x))) return 'blue';
  if (['sage', 'matcha', 'olive', 'dark olive', 'forest green', 'pine green', 'emerald'].some(x => c.includes(x))) return 'green';
  if (['sand', 'beige', 'tan', 'khaki', 'camel', 'taupe', 'cognac', 'brown', 'espresso', 'terracotta', 'rust', 'brick red'].some(x => c.includes(x))) return 'earth';
  if (['butter yellow', 'mustard', 'soft pink', 'lilac', 'lavender', 'plum', 'burgundy', 'crimson'].some(x => c.includes(x))) return 'accent';
  return null;
}

function isNeutral(c) { const f = getColorFamily(c); return f === 'monochrome' || f === 'earth'; }
function isBold(c) { return ['Crimson', 'Cobalt', 'Emerald', 'Mustard', 'Terracotta', 'Rust', 'Burgundy', 'Plum'].some(b => c && c.includes(b)); }
function isDark(c) { return ['Black', 'Charcoal', 'Navy', 'Raw Denim', 'Espresso', 'Midnight Blue', 'Dark Olive'].some(d => c && c.includes(d)); }
function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

// GENERATE BY CONCEPT
function generateByConcept(conceptType) {
  saveSnapshot();

  if (conceptType === 'tone_on_tone') {
    const c1 = QUICK_COLOR_PALETTE.find(c => c.name === 'Light Blue');
    const c2 = QUICK_COLOR_PALETTE.find(c => c.name === 'Navy');

    const topItem = GARMENT_DATA.inner.find(i => i.label === 'Shirt');
    const botItem = GARMENT_DATA.bottom.find(i => i.label === 'Chinos');

    selectedType.inner = topItem.label; selectedFit.inner = 'Regular';
    state.inner = c1.name + ' Regular ' + topItem.label;

    selectedType.bottom = botItem.label; selectedFit.bottom = 'Regular';
    state.bottom = c2.name + ' Regular ' + botItem.label;

    state.outer = null; selectedType.outer = null; selectedFit.outer = null;
  } 
  else if (conceptType === 'pan') {
    const outerItem = GARMENT_DATA.outer.find(i => i.label === 'Blazer') || GARMENT_DATA.outer.find(i => i.label === 'Denim Jacket');
    const innerItem = GARMENT_DATA.inner.find(i => i.label === 'Tee');
    const botItem = GARMENT_DATA.bottom.find(i => i.label === 'Jeans');

    selectedType.outer = outerItem.label; selectedFit.outer = 'Tailored';
    state.outer = 'Black Tailored ' + outerItem.label;

    selectedType.inner = innerItem.label; selectedFit.inner = 'Regular';
    state.inner = 'White Regular ' + innerItem.label;

    selectedType.bottom = botItem.label; selectedFit.bottom = 'Straight';
    state.bottom = 'Raw Denim Straight ' + botItem.label;
  }
  else if (conceptType === 'pointing_down') {
    const outerItem = GARMENT_DATA.outer.find(i => i.label === 'Denim Jacket');
    const innerItem = GARMENT_DATA.inner.find(i => i.label === 'Tee');
    const botItem = GARMENT_DATA.bottom.find(i => i.label === 'Chinos');

    selectedType.outer = outerItem.label; selectedFit.outer = 'Regular';
    state.outer = 'Black Regular ' + outerItem.label;

    selectedType.inner = innerItem.label; selectedFit.inner = 'Regular';
    state.inner = 'Crimson Regular ' + innerItem.label;

    selectedType.bottom = botItem.label; selectedFit.bottom = 'Regular';
    state.bottom = 'Beige Regular ' + botItem.label;
  }
  else if (conceptType === 'wit') {
    const innerItem = GARMENT_DATA.inner.find(i => i.label === 'Tee');
    const botItem = GARMENT_DATA.bottom.find(i => i.label === 'Straight Trousers');
    const outerItem = GARMENT_DATA.outer.find(i => i.label === 'Denim Jacket');

    selectedType.inner = innerItem.label; selectedFit.inner = 'Regular';
    state.inner = 'White Regular ' + innerItem.label;

    selectedType.bottom = botItem.label; selectedFit.bottom = 'Straight';
    state.bottom = 'Charcoal Straight ' + botItem.label;

    selectedType.outer = outerItem.label; selectedFit.outer = 'Boxy';
    state.outer = 'Blue Boxy ' + outerItem.label;
  }
  else if (conceptType === 'damin') {
    const innerItem = GARMENT_DATA.inner.find(i => i.label === 'Tee');
    const botItem = GARMENT_DATA.bottom.find(i => i.label === 'Wide Leg Trousers');

    selectedType.inner = innerItem.label; selectedFit.inner = 'Oversized';
    state.inner = 'Off-white Oversized ' + innerItem.label;

    selectedType.bottom = botItem.label; selectedFit.bottom = 'Wide Leg';
    state.bottom = 'Charcoal Wide Leg ' + botItem.label;

    state.outer = null; selectedType.outer = null; selectedFit.outer = null;
  }
  else if (conceptType === 'rule_of_thirds') {
    const innerItem = GARMENT_DATA.inner.find(i => i.label === 'Crop Tee') || GARMENT_DATA.inner.find(i => i.label === 'Tee');
    const botItem = GARMENT_DATA.bottom.find(i => i.label === 'Wide Leg Trousers');

    selectedType.inner = innerItem.label; selectedFit.inner = 'Fitted';
    state.inner = 'Black Fitted ' + innerItem.label;

    selectedType.bottom = botItem.label; selectedFit.bottom = 'Wide Leg';
    state.bottom = 'Beige Wide Leg ' + botItem.label;

    state.outer = null; selectedType.outer = null; selectedFit.outer = null;
  }

  selectedType.shoe = 'Sneakers';
  state.shoe = 'White Sneakers';

  syncGridCardClasses();
  render();
}

// PARALLEL RULE ENGINE
class ParallelRuleEngine {
  constructor(pipelineConfig = []) {
    this.pipeline = pipelineConfig;
  }

  evaluate(outfitData) {
    const history = [];
    let hasWarning = false;

    for (const section of this.pipeline) {
      if (!section.enabled) continue;
      const sectionResult = this.evaluateSection(section, outfitData);
      history.push(sectionResult);

      if (sectionResult.status !== "PASS") {
        hasWarning = true;
      }
    }

    return {
      verdict: hasWarning ? "NEEDS STYLING FIX" : "BALANCED OUTFIT",
      results: history,
      concept: getConcept(outfitData)
    };
  }

  evaluateSection(section, outfitData) {
    const ruleResults = [];
    for (const rule of section.rules) {
      if (rule.enabled === false) continue;
      const res = rule.eval(outfitData);
      ruleResults.push({ id: rule.id, ...res });
    }

    const failedRule = ruleResults.find(r => r.status !== "PASS");

    return {
      sectionId: section.id,
      sectionName: section.name,
      status: failedRule ? failedRule.status : "PASS",
      reason: failedRule ? failedRule.reason : "Passed section guidelines.",
      recommendation: failedRule ? failedRule.recommendation : null,
      ruleResults: ruleResults
    };
  }
}

// CONFIGURABLE PIPELINE
const pipelineConfig = [
  {
    id: "A",
    name: "A. Silhouette & Proportions",
    order: 1,
    enabled: true,
    rules: [
      {
        id: "SILHOUETTE_VOLUME_BALANCE",
        enabled: true,
        eval: (outfit) => {
          const innerFit = outfit.fits.inner;
          const outerFit = outfit.fits.outer;
          const topVol = innerFit ? (FIT_VOLUME[innerFit] || 2) : (outerFit ? (FIT_VOLUME[outerFit] || 2) : 2);
          const botVol = outfit.fits.bottom ? (FIT_VOLUME[outfit.fits.bottom] || 2) : 2;
          const hasOuter = !!outfit.items.outer;
          const outerVolNum = outerFit ? (FIT_VOLUME[outerFit] || 2) : 2;

          if (topVol >= 3 && botVol >= 3) {
            if (hasOuter && innerFit && outerVolNum <= 2) {
              return {
                status: "PASS",
                reason: "Loose top + wide bottom silhouette is rescued & anchored by your structured outer layer."
              };
            } else if (hasOuter && innerFit && outerVolNum === 3) {
              return {
                status: "WARN",
                reason: "Loose top + wide bottom + oversized outerwear creates an unanchored drape.",
                recommendation: "Swap outer layer to a fitted/structured jacket (e.g. Denim Jacket, Chore Coat) or tuck in your top."
              };
            } else {
              return {
                status: "WARN",
                reason: "Loose top + wide bottom risks losing structure.",
                recommendation: "Try adding a structured Outer Layer (e.g. Denim Jacket) to anchor the volume, or switch to Slim/Regular Trousers."
              };
            }
          }
          return { status: "PASS", reason: "Proportions adhere to volume balance rules." };
        }
      }
    ]
  },
  {
    id: "B",
    name: "B. Color Harmony & Contrast",
    order: 2,
    enabled: true,
    rules: [
      {
        id: "BOLD_COLOR_LIMIT",
        enabled: true,
        eval: (outfit) => {
          if (outfit.boldCount > 2) {
            return {
              status: "WARN",
              reason: "Too many competing bold statement colors.",
              recommendation: "Ground the look with dark or neutral outerwear (Black/Navy) or tone down one piece to an earth tone."
            };
          }
          return { status: "PASS", reason: "Color palette is harmoniously balanced." };
        }
      }
    ]
  },
  {
    id: "C",
    name: "C. Layering Mechanics & Outer Flow",
    order: 3,
    enabled: true,
    rules: [
      {
        id: "LAYERING_HEAVINESS_FLOW",
        enabled: true,
        eval: (outfit) => {
          const topVol = outfit.fits.inner ? (FIT_VOLUME[outfit.fits.inner] || 2) : 2;
          const outerItem = outfit.items.outer;

          if (outerItem && outerItem.includes('Denim Jacket') && topVol === 3) {
            return {
              status: "WARN",
              reason: "Inner top is bulky (Oversized) under a rigid Denim Jacket.",
              recommendation: "Use a Fitted or Regular Tee underneath rigid jackets to avoid arm/shoulder bunching."
            };
          }
          return { status: "PASS", reason: "Garment weights and fabric drape flow naturally." };
        }
      }
    ]
  }
];

// STATE MANAGEMENT, SAVED OUTFITS, WISHLIST & LOCALSTORAGE
let state = { inner: null, outer: null, bottom: null, shoe: null, accs: {} };
let selectedFit = { inner: null, outer: null, bottom: null };
let selectedType = { inner: null, outer: null, bottom: null, shoe: null, acc: null };
let savedOutfits = [];
let wishlist = [];
const activeColorCategory = { inner: 'all', outer: 'all', bottom: 'all', shoe: 'all', acc: 'all' };

const LOCAL_STORAGE_KEY = 'wardrobe_matrix_state_v7';

function saveStateToLocalStorage() {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ state, selectedFit, selectedType, savedOutfits, wishlist }));
}

function loadStateFromLocalStorage() {
  const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!saved) return;
  try {
    const data = JSON.parse(saved);
    if (data.state) state = data.state;
    if (data.selectedFit) selectedFit = data.selectedFit;
    if (data.selectedType) selectedType = data.selectedType;
    if (data.savedOutfits) savedOutfits = data.savedOutfits;
    if (data.wishlist) wishlist = data.wishlist;
    syncGridCardClasses();
  } catch (e) {
    console.warn('Could not parse localStorage state.');
  }
}

let previousSnapshot = null;
function saveSnapshot() {
  previousSnapshot = JSON.parse(JSON.stringify({ state, selectedFit, selectedType }));
  document.getElementById('undo-btn').disabled = false;
}

function undoLastAction() {
  if (!previousSnapshot) return;
  state = JSON.parse(JSON.stringify(previousSnapshot.state));
  selectedFit = JSON.parse(JSON.stringify(previousSnapshot.selectedFit));
  selectedType = JSON.parse(JSON.stringify(previousSnapshot.selectedType));
  previousSnapshot = null;
  document.getElementById('undo-btn').disabled = true;
  syncGridCardClasses();
  render();
}

function syncGridCardClasses() {
  document.querySelectorAll('.item-card').forEach(c => c.classList.remove('selected'));
  ['inner', 'outer', 'bottom', 'shoe'].forEach(slot => {
    if (selectedType[slot]) {
      const card = document.querySelector('[data-qgroup="' + slot + '"][data-label="' + selectedType[slot] + '"]');
      if (card) card.classList.add('selected');
    }
  });

  Object.keys(state.accs).forEach(accLabel => {
    const card = document.querySelector('[data-qgroup="acc"][data-label="' + accLabel + '"]');
    if (card) card.classList.add('selected');
  });

  // Sync heart status
  document.querySelectorAll('.wishlist-heart-btn').forEach(btn => {
    const itemKey = btn.getAttribute('data-item-key');
    if (wishlist.includes(itemKey)) btn.classList.add('active');
    else btn.classList.remove('active');
  });
}

function toggleWishlist(e, slot, label) {
  e.stopPropagation();
  const itemKey = slot + ':' + label;
  const index = wishlist.indexOf(itemKey);
  if (index > -1) wishlist.splice(index, 1);
  else wishlist.push(itemKey);
  
  saveStateToLocalStorage();
  syncGridCardClasses();
  renderWishlist();
}

function initQuickPickers() {
  Object.keys(GARMENT_DATA).forEach(slot => {
    const container = document.getElementById('grid-' + slot);
    container.innerHTML = GARMENT_DATA[slot].map(item => `
      <div class="item-card" data-qgroup="${slot}" data-label="${item.label}" data-tags="${item.tags ? item.tags.join(',') : ''}" onclick="handleCardClick('${slot}',this,'${item.label}',${item.noColor || false})">
        ${item.label !== 'None' ? `<span class="wishlist-heart-btn" data-item-key="${slot}:${item.label}" onclick="toggleWishlist(event, '${slot}', '${item.label}')">♥</span>` : ''}
        <div class="card-top"><span class="card-label">${item.label}</span></div>
        <div class="card-sub">${item.desc}</div>
      </div>
    `).join('');
  });
}

function renderColorCategoryPills(slot) {
  const bar = document.getElementById('color-cat-bar-' + slot);
  if (!bar) return;
  bar.innerHTML = COLOR_CATEGORIES.map(cat => `
    <button class="color-cat-pill ${activeColorCategory[slot] === cat.id ? 'active' : ''}" onclick="filterColorPalette('${slot}','${cat.id}')">${cat.label}</button>
  `).join('');
}

function renderColorChips(slot) {
  const chips = document.getElementById('color-chips-' + slot);
  if (!chips) return;
  const currentCat = activeColorCategory[slot] || 'all';
  const filteredColors = currentCat === 'all' ? QUICK_COLOR_PALETTE : QUICK_COLOR_PALETTE.filter(c => c.cat === currentCat);

  chips.innerHTML = filteredColors.map(c => `
    <button class="color-chip" onclick="finalizeQuickColor('${slot}','${c.name}')">
      <span class="chip-dot" style="background:${c.hex}"></span>${c.name}
    </button>
  `).join('');
}

function filterColorPalette(slot, catId) {
  activeColorCategory[slot] = catId;
  renderColorCategoryPills(slot);
  renderColorChips(slot);
}

function handleCardClick(slot, cardEl, label, noColor) {
  saveSnapshot();

  if (slot === 'acc') {
    if (noColor) {
      document.querySelectorAll('[data-qgroup="acc"]').forEach(c => c.classList.remove('selected'));
      state.accs = {};
      selectedType.acc = null;
      document.getElementById('color-panel-acc').classList.remove('open');
      render();
      return;
    }
    const noneCard = document.querySelector('[data-qgroup="acc"][data-label="None"]');
    if (noneCard) noneCard.classList.remove('selected');

    selectedType.acc = label;
    const colorPanel = document.getElementById('color-panel-acc');
    renderColorCategoryPills('acc');
    renderColorChips('acc');
    colorPanel.classList.add('open');
    return;
  }

  document.querySelectorAll('[data-qgroup="' + slot + '"]').forEach(c => c.classList.remove('selected'));
  cardEl.classList.add('selected');

  if (noColor) {
    document.getElementById('color-panel-' + slot).classList.remove('open');
    state[slot] = null;
    selectedType[slot] = null;
    selectedFit[slot] = null;
    render();
    return;
  }

  selectedType[slot] = label;
  const itemObj = GARMENT_DATA[slot].find(i => i.label === label);
  const colorPanel = document.getElementById('color-panel-' + slot);
  
  const fitContainer = document.getElementById('fit-container-' + slot);
  const fitChips = document.getElementById('fit-chips-' + slot);
  const presetFit = FIT_SPECIFIC_GARMENTS[label];

  if (!presetFit && fitContainer && itemObj && itemObj.fits && itemObj.fits.length > 0) {
    fitChips.innerHTML = itemObj.fits.map(f => `
      <button class="fit-chip ${f === selectedFit[slot] ? 'selected' : ''}" onclick="setFit('${slot}','${f}',this)">${f}</button>
    `).join('');
    fitContainer.style.display = 'block';
  } else {
    selectedFit[slot] = presetFit || null;
    if (fitContainer) fitContainer.style.display = 'none';
  }

  renderColorCategoryPills(slot);
  renderColorChips(slot);
  colorPanel.classList.add('open');
}

function setFit(slot, fitVal, btnEl) {
  saveSnapshot();
  selectedFit[slot] = fitVal;
  btnEl.parentElement.querySelectorAll('.fit-chip').forEach(c => c.classList.remove('selected'));
  btnEl.classList.add('selected');
}

function finalizeQuickColor(slot, colorName) {
  saveSnapshot();
  if (slot === 'acc') {
    const accLabel = selectedType.acc;
    state.accs[accLabel] = colorName + ' ' + accLabel;
    const card = document.querySelector('[data-qgroup="acc"][data-label="' + accLabel + '"]');
    if (card) card.classList.add('selected');
  } else {
    const fitStr = selectedFit[slot] ? selectedFit[slot] + ' ' : '';
    state[slot] = colorName + ' ' + fitStr + selectedType[slot];
  }
  document.getElementById('color-panel-' + slot).classList.remove('open');
  render();
}

function clearSlot(slot) {
  saveSnapshot();
  if (slot === 'acc') {
    state.accs = {};
    selectedType.acc = null;
  } else {
    state[slot] = null;
    selectedType[slot] = null;
    selectedFit[slot] = null;
  }
  document.querySelectorAll('[data-qgroup="' + slot + '"]').forEach(c => c.classList.remove('selected'));
  document.getElementById('color-panel-' + slot).classList.remove('open');
  render();
}

function clearAllSelections() {
  saveSnapshot();
  state = { inner: null, outer: null, bottom: null, shoe: null, accs: {} };
  selectedFit = { inner: null, outer: null, bottom: null };
  selectedType = { inner: null, outer: null, bottom: null, shoe: null, acc: null };
  document.querySelectorAll('.item-card').forEach(c => c.classList.remove('selected'));
  document.querySelectorAll('.preset-color-panel').forEach(p => p.classList.remove('open'));
  render();
}

function setOccasionFilter(tag, btnEl) {
  document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
  btnEl.classList.add('active');

  document.querySelectorAll('.item-card').forEach(card => {
    const cardTags = card.getAttribute('data-tags') ? card.getAttribute('data-tags').split(',') : [];
    if (tag === 'all' || cardTags.includes(tag)) card.classList.remove('filtered-out');
    else card.classList.add('filtered-out');
  });
}

function updateSummaryCards() {
  ['inner', 'outer', 'bottom', 'shoe'].forEach(slot => {
    const card = document.getElementById('summary-card-' + slot);
    const tag = document.getElementById('summary-tag-' + slot);
    const btn = document.getElementById('clear-btn-' + slot);
    const section = document.getElementById('slot-' + slot);

    if (state[slot]) {
      tag.textContent = state[slot];
      card.classList.add('active');
      if (btn) btn.classList.add('active');
      if (section) section.classList.add('has-selection');
    } else {
      card.classList.remove('active');
      if (btn) btn.classList.remove('active');
      if (section) section.classList.remove('has-selection');
    }
  });

  const accCard = document.getElementById('summary-card-acc');
  const accTag = document.getElementById('summary-tag-acc');
  const accBtn = document.getElementById('clear-btn-acc');
  const accSection = document.getElementById('slot-acc');
  const accVals = Object.values(state.accs);

  if (accVals.length > 0) {
    accTag.textContent = accVals.join(' + ');
    accCard.classList.add('active');
    if (accBtn) accBtn.classList.add('active');
    if (accSection) accSection.classList.add('has-selection');
  } else {
    accCard.classList.remove('active');
    if (accBtn) accBtn.classList.remove('active');
    if (accSection) accSection.classList.remove('has-selection');
  }
}

function getRandomItem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function randomizeOutfit() {
  saveSnapshot();
  const concepts = ['tone_on_tone', 'pan', 'pointing_down', 'wit', 'damin', 'rule_of_thirds'];
  const randomConcept = getRandomItem(concepts);
  generateByConcept(randomConcept);
}

function getBoldCount() {
  let count = 0;
  ['inner', 'outer', 'bottom', 'shoe'].forEach(s => {
    if (state[s] && (state[s].includes('Crimson') || state[s].includes('Cobalt') || state[s].includes('Emerald') || state[s].includes('Mustard'))) count++;
  });
  return count;
}

function saveCurrentOutfit() {
  const outfitData = { fits: selectedFit, items: state, boldCount: getBoldCount() };
  const concept = getConcept(outfitData);
  const promptText = document.getElementById('prompt-text').innerText;

  savedOutfits.unshift({
    id: Date.now(),
    concept: concept,
    summary: promptText,
    date: new Date().toLocaleDateString()
  });

  saveStateToLocalStorage();
  renderSavedOutfits();

  const btn = document.getElementById('save-outfit-btn');
  btn.textContent = 'Saved!';
  setTimeout(() => { btn.textContent = 'Save outfit'; }, 2000);
}

function deleteSavedOutfit(id) {
  savedOutfits = savedOutfits.filter(o => o.id !== id);
  saveStateToLocalStorage();
  renderSavedOutfits();
}

function renderSavedOutfits() {
  const container = document.getElementById('saved-list');
  if (savedOutfits.length === 0) {
    container.innerHTML = '<div class="empty-state">No saved outfits yet. Click "Save outfit" in the builder view to store fits here.</div>';
    return;
  }

  container.innerHTML = savedOutfits.map(o => `
    <div class="saved-item-card">
      <div>
        <div class="saved-item-info">${o.summary}</div>
        <div class="saved-item-concept">${o.concept} — ${o.date}</div>
      </div>
      <button class="delete-saved-btn" onclick="deleteSavedOutfit(${o.id})">Delete</button>
    </div>
  `).join('');
}

function renderWishlist() {
  const container = document.getElementById('wishlist-list');
  if (wishlist.length === 0) {
    container.innerHTML = '<div class="empty-state">No items in your wishlist yet. Click the heart icon on any item card to favorite it.</div>';
    return;
  }

  container.innerHTML = wishlist.map(key => {
    const [slot, label] = key.split(':');
    const item = getItemMeta(slot, label);
    return `
      <div class="wishlist-item-card">
        <div>
          <div style="font-size:13px;font-weight:500;color:var(--text);">${label} <span style="font-size:11px;color:var(--text-3);font-weight:400;">(${slot})</span></div>
          <div style="font-size:11px;color:var(--text-3);">${item ? item.desc : ''}</div>
        </div>
        <button class="delete-saved-btn" onclick="toggleWishlist(event, '${slot}', '${label}')">Remove</button>
      </div>
    `;
  }).join('');
}

function render() {
  updateSummaryCards();
  saveStateToLocalStorage();

  const r = document.getElementById('result');
  const pa = document.getElementById('prompt-area');

  const hasTop = state.inner || state.outer;
  if (!hasTop || !state.bottom) {
    r.innerHTML = '<div class="placeholder">Your outfit will appear here<span>Select a top (or outer layer) + bottom to start evaluation</span></div>';
    pa.style.display = 'none';
    return;
  }

  const outfitData = { fits: selectedFit, items: state, boldCount: getBoldCount() };

  const engine = new ParallelRuleEngine(pipelineConfig);
  const result = engine.evaluate(outfitData);

  let h = '<div class="result-label">Evaluation & Layering Pipeline</div><div class="outfit-row">';
  if (state.inner) h += '<span class="outfit-tag tag-inner">' + state.inner + '</span>';
  if (state.outer) h += (state.inner ? '<span class="arrow">+</span>' : '') + '<span class="outfit-tag tag-outer">' + state.outer + '</span>';
  h += '<span class="arrow">+</span><span class="outfit-tag tag-bottom">' + state.bottom + '</span>';
  if (state.shoe) h += '<span class="arrow">+</span><span class="outfit-tag tag-shoe">' + (state.shoe || 'Sneakers') + '</span>';
  
  Object.values(state.accs).forEach(accVal => {
    h += '<span class="arrow">+</span><span class="outfit-tag tag-acc">' + accVal + '</span>';
  });

  h += '</div>';

  h += '<div class="concept-pill">Concept: ' + result.concept + '</div>';

  h += '<div class="gate-pipeline">';
  pipelineConfig.forEach(secDef => {
    const evalRes = result.results.find(res => res.sectionId === secDef.id);
    if (evalRes) {
      const isPass = evalRes.status === "PASS";
      h += `
        <div class="gate-step ${isPass ? '' : 'gate-step-warn'}">
          <div class="gate-header">
            <span class="gate-title">${secDef.name}</span>
            <span class="gate-badge ${isPass ? 'gate-pass' : 'gate-warn'}">${evalRes.status}</span>
          </div>
          <div class="gate-reason">${evalRes.reason}</div>
          ${evalRes.recommendation ? `<div class="gate-recommendation">${evalRes.recommendation}</div>` : ''}
        </div>
      `;
    }
  });

  h += '</div>';

  const isFinalPass = result.verdict === "BALANCED OUTFIT";
  h += `
    <div class="final-verdict-banner ${isFinalPass ? 'verdict-pass' : 'verdict-warn'}">
      <span>FINAL OUTCOME: ${result.verdict}</span>
      <span>${isFinalPass ? 'All Proportions & Palette Rules Satisfied' : 'Actionable Recommendations Offered Above'}</span>
    </div>
  `;

  r.innerHTML = h;
  pa.style.display = 'block';
  document.getElementById('prompt-text').innerText = ((state.inner || '') + ', ' + (state.outer || '') + ', ' + state.bottom + ', ' + (state.shoe || '')).replace(/^,\s*/, '').replace(/\s+/g, ' ').trim();
}

function copyPrompt() {
  const text = document.getElementById('prompt-text').innerText;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('copy-btn'); btn.textContent = 'Copied!';
    setTimeout(() => { btn.textContent = 'Copy prompt'; }, 2000);
  });
}

function switchView(view) {
  document.getElementById('view-builder').classList.toggle('active', view === 'builder');
  document.getElementById('view-saved').classList.toggle('active', view === 'saved');
  document.getElementById('view-wishlist').classList.toggle('active', view === 'wishlist');

  document.getElementById('nav-builder').classList.toggle('active', view === 'builder');
  document.getElementById('nav-saved').classList.toggle('active', view === 'saved');
  document.getElementById('nav-wishlist').classList.toggle('active', view === 'wishlist');

  if (view === 'saved') renderSavedOutfits();
  if (view === 'wishlist') renderWishlist();
}

// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('Service Worker registered.'))
      .catch(err => console.error('Service Worker registration failed:', err));
  });
}

initQuickPickers();
loadStateFromLocalStorage();
render();
renderSavedOutfits();
renderWishlist();
