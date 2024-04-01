//Import
const { createUser, createProduct } = require("./db");

const fakeInfo = async () => {
  try {
    const users = await Promise.all([
      createUser({
        first_name: "Lilly",
        last_name: "Williamson",
        email: "lilly_williamson@gmail.com",
        password: "lillywil1",
        address: "28 Cobblestone Circle, Milledgeville, GA 31061",
        payment_info: "Debit Card",
      }),
      createUser({
        first_name: "Emerson",
        last_name: "Foley",
        email: "emerson_foley@gmail.com",
        password: "emerfol2",
        address: "55 Oak Circle, Chippewa Falls, WI 54729",
        payment_info: "Credit Card",
      }),
      createUser({
        first_name: "Alana",
        last_name: "Bell",
        email: "alana_bell@gmail.com",
        password: "alanbel3",
        address: "7239 Pleasant Road, Dracut, MA 01826",
        payment_info: "Debit Card",
      }),
      createUser({
        first_name: "Thalia",
        last_name: "Stark",
        email: "thalia_stark@gmail.com",
        password: "thaista4",
        address: "770 Garfield Lane, Danbury, CT 06810",
        payment_info: "Credit Card",
      }),
      createUser({
        first_name: "Dion",
        last_name: "Page",
        email: "dion_page@gmail.com",
        password: "dionpag5",
        address: "37 East Ave., Sarasota, FL 34231",
        payment_info: "Credit Card",
      }),
    ]);

    const products = await Promise.all([
      //Clothing & Shoes
      createProduct({
        name: "Nike Air Force 1 Shadow",
        description: "Everything you love about the AF1—but doubled! Layered materials like linen-evoking textiles and synthetic leather pair with an exaggerated midsole and a pop of pastels to bring you double the style.",
        department: "Clothing & Shoes",
        price: "180.99",
        status: "Best Sellers",
        imageUrl: "https://m.media-amazon.com/images/I/41BZ44p8m5L._AC_SY695_.jpg",
      }),
      createProduct({
        name: "Men Long Sleeve Combat shirt",
        description: "This mens linen shirts are made of soft and lightweight fabric,which is comfortable and breathable, keeping you cool and relaxed in summer.",
        department: "Clothing & Shoes",
        price: "25.99",
        status: "Deals",
        imageUrl: "https://m.media-amazon.com/images/I/61S3T58MhlL._AC_SX679_.jpg",
      }),
      createProduct({
        name: "Women Casual Gray Blazer",
        description: "Casual Blazer Jackets for Women: Comfortable, breathable and lightweight fabric, can be worn all year round.",
        department: "Clothing & Shoes",
        price: "80.99",
        status: "",
        imageUrl: "https://m.media-amazon.com/images/I/71kAENB8V6L._AC_SY879_.jpg",
      }),
      createProduct({
        name: "Mens Casual Joggers Sweatpants for Jogging,Running or Athletic Activities",
        description: "This slim fit Sweatpants has two zippered side pockets and back pocket keep your phone, keys or wallet from falling out when joggers or outdoor recreation.",
        department: "Clothing & Shoes",
        price: "35.99",
        status: "",
        imageUrl: "https://m.media-amazon.com/images/I/61JtZQCm3bL._AC_SX679_.jpg",
      }),
      createProduct({
        name: "Women's Floral Print Chiffon A-Line Mini Dress Long Peasant Sleeves",
        description: "The dress is made of 100% polyester so that it is breathable and cozy with slightly elasticity.",
        department: "Clothing & Shoes",
        price: "45.99",
        status: "",
        imageUrl: "https://m.media-amazon.com/images/I/811sxtw79qL._AC_SY879_.jpg",
      }),
      //Electronics
      createProduct({
        name: "GoPro HERO9 Black",
        description: "Waterproof Action Camera with Front LCD and Touch Rear Screens, 5K Ultra HD Video, 20MP Photos, 1080p Live Streaming, Webcam, Stabilization.",
        department: "Electronics",
        price: "380.99",
        status: "Best Sellers",
        imageUrl: "https://m.media-amazon.com/images/I/51-JtCO45+L._AC_SX679_.jpg",
      }),
      createProduct({
        name: "JBL Vibe 200TWS True Wireless Earbuds - Black, Small",
        description: "Amp up your routine with the sound you love! Get powerful, JBL Deep Bass Sound and all the freedom of true wireless for up to 20 hours with the JBL Vibe 200TWS. Stay in touch with your friends hands-free with a simple touch and in full comfort.",
        department: "Electronics",
        price: "40.99",
        status: "Deals",
        imageUrl: "https://m.media-amazon.com/images/I/61TrbMmWyOL._AC_SX679_.jpg",
      }),
      createProduct({
        name: "Oculus Quest 2 VR Headset 128GB Holiday Set - Advanced All-in-One Virtual Reality Headset Cover Set, White",
        description: "Top VR Experience: Oculus Quest 2 features a blazing-fast processor, top hand-tracking system, and 1832 x 1920 Pixels Per Eye high-resolution display, offering an incredibly immersive and smooth VR gaming experience.",
        department: "Electronics",
        price: "280.99",
        status: "",
        imageUrl: "https://m.media-amazon.com/images/I/61Uy4GVp-UL._AC_SX679_.jpg",
      }),
      createProduct({
        name: "Fitbit Charge 4 Fitness and Activity Tracker-Black",
        description: "With Built-in GPS, Heart Rate, Sleep & Swim Tracking, Black/Black, One Size (S &L Bands Included).",
        department: "Electronics",
        price: "120.99",
        status: "",
        imageUrl: "https://m.media-amazon.com/images/I/71smqRr0pmL._AC_SX679_.jpg",
      }),
      createProduct({
        name: "iOttie Auto Sense Qi Wireless Car Charger",
        description: "Automatic Clamping Dashboard Phone Mount with Wireless Charging for Google Pixel, iPhone, Samsung Galaxy, Huawei, LG, and other Smartphones.",
        department: "Electronics",
        price: "60.99",
        status: "",
        imageUrl: "https://m.media-amazon.com/images/I/816jn2Wtx8L._AC_SX679_.jpg",
      }),
      //Home
      createProduct({
        name: "Dreo Tower Fan for Bedroom",
        description: "25ft/s Velocity Quiet Floor Fan, 90° Oscillating Fans for Indoors with 4 Speeds, 4 Modes, 8H Timer, Standing Fans, Bladeless Fan, Black.",
        department: "Home",
        price: "60.99",
        status: "Best Sellers",
        imageUrl: "https://m.media-amazon.com/images/I/715zvhq1-kL._AC_SY879_.jpg",
      }),
      createProduct({
        name: "Abstract Ceramic Vase-White",
        description: "This Picasso-style vase features a special design style with vivid face lines. Made with high-quality ceramic, it can be used as a decorative piece in your living room, matching well with exotic houseplants, winter florals, shelf decor, floor table decorations, fall decor, fireplace decor, and entry table decor.",
        department: "Home",
        price: "20.99",
        status: "Deals",
        imageUrl: "https://m.media-amazon.com/images/I/71aaO8-T-eL._AC_SX679_.jpg",
      }),
      createProduct({
        name: "Modern Living Room Table Set, Includes Coffee Table & 2pcs Side Table",
        description: "The coffee table set with premium faux marble finish that enhances the modern beauty, stylish and modern design adds a bit of sophistication and elegance to your home, which can be well matched with different styles of furniture.",
        department: "Home",
        price: "89.99",
        status: "",
        imageUrl: "https://m.media-amazon.com/images/I/81GSAgD8jeL._AC_SX679_.jpg",
      }),
      createProduct({
        name: "Matte Black Bathroom Accessories Set",
        description: "Our matte black bathroom accessories set includes 1 x bathroom soap dispenser, 1 x toothbrush holder, 2 x qtip holders with lids. This black bathroom set with its distinctive vertical striped look is an essential for your bathroom decor, both pretty and functional. High-quality glass is easy to clean, just rinse with water or wipe with a towel.",
        department: "Home",
        price: "26.99",
        status: "",
        imageUrl: "https://m.media-amazon.com/images/I/71s5jZ3bC6L._AC_SX679_.jpg",
      }),
      createProduct({
        name: "Cuisinart Single-Serve Coffeemaker, SS-10P1 Stainless Steal",
        description: "The Cuisinart Premium Single-Serve Brewer offers freedom of choice! Choose 4, 6, 8, 10 or 12-ounce serving sizes, choose the ideal temperature, and enjoy a cup of coffee, tea, soup, or cocoa.",
        department: "Home",
        price: "149.99",
        status: "",
        imageUrl: "https://m.media-amazon.com/images/I/61OwgtcjPML._AC_SY879_.jpg",
      }),
      //Office Products
      createProduct({
        name: "Desk Organizer with File Holder, 5-Tier Paper Letter Tray Organizer with Drawer and 2 Pen Holder.",
        description: "File holder, File organizer, Paper letter tray, Magazine holder, Desk Organizer with drawer, Office supplies.",
        department: "Office Products",
        price: "34.99",
        status: "Best Sellers",
        imageUrl: "https://m.media-amazon.com/images/I/81utGiRaWvL._AC_SX679_.jpg",
      }),
      createProduct({
        name: "SHARPIE Tank Highlighters, Chisel Tip, Assorted Color Highlighters, Value Pack, 36 Count",
        description: "Includes 36 assorted Sharpie highlighters: 8 yellow, 6 pink, 6 orange, 6 green, 6 blue, and 4 lavender.",
        department: "Office Products",
        price: "9.99",
        status: "Deals",
        imageUrl: "https://m.media-amazon.com/images/I/71Ms1t2SIDL._AC_SX679_.jpg",
      }),
      createProduct({
        name: "Blue Summit Supplies Ocean Tone Colored File Folders",
        description: "Letter Size, 1/3 Cut Top Tab File Folders, Assorted Blue and Green Colored, for Organizing and File Cabinet Storage, 100 Pack.",
        department: "Office Products",
        price: "18.99",
        status: "",
        imageUrl: "https://m.media-amazon.com/images/I/71YKZsb3peL._AC_SX679_.jpg",
      }),
      createProduct({
        name: "Pilot, G2 Premium Gel Roller Pens, Fine Point 0.7 MM, Black, Pack of 12",
        description: "Smooth & Long-lasting, Comfortable Grip, Versatile and Refillable & Quick Drying.",
        department: "Office Products",
        price: "13.85",
        status: "",
        imageUrl: "https://m.media-amazon.com/images/I/71hj1vztlaL._AC_SX679_.jpg",
      }),
      createProduct({
        name: "Amazing 50 Pads Mini Sticky Notes",
        description: "1.5X 2 inch, Small Self-Stick Note, Bulk Tiny Pads for Office, School, Home, 100 Sheets/Pad, 4 Pastel Colors, Pink, Yellow, Green, Blue.",
        department: "Office Products",
        price: "15.99",
        status: "",
        imageUrl: "https://m.media-amazon.com/images/I/71uo9TJLXiL._AC_SX679_.jpg",
      }),
      //Toys & Games
      createProduct({
        name: "LEGO Harry Potter Hogwarts Castle and Grounds 76419 Building Set",
        description: "Scale model – Build and display Hogwarts Castle and its surrounding area, including the Main Tower, Astronomy Tower, Great Hall, courtyards, bridges, greenhouses, Boathouse and the Black Lake.",
        department: "Toys & Games",
        price: "169.95",
        status: "Best Sellers",
        imageUrl: "https://m.media-amazon.com/images/I/813B5OrhLSL._AC_SX679_.jpg",
      }),
      createProduct({
        name: "NATIONAL GEOGRAPHIC Mega Science Lab - Science Kit for Kids with 75 Easy Experiments",
        description: "THREE SCIENCE KITS IN ONE - This kit contains 45 of our most popular Earth science, chemistry, and science magic experiments along with a bonus guide that's packed with 30 additional experiments using common household items.",
        department: "Toys & Games",
        price: "29.99",
        status: "Deals",
        imageUrl: "https://m.media-amazon.com/images/I/91G2F+36oDL._AC_SX679_.jpg",
      }),
      createProduct({
        name: "LOL Surprise Loves CRAYOLA Color Me Studio with Collectible Doll",
        description: "Over 30+ Surprises, Paper Dresses & Accessories, Art Studio Packaging, Limited Edition Small Doll, Great Toy Gift for Kids Ages 3+.",
        department: "Toys & Games",
        price: "14.99",
        status: "",
        imageUrl: "https://m.media-amazon.com/images/I/71sa8F+kcZL._AC_SX679_.jpg",
      }),
      createProduct({
        name: "Marvel Super Hero Adventures 5-Inch Action Figure 5-Pack",
        description: "This Marvel Super Hero Figure 5-Pack Comes With A Fun Assortment Of Fan Favorite Characters Including Captain America, Spider-Man, Black Panther, Hulk, And Iron Spider.",
        department: "Toys & Games",
        price: "22.99",
        status: "",
        imageUrl: "https://m.media-amazon.com/images/I/719ra-4mSgL._AC_SX679_.jpg",
      }),
      createProduct({
        name: "Hasbro Gaming Guess Who?",
        description: "GUESS PEOPLE OR SUPERHEROES: This edition of the Guess Who? game for kids includes 2 sets of double-sided character sheets with classic characters and superhero characters.",
        department: "Toys & Games",
        price: "16.99",
        status: "",
        imageUrl: "https://m.media-amazon.com/images/I/71brT4P0PAL._AC_SX679_.jpg",
      }),
      //Garden & Outdoors
      createProduct({
        name: "35 Inch Octagonal Outdoor Fire Pit",
        description: "This octagonal fire pit is made of 100% iron, will not deform even after long-term use,sturdy and stable.Its superior rust resistance and durability make it perfectly suited for outdoor use.",
        department: "Garden & Outdoors",
        price: "119.99",
        status: "",
        imageUrl: "https://m.media-amazon.com/images/I/71wEj7jXc1L._AC_SX679_.jpg",
      }),
      createProduct({
        name: "Pennington Smart Seed Sun and Shade Tall Fescue Grass Seed Mix for Southern Lawns 20 lb",
        description: "Grass seed and fertilizer mix for southern Tall Fescue lawns. For areas getting 4 to 6 hours of sunlight, this bag covers up to 5,000 sq. ft.",
        department: "Garden & Outdoors",
        price: "54.18",
        status: "",
        imageUrl: "https://m.media-amazon.com/images/I/81NLk-gC4YS._AC_SX679_.jpg",
      }),
      createProduct({
        name: "Folding Adirondack Chair Outdoor Wooden Accent Furniture Fire Pit Lounge Chairs for Yard, Garden, Patio w/ 350lb Weight Capacity - Brown",
        description: "Every inch of this seat is covered by a high-quality finish or paint to provide lasting support and style; OVERALL DIMENSIONS: 30.5inch(L) x 28inch(W) x 35inch(H); Weight Capacity: 350 lbs.",
        department: "Garden & Outdoors",
        price: "59.98",
        status: "",
        imageUrl: "https://m.media-amazon.com/images/I/71FL5vyzgZL._AC_SX679_.jpg",
      }),
      createProduct({
        name: "BLACK+DECKER Electric Lawn Mower, String Trimmer, Edger, 3-in-1, Corded",
        description: "3-IN-1 ELECTRIC LAWN MOWER - Corded mower, trimmer and edger combined in one compact machine.Battery not included.Built for smaller yards with a 12-inch cutting width and 1.6 inch cutting height. RPM: 8000 rpm.",
        department: "Garden & Outdoors",
        price: "89.59",
        status: "",
        imageUrl: "https://m.media-amazon.com/images/I/61tCYe8BweL._AC_SX679_.jpg",
      }),
      createProduct({
        name: "Solar Orcs Garden Lights, Cracked Glass Ball for Lawn Patio Yard Backyard Decorations, 2 pack",
        description: "This ball lights outdoor, with its 600mAh battery, outperforms similar products with 300mAh batteries. This solar globe lights outdoor waterproof is incredibly easy to install, no manual needed.",
        department: "Garden & Outdoors",
        price: "35.90",
        status: "",
        imageUrl: "https://m.media-amazon.com/images/I/71qEF-qaCmL._AC_SX679_PIbundle-2,TopRight,0,0_SH20_.jpg",
      }),
      //Health & Beauty
      createProduct({
        name: "CeraVe Hydrating Facial Cleanser | Moisturizing Non-Foaming Face Wash with Hyaluronic Acid, Ceramides and Glycerin | Fragrance Free Paraben Free | 16 Fluid Ounce",
        description: "Daily face wash with hyaluronic acid, ceramides, and glycerin to help hydrate skin without stripping moisture. Removes face makeup, dirt, and excess oil, provides 24-hour hydration and leaves a moisturized, non-greasy feel.",
        department: "Health & Beauty",
        price: "15.98",
        status: "",
        imageUrl: "https://m.media-amazon.com/images/I/51DbQev1thL._SX679_.jpg",
      }),
      createProduct({
        name: "Neutrogena Cleansing Fragrance Free Makeup Remover Face Wipes, Twin Pack, 25 each",
        description: "Twin Pack with 25 count of ultra-soft, pre-moistened Neutrogena Makeup Remover Wipes with a micellar-infused triple emollient formula remove waterproof makeup and cleanses skin while leaving it feeling refreshed, soft, smooth and conditioned.",
        department: "Health & Beauty",
        price: "9.79",
        status: "Deals",
        imageUrl: "https://m.media-amazon.com/images/I/71PXjjbQCzL._AC_SX679_.jpg",
      }),
      createProduct({
        name: "Sensodyne Extra Whitening Sensitive Teeth and Cavity Prevention Whitening Toothpaste, Cool Mint - 4 Ounces (Pack of 3)",
        description: "Toothpaste for sensitive teeth that freshens your breath and contains fluoride to fight cavities. Formulated to reduce tartar build-up for cleaner, smoother teeth.",
        department: "Health & Beauty",
        price: "17.78",
        status: "",
        imageUrl: "https://m.media-amazon.com/images/I/81D2DzfRB7L._AC_SX679_PIbundle-3,TopRight,0,0_SH20_.jpg",
      }),
      createProduct({
        name: "HALLS Relief Honey Lemon Sugar Free Cough Drops, Value Pack, 180 Drops",
        description: "One value pack of 180 HALLS Relief Honey Lemon Sugar Free Cough Drops. Relieves coughs, soothes sore throats and cools nasal passages.",
        department: "Health & Beauty",
        price: "7.98",
        status: "",
        imageUrl: "https://m.media-amazon.com/images/I/71MitqXG7zL._SX679_.jpg",
      }),
      createProduct({
        name: "Gillette Fusion ProGlide Razors, Men 1 Gillette Razor, 4 Razor Blade Refills, Shields Against Skin Irritation",
        description: "SHARPEST BLADES: Our sharpest blades (first 4 blades) help get virtually every hair effortlessly.",
        department: "Health & Beauty",
        price: "22.00",
        status: "",
        imageUrl: "https://m.media-amazon.com/images/I/61vAmuEXILL._SX679_.jpg",
      }),
    ]);

    return { users, products };
  } catch (err) {
    console.error("failed loading", err);
  }
};

//export
module.exports = { fakeInfo };
