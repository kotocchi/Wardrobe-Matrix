// ── GARMENT DATA WITH FIT OPTIONS & OCCASION TAGS ────
const GARMENT_DATA = {
  inner: [
    { label: 'Tee', desc: 'Basic crewneck', fits: ['Regular', 'Slim', 'Oversized', 'Boxy', 'Longline'], tags: ['casual', 'street', 'bali'] }, 
    { label: 'Shirt', desc: 'Button-up shirt', fits: ['Regular', 'Slim', 'Relaxed', 'Oversized'], tags: ['smart', 'casual'] },
    { label: 'Overshirt', desc: 'Layering shirt', fits: ['Regular', 'Boxy', 'Oversized'], tags: ['street', 'casual'] }, 
    { label: 'Polo', desc: 'Knit / classic', fits: ['Regular', 'Slim'], tags: ['smart', 'casual'] },
    { label: 'Tank Top', desc: 'Sleeveless / ribbed', fits: ['Fitted', 'Relaxed'], tags: ['casual', 'bali'] }, 
    { label: 'Muscle Tee', desc: 'Sleeveless, fitted', fits: [], tags: ['casual', 'bali'] },
    { label: 'Crop Tee', desc: 'Cropped hem', fits: [], tags: ['street', 'casual'] },
    { label: 'Ringer Tee', desc: 'Contrast collar/trim', fits: ['Regular', 'Slim', 'Oversized'], tags: ['casual', 'street'] },
    { label: 'Baseball Tee', desc: 'Raglan sleeves', fits: ['Regular', 'Oversized'], tags: ['casual', 'street'] },
    { label: 'Rugby Shirt', desc: 'Striped collar', fits: ['Regular', 'Boxy'], tags: ['street', 'casual'] },
    { label: 'Linen Shirt SS', desc: 'Breathable, Bali weather', fits: ['Regular', 'Relaxed'], tags: ['bali', 'casual', 'smart'] },
    { label: 'Mock Neck', desc: 'Cleaner than turtleneck', fits: ['Slim', 'Regular'], tags: ['smart', 'street'] },
    { label: 'Waffle Knit Top', desc: 'Textured base layer', fits: ['Slim', 'Regular'], tags: ['casual'] },
    { label: 'Long Sleeve', desc: 'Base layer', fits: ['Regular', 'Slim', 'Oversized'], tags: ['casual', 'street'] }, 
    { label: 'Henley', desc: 'Buttoned collar', fits: ['Regular', 'Slim'], tags: ['casual'] }, 
    { label: 'Turtleneck', desc: 'High collar', fits: ['Slim', 'Regular'], tags: ['smart'] },
    { label: 'Knit Sweater', desc: 'Pullover', fits: ['Regular', 'Oversized', 'Relaxed'], tags: ['smart', 'casual'] }, 
    { label: 'Hoodie', desc: 'Casual pullover', fits: ['Regular', 'Oversized', 'Boxy'], tags: ['street', 'casual'] }
  ],
  outer: [
    { label: 'None', desc: 'Single layer fit', noColor: true, fits: [], tags: ['casual', 'smart', 'bali', 'street'] }, 
    { label: 'Linen Shirt', desc: 'Open overshirt', fits: ['Regular', 'Relaxed'], tags: ['bali', 'casual', 'smart'] },
    { label: 'Denim Jacket', desc: 'Classic casual', fits: ['Regular', 'Boxy', 'Oversized'], tags: ['casual', 'street'] }, 
    { label: 'Cardigan', desc: 'Smart-casual knit', fits: ['Regular', 'Oversized'], tags: ['smart', 'casual'] },
    { label: 'Field Jacket', desc: 'Utility, mid-weight', fits: ['Regular', 'Boxy'], tags: ['street', 'casual'] },
    { label: 'Harrington Jacket', desc: 'Classic, zip-up, clean', fits: ['Regular', 'Slim'], tags: ['smart', 'casual'] },
    { label: 'Chore Coat', desc: 'Workwear-inspired, boxy', fits: ['Regular', 'Boxy'], tags: ['street', 'casual'] },
    { label: 'Vest / Gilet', desc: 'Sleeveless layer, hot weather', fits: ['Regular', 'Slim'], tags: ['bali', 'street'] },
    { label: 'Kimono Jacket', desc: 'Drapey, earth-tone friendly', fits: [], tags: ['bali', 'street'] },
    { label: 'Fleece Jacket', desc: 'Casual warmth', fits: ['Regular', 'Oversized'], tags: ['casual'] },
    { label: 'Track Jacket', desc: 'Sporty zip layer', fits: ['Regular', 'Slim'], tags: ['street', 'casual'] },
    { label: 'Poncho / Cape', desc: 'Statement piece', fits: [], tags: ['street'] },
    { label: 'Bomber Jacket', desc: 'Streetwear staple', fits: ['Regular', 'Boxy', 'Oversized'], tags: ['street', 'casual'] }, 
    { label: 'Blazer', desc: 'Tailored / sharp', fits: ['Tailored', 'Regular', 'Oversized'], tags: ['smart'] },
    { label: 'Trench Coat', desc: 'Long outerwear', fits: ['Regular', 'Oversized'], tags: ['smart'] }, 
    { label: 'Puffer Jacket', desc: 'Warm winter layer', fits: ['Regular', 'Oversized'], tags: ['street', 'casual'] }
  ],
  bottom: [
    { label: 'Chinos', desc: 'Smart-casual', fits: ['Slim', 'Regular', 'Relaxed'], tags: ['smart', 'casual'] }, 
    { label: 'Straight Trousers', desc: 'Tailored fit', fits: ['Straight', 'Slim'], tags: ['smart'] },
    { label: 'Jeans', desc: 'Denim classic', fits: ['Slim', 'Straight', 'Regular', 'Wide Leg', 'Baggy'], tags: ['casual', 'street'] }, 
    { label: 'Linen Trousers', desc: 'Breathable, great for Bali', fits: ['Relaxed', 'Straight'], tags: ['bali', 'smart', 'casual'] },
    { label: 'Wide Cropped Pants', desc: 'Fashion-forward culottes', fits: ['Cropped', 'Full Length'], tags: ['street', 'bali'] },
    { label: 'Track Pants', desc: 'Sporty', fits: ['Slim', 'Tapered', 'Regular'], tags: ['street', 'casual'] },
    { label: 'Carpenter Pants', desc: 'Utility loops, streetwear', fits: ['Straight', 'Relaxed'], tags: ['street', 'casual'] },
    { label: 'Corduroy Trousers', desc: 'Textured, seasonal', fits: ['Straight', 'Tapered', 'Regular'], tags: ['casual', 'smart'] },
    { label: 'Pleated Trousers', desc: 'Dressier', fits: ['Tapered', 'Regular'], tags: ['smart'] },
    { label: 'Denim Shorts', desc: 'Casual warm-weather', fits: ['Regular', 'Slim'], tags: ['bali', 'casual'] },
    { label: 'Cargo Shorts', desc: 'Utility warm-weather', fits: ['Regular', 'Relaxed'], tags: ['bali', 'casual'] },
    { label: 'Cargo Pants', desc: 'Utility pockets', fits: ['Regular', 'Baggy', 'Relaxed'], tags: ['street', 'casual'] },
    { label: 'Wide Leg Trousers', desc: 'Relaxed silhouette', fits: ['Cropped', 'Full Length'], tags: ['street', 'smart'] }, 
    { label: 'Joggers', desc: 'Athletic wear', fits: ['Slim', 'Tapered', 'Regular', 'Oversized'], tags: ['casual'] },
    { label: 'Shorts', desc: 'Warm weather', fits: ['Regular', 'Slim'], tags: ['bali', 'casual'] }
  ],
  shoe: [
    { label: 'Sneakers', desc: 'Everyday athletic', fits: [], tags: ['casual', 'street'] }, 
    { label: 'Running Shoes', desc: 'Tech runners / Asics', fits: [], tags: ['street', 'casual'] },
    { label: 'Loafers', desc: 'Smart-casual', fits: [], tags: ['smart'] },
    { label: 'Boots', desc: 'Leather / Chelsea', fits: [], tags: ['smart', 'casual'] }, 
    { label: 'Sandals', desc: 'Open toe', fits: [], tags: ['bali', 'casual'] },
    { label: 'Derbies', desc: 'Formal leather', fits: [], tags: ['smart'] }
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

// CATEGORIZED PALETTE DATA
const COLOR_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'neutral', label: 'Neutrals' },
  { id: 'earth', label: 'Earth Tones' },
  { id: 'blue', label: 'Blues/Denim' },
  { id: 'bold', label: 'Bold/Accents' },
  { id: 'metal', label: 'Metals' }
];

const QUICK_COLOR_PALETTE = [
  // Neutrals & Whites
  { name: 'White', hex: '#f0f0ec', cat: 'neutral' }, { name: 'Ivory', hex: '#f0ead8', cat: 'neutral' }, { name: 'Off-white', hex: '#ede8dc', cat: 'neutral' },
  { name: 'Cream', hex: '#f0ead0', cat: 'neutral' }, { name: 'Oatmeal', hex: '#e3dac9', cat: 'neutral' }, { name: 'Heather Grey', hex: '#cfcfcf', cat: 'neutral' },
  { name: 'Grey', hex: '#9a9a9a', cat: 'neutral' }, { name: 'Charcoal', hex: '#3a3a3a', cat: 'neutral' }, { name: 'Off-black', hex: '#262626', cat: 'neutral' },
  { name: 'Black', hex: '#1a1a1a', cat: 'neutral' },

  // Earth Tones
  { name: 'Sand', hex: '#d4b896', cat: 'earth' }, { name: 'Beige', hex: '#d6c5a8', cat: 'earth' }, { name: 'Tan', hex: '#c4a882', cat: 'earth' },
  { name: 'Khaki', hex: '#bfb28a', cat: 'earth' }, { name: 'Camel', hex: '#c4956a', cat: 'earth' }, { name: 'Taupe', hex: '#8a7f73', cat: 'earth' },
  { name: 'Cognac', hex: '#9e5b32', cat: 'earth' }, { name: 'Brown', hex: '#6e4f34', cat: 'earth' }, { name: 'Espresso', hex: '#3b281c', cat: 'earth' },
  { name: 'Terracotta', hex: '#c1634a', cat: 'earth' }, { name: 'Rust', hex: '#b35030', cat: 'earth' }, { name: 'Brick Red', hex: '#8c2d19', cat: 'earth' },
  { name: 'Sage', hex: '#9caf88', cat: 'earth' }, { name: 'Matcha', hex: '#a1b072', cat: 'earth' }, { name: 'Olive', hex: '#6b7c45', cat: 'earth' },
  { name: 'Dark Olive', hex: '#485431', cat: 'earth' }, { name: 'Forest Green', hex: '#2d4a3e', cat: 'earth' }, { name: 'Pine Green', hex: '#1c3b2b', cat: 'earth' },

  // Blues & Denim
  { name: 'Sky Blue', hex: '#a2c4c9', cat: 'blue' }, { name: 'Light Blue', hex: '#80a8c2', cat: 'blue' }, { name: 'Washed Indigo', hex: '#4b6b94', cat: 'blue' },
  { name: 'Raw Denim', hex: '#223859', cat: 'blue' }, { name: 'Navy', hex: '#1a2a4a', cat: 'blue' }, { name: 'Midnight Blue', hex: '#101726', cat: 'blue' },
  { name: 'Cobalt', hex: '#1f4ba6', cat: 'blue' }, { name: 'Slate Blue', hex: '#5a6b7c', cat: 'blue' },

  // Bold & Accents
  { name: 'Emerald', hex: '#107a48', cat: 'bold' }, { name: 'Butter Yellow', hex: '#f5e5a4', cat: 'bold' }, { name: 'Mustard', hex: '#d99b26', cat: 'bold' },
  { name: 'Soft Pink', hex: '#e8b5b5', cat: 'bold' }, { name: 'Lilac', hex: '#c5b0d5', cat: 'bold' }, { name: 'Lavender', hex: '#a69bb8', cat: 'bold' },
  { name: 'Plum', hex: '#4a2540', cat: 'bold' }, { name: 'Burgundy', hex: '#5c1b26', cat: 'bold' }, { name: 'Crimson', hex: '#8b0000', cat: 'bold' },

  // Metals
  { name: 'Silver', hex: '#c0c0c0', cat: 'metal' }, { name: 'Gold', hex: '#d4af37', cat: 'metal' }, { name: 'Bronze', hex: '#8c6d3b', cat: 'metal' }
];

// ── COLOR HARMONY MAP ────────────────────────────────
const COLOR_HARMONIES = {
  'olive': ['beige', 'sand', 'cream', 'black', 'raw denim', 'charcoal', 'off-white'],
  'brown': ['cream', 'white', 'beige', 'raw denim', 'black', 'sand'],
  'tan': ['navy', 'raw denim', 'white', 'charcoal', 'olive'],
  'terracotta': ['cream', 'off-white', 'black', 'navy', 'olive'],
  'khaki': ['white', 'navy', 'black', 'forest green'],
  'black': ['white', 'grey', 'olive', 'khaki', 'raw denim', 'sand', 'terracotta'],
  'white': ['raw denim', 'black', 'olive', 'navy', 'charcoal', 'brown', 'sand'],
  'grey': ['black', 'white', 'navy', 'raw denim'],
  'navy': ['white', 'cream', 'tan', 'khaki', 'grey', 'beige'],
  'raw denim': ['white', 'grey', 'olive', 'brown', 'sand', 'terracotta']
};

// ── COLOR LOGIC ───────────────────────────────────────
const BOLD_COLORS = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'teal', 'turquoise', 'cyan', 'aqua', 'magenta', 'fuchsia', 'violet', 'indigo', 'maroon', 'burgundy', 'crimson', 'scarlet', 'coral', 'salmon', 'peach', 'mustard', 'gold', 'amber', 'lime', 'chartreuse', 'cobalt', 'azure', 'cerulean', 'sapphire', 'neon', 'bright', 'electric', 'fluorescent', 'vivid', 'bold', 'hot pink', 'rose', 'raspberry', 'tangerine', 'pumpkin', 'emerald', 'jade', 'ultramarine', 'lavender', 'butter yellow', 'soft pink', 'lilac', 'plum', 'silver'];
const DARK_COLORS = ['black', 'dark', 'charcoal', 'navy', 'deep', 'off-black', 'pine', 'forest', 'espresso', 'raw denim', 'midnight blue'];
const EARTH_COLORS = ['olive', 'brown', 'beige', 'sand', 'cream', 'tan', 'khaki', 'terracotta', 'rust', 'camel', 'warm', 'grey', 'gray', 'sage', 'taupe', 'oatmeal', 'cognac', 'brick red', 'matcha', 'dark olive', 'bronze'];
const NEUTRAL_COLORS = ['white', 'ivory', 'off-white', 'slate', 'heather grey'];
const COOL_COLORS = ['sky blue', 'light blue', 'washed indigo', 'slate blue'];
const ALL_KNOWN = [...BOLD_COLORS, ...DARK_COLORS, ...EARTH_COLORS, ...NEUTRAL_COLORS, ...COOL_COLORS];
