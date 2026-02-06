// Comprehensive TSA items database for "Can I Bring This?" feature
// Based on official TSA guidelines

export type TSAStatus = 'yes' | 'no' | 'conditional';

export interface TSAItem {
    name: string;
    category: string;
    carryOn: TSAStatus;
    checked: TSAStatus;
    notes: string;
    restrictions?: string;
    searchTerms?: string[]; // Additional search keywords
}

export const TSA_CATEGORIES = [
    'All',
    'Liquids & Gels',
    'Electronics',
    'Sharp Objects',
    'Tools',
    'Food & Beverages',
    'Medical',
    'Sports & Recreation',
    'Personal Care',
    'Baby Items',
    'Miscellaneous'
] as const;

export const TSA_ITEMS: TSAItem[] = [
    // ========== LIQUIDS & GELS ==========
    {
        name: "Water Bottle (Empty)",
        category: "Liquids & Gels",
        carryOn: "yes",
        checked: "yes",
        notes: "Empty bottles are allowed. Fill after security checkpoint.",
        searchTerms: ["bottle", "water", "drink", "empty"]
    },
    {
        name: "Water Bottle (Filled)",
        category: "Liquids & Gels",
        carryOn: "conditional",
        checked: "yes",
        notes: "Must be 3.4 oz (100ml) or less in carry-on.",
        restrictions: "3.4 oz (100ml) limit per container",
        searchTerms: ["bottle", "water", "drink", "filled", "liquid"]
    },
    {
        name: "Shampoo / Conditioner",
        category: "Liquids & Gels",
        carryOn: "conditional",
        checked: "yes",
        notes: "Must be 3.4 oz or less and fit in quart-sized bag.",
        restrictions: "3.4 oz limit, must fit in 1 quart clear bag",
        searchTerms: ["hair", "wash", "toiletries"]
    },
    {
        name: "Toothpaste",
        category: "Liquids & Gels",
        carryOn: "conditional",
        checked: "yes",
        notes: "Must be 3.4 oz or less.",
        restrictions: "3.4 oz limit",
        searchTerms: ["dental", "hygiene", "toiletries"]
    },
    {
        name: "Hand Sanitizer",
        category: "Liquids & Gels",
        carryOn: "conditional",
        checked: "yes",
        notes: "Up to 12 oz allowed in carry-on (pandemic exception).",
        restrictions: "12 oz limit per container",
        searchTerms: ["sanitizer", "alcohol", "gel", "disinfectant"]
    },
    {
        name: "Sunscreen",
        category: "Liquids & Gels",
        carryOn: "conditional",
        checked: "yes",
        notes: "Must be 3.4 oz or less for carry-on.",
        restrictions: "3.4 oz limit",
        searchTerms: ["lotion", "spf", "sun", "cream"]
    },
    {
        name: "Perfume / Cologne",
        category: "Liquids & Gels",
        carryOn: "conditional",
        checked: "yes",
        notes: "Must be 3.4 oz or less.",
        restrictions: "3.4 oz limit",
        searchTerms: ["fragrance", "scent", "spray"]
    },
    {
        name: "Deodorant (Liquid/Gel)",
        category: "Liquids & Gels",
        carryOn: "conditional",
        checked: "yes",
        notes: "Liquid/gel must be 3.4 oz or less.",
        restrictions: "3.4 oz limit for liquid/gel forms",
        searchTerms: ["antiperspirant"]
    },
    {
        name: "Contact Lens Solution",
        category: "Liquids & Gels",
        carryOn: "conditional",
        checked: "yes",
        notes: "Must be 3.4 oz or less unless medically necessary.",
        restrictions: "3.4 oz limit (larger if medically necessary)",
        searchTerms: ["contacts", "solution", "eyes"]
    },
    {
        name: "Makeup (Liquid)",
        category: "Liquids & Gels",
        carryOn: "conditional",
        checked: "yes",
        notes: "Liquid makeup follows 3.4 oz rule.",
        restrictions: "3.4 oz limit per item",
        searchTerms: ["foundation", "mascara", "cosmetics"]
    },

    // ========== ELECTRONICS ==========
    {
        name: "Laptop",
        category: "Electronics",
        carryOn: "yes",
        checked: "yes",
        notes: "Must be removed from bag at security for screening.",
        searchTerms: ["computer", "macbook", "notebook"]
    },
    {
        name: "Tablet / iPad",
        category: "Electronics",
        carryOn: "yes",
        checked: "yes",
        notes: "Allowed in carry-on and checked bags.",
        searchTerms: ["ipad", "tablet", "device"]
    },
    {
        name: "Mobile Phone",
        category: "Electronics",
        carryOn: "yes",
        checked: "yes",
        notes: "Allowed in both carry-on and checked bags.",
        searchTerms: ["phone", "iphone", "smartphone", "cellphone"]
    },
    {
        name: "Camera",
        category: "Electronics",
        carryOn: "yes",
        checked: "yes",
        notes: "Film cameras should go in carry-on to avoid X-ray damage.",
        searchTerms: ["dslr", "photography", "video"]
    },
    {
        name: "E-reader / Kindle",
        category: "Electronics",
        carryOn: "yes",
        checked: "yes",
        notes: "Allowed in both carry-on and checked.",
        searchTerms: ["kindle", "nook", "ebook", "book"]
    },
    {
        name: "Power Bank / Portable Charger",
        category: "Electronics",
        carryOn: "conditional",
        checked: "no",
        notes: "Must be in carry-on. Lithium batteries prohibited in checked bags.",
        restrictions: "Max 100Wh (27,000mAh) without approval",
        searchTerms: ["battery", "charger", "portable", "external"]
    },
    {
        name: "Laptop Charger",
        category: "Electronics",
        carryOn: "yes",
        checked: "yes",
        notes: "Allowed in both carry-on and checked.",
        searchTerms: ["adapter", "power", "cord", "cable"]
    },
    {
        name: "Headphones / Earbuds",
        category: "Electronics",
        carryOn: "yes",
        checked: "yes",
        notes: "Wired and wireless both allowed.",
        searchTerms: ["airpods", "earphones", "bluetooth"]
    },
    {
        name: "Hair Dryer",
        category: "Electronics",
        carryOn: "yes",
        checked: "yes",
        notes: "Allowed in both. Cordless may have battery restrictions.",
        searchTerms: ["blowdryer", "hairdryer"]
    },
    {
        name: "Electric Shaver",
        category: "Electronics",
        carryOn: "yes",
        checked: "yes",
        notes: "Both electric and battery-powered allowed.",
        searchTerms: ["razor", "trimmer", "grooming"]
    },
    {
        name: "GoPro / Action Camera",
        category: "Electronics",
        carryOn: "yes",
        checked: "yes",
        notes: "Allowed in both carry-on and checked.",
        searchTerms: ["gopro", "actioncam", "video"]
    },
    {
        name: "Drone",
        category: "Electronics",
        carryOn: "yes",
        checked: "conditional",
        notes: "Batteries must be in carry-on. Check airline policies.",
        restrictions: "Lithium batteries must be in carry-on",
        searchTerms: ["quadcopter", "uav"]
    },

    // ========== SHARP OBJECTS ==========
    {
        name: "Scissors (Blades < 4 inches)",
        category: "Sharp Objects",
        carryOn: "yes",
        checked: "yes",
        notes: "Scissors with blades shorter than 4 inches are allowed in carry-on.",
        restrictions: "Blades must be less than 4 inches from pivot point",
        searchTerms: ["cut", "blade"]
    },
    {
        name: "Scissors (Blades > 4 inches)",
        category: "Sharp Objects",
        carryOn: "no",
        checked: "yes",
        notes: "Scissors with blades longer than 4 inches must go in checked baggage.",
        searchTerms: ["cut", "blade", "large"]
    },
    {
        name: "Safety Razor (Disposable)",
        category: "Sharp Objects",
        carryOn: "yes",
        checked: "yes",
        notes: "Disposable razors and cartridge razors are allowed.",
        searchTerms: ["shave", "grooming", "gillette"]
    },
    {
        name: "Straight Razor",
        category: "Sharp Objects",
        carryOn: "no",
        checked: "yes",
        notes: "Straight razors must be packed in checked baggage.",
        searchTerms: ["shave", "blade", "cutthroat"]
    },
    {
        name: "Pocket Knife",
        category: "Sharp Objects",
        carryOn: "no",
        checked: "yes",
        notes: "All knives prohibited in carry-on, allowed in checked.",
        searchTerms: ["knife", "blade", "swiss army"]
    },
    {
        name: "Box Cutter",
        category: "Sharp Objects",
        carryOn: "no",
        checked: "yes",
        notes: "Prohibited in carry-on, must be in checked baggage.",
        searchTerms: ["utility knife", "cutter", "blade"]
    },
    {
        name: "Nail Clippers",
        category: "Sharp Objects",
        carryOn: "yes",
        checked: "yes",
        notes: "Nail clippers are allowed in carry-on.",
        searchTerms: ["grooming", "nails", "clippers"]
    },
    {
        name: "Tweezers",
        category: "Sharp Objects",
        carryOn: "yes",
        checked: "yes",
        notes: "Tweezers are allowed in both carry-on and checked.",
        searchTerms: ["grooming", "plucking"]
    },
    {
        name: "Knitting Needles",
        category: "Sharp Objects",
        carryOn: "yes",
        checked: "yes",
        notes: "Generally allowed but check with airline. Recommend circular needles.",
        restrictions: "Final decision rests with TSA officer",
        searchTerms: ["craft", "knit", "needles"]
    },
    {
        name: "Sewing Needles",
        category: "Sharp Objects",
        carryOn: "yes",
        checked: "yes",
        notes: "Allowed in both carry-on and checked.",
        searchTerms: ["craft", "needle", "thread"]
    },

    // ========== TOOLS ==========
    {
        name: "Screwdriver (< 7 inches)",
        category: "Tools",
        carryOn: "yes",
        checked: "yes",
        notes: "Screwdrivers under 7 inches are allowed in carry-on.",
        restrictions: "Must be less than 7 inches in length",
        searchTerms: ["tool", "phillips", "flathead"]
    },
    {
        name: "Screwdriver (> 7 inches)",
        category: "Tools",
        carryOn: "no",
        checked: "yes",
        notes: "Longer screwdrivers must go in checked baggage.",
        searchTerms: ["tool", "large"]
    },
    {
        name: "Wrench / Pliers (< 7 inches)",
        category: "Tools",
        carryOn: "yes",
        checked: "yes",
        notes: "Small wrenches and pliers under 7 inches allowed.",
        restrictions: "Must be less than 7 inches",
        searchTerms: ["tool", "adjustable", "spanner"]
    },
    {
        name: "Hammer",
        category: "Tools",
        carryOn: "no",
        checked: "yes",
        notes: "Hammers prohibited in carry-on, must be checked.",
        searchTerms: ["tool", "mallet"]
    },
    {
        name: "Power Drill",
        category: "Tools",
        carryOn: "conditional",
        checked: "yes",
        notes: "Allowed. Battery restrictions may apply.",
        restrictions: "Cordless drills - check battery rules",
        searchTerms: ["tool", "drill", "cordless"]
    },
    {
        name: "Saw",
        category: "Tools",
        carryOn: "no",
        checked: "yes",
        notes: "All saws prohibited in carry-on.",
        searchTerms: ["tool", "cut"]
    },
    {
        name: "Tape Measure",
        category: "Tools",
        carryOn: "yes",
        checked: "yes",
        notes: "Allowed in both carry-on and checked.",
        searchTerms: ["tool", "measuring"]
    },
    {
        name: "Multi-tool (with Knife)",
        category: "Tools",
        carryOn: "no",
        checked: "yes",
        notes: "Multi-tools with knives prohibited in carry-on.",
        searchTerms: ["leatherman", "swiss army", "knife"]
    },

    // ========== FOOD & BEVERAGES ==========
    {
        name: "Solid Food (Sandwiches, Snacks)",
        category: "Food & Beverages",
        carryOn: "yes",
        checked: "yes",
        notes: "Solid food items are allowed in carry-on.",
        searchTerms: ["sandwich", "snack", "meal"]
    },
    {
        name: "Liquid Food (Soup, Sauce)",
        category: "Food & Beverages",
        carryOn: "conditional",
        checked: "yes",
        notes: "Liquid foods must follow 3.4 oz rule in carry-on.",
        restrictions: "3.4 oz limit for carry-on",
        searchTerms: ["soup", "sauce", "liquid", "yogurt"]
    },
    {
        name: "Candy",
        category: "Food & Beverages",
        carryOn: "yes",
        checked: "yes",
        notes: "All solid candy is allowed.",
        searchTerms: ["sweets", "chocolate", "snack"]
    },
    {
        name: "Coffee (Ground/Beans)",
        category: "Food & Beverages",
        carryOn: "yes",
        checked: "yes",
        notes: "Ground coffee and beans allowed in both.",
        searchTerms: ["beans", "grounds"]
    },
    {
        name: "Alcohol (Under 140 Proof)",
        category: "Food & Beverages",
        carryOn: "conditional",
        checked: "conditional",
        notes: "Mini bottles (3.4 oz) allowed in carry-on. Up to 5 liters in checked.",
        restrictions: "Carry-on: 3.4 oz limit. Checked: 24%-70% ABV, max 5L",
        searchTerms: ["liquor", "wine", "beer", "spirits"]
    },
    {
        name: "Baby Formula",
        category: "Food & Beverages",
        carryOn: "yes",
        checked: "yes",
        notes: "Reasonable quantities allowed. Exempt from 3.4 oz rule.",
        restrictions: "Must be declared at checkpoint",
        searchTerms: ["infant", "milk", "baby"]
    },
    {
        name: "Breast Milk",
        category: "Food & Beverages",
        carryOn: "yes",
        checked: "yes",
        notes: "Allowed in reasonable quantities. Exempt from liquid rules.",
        restrictions: "Must be declared at checkpoint",
        searchTerms: ["infant", "milk", "baby"]
    },
    {
        name: "Ice Cream (Frozen)",
        category: "Food & Beverages",
        carryOn: "conditional",
        checked: "yes",
        notes: "Only if completely frozen solid when presenting for screening.",
        restrictions: "Must be completely frozen",
        searchTerms: ["frozen", "dessert"]
    },
    {
        name: "Peanut Butter",
        category: "Food & Beverages",
        carryOn: "conditional",
        checked: "yes",
        notes: "Considered a liquid. Must be 3.4 oz or less.",
        restrictions: "3.4 oz limit",
        searchTerms: ["spread", "nut butter"]
    },
    {
        name: "Fresh Fruit",
        category: "Food & Beverages",
        carryOn: "yes",
        checked: "yes",
        notes: "Allowed, but check destination country restrictions.",
        restrictions: "International destinations may have customs restrictions",
        searchTerms: ["apple", "banana", "produce"]
    },

    // ========== MEDICAL ==========
    {
        name: "Prescription Medications",
        category: "Medical",
        carryOn: "yes",
        checked: "yes",
        notes: "Allowed in both. Recommend keeping in original containers.",
        searchTerms: ["pills", "medicine", "drugs", "pharmacy"]
    },
    {
        name: "Liquid Medications",
        category: "Medical",
        carryOn: "yes",
        checked: "yes",
        notes: "Exempt from 3.4 oz rule. Must declare at checkpoint.",
        restrictions: "Must be declared for inspection",
        searchTerms: ["medicine", "syrup", "liquid"]
    },
    {
        name: "Syringes / Needles",
        category: "Medical",
        carryOn: "conditional",
        checked: "yes",
        notes: "Allowed with accompanying medication or medical documentation.",
        restrictions: "Must have medication or medical documentation",
        searchTerms: ["insulin", "injection", "epipen"]
    },
    {
        name: "EpiPen",
        category: "Medical",
        carryOn: "yes",
        checked: "yes",
        notes: "Allowed in both carry-on and checked.",
        searchTerms: ["epinephrine", "auto-injector", "allergy"]
    },
    {
        name: "CPAP Machine",
        category: "Medical",
        carryOn: "yes",
        checked: "yes",
        notes: "Does not count as carry-on item. Notify TSA officer.",
        searchTerms: ["sleep apnea", "breathing", "medical device"]
    },
    {
        name: "Oxygen Tank (Medical)",
        category: "Medical",
        carryOn: "conditional",
        checked: "no",
        notes: "Must be approved by airline. Portable oxygen concentrators allowed.",
        restrictions: "Requires airline approval, specific requirements",
        searchTerms: ["oxygen", "medical", "breathing"]
    },
    {
        name: "Thermometer (Mercury)",
        category: "Medical",
        carryOn: "no",
        checked: "no",
        notes: "Mercury thermometers prohibited in both carry-on and checked.",
        searchTerms: ["temperature", "medical"]
    },
    {
        name: "Thermometer (Digital)",
        category: "Medical",
        carryOn: "yes",
        checked: "yes",
        notes: "Digital thermometers allowed in both.",
        searchTerms: ["temperature", "medical"]
    },
    {
        name: "First Aid Kit",
        category: "Medical",
        carryOn: "yes",
        checked: "yes",
        notes: "Allowed, but some items may be subject to restrictions.",
        searchTerms: ["bandages", "medical", "emergency"]
    },
    {
        name: "Contact Lenses",
        category: "Medical",
        carryOn: "yes",
        checked: "yes",
        notes: "Allowed in both. Solution follows liquid rules.",
        searchTerms: ["contacts", "eyes", "vision"]
    },

    // ========== SPORTS & RECREATION ==========
    {
        name: "Golf Clubs",
        category: "Sports & Recreation",
        carryOn: "no",
        checked: "yes",
        notes: "Must be checked. Not allowed in carry-on.",
        searchTerms: ["golf", "clubs", "sports"]
    },
    {
        name: "Baseball Bat",
        category: "Sports & Recreation",
        carryOn: "no",
        checked: "yes",
        notes: "Prohibited in carry-on, must be checked.",
        searchTerms: ["bat", "sports", "softball"]
    },
    {
        name: "Tennis Racket",
        category: "Sports & Recreation",
        carryOn: "yes",
        checked: "yes",
        notes: "Allowed in both carry-on and checked.",
        searchTerms: ["racquet", "sports"]
    },
    {
        name: "Ski Poles",
        category: "Sports & Recreation",
        carryOn: "no",
        checked: "yes",
        notes: "Must be checked, not allowed in carry-on.",
        searchTerms: ["skiing", "poles", "winter"]
    },
    {
        name: "Skateboard",
        category: "Sports & Recreation",
        carryOn: "yes",
        checked: "yes",
        notes: "Allowed as carry-on if it fits overhead. Check with airline.",
        searchTerms: ["board", "skating"]
    },
    {
        name: "Bicycle (Fully Assembled)",
        category: "Sports & Recreation",
        carryOn: "no",
        checked: "conditional",
        notes: "Must be checked. May need to be partially disassembled.",
        restrictions: "Check airline policies for packaging requirements",
        searchTerms: ["bike", "cycling"]
    },
    {
        name: "Fishing Rod",
        category: "Sports & Recreation",
        carryOn: "conditional",
        checked: "yes",
        notes: "Allowed if properly packed. Check airline size limits.",
        searchTerms: ["fishing", "pole", "rod"]
    },
    {
        name: "Yoga Mat",
        category: "Sports & Recreation",
        carryOn: "yes",
        checked: "yes",
        notes: "Allowed in both. May need to fit in overhead bin.",
        searchTerms: ["exercise", "fitness", "yoga"]
    },
    {
        name: "Dumbbells / Weights",
        category: "Sports & Recreation",
        carryOn: "yes",
        checked: "yes",
        notes: "Allowed but check weight restrictions with airline.",
        searchTerms: ["exercise", "fitness", "weights"]
    },

    // ========== PERSONAL CARE ==========
    {
        name: "Deodorant (Solid)",
        category: "Personal Care",
        carryOn: "yes",
        checked: "yes",
        notes: "Solid deodorants are allowed without restriction.",
        searchTerms: ["antiperspirant", "stick"]
    },
    {
        name: "Hairbrush / Comb",
        category: "Personal Care",
        carryOn: "yes",
        checked: "yes",
        notes: "Allowed in both carry-on and checked.",
        searchTerms: ["brush", "grooming", "hair"]
    },
    {
        name: "Makeup (Solid)",
        category: "Personal Care",
        carryOn: "yes",
        checked: "yes",
        notes: "Solid makeup (powder, lipstick) allowed without restriction.",
        searchTerms: ["cosmetics", "powder", "lipstick"]
    },
    {
        name: "Curling Iron / Flat Iron",
        category: "Personal Care",
        carryOn: "yes",
        checked: "yes",
        notes: "Allowed in both. Butane-fueled irons have restrictions.",
        restrictions: "Butane models must have safety cover",
        searchTerms: ["hair", "styling", "iron"]
    },
    {
        name: "Nail Polish",
        category: "Personal Care",
        carryOn: "conditional",
        checked: "yes",
        notes: "Must be 3.4 oz or less in carry-on.",
        restrictions: "3.4 oz limit",
        searchTerms: ["nails", "polish", "cosmetics"]
    },
    {
        name: "Mouthwash",
        category: "Personal Care",
        carryOn: "conditional",
        checked: "yes",
        notes: "Must be 3.4 oz or less in carry-on.",
        restrictions: "3.4 oz limit",
        searchTerms: ["dental", "oral", "hygiene"]
    },
    {
        name: "Lip Balm / Chapstick",
        category: "Personal Care",
        carryOn: "yes",
        checked: "yes",
        notes: "Solid lip balm allowed. Liquid follows 3.4 oz rule.",
        searchTerms: ["lips", "chapstick", "balm"]
    },
    {
        name: "Tampons / Pads",
        category: "Personal Care",
        carryOn: "yes",
        checked: "yes",
        notes: "Allowed in both carry-on and checked.",
        searchTerms: ["feminine", "hygiene", "period"]
    },

    // ========== BABY ITEMS ==========
    {
        name: "Baby Food / Pouches",
        category: "Baby Items",
        carryOn: "yes",
        checked: "yes",
        notes: "Allowed in reasonable quantities. Exempt from liquid rules.",
        restrictions: "Must be declared at checkpoint",
        searchTerms: ["infant", "food", "baby"]
    },
    {
        name: "Stroller",
        category: "Baby Items",
        carryOn: "conditional",
        checked: "yes",
        notes: "Can be gate-checked. Check airline policies.",
        searchTerms: ["baby", "infant", "pushchair"]
    },
    {
        name: "Car Seat",
        category: "Baby Items",
        carryOn: "yes",
        checked: "yes",
        notes: "Can bring onboard if child has paid seat. Otherwise gate-check.",
        searchTerms: ["baby", "infant", "child safety"]
    },
    {
        name: "Diaper Bag",
        category: "Baby Items",
        carryOn: "yes",
        checked: "yes",
        notes: "Considered a personal item. Does not count toward carry-on limit.",
        searchTerms: ["baby", "bag", "infant"]
    },
    {
        name: "Baby Wipes",
        category: "Baby Items",
        carryOn: "yes",
        checked: "yes",
        notes: "Allowed in both carry-on and checked.",
        searchTerms: ["wipes", "infant", "cleaning"]
    },
    {
        name: "Pacifiers",
        category: "Baby Items",
        carryOn: "yes",
        checked: "yes",
        notes: "Allowed in both carry-on and checked.",
        searchTerms: ["baby", "infant", "soother"]
    },

    // ========== MISCELLANEOUS ==========
    {
        name: "Lighter (Disposable)",
        category: "Miscellaneous",
        carryOn: "yes",
        checked: "no",
        notes: "One disposable lighter allowed in carry-on only.",
        restrictions: "Must be on your person, not in carry-on bag",
        searchTerms: ["fire", "lighter", "bic"]
    },
    {
        name: "Matches",
        category: "Miscellaneous",
        carryOn: "conditional",
        checked: "no",
        notes: "One book of safety matches in carry-on. Strike-anywhere prohibited.",
        restrictions: "Safety matches only, must be on person",
        searchTerms: ["fire", "matches"]
    },
    {
        name: "Umbrella",
        category: "Miscellaneous",
        carryOn: "yes",
        checked: "yes",
        notes: "Allowed in both. Very large umbrellas may need to be checked.",
        searchTerms: ["rain", "umbrella"]
    },
    {
        name: "Books / Magazines",
        category: "Miscellaneous",
        carryOn: "yes",
        checked: "yes",
        notes: "Allowed in both carry-on and checked.",
        searchTerms: ["reading", "book", "magazine"]
    },
    {
        name: "Pillows / Blankets",
        category: "Miscellaneous",
        carryOn: "yes",
        checked: "yes",
        notes: "Allowed in both. May count as personal item.",
        searchTerms: ["pillow", "blanket", "comfort"]
    },
    {
        name: "Headphones Case",
        category: "Miscellaneous",
        carryOn: "yes",
        checked: "yes",
        notes: "Allowed in both carry-on and checked.",
        searchTerms: ["case", "headphones", "storage"]
    },
    {
        name: "Perfume Sample (Vials)",
        category: "Miscellaneous",
        carryOn: "yes",
        checked: "yes",
        notes: "Small sample vials allowed if under 3.4 oz total.",
        restrictions: "Must fit in quart-sized bag",
        searchTerms: ["fragrance", "sample", "perfume"]
    },
    {
        name: "Toy Weapons",
        category: "Miscellaneous",
        carryOn: "no",
        checked: "yes",
        notes: "Replica weapons must be checked, not allowed in carry-on.",
        searchTerms: ["toy", "gun", "weapon", "nerf"]
    },
    {
        name: "Playing Cards",
        category: "Miscellaneous",
        carryOn: "yes",
        checked: "yes",
        notes: "Allowed in both carry-on and checked.",
        searchTerms: ["cards", "games", "entertainment"]
    },
    {
        name: "Sunglasses",
        category: "Miscellaneous",
        carryOn: "yes",
        checked: "yes",
        notes: "Allowed in both carry-on and checked.",
        searchTerms: ["glasses", "shades", "eyewear"]
    },
    {
        name: "Hat / Cap",
        category: "Miscellaneous",
        carryOn: "yes",
        checked: "yes",
        notes: "Allowed in both. May need to remove at security.",
        searchTerms: ["hat", "cap", "headwear"]
    },
    {
        name: "Belt",
        category: "Miscellaneous",
        carryOn: "yes",
        checked: "yes",
        notes: "Allowed. May need to remove at security if it has metal.",
        searchTerms: ["belt", "clothing", "accessory"]
    },
    {
        name: "Wallet / Purse",
        category: "Miscellaneous",
        carryOn: "yes",
        checked: "yes",
        notes: "Allowed in both. Considered a personal item.",
        searchTerms: ["wallet", "purse", "bag"]
    },
    {
        name: "Travel Pillow (Neck)",
        category: "Miscellaneous",
        carryOn: "yes",
        checked: "yes",
        notes: "Allowed. Usually attached to carry-on bag.",
        searchTerms: ["neck pillow", "comfort", "travel"]
    },
    {
        name: "Hand Warmers (Air-Activated)",
        category: "Miscellaneous",
        carryOn: "yes",
        checked: "yes",
        notes: "Disposable air-activated warmers allowed in both.",
        searchTerms: ["warmers", "heat", "camping"]
    },
    {
        name: "Portable Fan",
        category: "Miscellaneous",
        carryOn: "yes",
        checked: "yes",
        notes: "Allowed in both. Battery models subject to battery rules.",
        searchTerms: ["fan", "cooling", "portable"]
    },
];

// Search function helper
export const searchTSAItems = (query: string, category?: string): TSAItem[] => {
    const lowerQuery = query.toLowerCase().trim();

    if (!lowerQuery && (!category || category === 'All')) {
        return TSA_ITEMS;
    }

    let filtered = TSA_ITEMS;

    // Filter by category
    if (category && category !== 'All') {
        filtered = filtered.filter(item => item.category === category);
    }

    // Filter by search query
    if (lowerQuery) {
        filtered = filtered.filter(item => {
            const nameMatch = item.name.toLowerCase().includes(lowerQuery);
            const notesMatch = item.notes.toLowerCase().includes(lowerQuery);
            const termsMatch = item.searchTerms?.some(term =>
                term.toLowerCase().includes(lowerQuery)
            );

            return nameMatch || notesMatch || termsMatch;
        });
    }

    return filtered;
};

// Get stats
export const getTSAStats = () => {
    return {
        totalItems: TSA_ITEMS.length,
        byCategory: TSA_CATEGORIES.slice(1).map(cat => ({
            category: cat,
            count: TSA_ITEMS.filter(item => item.category === cat).length
        }))
    };
};
