/* =========================================================
 * Travel Explorer — single-page app logic
 * Pure vanilla JS, no dependencies.
 * ========================================================= */

const STORAGE_KEYS = {
  enquiries: "travelExplorer.enquiries",
  packing: "travelExplorer.packing",
  itinerary: "travelExplorer.itinerary",
  theme: "travelExplorer.theme",
};

/* ---------- City data ---------- */

const CITIES = [
  {
    id: "seoul",
    name: "Seoul",
    country: "South Korea",
    images: [
      "https://images.unsplash.com/photo-1538485399081-7c8970e15278?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1610715812875-d9f2bb1ae838?auto=format&fit=crop&w=1400&q=80",
    ],
    teaser: "Palace gates at dawn, neon alleys past midnight. Seoul moves at two speeds and you'll fall for both.",
    flight: "6h 30m",
    daily: 150,
    season: "Apr–May, Sep–Oct",
    overview: "Seoul layers thousand-year palaces over hyper-modern districts. Spend mornings in Bukchon hanok lanes, afternoons in Gangnam cafés, and nights in Hongdae street food markets. English signage is good and the metro is world-class.",
    itinerary: [
      { day: "Day 1 — Old Seoul", items: ["Gyeongbokgung Palace + changing of the guard", "Bukchon Hanok Village walk", "Insadong tea house break", "Gwangjang Market dinner: bindaetteok + mayak gimbap"] },
      { day: "Day 2 — Modern Seoul", items: ["Coffee in Seongsu (Korea's Brooklyn)", "Lotte Tower observation deck", "Gangnam shopping at Garosu-gil", "Han River sunset with chicken & beer"] },
      { day: "Day 3 — Day trip", items: ["DMZ guided tour (book in advance)", "Or: Nami Island + Petite France", "Evening Korean BBQ in Hongdae", "Late-night noraebang (karaoke)"] },
    ],
    food: ["Bossam (boiled pork wraps)", "Tteokbokki at Sindang-dong", "Korean fried chicken + Cass beer", "Naengmyeon in summer", "Soft tofu jjigae for breakfast"],
    transport: "T-money card works on subway, buses, and most taxis. Kakao T app for ride-hailing (Uber doesn't really exist here). Airport Express (AREX) from Incheon takes 43 min to Seoul Station.",
    cost: { Flights: 600, Accommodation: 480, Food: 250, Transport: 60, Activities: 130 },
    safety: ["Extremely safe at all hours. Solo travel is fine.", "Watch crowd density on weekends in Myeongdong and Hongdae.", "Tap water is technically potable but most locals drink bottled.", "Note: regional tensions don't affect daily travel — stay informed."],
    photoSpots: ["Bukchon Hanok rooftops at 7am", "Cheonggyecheon stream at night", "N Seoul Tower from Namsan Park", "Ihwa Mural Village murals", "Banpo Bridge rainbow fountain"],
  },
  {
    id: "singapore",
    name: "Singapore",
    country: "Singapore",
    images: [
      "https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1496939376851-89342e90adcd?auto=format&fit=crop&w=1400&q=80",
    ],
    teaser: "Hawker centres at lunch, cocktail bars in colonial shophouses at night. Compact, clean, and seriously delicious.",
    flight: "0h (home base)",
    daily: 120,
    season: "Feb–Apr",
    overview: "Singapore packs a continent of food and architecture into 720 sq km. You can morning-swim at Sentosa, lunch at a Michelin hawker stall, and dine at an Indian institution along Race Course Road. Everything connects by MRT.",
    itinerary: [
      { day: "Day 1 — Icons", items: ["Marina Bay Gardens (Cloud Forest + Flower Dome)", "Helix Bridge walk to MBS SkyPark", "Lau Pa Sat satay street dinner", "Spectra light show at Marina Bay"] },
      { day: "Day 2 — Neighbourhoods", items: ["Chinatown breakfast: kaya toast at Tong Ah", "Tiong Bahru's indie cafés and bookshops", "Haji Lane + Arab Street", "Maxwell Hawker: Tian Tian chicken rice"] },
      { day: "Day 3 — Green side", items: ["MacRitchie TreeTop Walk", "Singapore Botanic Gardens", "Dempsey Hill brunch", "Sunset rooftop at 1-Altitude or LeVeL33"] },
    ],
    food: ["Hainanese chicken rice", "Chilli crab at Jumbo or Long Beach", "Laksa at 328 Katong", "Char kway teow", "Roti prata with curry"],
    transport: "EZ-Link or contactless credit card on MRT and buses. Grab is the dominant ride-hailing app. Changi to city: 30 min by MRT, ~SGD 25 by Grab.",
    cost: { Flights: 0, Accommodation: 600, Food: 200, Transport: 50, Activities: 150 },
    safety: ["One of the safest cities globally. Walk anywhere, any time.", "Laws are strict — no littering, no chewing gum (mostly), no jaywalking.", "Tap water is clean and safe to drink.", "Watch for cyclists and PMDs on shared paths."],
    photoSpots: ["Marina Bay Sands reflected in the bay at blue hour", "Helix Bridge geometry shots", "Peranakan shophouses on Koon Seng Road", "Old Hill Street Police Station rainbow windows", "Henderson Waves bridge"],
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    images: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1554366347-897a5113f6ab?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1400&q=80",
    ],
    teaser: "Rice terraces, surf breaks, temple ceremonies. Stay long enough to slow down.",
    flight: "2h 30m",
    daily: 80,
    season: "May–Sep",
    overview: "Ubud for the jungle and yoga, Canggu for surf and cafés, Uluwatu for the cliff sunsets, Nusa Penida for the wild day trips. Hire a scooter or a private driver for the day — a full-day driver runs SGD 50–70.",
    itinerary: [
      { day: "Day 1 — Ubud", items: ["Tegalalang rice terraces at sunrise", "Sacred Monkey Forest walk", "Lunch at Hujan Locale or Locavore To Go", "Sunset at Campuhan Ridge Walk"] },
      { day: "Day 2 — South coast", items: ["Surf lesson in Canggu", "Lunch at La Brisa or The Lawn", "Uluwatu Temple at sunset", "Kecak fire dance + Jimbaran seafood dinner"] },
      { day: "Day 3 — Day trip", items: ["Nusa Penida full-day boat tour", "Kelingking Beach viewpoint", "Angel's Billabong + Broken Beach", "Crystal Bay swim & snorkel"] },
    ],
    food: ["Babi guling (suckling pig) at Ibu Oka", "Nasi campur — order one of everything", "Bebek betutu (slow-roasted duck)", "Sate lilit (Balinese satay)", "Fresh young coconut everywhere"],
    transport: "Bali has no metro. Hire a driver (SGD 50–70/day) or a scooter (SGD 8/day) if confident. Gojek and Grab work in most areas but get blocked from some taxi turfs. Allow 90+ min between Canggu and Uluwatu.",
    cost: { Flights: 350, Accommodation: 280, Food: 150, Transport: 100, Activities: 120 },
    safety: ["Watch the surf — strong rips at Kuta, Canggu, and Padang Padang.", "Scooter accidents are the #1 traveller injury. Wear a helmet, full sleeves.", "Drink bottled water only. Brush teeth with it too.", "Monkeys at Uluwatu and Ubud will steal sunglasses — don't engage."],
    photoSpots: ["Handara Gate", "Tegalalang rice terraces", "Tibumana Waterfall", "Lempuyang Temple 'Gates of Heaven'", "Kelingking Beach cliff"],
  },
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    images: [
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1400&q=80",
    ],
    teaser: "13 million people, zero chaos. The world's most considerate megacity.",
    flight: "7h 00m",
    daily: 180,
    season: "Mar–May, Oct–Nov",
    overview: "Tokyo rewards curiosity. Get lost on purpose in Shimokitazawa, then surface in Ginza for dinner. Cash is still king at small shops — keep ¥20,000 on you. The JR Yamanote line loops every major district.",
    itinerary: [
      { day: "Day 1 — Central", items: ["Tsukiji Outer Market breakfast", "Imperial Palace gardens", "Ginza for window-shopping and sushi", "Roppongi Hills observation deck at dusk"] },
      { day: "Day 2 — Pop & quirky", items: ["Meiji Shrine morning walk", "Harajuku + Omotesando cafés", "Shibuya Crossing and Shibuya Sky", "Golden Gai tiny-bar crawl"] },
      { day: "Day 3 — Old town", items: ["Senso-ji Temple in Asakusa at 7am", "Yanaka old neighbourhood walk", "Akihabara electronics + retro arcades", "Robot Restaurant or izakaya in Ebisu"] },
    ],
    food: ["Conveyor-belt sushi at Uobei", "Ichiran or Afuri ramen", "Tonkatsu at Maisen", "Wagyu yakiniku at Han no Daidokoro", "Convenience store onigiri — actually amazing"],
    transport: "Suica or Pasmo card on every train, bus, and many vending machines. JR Pass only worth it if doing Kyoto/Osaka. Narita to city: 60–90 min by N'EX; Haneda: 30 min by Tokyo Monorail.",
    cost: { Flights: 700, Accommodation: 700, Food: 350, Transport: 90, Activities: 160 },
    safety: ["Astonishingly safe. Drop your wallet — someone hands it back.", "Earthquake drills are routine; download the Yurekuru Call app.", "Mind the silent train etiquette — no phone calls.", "Late-night Kabukicho touts: ignore and walk on."],
    photoSpots: ["Shibuya Crossing from Shibuya Sky", "Mt Fuji from Lake Kawaguchi (day trip)", "Senso-ji at night, empty", "Hot pink azaleas at Nezu Shrine (spring)", "Tokyo Tower from Roppongi Hills"],
  },
  {
    id: "bangkok",
    name: "Bangkok",
    country: "Thailand",
    images: [
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1552550049-db097c9480d1?auto=format&fit=crop&w=1400&q=80",
    ],
    teaser: "Temple-and-mall in the same afternoon. Bangkok is loud, generous, and outstanding value.",
    flight: "2h 30m",
    daily: 70,
    season: "Nov–Feb",
    overview: "Bangkok is two cities — the river side (Grand Palace, Wat Pho, Chinatown) and the new side (Sukhumvit, Thonglor, Asok). The BTS Skytrain and MRT cover most of what you want; tuk-tuks are tourist tax. Always agree on a taxi meter.",
    itinerary: [
      { day: "Day 1 — Old town", items: ["Grand Palace + Wat Phra Kaew (long sleeves!)", "Wat Pho reclining Buddha + Thai massage", "Cross-river ferry to Wat Arun", "Chinatown street food crawl on Yaowarat"] },
      { day: "Day 2 — Markets & mall life", items: ["Chatuchak Weekend Market (Sat/Sun only)", "Or Or Tor Kor for premium food", "MBK Center + Siam Paragon", "Rooftop drinks at Vertigo or Sky Bar"] },
      { day: "Day 3 — Day trip", items: ["Ayutthaya temple ruins (1.5h by train)", "Or: Maeklong railway market + Damnoen Saduak floating", "Evening cooking class", "Muay Thai at Lumpinee Stadium"] },
    ],
    food: ["Boat noodles in Victory Monument", "Som tam (papaya salad) with sticky rice", "Pad kra pao moo with fried egg", "Mango sticky rice from a cart", "Khao soi in the north — also found in Bangkok"],
    transport: "BTS + MRT Rabbit card for skytrain/subway. Grab and Bolt both work. Don't tuk-tuk a long distance — they overcharge tourists. Suvarnabhumi to city: Airport Rail Link, 30 min.",
    cost: { Flights: 250, Accommodation: 200, Food: 100, Transport: 50, Activities: 80 },
    safety: ["Petty scams more than violence. 'Temple is closed today' = scam.", "Use only marked taxis and insist on the meter.", "Watch your drink in Khao San area.", "Air quality is poor Jan–Apr — pack an N95 if asthmatic."],
    photoSpots: ["Wat Arun from across the river at sunset", "Wat Pho's reclining feet", "Skybar at Lebua", "Chinatown neon signs after 8pm", "Bangkok skyline from Mahanakhon SkyWalk"],
  },
  {
    id: "hong-kong",
    name: "Hong Kong",
    country: "China SAR",
    images: [
      "https://images.unsplash.com/photo-1506372023823-741c83b836fe?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1576174464184-fb78fe882bfd?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?auto=format&fit=crop&w=1400&q=80",
    ],
    teaser: "Skyscrapers wedged against jungle. The city compresses density and quiet into the same metro stop.",
    flight: "4h 00m",
    daily: 160,
    season: "Oct–Dec",
    overview: "Hong Kong does dim sum brunch, Victoria Peak views, hiking in Sai Kung, and Cantonese cocktail bars — all in one weekend. The MTR runs to nearly everywhere. Octopus card is your friend.",
    itinerary: [
      { day: "Day 1 — Island", items: ["Yum cha at Lin Heung Tea House", "Tram up to Victoria Peak", "Hollywood Road galleries + PMQ", "Lan Kwai Fong nightlife"] },
      { day: "Day 2 — Kowloon", items: ["Star Ferry across to Tsim Sha Tsui", "Avenue of Stars + Symphony of Lights", "Temple Street Night Market dinner", "Late-night noodles at Mak's"] },
      { day: "Day 3 — Outdoors", items: ["Dragon's Back hike (3 hours)", "Shek O village + beach lunch", "Or: ferry to Lamma Island for seafood", "Sunset cocktails at Ozone (highest bar in the world)"] },
    ],
    food: ["Wonton noodles at Mak's", "Char siu rice at Joy Hing", "Egg tarts at Tai Cheong Bakery", "Hot pot in winter", "Dai pai dong stir-fry on Stanley Street"],
    transport: "Octopus card on MTR, buses, ferries, trams. Airport Express: 24 min to Central. Star Ferry crossings cost almost nothing and are iconic.",
    cost: { Flights: 450, Accommodation: 650, Food: 230, Transport: 70, Activities: 100 },
    safety: ["Generally very safe. Pickpockets in Mong Kok crowds.", "Public order rules tightened post-2020 — avoid demonstrations.", "Summer typhoons (T8+) shut the city down — check signals.", "Humidity is brutal May–Sep. Hydrate."],
    photoSpots: ["Victoria Harbour from Tsim Sha Tsui promenade", "Choi Hung Estate rainbow basketball court", "Quarry Bay 'Monster Building'", "Tian Tan Buddha on Lantau", "Tram window shot through Wan Chai"],
  },
  {
    id: "kuala-lumpur",
    name: "Kuala Lumpur",
    country: "Malaysia",
    images: [
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1597211833712-5e41faa202ea?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1495745966610-2a67f2297e5e?auto=format&fit=crop&w=1400&q=80",
    ],
    teaser: "The easiest weekend trip from Singapore. Eat your way through it.",
    flight: "1h 00m",
    daily: 80,
    season: "May–Jul",
    overview: "KL is built for grazing. Hawker breakfasts in Pudu, banana leaf lunch in Bangsar, mall-hopping in Bukit Bintang, and a late-night supper in Jalan Alor. The Petronas Towers still impress in person.",
    itinerary: [
      { day: "Day 1 — Classic KL", items: ["Petronas Towers Skybridge (book online)", "KLCC Park morning walk", "Aquaria KLCC if it rains", "Jalan Alor street food dinner"] },
      { day: "Day 2 — Heritage", items: ["Batu Caves before 10am (avoid heat)", "Sri Mahamariamman Temple", "Central Market + Kasturi Walk", "Heli Lounge Bar rooftop sunset"] },
      { day: "Day 3 — Day trip", items: ["Genting Highlands cable car + theme park", "Or: Putrajaya mosque architecture tour", "Late banana leaf lunch in Bangsar", "Bukit Bintang night market"] },
    ],
    food: ["Nasi lemak at Village Park", "Char kway teow at Sister's, Imbi Market", "Banana leaf rice at Raj's", "Cendol + ais kacang for dessert", "Roti canai any time of day"],
    transport: "Grab is everywhere and cheap. KLIA Ekspres: 33 min to KL Sentral. MRT/LRT covers most touristy areas. Beware of jam — leave 90 min for cross-city.",
    cost: { Flights: 150, Accommodation: 200, Food: 130, Transport: 60, Activities: 80 },
    safety: ["Generally safe. Bag snatchings from motorbikes occur — wear bag across body, away from road.", "Tap water is treated but bottled is safer.", "Haze season (Aug–Oct) can hit unhealthy AQI — check IQAir."],
    photoSpots: ["Petronas Towers from KLCC Park lake fountain", "Batu Caves rainbow stairs", "Saloma Link bridge at night", "Heli Lounge bar helipad", "Thean Hou Temple lanterns"],
  },
  {
    id: "maldives",
    name: "Maldives",
    country: "Maldives",
    images: [
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1540202404-1b927e27fa8b?auto=format&fit=crop&w=1400&q=80",
    ],
    teaser: "Over-water villas, glass-clear lagoons, the bluest blue on earth. Splurge worthily.",
    flight: "4h 30m",
    daily: 400,
    season: "Nov–Apr",
    overview: "One island, one resort. Pick your island carefully — it's where you'll be for the whole trip. Seaplane transfers cost USD 400–600 return and end at sunset; speedboat resorts are closer/cheaper. Bring reef-safe sunscreen.",
    itinerary: [
      { day: "Day 1 — Arrive & decompress", items: ["Seaplane or speedboat transfer", "Lagoon snorkel from the villa", "Sunset cocktail at the over-water bar", "Beach dinner under the stars"] },
      { day: "Day 2 — Underwater", items: ["Morning dive or snorkel safari", "Reef shark + ray feeding (resort dependent)", "Spa or hammock afternoon", "Bioluminescent plankton beach walk (seasonal)"] },
      { day: "Day 3 — Active", items: ["Sandbank picnic excursion", "Sunset dolphin cruise", "Manta ray or whale shark trip (Baa Atoll)", "Private dinner on the deck"] },
    ],
    food: ["Mas huni (tuna + coconut breakfast)", "Garudhiya (clear fish broth)", "Fresh reef fish grills", "Hedhikaa (Maldivian short eats)", "Resort tasting menus from international chefs"],
    transport: "Seaplane (daylight only) or speedboat from Malé MLE. No local transport between resorts. Walking + bicycle within the island.",
    cost: { Flights: 800, Accommodation: 2400, Food: 600, Transport: 500, Activities: 300 },
    safety: ["Very safe. Resorts are gated and staffed 24/7.", "Strong currents at channels — listen to the dive crew.", "Resort alcohol is legal; local islands are dry — respect customs.", "Sun is unforgiving. SPF50, hat, rash vest."],
    photoSpots: ["Drone shot of the villa jetty", "Sandbank at low tide", "Underwater portrait at a coral bommie", "Sunset from the over-water hammock", "Bioluminescent plankton (Vaadhoo)"],
  },
  {
    id: "phuket-krabi",
    name: "Phuket & Krabi",
    country: "Thailand",
    images: [
      "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1400&q=80",
    ],
    teaser: "Karst cliffs, longtail boats, and beach bars. The Andaman coast at its photogenic best.",
    flight: "2h 00m",
    daily: 100,
    season: "Nov–Mar",
    overview: "Base in Phuket for nightlife, Krabi (Ao Nang or Railay) for quiet beaches. Phi Phi and James Bond Island day-trip from either. Avoid the May–Oct monsoon — boats get cancelled, snorkel viz drops.",
    itinerary: [
      { day: "Day 1 — Phuket", items: ["Old Phuket Town heritage walk", "Lunch at Raya restaurant", "Sunset at Promthep Cape", "Bangla Road night out (or skip it)"] },
      { day: "Day 2 — Island day", items: ["Phi Phi + Maya Bay speedboat tour", "Snorkel at Bamboo Island", "Sunset Phang Nga Bay alternative", "Beachfront seafood dinner"] },
      { day: "Day 3 — Krabi", items: ["Ferry or van to Ao Nang", "Longtail to Railay West for rock climbing/swim", "Phra Nang Cave beach", "Hot springs + Emerald Pool inland"] },
    ],
    food: ["Massaman curry", "Tom yum goong", "Fresh grilled snapper at beach shacks", "Roti with banana + condensed milk", "Khanom jeen noodles"],
    transport: "Phuket airport to Patong: 45 min. Grab works in Phuket town and airport zones. Krabi: longtail boats are the bus. Negotiate fares before boarding.",
    cost: { Flights: 280, Accommodation: 350, Food: 150, Transport: 120, Activities: 200 },
    safety: ["Jet-ski scams in Phuket are notorious — film the ski before AND after renting.", "Bangla Road: watch drinks, watch pickpockets.", "Riptides at Patong, Karon, Kata — check flag colour.", "Don't ride elephants. Visit ethical sanctuaries instead."],
    photoSpots: ["Railay West at sunset", "Maya Bay (cap of visitors enforced)", "Big Buddha Phuket from below", "James Bond Island", "Phi Phi viewpoint hike"],
  },
  {
    id: "sydney",
    name: "Sydney",
    country: "Australia",
    images: [
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1523428096881-5bd79d043006?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1551867633-194f125bddfa?auto=format&fit=crop&w=1400&q=80",
    ],
    teaser: "Bondi to Manly. Coffee that rivals Italy. Outdoorsy in a way few capitals are.",
    flight: "8h 00m",
    daily: 200,
    season: "Sep–Nov, Mar–May",
    overview: "Sydney is for early risers. Coastal walks, ferry rides, brunch culture. The Opera House and Harbour Bridge anchor the postcards, but the inner-west (Newtown, Marrickville) is the real flavour.",
    itinerary: [
      { day: "Day 1 — Icons", items: ["Royal Botanic Gardens + Mrs Macquarie's Chair", "Opera House tour", "Ferry to Manly + lunch at the wharf", "Sunset rooftop at Opera Bar"] },
      { day: "Day 2 — Coast", items: ["Bondi to Coogee coastal walk (6km)", "Bondi Icebergs swim", "Surry Hills brunch (Bills, Reuben Hills)", "Newtown evening — King St cafés"] },
      { day: "Day 3 — Day trip", items: ["Blue Mountains: Three Sisters + Wentworth Falls", "Or: Royal National Park coastal cliffs", "Sydney Fish Market lunch", "Darling Harbour fireworks (Saturdays)"] },
    ],
    food: ["Flat white, anywhere good", "Hot smoked salmon at Bondi", "Lamingtons + Tim Tams", "Vietnamese in Cabramatta", "Pub schnitzel parm"],
    transport: "Opal card on trains, buses, ferries. Airport: 13 min by train, but $$$ gate fee. Ferries are practically tourist attractions priced as commuter fares.",
    cost: { Flights: 1200, Accommodation: 800, Food: 400, Transport: 100, Activities: 200 },
    safety: ["Very safe overall. Watch alcohol-fuelled crowds in Kings Cross on weekends.", "Surf only between the flags — rips are real.", "Bushfire smoke can be heavy summer afternoons; check AQI.", "Walk on the left, drive on the left."],
    photoSpots: ["Opera House from Mrs Macquarie's Chair", "Bondi Beach from Bondi Icebergs deck", "Sydney Harbour Bridge from Milsons Point", "Wedding Cake Rock (closed but viewpoint open)", "Hyams Beach for the whitest sand"],
  },
  {
    id: "taipei",
    name: "Taipei",
    country: "Taiwan",
    images: [
      "https://images.unsplash.com/photo-1552248524-10d9a7e4841c?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1470004914212-05527e49370b?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1601276861758-2d9c5ca69a17?auto=format&fit=crop&w=1400&q=80",
    ],
    teaser: "Night markets, hot springs, and the friendliest service in Asia. Underrated.",
    flight: "4h 30m",
    daily: 130,
    season: "Oct–Dec",
    overview: "Taipei is walkable, deeply foodie, and gentle on the wallet. Start with night markets, work outward to tea farms in Maokong and onsen in Beitou. The MRT is spotless, the people exceptional.",
    itinerary: [
      { day: "Day 1 — Central", items: ["Chiang Kai-shek Memorial + changing of the guard", "Lunch at Din Tai Fung (Xinyi)", "Taipei 101 observation deck", "Shilin Night Market dinner"] },
      { day: "Day 2 — Old town & tea", items: ["Longshan Temple + Bopiliao Historic Block", "Ximending shopping district", "Maokong gondola + tea farms", "Raohe Night Market (smaller, better)"] },
      { day: "Day 3 — Day trip", items: ["Jiufen old street (Spirited Away vibes)", "Shifen Waterfall + sky lanterns", "Yehliu Geopark sea sculptures", "Beitou hot springs to finish"] },
    ],
    food: ["Beef noodle soup", "Xiao long bao at Din Tai Fung", "Stinky tofu (try once)", "Lu rou fan (braised pork rice)", "Fluffy shaved ice with mango"],
    transport: "EasyCard on MRT, buses, YouBike. Airport MRT to Taipei Main: 35 min. Taxis are cheap and metered.",
    cost: { Flights: 500, Accommodation: 400, Food: 180, Transport: 60, Activities: 100 },
    safety: ["Very safe at any hour. Lost wallets get handed in.", "Earthquakes possible — modern buildings are well-engineered.", "Typhoon season Jul–Sep can interrupt travel.", "Pedestrian crossings: drivers in Taipei are not deferential — watch turning cars."],
    photoSpots: ["Jiufen tea house lanterns at dusk", "Taipei 101 from Xiangshan (Elephant Mountain) hike", "Pingxi sky lantern release", "Beitou hot spring steam", "Maokong tea farm rows"],
  },
  {
    id: "hanoi",
    name: "Hanoi",
    country: "Vietnam",
    images: [
      "https://images.unsplash.com/photo-1599708153386-62bf3cad9bf2?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1509030450996-dd1a26dda07d?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1400&q=80",
    ],
    teaser: "Old Quarter chaos, lakeside calm, and the best USD-2 bowl of pho you'll ever eat.",
    flight: "3h 30m",
    daily: 60,
    season: "Oct–Apr",
    overview: "Hanoi is layered — French colonial boulevards, communist-era monuments, frantic Old Quarter alleys. Slow down. Sit on a tiny plastic stool. Order whatever the table next to you is having.",
    itinerary: [
      { day: "Day 1 — Old Quarter", items: ["Hoan Kiem Lake morning walk", "Old Quarter 36 streets exploration", "Banh mi 25 + egg coffee at Giảng", "Water puppet show + bia hoi corner"] },
      { day: "Day 2 — Heritage", items: ["Ho Chi Minh Mausoleum (close mornings)", "Temple of Literature", "Train Street coffee (check current rules)", "Bun cha lunch on Le Van Huu"] },
      { day: "Day 3 — Halong Bay", items: ["Day cruise to Halong or quieter Lan Ha Bay", "Kayak through karst caves", "Seafood lunch on board", "Return to Hanoi for late dinner"] },
    ],
    food: ["Pho — beef in the morning, chicken at night", "Bun cha (Obama-Bourdain set)", "Banh mi from a cart", "Egg coffee (cà phê trứng)", "Cha ca grilled turmeric fish"],
    transport: "Grab is cheap and reliable. Old Quarter is best on foot — traffic is a contact sport for crossings. Noi Bai Airport: ~45 min by Grab or shuttle bus.",
    cost: { Flights: 280, Accommodation: 150, Food: 80, Transport: 40, Activities: 100 },
    safety: ["Watch your bag from scooters when walking the Old Quarter.", "Crossing the road: walk steadily, predictably, let bikes flow around you.", "Tap water is not safe — bottled or boiled only.", "Air quality is poor in winter — N95 helpful."],
    photoSpots: ["Hoan Kiem Lake at dawn with rowers", "Train Street (whichever cafés still operate)", "Temple of Literature courtyards", "St Joseph's Cathedral neo-Gothic", "Halong Bay from a junk boat"],
  },
];

/* ---------- FX rates ---------- */

const FX_RATES_PER_SGD = {
  USD: 0.74,
  JPY: 112.0,
  KRW: 1010.0,
  THB: 26.5,
  MYR: 3.45,
  IDR: 11800.0,
  AUD: 1.13,
  HKD: 5.78,
  VND: 18600.0,
  TWD: 23.5,
};

/* ---------- Packing checklist ---------- */

const PACKING = [
  { category: "Documents", items: ["Passport (6+ months validity)", "Visa printout", "Flight tickets", "Travel insurance", "Driving licence + IDP", "Vaccination certificate", "Photocopy of passport"] },
  { category: "Clothing", items: ["T-shirts × 5", "Light jacket / rain shell", "Walking shoes", "Sandals / flip-flops", "Swimwear", "Socks × 5", "Underwear × 5"] },
  { category: "Electronics", items: ["Phone + charger", "Power bank (under 100Wh)", "Universal adapter", "Camera + spare battery", "Earphones", "Laptop / tablet"] },
  { category: "Medication", items: ["Personal prescriptions", "Paracetamol / ibuprofen", "Antihistamines", "Rehydration salts", "Plasters + antiseptic", "Anti-diarrhoeal", "Motion sickness tablets"] },
  { category: "Travel essentials", items: ["Reusable water bottle", "Travel pillow + eye mask", "Sunscreen SPF50", "Insect repellent", "Microfibre towel", "Reef-safe sunscreen (beach)", "Reusable shopping bag"] },
];

/* =========================================================
 * DOM HELPERS
 * ========================================================= */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const sgd = (n) => "SGD " + n.toLocaleString(undefined, { maximumFractionDigits: 0 });
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* Renders an image inside a styled wrapper. Accepts an array of candidate URLs;
 * if one fails to load, the img element automatically tries the next.
 * extraClass lets callers add modifiers like "modal-hero" or "city-image". */
function imgWrap(sources, alt, extraClass, loading) {
  const list = Array.isArray(sources) ? sources : [sources];
  const cls = ["img-wrap", extraClass || ""].filter(Boolean).join(" ");
  const load = loading || "lazy";
  const sourcesAttr = esc(JSON.stringify(list));
  return `<div class="${cls}" role="img" aria-label="${esc(alt)}">
    <img src="${esc(list[0])}" alt="${esc(alt)}" loading="${load}"
         data-sources="${sourcesAttr}" data-index="0"
         onerror="window.__tryNextImg(this)" />
  </div>`;
}

window.__tryNextImg = function (img) {
  try {
    const sources = JSON.parse(img.dataset.sources || "[]");
    const next = (parseInt(img.dataset.index, 10) || 0) + 1;
    if (next < sources.length) {
      img.dataset.index = next;
      img.src = sources[next];
    } else {
      img.removeAttribute("onerror");
      img.style.display = "none";
    }
  } catch (e) {
    img.style.display = "none";
  }
};

/* =========================================================
 * INITIALISE
 * ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  renderFeatured();
  renderCityCards();
  populateCitySelects();
  initBudgetCalculator();
  initFxConverter();
  renderPackingChecklist();
  initItineraryPlanner();
  initWeather();
  initEnquiryForm();
  initModal();
  initNavToggle();
  initThemeToggle();
  initReveal();
  initMagnet();
  $("#footer-year").textContent = new Date().getFullYear();
});

/* =========================================================
 * FEATURED CARD
 * ========================================================= */

function renderFeatured() {
  const featured = CITIES[0];
  $("#featured-card").innerHTML = `
    ${imgWrap(featured.images, featured.name, "featured-image", "eager")}
    <div class="featured-body">
      <p class="eyebrow">Latest guide</p>
      <h3>${esc(featured.name)}, ${esc(featured.country)}</h3>
      <div class="featured-meta">
        <span>Flight ${esc(featured.flight)}</span>
        <span>From ${sgd(featured.daily)}/day</span>
        <span>Best ${esc(featured.season)}</span>
      </div>
      <p>${esc(featured.overview)}</p>
      <button class="btn btn-primary" data-open-guide="${featured.id}">Open guide</button>
    </div>
  `;
}

/* =========================================================
 * CITY CARDS
 * ========================================================= */

function renderCityCards() {
  const grid = $("#cities-grid");
  grid.innerHTML = CITIES.map((c) => `
    <article class="city-card">
      ${imgWrap(c.images, c.name, "city-image")}
      <div class="city-body">
        <span class="country">${esc(c.country)}</span>
        <h3>${esc(c.name)}</h3>
        <p class="teaser">${esc(c.teaser)}</p>
        <div class="city-meta">
          <div><strong>${esc(c.flight)}</strong>Flight</div>
          <div><strong>${sgd(c.daily)}</strong>Daily</div>
          <div><strong>${esc(c.season)}</strong>Season</div>
        </div>
        <button class="btn btn-primary" data-open-guide="${c.id}">View Guide</button>
      </div>
    </article>
  `).join("");
}

/* =========================================================
 * DROPDOWNS — populate with cities
 * ========================================================= */

function populateCitySelects() {
  const opts = CITIES.map((c) => `<option value="${c.id}">${esc(c.name)}, ${esc(c.country)}</option>`).join("");
  $("#budget-destination").innerHTML = opts;
  $("#enquiry-destination").innerHTML = opts + `<option value="other">Other / Open to suggestions</option>`;

  const fxSelect = $("#fx-target");
  fxSelect.innerHTML = Object.keys(FX_RATES_PER_SGD).map((cur) => `<option value="${cur}">${cur}</option>`).join("");
}

/* =========================================================
 * BUDGET CALCULATOR
 * ========================================================= */

function initBudgetCalculator() {
  const destSel = $("#budget-destination");
  const travellers = $("#budget-travellers");
  const days = $("#budget-days");
  const daily = $("#budget-daily");
  const total = $("#budget-total");

  const findCity = (id) => CITIES.find((c) => c.id === id);

  daily.value = findCity(destSel.value).daily;

  const recalc = () => {
    const t = Math.max(0, Number(travellers.value) || 0);
    const d = Math.max(0, Number(days.value) || 0);
    const p = Math.max(0, Number(daily.value) || 0);
    total.textContent = sgd(t * d * p);
  };

  destSel.addEventListener("change", () => {
    daily.value = findCity(destSel.value).daily;
    recalc();
  });
  [travellers, days, daily].forEach((el) => el.addEventListener("input", recalc));
  recalc();
}

/* =========================================================
 * CURRENCY CONVERTER
 * ========================================================= */

function initFxConverter() {
  const amt = $("#fx-amount");
  const target = $("#fx-target");
  const out = $("#fx-result");

  const recalc = () => {
    const a = Math.max(0, Number(amt.value) || 0);
    const rate = FX_RATES_PER_SGD[target.value];
    const converted = a * rate;
    const decimals = converted >= 1000 ? 0 : 2;
    out.textContent = `${target.value} ${converted.toLocaleString(undefined, { maximumFractionDigits: decimals })}`;
  };

  [amt, target].forEach((el) => el.addEventListener("input", recalc));
  target.addEventListener("change", recalc);
  recalc();
}

/* =========================================================
 * PACKING CHECKLIST
 * ========================================================= */

function renderPackingChecklist() {
  const root = $("#packing");
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEYS.packing) || "{}");

  root.innerHTML = PACKING.map((cat) => `
    <div class="packing-cat">
      <h4>${esc(cat.category)}</h4>
      <ul>
        ${cat.items.map((item) => {
          const id = `pack-${cat.category}-${item}`.replace(/\W+/g, "-").toLowerCase();
          const checked = saved[id] ? "checked" : "";
          return `<li class="${checked ? "checked" : ""}">
            <input type="checkbox" id="${id}" ${checked} />
            <label for="${id}">${esc(item)}</label>
          </li>`;
        }).join("")}
      </ul>
    </div>
  `).join("");

  root.addEventListener("change", (e) => {
    if (e.target.type !== "checkbox") return;
    const state = JSON.parse(localStorage.getItem(STORAGE_KEYS.packing) || "{}");
    state[e.target.id] = e.target.checked;
    localStorage.setItem(STORAGE_KEYS.packing, JSON.stringify(state));
    e.target.closest("li").classList.toggle("checked", e.target.checked);
  });
}

/* =========================================================
 * ITINERARY PLANNER
 * ========================================================= */

function initItineraryPlanner() {
  const form = $("#itinerary-form");
  const list = $("#itinerary-list");

  const load = () => JSON.parse(localStorage.getItem(STORAGE_KEYS.itinerary) || "[]");
  const save = (items) => localStorage.setItem(STORAGE_KEYS.itinerary, JSON.stringify(items));

  const render = () => {
    const items = load().sort((a, b) => a.day - b.day || a.time.localeCompare(b.time));
    if (!items.length) {
      list.innerHTML = `<li style="border-left-color:transparent;color:var(--muted);font-style:italic">No items yet — add your first activity above.</li>`;
      return;
    }
    list.innerHTML = items.map((it) => `
      <li>
        <span class="day">Day ${esc(it.day)}</span>
        <span class="time">${esc(it.time)}</span>
        <span>
          <span class="activity">${esc(it.activity)}</span>
          ${it.notes ? `<span class="notes">${esc(it.notes)}</span>` : ""}
        </span>
        <button data-remove="${esc(it.id)}">Remove</button>
      </li>
    `).join("");
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newItem = {
      id: String(Date.now()) + Math.random().toString(36).slice(2, 7),
      day: Number($("#itin-day").value) || 1,
      time: $("#itin-time").value,
      activity: $("#itin-activity").value.trim(),
      notes: $("#itin-notes").value.trim(),
    };
    if (!newItem.activity || !newItem.time) return;
    const items = load();
    items.push(newItem);
    save(items);
    render();
    form.reset();
    $("#itin-day").value = newItem.day;
  });

  list.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-remove]");
    if (!btn) return;
    const id = btn.getAttribute("data-remove");
    save(load().filter((it) => it.id !== id));
    render();
  });

  render();
}

/* =========================================================
 * WEATHER (OpenWeather stub)
 * ========================================================= */

/*
 * To enable live weather:
 *   1. Sign up at https://openweathermap.org/api (free tier works)
 *   2. Generate an API key
 *   3. Replace YOUR_API_KEY_HERE below
 *   4. The fetchWeather() call below will use the live endpoint
 */
const OPENWEATHER_API_KEY = "YOUR_API_KEY_HERE";

async function fetchWeather(city) {
  if (!OPENWEATHER_API_KEY || OPENWEATHER_API_KEY === "YOUR_API_KEY_HERE") {
    return { error: "Add your OpenWeather API key in app.js to enable live weather. (Set OPENWEATHER_API_KEY at the top of the file.)" };
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${OPENWEATHER_API_KEY}&units=metric`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      const msg = res.status === 404 ? "City not found." : `Weather service returned ${res.status}.`;
      return { error: msg };
    }
    const data = await res.json();
    return {
      city: data.name,
      country: data.sys && data.sys.country,
      temp: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      conditions: data.weather && data.weather[0] ? data.weather[0].description : "—",
      humidity: data.main.humidity,
      wind: Math.round(data.wind.speed * 3.6),
    };
  } catch (err) {
    return { error: "Network error — try again." };
  }
}

function initWeather() {
  const form = $("#weather-form");
  const input = $("#weather-city");
  const result = $("#weather-result");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const city = input.value.trim();
    if (!city) return;

    result.hidden = false;
    result.classList.remove("error");
    result.innerHTML = `<p style="color:var(--muted)">Checking weather in ${esc(city)}…</p>`;

    const data = await fetchWeather(city);
    if (data.error) {
      result.classList.add("error");
      result.innerHTML = `<p>${esc(data.error)}</p>`;
      return;
    }

    result.innerHTML = `
      <h4>${esc(data.city)}${data.country ? ", " + esc(data.country) : ""}</h4>
      <div class="temp">${data.temp}°C</div>
      <p class="conditions">${esc(data.conditions)} · feels like ${data.feelsLike}°C</p>
      <div class="stats">
        <div><strong>${data.humidity}%</strong>Humidity</div>
        <div><strong>${data.wind} km/h</strong>Wind</div>
      </div>
    `;
  });
}

/* =========================================================
 * ENQUIRY FORM
 * ========================================================= */

/*
 * Enquiry delivery tries the following in order:
 *   1. LOCAL_MAIL_ENDPOINT — the bundled mail-server.js helper running on
 *      localhost. Start it with `npm install && npm run mail` after copying
 *      .env.example to .env. Works only on the machine running the helper.
 *   2. FORMSPREE_ENDPOINT — optional public fallback so the site still emails
 *      when deployed (e.g. GitHub Pages). Leave the placeholder to skip.
 *   3. mailto: — opens the visitor's email client, used as a last resort.
 */
const ENQUIRY_NOTIFICATION_EMAIL = "juanda.sisnawan@dynamitegames.io";
const LOCAL_MAIL_ENDPOINT = "http://localhost:3000/send";
const FORMSPREE_ENDPOINT = "YOUR_FORMSPREE_ENDPOINT_HERE";

function initEnquiryForm() {
  const form = $("#enquiry-form");
  const feedback = $("#enquiry-feedback");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    feedback.classList.remove("success", "error");

    const data = Object.fromEntries(new FormData(form).entries());

    const errors = [];
    if (!data.name || !data.name.trim()) errors.push("name");
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.push("email");
    if (!data.message || !data.message.trim()) errors.push("message");

    if (errors.length) {
      feedback.textContent = "Please fill in your name, a valid email, and a message.";
      feedback.classList.add("error");
      return;
    }

    const enquiries = JSON.parse(localStorage.getItem(STORAGE_KEYS.enquiries) || "[]");
    enquiries.push({ ...data, submittedAt: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEYS.enquiries, JSON.stringify(enquiries));

    const sent = await sendEnquiryEmail(data);

    if (sent === "local" || sent === "formspree") {
      feedback.textContent = "Thanks! Your enquiry has been sent — we'll be in touch within 24 hours.";
      feedback.classList.add("success");
    } else if (sent === "mailto") {
      feedback.textContent = "Thanks! Your email client has opened with the enquiry — hit Send to deliver it.";
      feedback.classList.add("success");
    } else {
      feedback.textContent = "Saved locally, but email delivery failed. Please email us directly at " + ENQUIRY_NOTIFICATION_EMAIL + ".";
      feedback.classList.add("error");
      return;
    }

    form.reset();

    setTimeout(() => {
      feedback.textContent = "";
      feedback.classList.remove("success");
    }, 6000);
  });
}

async function sendEnquiryEmail(data) {
  if (LOCAL_MAIL_ENDPOINT) {
    try {
      const res = await fetch(LOCAL_MAIL_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) return "local";
    } catch (_) { /* helper not running — fall through */ }
  }

  if (FORMSPREE_ENDPOINT && FORMSPREE_ENDPOINT !== "YOUR_FORMSPREE_ENDPOINT_HERE") {
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          _subject: `New Travel Explorer enquiry from ${data.name}`,
          _replyto: data.email,
          ...data,
        }),
      });
      if (res.ok) return "formspree";
    } catch (_) { /* fall through to mailto */ }
  }

  const subject = `New Travel Explorer enquiry from ${data.name}`;
  const bodyLines = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "-"}`,
    `Destination: ${data.destination || "-"}`,
    `Travel Date: ${data.travelDate || "-"}`,
    `Travellers: ${data.travellers || "-"}`,
    "",
    "Message:",
    data.message,
  ];
  const mailto = `mailto:${ENQUIRY_NOTIFICATION_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
  window.location.href = mailto;
  return "mailto";
}

/* =========================================================
 * GUIDE MODAL
 * ========================================================= */

function initModal() {
  const modal = $("#guide-modal");
  const body = $("#modal-body");

  document.body.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-open-guide]");
    if (trigger) {
      const id = trigger.getAttribute("data-open-guide");
      openGuide(id);
      return;
    }
    if (e.target.closest("[data-close]")) {
      closeGuide();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeGuide();
  });

  function openGuide(id) {
    const c = CITIES.find((x) => x.id === id);
    if (!c) return;

    const totalCost = Object.values(c.cost).reduce((sum, v) => sum + v, 0);

    body.innerHTML = `
      ${imgWrap(c.images, c.name, "modal-hero", "eager")}
      <div class="modal-content">
        <span class="country">${esc(c.country)} · Flight ${esc(c.flight)} · Best ${esc(c.season)}</span>
        <h2 id="modal-title">${esc(c.name)}</h2>
        <p class="overview">${esc(c.overview)}</p>

        <h3>Suggested 3-day itinerary</h3>
        ${c.itinerary.map((d) => `
          <div class="itinerary-day">
            <strong>${esc(d.day)}</strong>
            <ul>${d.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>
          </div>
        `).join("")}

        <h3>Food worth queueing for</h3>
        <ul>${c.food.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>

        <h3>Getting around</h3>
        <p>${esc(c.transport)}</p>

        <h3>Estimated cost breakdown (per person, 3 days)</h3>
        <table class="cost-table">
          ${Object.entries(c.cost).map(([k, v]) => `<tr><td>${esc(k)}</td><td>${sgd(v)}</td></tr>`).join("")}
          <tr class="total"><td>Total</td><td>${sgd(totalCost)}</td></tr>
        </table>

        <h3>Safety notes</h3>
        <ul>${c.safety.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>

        <h3>Best photo spots</h3>
        <ul>${c.photoSpots.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
      </div>
    `;

    modal.hidden = false;
    document.body.style.overflow = "hidden";
    $(".modal-close", modal).focus();
  }

  function closeGuide() {
    modal.hidden = true;
    document.body.style.overflow = "";
  }
}

/* =========================================================
 * THEME TOGGLE (light / dark)
 * ========================================================= */

function initThemeToggle() {
  const btn = $("#theme-toggle");
  if (!btn) return;

  const root = document.documentElement;
  const apply = (theme) => {
    root.setAttribute("data-theme", theme);
    btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
  };

  btn.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    apply(next);
    try { localStorage.setItem(STORAGE_KEYS.theme, next); } catch (e) {}
  });

  apply(root.getAttribute("data-theme") || "light");

  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", (e) => {
    if (localStorage.getItem(STORAGE_KEYS.theme)) return;
    apply(e.matches ? "dark" : "light");
  });
}

/* =========================================================
 * NAV TOGGLE (mobile)
 * ========================================================= */

function initNavToggle() {
  const toggle = $(".nav-toggle");
  const links = $(".nav-links");

  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  links.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

function initReveal() {
  const targets = document.querySelectorAll("[data-reveal]");
  if (!targets.length) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("in-view"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add("in-view");
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.12 });
  targets.forEach((el) => io.observe(el));
}

function initMagnet() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (matchMedia("(pointer: coarse)").matches) return;
  document.querySelectorAll("[data-magnet]").forEach((el) => {
    const strength = 0.28;
    el.addEventListener("pointermove", (e) => {
      const b = el.getBoundingClientRect();
      const x = e.clientX - (b.left + b.width / 2);
      const y = e.clientY - (b.top + b.height / 2);
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    });
    el.addEventListener("pointerleave", () => {
      el.style.transform = "";
    });
  });
}
