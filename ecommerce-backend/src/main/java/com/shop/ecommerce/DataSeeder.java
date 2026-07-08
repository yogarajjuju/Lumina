package com.shop.ecommerce;

import com.shop.ecommerce.model.*;
import com.shop.ecommerce.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final ReviewRepository reviewRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(CategoryRepository categoryRepository, ProductRepository productRepository,
                      UserRepository userRepository, ReviewRepository reviewRepository,
                      PasswordEncoder passwordEncoder) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.reviewRepository = reviewRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        // Create demo user
        User demo = new User("Demo User", "demo@shop.com", passwordEncoder.encode("password123"));
        demo.setPhone("9876543210");
        demo.setAddress("123 Main Street");
        demo.setCity("Mumbai");
        demo.setState("Maharashtra");
        demo.setZipCode("400001");
        demo = userRepository.save(demo);

        User reviewer1 = userRepository.save(new User("Priya Sharma", "priya@test.com", passwordEncoder.encode("pass")));
        User reviewer2 = userRepository.save(new User("Rahul Kumar", "rahul@test.com", passwordEncoder.encode("pass")));
        User reviewer3 = userRepository.save(new User("Anita Desai", "anita@test.com", passwordEncoder.encode("pass")));

        // Categories
        Category electronics = categoryRepository.save(new Category("Electronics", "Smartphones, Laptops, Gadgets & more", "https://dummyimage.com/500x500/2a2a35/8b5cf6.png&text=Lumina+Product", "💻"));
        Category fashion = categoryRepository.save(new Category("Fashion", "Clothing, Shoes, Accessories", "https://dummyimage.com/500x500/2a2a35/8b5cf6.png&text=Lumina+Product", "👗"));
        Category home = categoryRepository.save(new Category("Home & Kitchen", "Furniture, Decor, Appliances", "https://dummyimage.com/500x500/2a2a35/8b5cf6.png&text=Lumina+Product", "🏠"));
        Category books = categoryRepository.save(new Category("Books", "Fiction, Non-fiction, Educational", "https://dummyimage.com/500x500/2a2a35/8b5cf6.png&text=Lumina+Product", "📚"));
        Category sports = categoryRepository.save(new Category("Sports & Fitness", "Equipment, Sportswear, Supplements", "https://dummyimage.com/500x500/2a2a35/8b5cf6.png&text=Lumina+Product", "⚽"));
        Category beauty = categoryRepository.save(new Category("Beauty & Health", "Skincare, Makeup, Wellness", "https://dummyimage.com/500x500/2a2a35/8b5cf6.png&text=Lumina+Product", "✨"));
        Category toys = categoryRepository.save(new Category("Toys & Games", "Board Games, Action Figures, Puzzles", "https://dummyimage.com/500x500/2a2a35/8b5cf6.png&text=Lumina+Product", "🎮"));
        Category grocery = categoryRepository.save(new Category("Grocery", "Fresh Food, Snacks, Beverages", "https://dummyimage.com/500x500/2a2a35/8b5cf6.png&text=Lumina+Product", "🛒"));

        // ===== ELECTRONICS =====
        Product p1 = createProduct("iPhone 15 Pro Max", "Latest Apple flagship with A17 Pro chip, 48MP camera system, titanium design, and USB-C. Features Dynamic Island and always-on display.", 134999.0, 149999.0, 10, 50, "https://dummyimage.com/500x500/2a2a35/8b5cf6.png&text=Lumina+Product", "Apple", 4.7, 2847, electronics, true, true);
        Product p2 = createProduct("Samsung Galaxy S24 Ultra", "Galaxy AI powered smartphone with 200MP camera, S Pen, Snapdragon 8 Gen 3, and titanium frame.", 124999.0, 139999.0, 11, 35, "https://dummyimage.com/500x500/2a2a35/8b5cf6.png&text=Lumina+Product", "Samsung", 4.6, 1923, electronics, true, false);
        Product p3 = createProduct("MacBook Air M3", "Supercharged by M3 chip with 8-core CPU, 10-core GPU. 15.3-inch Liquid Retina display, 18-hour battery.", 134900.0, 149900.0, 10, 25, "https://dummyimage.com/500x500/2a2a35/8b5cf6.png&text=Lumina+Product", "Apple", 4.8, 1256, electronics, true, false);
        Product p4 = createProduct("Sony WH-1000XM5", "Industry-leading noise cancellation headphones. 30-hour battery, multipoint connection, crystal clear calls.", 24990.0, 34990.0, 29, 100, "https://dummyimage.com/500x500/2a2a35/8b5cf6.png&text=Lumina+Product", "Sony", 4.7, 4521, electronics, false, true);
        Product p5 = createProduct("iPad Pro 12.9\" M2", "The ultimate iPad with M2 chip, Liquid Retina XDR display, ProMotion, and Apple Pencil hover.", 112900.0, 124900.0, 10, 20, "https://dummyimage.com/500x500/2a2a35/8b5cf6.png&text=Lumina+Product", "Apple", 4.8, 987, electronics, true, false);
        Product p6 = createProduct("JBL Charge 5", "Portable Bluetooth speaker with powerful JBL Original Pro Sound, built-in powerbank, 20H playtime.", 14999.0, 18999.0, 21, 150, "https://dummyimage.com/500x500/2a2a35/8b5cf6.png&text=Lumina+Product", "JBL", 4.5, 3456, electronics, false, false);

        // ===== FASHION =====
        Product p7 = createProduct("Premium Leather Jacket", "Genuine lambskin leather jacket with quilted lining. Classic biker style with premium YKK zippers.", 8999.0, 14999.0, 40, 30, "https://dummyimage.com/500x500/2a2a35/8b5cf6.png&text=Lumina+Product", "Urban Edge", 4.4, 876, fashion, false, true);
        Product p8 = createProduct("Nike Air Max 270", "Iconic Air Max lifestyle shoe with the biggest heel Air unit yet. Breathable mesh upper, foam midsole.", 12995.0, 15995.0, 19, 80, "https://dummyimage.com/500x500/2a2a35/8b5cf6.png&text=Lumina+Product", "Nike", 4.6, 2341, fashion, true, false);
        Product p9 = createProduct("Ray-Ban Aviator Classic", "Iconic aviator sunglasses with crystal green lenses. Gold-tone metal frame, 100% UV protection.", 7490.0, 9990.0, 25, 60, "https://dummyimage.com/500x500/2a2a35/8b5cf6.png&text=Lumina+Product", "Ray-Ban", 4.5, 1567, fashion, false, false);
        Product p10 = createProduct("Levi's 501 Original Jeans", "The original blue jean since 1873. Button fly, straight leg, sits at waist. 100% cotton denim.", 3999.0, 5499.0, 27, 120, "https://dummyimage.com/500x500/2a2a35/8b5cf6.png&text=Lumina+Product", "Levi's", 4.3, 3211, fashion, false, false);
        Product p11 = createProduct("Cashmere Blend Sweater", "Ultra-soft cashmere blend crew neck sweater. Perfect for layering. Available in 8 colors.", 4599.0, 7999.0, 42, 45, "https://dummyimage.com/500x500/2a2a35/8b5cf6.png&text=Lumina+Product", "Luxe Knit", 4.4, 654, fashion, false, false);

        // ===== HOME & KITCHEN =====
        Product p12 = createProduct("Dyson V15 Detect", "Laser-equipped cordless vacuum. Reveals invisible dust on hard floors. Up to 60 min runtime.", 52990.0, 62990.0, 16, 15, "https://dummyimage.com/500x500/2a2a35/8b5cf6.png&text=Lumina+Product", "Dyson", 4.7, 1890, home, true, true);
        Product p13 = createProduct("Instant Pot Duo 7-in-1", "Multi-use pressure cooker: pressure cook, slow cook, rice cooker, steamer, sauté, yogurt maker & warmer.", 8999.0, 12999.0, 31, 70, "https://dummyimage.com/500x500/2a2a35/8b5cf6.png&text=Lumina+Product", "Instant Pot", 4.6, 5674, home, false, false);
        Product p14 = createProduct("Minimalist Desk Lamp", "LED desk lamp with wireless charging base, 5 color temperatures, touch dimmer. Sleek aluminum design.", 3499.0, 4999.0, 30, 90, "https://dummyimage.com/500x500/2a2a35/8b5cf6.png&text=Lumina+Product", "LumiLight", 4.3, 432, home, false, false);
        Product p15 = createProduct("Egyptian Cotton Bedsheet Set", "1000 thread count Egyptian cotton bedsheet set. King size. Includes flat sheet, fitted sheet, 2 pillowcases.", 5999.0, 9999.0, 40, 40, "https://dummyimage.com/500x500/2a2a35/8b5cf6.png&text=Lumina+Product", "SleepLuxe", 4.5, 1234, home, false, false);
        Product p16 = createProduct("Cast Iron Dutch Oven", "6-quart enameled cast iron dutch oven. Superior heat retention. Oven safe to 500°F. Lifetime warranty.", 6799.0, 9999.0, 32, 55, "https://dummyimage.com/500x500/2a2a35/8b5cf6.png&text=Lumina+Product", "Heritage Cook", 4.7, 2345, home, false, false);

        // ===== BOOKS =====
        Product p17 = createProduct("Atomic Habits", "James Clear's #1 NYT Bestseller. Proven framework for building good habits & breaking bad ones.", 499.0, 799.0, 38, 200, "https://dummyimage.com/500x500/2a2a35/8b5cf6.png&text=Lumina+Product", "Penguin", 4.8, 12456, books, true, false);
        Product p18 = createProduct("The Psychology of Money", "Morgan Housel explores the strange ways people think about money. Timeless lessons on wealth & happiness.", 399.0, 599.0, 33, 180, "https://dummyimage.com/500x500/2a2a35/8b5cf6.png&text=Lumina+Product", "Jaico", 4.7, 8976, books, false, false);
        Product p19 = createProduct("Sapiens: A Brief History", "Yuval Noah Harari's groundbreaking narrative of humanity's creation and evolution.", 499.0, 699.0, 29, 150, "https://dummyimage.com/500x500/2a2a35/8b5cf6.png&text=Lumina+Product", "Harper", 4.6, 7654, books, false, false);
        Product p20 = createProduct("Think and Grow Rich", "Napoleon Hill's timeless classic on the philosophy of personal achievement and financial success.", 299.0, 499.0, 40, 250, "https://dummyimage.com/500x500/2a2a35/8b5cf6.png&text=Lumina+Product", "Fingerprint", 4.5, 5432, books, false, true);
        Product p21 = createProduct("The Art of War", "Sun Tzu's ancient masterpiece on military strategy, now applied to business and leadership.", 199.0, 399.0, 50, 300, "https://dummyimage.com/500x500/2a2a35/8b5cf6.png&text=Lumina+Product", "Maple Press", 4.4, 3210, books, false, false);

        // ===== SPORTS =====
        Product p22 = createProduct("Yoga Mat Premium", "6mm thick non-slip yoga mat. Eco-friendly TPE material. Includes carrying strap. 72\" x 24\".", 1999.0, 3499.0, 43, 100, "https://dummyimage.com/500x500/2a2a35/8b5cf6.png&text=Lumina+Product", "ZenFit", 4.4, 2345, sports, false, false);
        Product p23 = createProduct("Adjustable Dumbbell Set", "5-52.5 lbs adjustable dumbbells. Replace 15 sets of weights. Quick-change mechanism.", 24999.0, 34999.0, 29, 20, "https://dummyimage.com/500x500/2a2a35/8b5cf6.png&text=Lumina+Product", "PowerBlock", 4.6, 876, sports, true, false);
        Product p24 = createProduct("Running Shoes UltraBoost", "Adidas Ultraboost with responsive BOOST midsole, Primeknit upper, Continental rubber outsole.", 13999.0, 17999.0, 22, 65, "https://dummyimage.com/500x500/2a2a35/8b5cf6.png&text=Lumina+Product", "Adidas", 4.7, 4567, sports, false, false);
        Product p25 = createProduct("Fitness Tracker Band", "Advanced fitness tracker with heart rate, SpO2, sleep tracking. 14-day battery. Water resistant 5ATM.", 3999.0, 5999.0, 33, 110, "https://dummyimage.com/500x500/2a2a35/8b5cf6.png&text=Lumina+Product", "FitPro", 4.3, 1987, sports, false, false);
        Product p26 = createProduct("Cricket Bat English Willow", "Grade 1 English willow cricket bat. Full size SH. Premium cane handle with rubber grip.", 7999.0, 11999.0, 33, 30, "https://dummyimage.com/500x500/2a2a35/8b5cf6.png&text=Lumina+Product", "SS", 4.5, 765, sports, false, false);

        // ===== BEAUTY =====
        Product p27 = createProduct("Vitamin C Serum", "20% Vitamin C + Hyaluronic Acid + Vitamin E serum. Brightening, anti-aging, dark spot corrector.", 1299.0, 1999.0, 35, 200, "https://dummyimage.com/500x500/2a2a35/8b5cf6.png&text=Lumina+Product", "SkinGlow", 4.5, 5678, beauty, false, false);
        Product p28 = createProduct("MAC Lipstick Ruby Woo", "The iconic matte red lipstick. Long-wearing, full coverage, retro matte finish.", 1750.0, 1950.0, 10, 90, "https://dummyimage.com/500x500/2a2a35/8b5cf6.png&text=Lumina+Product", "MAC", 4.6, 3456, beauty, true, false);
        Product p29 = createProduct("Perfume Eau de Parfum", "Luxury oriental fragrance with notes of bergamot, jasmine, and sandalwood. 100ml bottle.", 4999.0, 7499.0, 33, 40, "https://dummyimage.com/500x500/2a2a35/8b5cf6.png&text=Lumina+Product", "Luxe Scent", 4.4, 1234, beauty, false, false);
        Product p30 = createProduct("Hair Dryer Professional", "2000W ionic hair dryer with diffuser & concentrator. 3 heat + 2 speed settings. Cool shot button.", 3499.0, 5499.0, 36, 55, "https://dummyimage.com/500x500/2a2a35/8b5cf6.png&text=Lumina+Product", "StylePro", 4.3, 987, beauty, false, true);
        Product p31 = createProduct("Sunscreen SPF 50+", "Broad spectrum PA++++ sunscreen. Lightweight, non-greasy formula. Water-resistant for 80 minutes.", 599.0, 899.0, 33, 300, "https://dummyimage.com/500x500/2a2a35/8b5cf6.png&text=Lumina+Product", "SunShield", 4.5, 6789, beauty, false, false);

        // ===== TOYS & GAMES =====
        Product p32 = createProduct("LEGO Technic Ferrari", "Build and display the iconic Ferrari Daytona SP3. 3,778 pieces. Ages 18+.", 39999.0, 44999.0, 11, 10, "https://dummyimage.com/500x500/2a2a35/8b5cf6.png&text=Lumina+Product", "LEGO", 4.9, 567, toys, true, false);
        Product p33 = createProduct("PlayStation 5 Console", "Next-gen gaming with lightning-fast loading, DualSense controller, and stunning 4K graphics.", 49990.0, 54990.0, 9, 15, "https://dummyimage.com/500x500/2a2a35/8b5cf6.png&text=Lumina+Product", "Sony", 4.8, 8765, toys, true, true);
        Product p34 = createProduct("Board Game Settlers of Catan", "Award-winning strategy board game. Trade, build and settle the island of Catan. 3-4 players.", 2499.0, 3499.0, 29, 60, "https://dummyimage.com/500x500/2a2a35/8b5cf6.png&text=Lumina+Product", "Catan Studio", 4.6, 4321, toys, false, false);
        Product p35 = createProduct("Drone with 4K Camera", "Foldable drone with 4K UHD camera, GPS, 30min flight time, 3-axis gimbal stabilization.", 29999.0, 39999.0, 25, 20, "https://dummyimage.com/500x500/2a2a35/8b5cf6.png&text=Lumina+Product", "SkyVision", 4.5, 1876, toys, false, false);

        // ===== GROCERY =====
        Product p36 = createProduct("Organic Green Tea (100 bags)", "Premium organic green tea. Rich in antioxidants. Individually wrapped tea bags for freshness.", 599.0, 899.0, 33, 500, "https://dummyimage.com/500x500/2a2a35/8b5cf6.png&text=Lumina+Product", "TeaVeda", 4.4, 3456, grocery, false, false);
        Product p37 = createProduct("Dark Chocolate 70% Cocoa", "Belgian dark chocolate bar. 70% single-origin cocoa. Smooth, rich flavor. 100g.", 349.0, 499.0, 30, 200, "https://dummyimage.com/500x500/2a2a35/8b5cf6.png&text=Lumina+Product", "ChocoLuxe", 4.6, 2345, grocery, false, false);
        Product p38 = createProduct("Extra Virgin Olive Oil", "Cold-pressed extra virgin olive oil from Mediterranean olives. 1 liter glass bottle.", 899.0, 1299.0, 31, 100, "https://dummyimage.com/500x500/2a2a35/8b5cf6.png&text=Lumina+Product", "OliveGold", 4.5, 1567, grocery, false, false);
        Product p39 = createProduct("Protein Bar Variety Pack", "12-pack assorted protein bars. 20g protein each. Gluten-free, no artificial sweeteners.", 1499.0, 1999.0, 25, 150, "https://dummyimage.com/500x500/2a2a35/8b5cf6.png&text=Lumina+Product", "FitFuel", 4.3, 2876, grocery, false, false);
        Product p40 = createProduct("Basmati Rice Premium 5kg", "Aged premium basmati rice. Extra long grain. Aromatic, fluffy when cooked.", 699.0, 999.0, 30, 400, "https://dummyimage.com/500x500/2a2a35/8b5cf6.png&text=Lumina+Product", "Royal Grain", 4.5, 4567, grocery, false, false);

        // Add some reviews
        addReview(reviewer1, p1, 5, "Best phone ever!", "Absolutely love the camera quality and the titanium design feels premium.");
        addReview(reviewer2, p1, 4, "Great but expensive", "Amazing phone, but the price is a bit steep. Camera and performance are top-notch.");
        addReview(reviewer3, p1, 5, "Worth every penny", "Upgraded from iPhone 13 and the difference is night and day.");
        addReview(reviewer1, p4, 5, "Silence is golden", "Best noise cancellation I've ever experienced. Comfortable for long hours.");
        addReview(reviewer2, p8, 4, "Stylish and comfy", "Great everyday shoes. Very comfortable for walking and they look fantastic.");
        addReview(reviewer3, p17, 5, "Life-changing book", "Changed how I think about habits. Simple, practical, and backed by science.");
        addReview(reviewer1, p12, 5, "Best vacuum ever", "The laser feature is incredible. You can see every particle of dust.");
        addReview(reviewer2, p33, 5, "Next-gen gaming!", "The DualSense controller is amazing. Loading times are virtually non-existent.");

        System.out.println("✅ Data seeded: " + productRepository.count() + " products, " +
                categoryRepository.count() + " categories, " + userRepository.count() + " users");
    }

    private Product createProduct(String name, String desc, Double price, Double originalPrice,
                                  Integer discount, Integer stock, String imageUrl, String brand,
                                  Double rating, Integer reviewCount, Category category,
                                  boolean featured, boolean dealOfDay) {
        Product p = new Product(name, desc, price, originalPrice, discount, stock, imageUrl, brand, rating, reviewCount, category);
        p.setFeatured(featured);
        p.setDealOfDay(dealOfDay);
        return productRepository.save(p);
    }

    private void addReview(User user, Product product, int rating, String title, String comment) {
        reviewRepository.save(new Review(user, product, rating, comment, title));
    }
}
