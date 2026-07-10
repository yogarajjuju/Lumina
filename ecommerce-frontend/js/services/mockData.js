// Mock Data — global
var CATEGORIES = [
  { id:1, imageUrl:"https://picsum.photos/seed/Electronics/500/500", icon:"💻" },
  { id:2, imageUrl:"https://picsum.photos/seed/Fashion/500/500", icon:"👗" },
  { id:3, imageUrl:"https://picsum.photos/seed/HomeKitchen/500/500", icon:"🏠" },
  { id:4, imageUrl:"https://picsum.photos/seed/Books/500/500", icon:"📚" },
  { id:5, imageUrl:"https://picsum.photos/seed/SportsFitness/500/500", icon:"⚽" },
  { id:6, imageUrl:"https://picsum.photos/seed/BeautyHealth/500/500", icon:"✨" },
  { id:7, imageUrl:"https://picsum.photos/seed/ToysGames/500/500", icon:"🎮" },
  { id:8, imageUrl:"https://picsum.photos/seed/Grocery/500/500", icon:"🛒" }
];

var PRODUCTS = [
  { id:1,imageUrl:"https://picsum.photos/seed/iPhone15ProMax/500/500",brand:"Apple",rating:4.7,reviewCount:2847,category:{id:1,name:"Electronics"},featured:true,dealOfDay:true},
  { id:2,imageUrl:"https://picsum.photos/seed/SamsungGalaxyS24Ultra/500/500",brand:"Samsung",rating:4.6,reviewCount:1923,category:{id:1,name:"Electronics"},featured:true,dealOfDay:false},
  { id:3,imageUrl:"https://picsum.photos/seed/MacBookAirM3/500/500",brand:"Apple",rating:4.8,reviewCount:1256,category:{id:1,name:"Electronics"},featured:true,dealOfDay:false},
  { id:4,imageUrl:"https://picsum.photos/seed/SonyWH1000XM5/500/500",brand:"Sony",rating:4.7,reviewCount:4521,category:{id:1,name:"Electronics"},featured:false,dealOfDay:true},
  { id:5,imageUrl:"https://picsum.photos/seed/iPadPro129/500/500",brand:"Apple",rating:4.8,reviewCount:987,category:{id:1,name:"Electronics"},featured:true,dealOfDay:false},
  { id:6,imageUrl:"https://picsum.photos/seed/JBLCharge5/500/500",brand:"JBL",rating:4.5,reviewCount:3456,category:{id:1,name:"Electronics"},featured:false,dealOfDay:false},
  { id:7,imageUrl:"https://picsum.photos/seed/PremiumLeatherJacket/500/500",brand:"Urban Edge",rating:4.4,reviewCount:876,category:{id:2,name:"Fashion"},featured:false,dealOfDay:true},
  { id:8,imageUrl:"https://picsum.photos/seed/NikeAirMax270/500/500",brand:"Nike",rating:4.6,reviewCount:2341,category:{id:2,name:"Fashion"},featured:true,dealOfDay:false},
  { id:9,imageUrl:"https://picsum.photos/seed/RayBanAviatorClassic/500/500",brand:"Ray-Ban",rating:4.5,reviewCount:1567,category:{id:2,name:"Fashion"},featured:false,dealOfDay:false},
  { id:10,imageUrl:"https://picsum.photos/seed/Levis501OriginalJeans/500/500",brand:"Levi's",rating:4.3,reviewCount:3211,category:{id:2,name:"Fashion"},featured:false,dealOfDay:false},
  { id:11,imageUrl:"https://picsum.photos/seed/CashmereBlendSweater/500/500",brand:"Luxe Knit",rating:4.4,reviewCount:654,category:{id:2,name:"Fashion"},featured:false,dealOfDay:false},
  { id:12,imageUrl:"https://picsum.photos/seed/DysonV15Detect/500/500",brand:"Dyson",rating:4.7,reviewCount:1890,category:{id:3,name:"Home & Kitchen"},featured:true,dealOfDay:true},
  { id:13,imageUrl:"https://picsum.photos/seed/InstantPotDuo7in1/500/500",brand:"Instant Pot",rating:4.6,reviewCount:5674,category:{id:3,name:"Home & Kitchen"},featured:false,dealOfDay:false},
  { id:14,imageUrl:"https://picsum.photos/seed/MinimalistDeskLamp/500/500",brand:"LumiLight",rating:4.3,reviewCount:432,category:{id:3,name:"Home & Kitchen"},featured:false,dealOfDay:false},
  { id:15,imageUrl:"https://picsum.photos/seed/EgyptianCottonBedsheetSet/500/500",brand:"SleepLuxe",rating:4.5,reviewCount:1234,category:{id:3,name:"Home & Kitchen"},featured:false,dealOfDay:false},
  { id:16,imageUrl:"https://picsum.photos/seed/CastIronDutchOven/500/500",brand:"Heritage Cook",rating:4.7,reviewCount:2345,category:{id:3,name:"Home & Kitchen"},featured:false,dealOfDay:false},
  { id:17,imageUrl:"https://picsum.photos/seed/AtomicHabits/500/500",brand:"Penguin",rating:4.8,reviewCount:12456,category:{id:4,name:"Books"},featured:true,dealOfDay:false},
  { id:18,imageUrl:"https://picsum.photos/seed/ThePsychologyofMoney/500/500",brand:"Jaico",rating:4.7,reviewCount:8976,category:{id:4,name:"Books"},featured:false,dealOfDay:false},
  { id:19,imageUrl:"https://picsum.photos/seed/SapiensABriefHistory/500/500",brand:"Harper",rating:4.6,reviewCount:7654,category:{id:4,name:"Books"},featured:false,dealOfDay:false},
  { id:20,imageUrl:"https://picsum.photos/seed/ThinkandGrowRich/500/500",brand:"Fingerprint",rating:4.5,reviewCount:5432,category:{id:4,name:"Books"},featured:false,dealOfDay:true},
  { id:21,imageUrl:"https://picsum.photos/seed/YogaMatPremium/500/500",brand:"ZenFit",rating:4.4,reviewCount:2345,category:{id:5,name:"Sports & Fitness"},featured:false,dealOfDay:false},
  { id:22,imageUrl:"https://picsum.photos/seed/AdjustableDumbbellSet/500/500",brand:"PowerBlock",rating:4.6,reviewCount:876,category:{id:5,name:"Sports & Fitness"},featured:true,dealOfDay:false},
  { id:23,imageUrl:"https://picsum.photos/seed/RunningShoesUltraBoost/500/500",brand:"Adidas",rating:4.7,reviewCount:4567,category:{id:5,name:"Sports & Fitness"},featured:false,dealOfDay:false},
  { id:24,imageUrl:"https://picsum.photos/seed/FitnessTrackerBand/500/500",brand:"FitPro",rating:4.3,reviewCount:1987,category:{id:5,name:"Sports & Fitness"},featured:false,dealOfDay:false},
  { id:25,imageUrl:"https://picsum.photos/seed/VitaminCSerum/500/500",brand:"SkinGlow",rating:4.5,reviewCount:5678,category:{id:6,name:"Beauty & Health"},featured:false,dealOfDay:false},
  { id:26,imageUrl:"https://picsum.photos/seed/MACLipstickRubyWoo/500/500",brand:"MAC",rating:4.6,reviewCount:3456,category:{id:6,name:"Beauty & Health"},featured:true,dealOfDay:false},
  { id:27,imageUrl:"https://picsum.photos/seed/LEGOTechnicFerrari/500/500",brand:"LEGO",rating:4.9,reviewCount:567,category:{id:7,name:"Toys & Games"},featured:true,dealOfDay:false},
  { id:28,imageUrl:"https://picsum.photos/seed/PlayStation5Console/500/500",brand:"Sony",rating:4.8,reviewCount:8765,category:{id:7,name:"Toys & Games"},featured:true,dealOfDay:true},
  { id:29,imageUrl:"https://picsum.photos/seed/Dronewith4KCamera/500/500",brand:"SkyVision",rating:4.5,reviewCount:1876,category:{id:7,name:"Toys & Games"},featured:false,dealOfDay:false},
  { id:30,imageUrl:"https://picsum.photos/seed/OrganicGreenTea100bags/500/500",brand:"TeaVeda",rating:4.4,reviewCount:3456,category:{id:8,name:"Grocery"},featured:false,dealOfDay:false},
  { id:31,imageUrl:"https://picsum.photos/seed/DarkChocolate70Cocoa/500/500",brand:"ChocoLuxe",rating:4.6,reviewCount:2345,category:{id:8,name:"Grocery"},featured:false,dealOfDay:false},
  { id:32,imageUrl:"https://picsum.photos/seed/BasmatiRicePremium5kg/500/500",brand:"Royal Grain",rating:4.5,reviewCount:4567,category:{id:8,name:"Grocery"},featured:false,dealOfDay:false}
];

var REVIEWS = [
  { id:1, user:{name:"Priya Sharma"}, product:{id:1}, rating:5, title:"Best phone ever!", comment:"Absolutely love the camera quality and the titanium design feels premium.", createdAt:"2024-12-15" },
  { id:2, user:{name:"Rahul Kumar"}, product:{id:1}, rating:4, title:"Great but expensive", comment:"Amazing phone, but the price is steep. Camera and performance are top-notch.", createdAt:"2024-12-20" },
  { id:3, user:{name:"Anita Desai"}, product:{id:1}, rating:5, title:"Worth every penny", comment:"Upgraded from iPhone 13 and the difference is night and day.", createdAt:"2025-01-05" },
  { id:4, user:{name:"Priya Sharma"}, product:{id:4}, rating:5, title:"Silence is golden", comment:"Best noise cancellation I've ever experienced.", createdAt:"2025-01-10" },
  { id:5, user:{name:"Rahul Kumar"}, product:{id:8}, rating:4, title:"Stylish and comfy", comment:"Great everyday shoes. Very comfortable for walking.", createdAt:"2025-01-15" },
  { id:6, user:{name:"Anita Desai"}, product:{id:17}, rating:5, title:"Life-changing book", comment:"Changed how I think about habits.", createdAt:"2025-02-01" }
];
