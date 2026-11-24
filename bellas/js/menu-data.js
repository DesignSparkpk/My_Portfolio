/* =====================================================================
   BELLA'S — WEBSITE DATA
   ---------------------------------------------------------------------
   Everything the restaurant may want to change lives in this one file:
   phone, WhatsApp, hours, menu items, prices and "sold out" status.

   HOW TO EDIT
   - Change a price ............ edit the number (no commas, no "Rs").
   - Mark an item sold out ..... set  available: false
   - Hide an item completely ... delete its { ... } block
   - Add an item ............... copy an existing block and change it.
   - Item with sizes ........... use  sizes: [{ label: "Small", price: 595 }, ...]
                                 instead of  price: 595
   - Tags (optional) ........... "popular", "signature", "spicy", "new"
   - Category "tab" (optional) . shorter name for the menu tab button

   PRICE SOURCES
   - [MENU CARD]  read from the restaurant's own printed menu (Google Maps photo)
   - [ESTIMATE]   placeholder for the demo — confirm with Bella's before going live
   ===================================================================== */

window.BELLAS = {
  business: {
    name: "Bella's",
    type: "Family Restaurant",
    area: "Darvesh, Haripur",
    address: "Darvesh, Haripur, Khyber Pakhtunkhwa 22620, Pakistan",
    phoneDisplay: "0336 1131166",
    phoneIntl: "+923361131166",
    whatsapp: "923361131166",            // international format, no "+" or spaces
    mapsUrl: "https://maps.google.com/?cid=5048793112688946254",   // opens Bella's exact pin in Google Maps (verified: AKTHER NAWAZ KHAN, Darvesh, 33.99522, 72.92458)
    rating: 4.6,                         // Google rating
    reviewCount: 1105,                   // Google reviews
    timezone: "Asia/Karachi",
    hours: {
      open: "09:00",                     // 24-hour clock
      close: "02:00",                    // after midnight = next day
      label: "9:00 AM – 2:00 AM",
      days: "Every day"
    },
    currency: "Rs",
    delivery: {                          // [CONFIRM] with Bella's
      freeWithinKm: 5,                   // free delivery up to this distance
      feeBeyond: 100                     // Rs, charged when the address is farther away
    },
    // Mobile wallets shown when the customer picks online payment.
    // [SAMPLE] Replace with Bella's real account titles and numbers, then remove "sample: true".
    payments: [
      { id: "easypaisa", name: "EasyPaisa", accountTitle: "Bella's (sample)", number: "03XX-XXXXXXX", sample: true },
      { id: "jazzcash",  name: "JazzCash",  accountTitle: "Bella's (sample)", number: "03XX-XXXXXXX", sample: true }
    ],
    credit: { name: "DesignSpark", url: "" }
  },

  categories: [
    { id: "pizza",  name: "Pizza",            icon: "pizza" },
    { id: "pasta",  name: "Pasta & Noodles",  icon: "utensils-crossed" },
    { id: "mains",  name: "Steaks & Mains",   tab: "Steaks",  icon: "chef-hat" },
    { id: "burger", name: "Burgers & Fries",  icon: "flame" },
    { id: "shakes", name: "Ice Cream Shakes", tab: "Shakes",  icon: "cup-soda" },
    { id: "boba",   name: "Bubble Tea",       icon: "sparkles" },
    { id: "coffee", name: "Cold Coffee",      icon: "coffee" }
  ],

  items: [
    /* ---------- PIZZA — "Classic Flavours" ---------- */
    { id: "pz-tikka", category: "pizza", name: "Chicken Tikka Pizza",
      description: "Smoky tikka chicken, onions and green chillies on a rich tomato base with stretchy mozzarella.",
      sizes: [ { label: "Small", price: 595 }, { label: "Medium", price: 1095 }, { label: "Large", price: 1595 } ], // [ESTIMATE] small ≈ Foodpanda price
      tags: ["popular", "spicy"], available: true },

    { id: "pz-fajita", category: "pizza", name: "Chicken Fajita Pizza",
      description: "Fajita-spiced chicken, bell peppers and onions, finished with a generous layer of cheese.",
      sizes: [ { label: "Small", price: 595 }, { label: "Medium", price: 1095 }, { label: "Large", price: 1595 } ], // small = Foodpanda price, M/L [ESTIMATE]
      tags: ["popular"], available: true },

    { id: "pz-cheesy-crust", category: "pizza", name: "Cheesy Crust Pizza",
      description: "Our loaded pizza with a cheese-stuffed crust — every last bite is cheesy.",
      sizes: [ { label: "Medium", price: 1045 }, { label: "Large", price: 1695 } ], // medium ≈ Foodpanda price, large [ESTIMATE]
      tags: [], available: true },

    { id: "pz-delight", category: "pizza", name: "Bella's Delight",
      description: "The house special — chicken, olives, mushrooms and peppers with extra mozzarella.", // [ESTIMATE] confirm recipe
      sizes: [ { label: "Small", price: 695 }, { label: "Medium", price: 1195 }, { label: "Large", price: 1745 } ], // [ESTIMATE]
      tags: ["signature"], available: true },

    { id: "pz-hot-spicy", category: "pizza", name: "Hot & Spicy Pizza",
      description: "For the brave: spicy chicken, jalapeños and red chilli flakes over a fiery sauce.",
      sizes: [ { label: "Small", price: 645 }, { label: "Medium", price: 1145 }, { label: "Large", price: 1695 } ], // [ESTIMATE]
      tags: ["spicy"], available: true },

    /* ---------- PASTA & NOODLES ---------- */
    { id: "ps-melted-cheese", category: "pasta", name: "Melted Cheese Pasta",
      description: "Penne tossed in a velvety cheese sauce and baked until golden and bubbling.",
      price: 895, tags: ["popular"], available: true },   // [ESTIMATE]

    { id: "ps-alfredo", category: "pasta", name: "Creamy Alfredo Pasta",
      description: "Fettuccine in a creamy garlic-parmesan sauce with tender grilled chicken.",
      price: 945, tags: [], available: true },            // [ESTIMATE]

    { id: "ps-thai-noodles", category: "pasta", name: "Thai Noodles",
      description: "Wok-tossed noodles with chicken, crunchy vegetables and a sweet-chilli kick.",
      price: 795, tags: ["spicy"], available: true },     // [ESTIMATE]

    /* ---------- STEAKS & MAINS ---------- */
    { id: "mn-twins-steak", category: "mains", name: "Chicken Twins Steak",
      description: "Two grilled chicken fillets in mushroom and pepper sauce, served with fries and sautéed vegetables.",
      price: 1295, tags: ["popular"], available: true },  // [ESTIMATE]

    /* ---------- BURGERS & FRIES ---------- */
    { id: "bg-zinger", category: "burger", name: "Crispy Zinger Burger",
      description: "Crunchy fried chicken fillet, fresh lettuce and house mayo in a soft toasted bun.",
      price: 595, tags: [], available: true },            // [ESTIMATE]

    { id: "bg-grilled", category: "burger", name: "Grilled Chicken Burger",
      description: "Flame-grilled chicken with cheese, caramelised onions and smoky sauce.",
      price: 645, tags: [], available: true },            // [ESTIMATE]

    { id: "fr-loaded", category: "burger", name: "Loaded Fries",
      description: "Golden fries piled with minced chicken, cheese sauce and jalapeños.",
      price: 595, tags: [], available: true },            // [ESTIMATE]

    { id: "fr-plain", category: "burger", name: "Masala Fries",
      description: "Crispy fries tossed in our special masala.",
      price: 295, tags: [], available: true },            // [ESTIMATE]

    /* ---------- ICE CREAM SHAKES ---------- */
    { id: "sk-oreo", category: "shakes", name: "Choco Oreo Shake",
      description: "Chocolate ice cream blended with crushed Oreo cookies.",
      price: 430, tags: ["popular"], available: true },   // [MENU CARD]

    { id: "sk-strawberry", category: "shakes", name: "Strawberry Shake",
      description: "Creamy strawberry ice cream shake, thick and chilled.",
      price: 430, tags: [], available: true },            // [MENU CARD]

    { id: "sk-nutella", category: "shakes", name: "Nutella Shake",
      description: "Rich Nutella and vanilla ice cream, topped with a chocolate drizzle.",
      price: 495, tags: ["popular"], available: true },   // [MENU CARD]

    { id: "sk-lotus", category: "shakes", name: "Lotus Shake",
      description: "Lotus Biscoff blended with ice cream for that caramel-biscuit taste.",
      price: 495, tags: [], available: true },            // [MENU CARD]

    /* ---------- BUBBLE TEA (MILK) ---------- */
    { id: "bt-strawberry", category: "boba", name: "Strawberry Bubble Tea",
      description: "Milk tea with sweet strawberry and chewy tapioca pearls.",
      price: 545, tags: [], available: true },            // [MENU CARD]

    { id: "bt-blueberry", category: "boba", name: "Blueberry Bubble Tea",
      description: "Blueberry milk tea with chewy tapioca pearls.",
      price: 545, tags: [], available: true },            // [MENU CARD]

    { id: "bt-passion", category: "boba", name: "Passion Fruit Bubble Tea",
      description: "Tangy passion fruit milk tea with tapioca pearls.",
      price: 545, tags: ["new"], available: true },       // [MENU CARD]

    { id: "bt-mango", category: "boba", name: "Mango Bubble Tea",
      description: "Mango milk tea with chewy tapioca pearls.",
      price: 545, tags: ["popular"], available: true },   // [MENU CARD]

    { id: "bt-peach", category: "boba", name: "Peach Bubble Tea",
      description: "Light peach milk tea with tapioca pearls.",
      price: 545, tags: [], available: true },            // [MENU CARD]

    /* ---------- COLD COFFEE ---------- */
    { id: "cf-vanilla", category: "coffee", name: "Vanilla Chiller",
      description: "Iced coffee blended with vanilla ice cream — smooth, cold and creamy.",
      price: 545, tags: [], available: true },            // name [MENU CARD], price [ESTIMATE]

    { id: "cf-creme-brulee", category: "coffee", name: "Crème Brûlée Coffee",
      description: "Iced coffee with burnt-caramel crème brûlée flavour and whipped cream.",
      price: 595, tags: ["signature"], available: true }  // name [MENU CARD], price [ESTIMATE]
  ]
};
