// Restaurant Data & Menu Configuration for "مطعم المحترف"
window.RESTAURANT_INFO = {
  name: "مطعم المحترف",
  tagline: "أصل الكبدة والسجق والمشويات في شبرا",
  description: "المطعم الأشهر في شبرا لتقديم أشهى ساندوتشات الكبدة الإسكندراني، السجق البلدي، مشويات الفحم، الكريب المخصوص، وألذ وجبات الشارع المصري بنظافة وجودة لا تقاوم.",
  facebookUrl: "https://www.facebook.com/p/%D9%85%D8%B7%D8%B9%D9%85-%D8%A7%D9%84%D9%85%D8%AD%D8%AA%D8%B1%D9%81-61577101545440/",
  googleMapsUrl: "https://www.google.com/search?kgmid=/g/11k1ddtg1k&q=%D9%83%D8%A8%D8%AF%D8%A9+%D9%88%D8%B3%D8%AC%D9%82+%D8%A7%D9%84%D9%85%D8%AD%D8%AA%D8%B1%D9%81",
  googleShareUrl: "https://share.google/me1zz12VTGzulYSaf",
  menuEgyptUrl: "https://www.menuegypt.com/ar/%D8%A7%D9%84%D9%85%D8%AD%D8%AA%D8%B1%D9%81",
  phones: [
    { number: "01200006408", label: "دليفري وواتساب (شبرا)", primary: true },
    { number: "01203507090", label: "خدمة العملاء والطلبات" },
    { number: "01222213190", label: "الخط المباشر" },
    { number: "01203518409", label: "فرع دوران شبرا" },
    { number: "01203518408", label: "فرع عبود" }
  ],
  whatsappNumber: "201200006408",
  branches: [
    {
      name: "الفرع الرئيسي - دوران شبرا",
      address: "133 دوران شبرا، أمام محطة مترو روض الفرج مباشرة، شبرا، القاهرة",
      mapUrl: "https://maps.google.com/?q=133+Shubra+Square+Cairo+Egypt",
      hours: "يومياً من 10:00 صباحاً حتى 4:30 فجراً",
      phone: "01200006408",
      features: ["صالة مكيفة", "تيك أواي سريع", "خدمة توصيل فورية", "أمام المترو مباشرة"]
    },
    {
      name: "فرع ميدان عبود",
      address: "43 ميدان عبود، بجوار الموقف العام، شبرا، القاهرة",
      mapUrl: "https://maps.google.com/?q=Aboud+Square+Shubra+Cairo",
      hours: "يومياً 24 ساعة",
      phone: "01203518408",
      features: ["خدمة 24 ساعة", "توصيل للمناطق المجاورة", "جلسات خارجية"]
    }
  ],
  deliveryAreas: [
    "شبرا مصر", "دوران شبرا", "روض الفرج", "الخلفاوي", "الساحل", "عبود", "المظلات", "شبرا الخيمة", "الشرابية", "شبرا البلد"
  ]
};

window.MENU_PAGES = [
  { page: 1, title: "ساندوتشات البترينة والسمين", img: "assets/images/menu-page-1.jpg" },
  { page: 2, title: "المشويات على الفحم والحواوشي", img: "assets/images/menu-page-2.jpg" },
  { page: 3, title: "ركن الكريب الحادق - مكس وفراخ", img: "assets/images/menu-page-3.jpg" },
  { page: 4, title: "كريب اللحوم والمشكل الرجالي والحريمي", img: "assets/images/menu-page-4.jpg" },
  { page: 5, title: "برجر الفحم وساندوتشات الدجاج", img: "assets/images/menu-page-5.jpg" },
  { page: 6, title: "طواجن المكرونة والأرز البسمتي", img: "assets/images/menu-page-6.jpg" },
  { page: 7, title: "وجبات المشاوي والكومبو العائلي", img: "assets/images/menu-page-7.jpg" },
  { page: 8, title: "المقبلات، الصوصات والسلطات", img: "assets/images/menu-page-8.jpg" },
  { page: 9, title: "الحلويات وكريب النوتيلا", img: "assets/images/menu-page-9.jpg" },
  { page: 10, title: "المشروبات والكانز وأرقام الفروع", img: "assets/images/menu-page-10.jpg" }
];

window.CATEGORIES = [
  { id: "all", name: "كل الأصناف", icon: "utensils" },
  { id: "batarina", name: "ركن البترينة والسمين", icon: "flame" },
  { id: "grill", name: "مشويات وحواوشي على الفحم", icon: "beef" },
  { id: "crepe", name: "كريب المحترف المخصوص", icon: "sandwich" },
  { id: "burgers", name: "برجر وساندوتشات سريعة", icon: "drumstick" },
  { id: "tajines", name: "طواجن ومكرونة وأرز", icon: "cooking-pot" },
  { id: "sides", name: "مقبلات وسلطات ومشروبات", icon: "coffee" }
];

window.MENU_ITEMS = [
  // --- ركن البترينة والسمين ---
  {
    id: 1,
    name: "ساندوتش كبدة إسكندراني المحترف",
    category: "batarina",
    price: 35,
    oldPrice: 40,
    image: "assets/images/dish-kebda.jpg",
    description: "كبدة بلدي طازة مقطعة شرائح رفيعة متبلة بخلطة المحترف السرية مع الثوم والليمون والفلفل الحار في عيش فينو طازج.",
    badge: "الأكثر طلباً 🔥",
    popular: true,
    spiceLevel: "حار حسب الطلب",
    options: ["عيش فينو", "عيش بلدي"],
    extras: [
      { name: "طحينة زيادة", price: 5 },
      { name: "فلفل حار زيادة", price: 3 },
      { name: "موتزاريلا سايحة", price: 15 }
    ]
  },
  {
    id: 2,
    name: "ساندوتش سجق شرقي بلدي",
    category: "batarina",
    price: 35,
    oldPrice: 40,
    image: "assets/images/dish-segoq.jpg",
    description: "سجق شرقي بلدي مفروم على أصوله بتتبيلة البهارات الشرقية مع الطماطم والفلفل والبصل المكرمل على الجريل.",
    badge: "مميز 🌟",
    popular: true,
    spiceLevel: "متوسط",
    options: ["عيش فينو", "عيش بلدي"],
    extras: [
      { name: "طحينة زيادة", price: 5 },
      { name: "صوص باربيكيو", price: 7 },
      { name: "جبنة شيدر سايحة", price: 15 }
    ]
  },
  {
    id: 3,
    name: "ساندوتش سجق مدخن جريل",
    category: "batarina",
    price: 40,
    oldPrice: 45,
    image: "assets/images/dish-segoq.jpg",
    description: "سجق مدخن على الجريل بنكهة الشواء الغنية مع صوص الخردل والباربيكيو والمخلل اللذيذ.",
    badge: "نكهة مدخنة",
    popular: false,
    spiceLevel: "عادي",
    options: ["عيش فينو", "عيش بلدي"]
  },
  {
    id: 4,
    name: "ساندوتش كفتة المحترف المشوية",
    category: "batarina",
    price: 35,
    oldPrice: 40,
    image: "assets/images/dish-grill.jpg",
    description: "أصابع كفتة لحم بلدي مشوية على الجريل مع البقدونس الطازج وصوص الطحينة الملكي.",
    badge: "بلدي 100%",
    popular: true,
    options: ["عيش فينو", "عيش بلدي"]
  },
  {
    id: 5,
    name: "ساندوتش كبدة وقوانص متبلة",
    category: "batarina",
    price: 30,
    image: "assets/images/dish-kebda.jpg",
    description: "كبدة وقوانص محمرة على نار عالية بالبصل والفلفل وتتبيلة المحترف اللذيذة.",
    badge: "خلطة زمان",
    popular: false,
    options: ["عيش فينو", "عيش بلدي"]
  },
  {
    id: 6,
    name: "ساندوتش ميكس المحترف (كبدة + سجق + كفتة)",
    category: "batarina",
    price: 45,
    oldPrice: 50,
    image: "assets/images/dish-segoq.jpg",
    description: "الثلاثي المرح في ساندوتش واحد! توليفة تجمع بين الكبدة الإسكندراني والسجق الشرقي والكفتة المشوية.",
    badge: "صاروخ المحترف 🚀",
    popular: true,
    options: ["عيش فينو كبير", "عيش بلدي محمص"],
    extras: [
      { name: "موتزاريلا دبل", price: 20 },
      { name: "طحينة مخصوص", price: 5 }
    ]
  },
  {
    id: 7,
    name: "رغيف سمين مشكل المحترف (عيش بلدي)",
    category: "batarina",
    price: 50,
    image: "assets/images/dish-kebda.jpg",
    description: "رغيف بلدي مليان سمين، كبدة، كفتة، وسجق بالخلطة السحرية وسلطة الطحينة والبقدونس.",
    badge: "ملوك السمين 👑",
    popular: true
  },

  // --- المشويات والحواوشي على الفحم ---
  {
    id: 8,
    name: "حواوشي بلدي على الفحم",
    category: "grill",
    price: 45,
    oldPrice: 50,
    image: "assets/images/dish-hawawshi.jpg",
    description: "رغيف حواوشي لحمة بلدي متبلة بالبصل والفلفل والبهارات ومسوى على شبكة الفحم الطبيعي لقرمشة لا تقاوم.",
    badge: "رائحة الفحم 🔥",
    popular: true,
    spiceLevel: "حار / عادي",
    extras: [
      { name: "جبنة موتزاريلا دوبل", price: 15 },
      { name: "إضافة سجق بلدي", price: 20 },
      { name: "إضافة بسطرمة", price: 20 }
    ]
  },
  {
    id: 9,
    name: "حواوشي المحترف موتزاريلا دوبل",
    category: "grill",
    price: 60,
    oldPrice: 70,
    image: "assets/images/dish-hawawshi.jpg",
    description: "رغيف حواوشي فحم محشو لحمة بلدي غارقة بطبقتين سخنتين من الجبنة الموتزاريلا الرومي الذائبة.",
    badge: "جبنة سايحة 🧀",
    popular: true
  },
  {
    id: 10,
    name: "حواوشي إسكندراني جريل مخصوص",
    category: "grill",
    price: 55,
    image: "assets/images/dish-hawawshi.jpg",
    description: "عجينة إسكندراني طازجة محشوة بلحمة متبلة بالخلطة الإسكندراني ومخبوزة على الجريل الذهبي.",
    badge: "عجينة طازة",
    popular: false
  },
  {
    id: 11,
    name: "صاروخ المحترف على الفحم (عيش سوري)",
    category: "grill",
    price: 70,
    oldPrice: 80,
    image: "assets/images/dish-grill.jpg",
    description: "رول عملاق من العيش السوري محشو كفتة وشيش وسجق مشوي على الفحم مع صوصات المحترف وسلطة طحينة.",
    badge: "حجم عملاق 💥",
    popular: true
  },
  {
    id: 12,
    name: "وجبة كفتة حاتي مشوية على الفحم",
    category: "grill",
    price: 110,
    oldPrice: 125,
    image: "assets/images/dish-grill.jpg",
    description: "ربع كيلو كفتة لحم بلدي مشوية على الفحم تقدم مع أرز بسمتي ذهبي، بطاطس، طحينة، مخلل، وعيش ساخن.",
    badge: "وجبة متكاملة",
    popular: true
  },
  {
    id: 13,
    name: "وجبة فراخ شيش طاووق على الفحم",
    category: "grill",
    price: 120,
    oldPrice: 135,
    image: "assets/images/dish-grill.jpg",
    description: "أوراك دجاج مخلية متبلة بصوص الزبادي والليمون والأعشاب، مشوية على الفحم مع أرز بسمتي وسلطات.",
    badge: "تتبيلة سحرية",
    popular: true
  },
  {
    id: 14,
    name: "وجبة ميكس جريل المحترف VIP",
    category: "grill",
    price: 160,
    oldPrice: 180,
    image: "assets/images/dish-grill.jpg",
    description: "تشكيلة من كفتة الحاتي + شيش طاووق + سجق مشوي على الفحم + أرز بسمتي + بطاطس مقلية + طحينة وثومية وعيش.",
    badge: "الأفخم في شبرا ⭐",
    popular: true
  },

  // --- ركن الكريب الشهير ---
  {
    id: 15,
    name: "كريب المحترف 'الرجالي' المخصوص",
    category: "crepe",
    price: 95,
    oldPrice: 110,
    image: "assets/images/dish-crepe.jpg",
    description: "الكريب الأسطوري الذي اشتهر به المحترف! محشو شاورما لحمة + سجق شرقي + كفتة مشوية + تركي مدخن + جبنة موتزاريلا دوبل وصوصات حارة.",
    badge: "اختراع المحترف 🏆",
    popular: true,
    extras: [
      { name: "إكسترا موتزاريلا", price: 15 },
      { name: "هالابينو حار", price: 7 },
      { name: "صوص رانش أو شيدر", price: 10 }
    ]
  },
  {
    id: 16,
    name: "كريب المحترف 'الحريمي' الدلع",
    category: "crepe",
    price: 90,
    oldPrice: 105,
    image: "assets/images/dish-crepe.jpg",
    description: "كريب مقرمش محشو قطع ستربس كرانشي + تركي مدخن + شاورما فراخ + صوص جبنة شيدر وموتزاريلا سايحة وبطاطس فارم.",
    badge: "كرانشي & شيدر 🧀",
    popular: true
  },
  {
    id: 17,
    name: "كريب كبدة إسكندراني المحترف",
    category: "crepe",
    price: 70,
    image: "assets/images/dish-crepe.jpg",
    description: "كريب مصري أصيل محشو كبدة إسكندراني متبلة مع الفلفل الرومي والحار وجبنة موتزاريلا وطحينة مغلية.",
    badge: "مكس مصري غريب ولذيذ",
    popular: false
  },
  {
    id: 18,
    name: "كريب سجق شرقي بالموتزاريلا",
    category: "crepe",
    price: 75,
    image: "assets/images/dish-crepe.jpg",
    description: "سجق بلدي شرقي متبل مع الزيتون والفلفل وطبقة سميكة من الموتزاريلا المطاطية.",
    badge: "نكهة شرقية",
    popular: true
  },
  {
    id: 19,
    name: "كريب تشيكن ستربس سوبر كرانشي",
    category: "crepe",
    price: 85,
    image: "assets/images/dish-crepe.jpg",
    description: "صدور دجاج كرسبي حارة أو عادية مع بطاطس فارم فريتس، خس مقرمش، صوص مايونيز وموتزاريلا غنية.",
    badge: "قرمشة عالية",
    popular: true
  },
  {
    id: 20,
    name: "كريب زنجر سوبر سوبريم",
    category: "crepe",
    price: 85,
    image: "assets/images/dish-crepe.jpg",
    description: "قطع زنجر حارة سبايسي مع روست بيف، شيدر سائل، زيتون، فلفل ألوان وجبنة موتزاريلا.",
    badge: "سبايسي نار 🌶️",
    popular: true
  },
  {
    id: 21,
    name: "كريب مكس فراخ (شاورما + بانيه + شيش)",
    category: "crepe",
    price: 90,
    image: "assets/images/dish-crepe.jpg",
    description: "توليفة ثلاثية من أشهى أطباق الدجاج المحبوبة مع الموتزاريلا والصوصات الخاصة.",
    badge: "عشاق الدجاج 🍗",
    popular: true
  },
  {
    id: 22,
    name: "كريب بطاطس فارم فريتس موتزاريلا",
    category: "crepe",
    price: 55,
    image: "assets/images/dish-crepe.jpg",
    description: "أصابع البطاطس الذهبية المقرمشة مع مكس جبن وصوص كاتشب ومايونيز.",
    badge: "خفيف واقتصادي",
    popular: false
  },

  // --- برجر وساندوتشات سريعة ---
  {
    id: 23,
    name: "برجر المحترف لحم مشوي على الفحم",
    category: "burgers",
    price: 60,
    oldPrice: 70,
    image: "assets/images/dish-burger.jpg",
    description: "قطعة برجر بقري 150 جرام مشوية على الفحم مع الطماطم، الخس، البصل المكرمل وصوص المحترف في خبز بريوش طري.",
    badge: "مشوي على الفحم 🍔",
    popular: true,
    extras: [
      { name: "شريحة جبنة شيدر", price: 10 },
      { name: "شريحة لحم إضافية (دوبل)", price: 30 },
      { name: "بيض عيون", price: 10 }
    ]
  },
  {
    id: 24,
    name: "برجر تريبل تشيز المحترف المزدوج",
    category: "burgers",
    price: 90,
    oldPrice: 105,
    image: "assets/images/dish-burger.jpg",
    description: "قطعتان برجر لحم فحم مع 3 أنواع أجبان ذائبة (شيدر، موتزاريلا، جودة) وأصابع هالبينو حارة.",
    badge: "وحش البرجر 👑",
    popular: true
  },
  {
    id: 25,
    name: "ساندوتش شيش طاووق فحم مخصوص",
    category: "burgers",
    price: 45,
    image: "assets/images/dish-grill.jpg",
    description: "مكعبات دجاج مشوية على الفحم مع الفلفل الألوان والبصل وصوص الثومية السورية اللذيذة.",
    badge: "طري ومتبل",
    popular: false
  },
  {
    id: 26,
    name: "ساندوتش فاهيتا دجاج مكسيكي",
    category: "burgers",
    price: 45,
    image: "assets/images/dish-crepe.jpg",
    description: "شرائح صدور دجاج مشوحة على الجريل مع البصل، الفلفل الحلو، المشروم، وصوص الفاهيتا المميز.",
    badge: "نكهة مكسيكية",
    popular: false
  },
  {
    id: 27,
    name: "ساندوتش دجاج بانيه كرسبي ذهبي",
    category: "burgers",
    price: 40,
    image: "assets/images/dish-burger.jpg",
    description: "قطعة صدور دجاج متبلة ومقلية لدرجة القرمشة الذهبية مع الخس والمايونيز.",
    badge: "مقرمش ولذيذ",
    popular: true
  },

  // --- طواجن ومكرونة وأرز ---
  {
    id: 28,
    name: "طاجن مكرونة بالكبدة الإسكندراني في الفرن",
    category: "tajines",
    price: 55,
    oldPrice: 65,
    image: "assets/images/dish-pasta.jpg",
    description: "طاجن فخار بلدي مكرونة فرن بصلصة الطماطم الحارة مع كبدة إسكندراني متبلة وثوم ولمسة فلفل حار.",
    badge: "من قلب الفرن ♨️",
    popular: true,
    extras: [
      { name: "إضافة موتزاريلا على الوش", price: 15 }
    ]
  },
  {
    id: 29,
    name: "طاجن مكرونة بالسجق البلدي والموتزاريلا",
    category: "tajines",
    price: 65,
    oldPrice: 75,
    image: "assets/images/dish-pasta.jpg",
    description: "مكرونة بصوص الصلصة المتبلة محشوة بقطع السجق الشرقي البلدي وغارقة بجبنة موتزاريلا محمرة بالفرن.",
    badge: "أكتر طاجن محبوب 🍝",
    popular: true
  },
  {
    id: 30,
    name: "طاجن مكرونة بالفراخ والموتزاريلا (نجرسكو المحترف)",
    category: "tajines",
    price: 65,
    image: "assets/images/dish-pasta.jpg",
    description: "مكرونة بقطع الفراخ المتبلة والمشروم والصوص الأبيض مع طبقة موتزاريلا غنية.",
    badge: "وايت صوص غني",
    popular: false
  },
  {
    id: 31,
    name: "طاجن سمين مشكل المحترف في الفرن",
    category: "tajines",
    price: 80,
    image: "assets/images/dish-kebda.jpg",
    description: "طاجن شرقي أصيل يجمع الكبدة، السجق، الكفتة، والحلويات بالصلصة الحارة والفلفل الأخضر في الفخار.",
    badge: "معلم شبرا 🏅",
    popular: true
  },
  {
    id: 32,
    name: "طبق أرز بسمتي بالخلطة والمكسرات",
    category: "tajines",
    price: 35,
    image: "assets/images/dish-grill.jpg",
    description: "أرز بسمتي طويل الحبة مفلفل بالبهارات الشرقية والكركم ومزين بالزبيب والفول السوداني المحمص.",
    badge: "مفلفل بالسمن البلدي",
    popular: false
  },

  // --- مقبلات وسلطات ومشروبات ---
  {
    id: 33,
    name: "بطاطس فارم فريتس بصوص الشيدر",
    category: "sides",
    price: 30,
    image: "assets/images/dish-burger.jpg",
    description: "بطاطس مقلية ذهبية مقرمشة غارقة بصوص الجبنة الشيدر الصفراء الذائبة.",
    badge: "سناك مثالي",
    popular: true
  },
  {
    id: 34,
    name: "باذنجان مخلل بالدقة والتوم وطماطم متبلة",
    category: "sides",
    price: 15,
    image: "assets/images/dish-kebda.jpg",
    description: "باذنجان بلدي مقلي متبل بالثوم، الليمون، الخل، والكمون مع شرائح طماطم متبلة.",
    badge: "فاتح شهية أصلي 🧄",
    popular: true
  },
  {
    id: 35,
    name: "علبة سلطة طحينة سمسم بلدي",
    category: "sides",
    price: 10,
    image: "assets/images/dish-grill.jpg",
    description: "طحينة بيضاء سمسم صافي متبلة بالليمون والخل والكمون وزيت الزيتون.",
    badge: "سر الطعم",
    popular: true
  },
  {
    id: 36,
    name: "علبة سلطة خضراء بلدي",
    category: "sides",
    price: 10,
    image: "assets/images/dish-grill.jpg",
    description: "طماطم، خيار، جرجير، بقدونس، ولمون مع دريسنج ماء السلطة البلدي (وسكي حلال).",
    badge: "طازجة يومياً",
    popular: false
  },
  {
    id: 37,
    name: "علبة مخلل بلدي مشكل (طرشي المحترف)",
    category: "sides",
    price: 10,
    image: "assets/images/dish-segoq.jpg",
    description: "تشكيلة مخلل جزر، لفت، خيار، وفلفل مقرمش ومملح بعناية.",
    badge: "مقرمش",
    popular: false
  },
  {
    id: 38,
    name: "كريب نوتيلا بالموز والشيكولاتة",
    category: "sides",
    price: 50,
    image: "assets/images/dish-crepe.jpg",
    description: "كريب رقيق محشو شوكولاتة نوتيلا أصلية غنية مع شرائح الموز والمكسرات وصوص الشوكولاتة.",
    badge: "حلوى المحترف 🍫",
    popular: true
  },
  {
    id: 39,
    name: "مشروبات غازية كانز (بيبسي / سفن / ميرندا)",
    category: "sides",
    price: 15,
    image: "assets/images/dish-burger.jpg",
    description: "كانز مثلج 330 مل بجميع النكهات المنعشة.",
    badge: "مثلج ❄️",
    popular: false
  },
  {
    id: 40,
    name: "مياه معدنية طبيعية",
    category: "sides",
    price: 8,
    image: "assets/images/dish-pasta.jpg",
    description: "زجاجة مياه معدنية طبيعية نقية 600 مل.",
    badge: "نقية",
    popular: false
  }
];

window.CUSTOMER_REVIEWS = [
  {
    id: 1,
    name: "محمود الشربيني",
    rating: 5,
    date: "منذ يومين",
    comment: "أحسن كبدة وسجق أكلتهم في شبرا بلا منازع! الكبدة مفيهاش أي زفارة وتتبيلتها مظبوطة بالملي، وساندوتش الميكس ده حكاية لوحده. تسلم إيديكم.",
    branch: "فرع دوران شبرا"
  },
  {
    id: 2,
    name: "م. إسلام فتحي",
    rating: 5,
    date: "منذ 4 أيام",
    comment: "كريب المحترف الرجالي ده اختراع جبار! كمية لحوم وجبنة غير طبيعية ويشبع اتنين بالراحة. الدليفري كمان وصل في 25 دقيقة سخن جداً.",
    branch: "دليفري روض الفرج"
  },
  {
    id: 3,
    name: "سارة عبد الرحمن",
    rating: 5,
    date: "منذ أسبوع",
    comment: "المكان نضيف جداً والعمال محترمين، الحواوشي على الفحم طعمه يجنن وريحة الشوي فيه تحفة. جربت برضه طاجن المكرونة بالسجق والموتزاريلا وكان ممتاز.",
    branch: "فرع دوران شبرا"
  },
  {
    id: 4,
    name: "أحمد كمال",
    rating: 5,
    date: "منذ أسبوعين",
    comment: "زبون عندكم من سنين، ومفيش مرة طلبت فيها وأداءكم قل، الكفتة المشوية عالفحم خطيرة والسجق البلدي عنده ريحة متلاقيهاش في أي مكان تاني في القاهرة.",
    branch: "فرع ميدان عبود"
  }
];
