const dummyDetails = {
    tripSummary: {
        title: "Solo Saver Expedition to Tokyo",
        subtitle: "A compact journey through Japan's vibrant capital.",
        location: "Tokyo, Japan",
        durationDays: 3,
        travelers: 1,
        tripRating: 4.5,
        totalBudget: 50000,
    },
    dailyItinerary: [
        {
            day: 1,
            date: "2025-08-13",
            activities: [
                {
                    time: "10:00",
                    location: "Narita International Airport (NRT)",
                    title: "Arrival in Tokyo",
                    description:
                        "Arrive at Narita International Airport, clear customs, and take the Narita Express (N'EX) or Keisei Skyliner to your accommodation in Ueno/Asakusa area for easy access.",
                },
                {
                    time: "13:00",
                    location: "Asakusa Senso-ji Temple",
                    title: "Explore Senso-ji Temple & Nakamise-dori",
                    description:
                        "Visit Tokyo's oldest temple, Senso-ji, and stroll through Nakamise-dori market for traditional snacks and souvenirs. Enjoy the vibrant atmosphere.",
                },
                {
                    time: "18:00",
                    location: "Ueno Park",
                    title: "Relax in Ueno Park",
                    description:
                        "Wander through Ueno Park, home to several museums and a zoo. Enjoy the evening ambiance and perhaps visit a street food stall.",
                },
                {
                    time: "20:00",
                    location: "Local Izakaya in Ueno",
                    title: "Dinner at a local Izakaya",
                    description:
                        "Experience authentic Japanese casual dining at a local Izakaya, trying various small dishes and drinks.",
                },
            ],
        },
        {
            day: 2,
            date: "2025-08-14",
            activities: [
                {
                    time: "09:00",
                    location: "Tsukiji Outer Market",
                    title: "Breakfast and explore Tsukiji Outer Market",
                    description:
                        "Start your day with fresh seafood breakfast and explore the bustling Tsukiji Outer Market, tasting various street foods and local delicacies.",
                },
                {
                    time: "11:00",
                    location: "Shibuya Crossing & Hachiko Statue",
                    title: "Experience Shibuya",
                    description:
                        "Head to Shibuya to witness the iconic Shibuya Scramble Crossing and visit the Hachiko statue. Explore the trendy shops and vibrant atmosphere.",
                },
                {
                    time: "14:00",
                    location: "Meiji Jingu Shrine",
                    title: "Serenity at Meiji Jingu Shrine",
                    description:
                        "Find peace at Meiji Jingu Shrine, a serene oasis dedicated to Emperor Meiji and Empress Shoken, located next to Yoyogi Park.",
                },
                {
                    time: "17:00",
                    location: "Harajuku (Takeshita Street)",
                    title: "Discover Harajuku's culture",
                    description:
                        "Explore Takeshita Street in Harajuku, known for its unique street fashion, quirky shops, and crepes. Enjoy people-watching.",
                },
                {
                    time: "19:30",
                    location: "Shinjuku Golden Gai",
                    title: "Evening in Shinjuku Golden Gai",
                    description:
                        "Experience the unique nightlife of Shinjuku Golden Gai, a compact area filled with tiny, atmospheric bars. Choose a bar for a drink and soak in the atmosphere.",
                },
            ],
        },
        {
            day: 3,
            date: "2025-08-15",
            activities: [
                {
                    time: "09:00",
                    location: "Imperial Palace East Garden",
                    title: "Visit Imperial Palace East Garden",
                    description:
                        "Explore the beautiful and historical Imperial Palace East Garden, part of the former Edo Castle grounds. Enjoy a peaceful morning walk.",
                },
                {
                    time: "11:00",
                    location: "Akihabara Electric Town",
                    title: "Immerse in Akihabara's pop culture",
                    description:
                        "Dive into the world of electronics, anime, manga, and gaming in Akihabara. Explore multi-story shops and arcades.",
                },
                {
                    time: "14:00",
                    location: "Ueno or Narita Airport Area",
                    title: "Last-minute souvenir shopping",
                    description:
                        "Grab some last-minute souvenirs or gifts from a local shop near your accommodation or at the airport.",
                },
                {
                    time: "16:00",
                    location: "Narita International Airport (NRT)",
                    title: "Departure from Tokyo",
                    description:
                        "Head to Narita International Airport for your departure, concluding your short but memorable trip to Tokyo.",
                },
            ],
        },
    ],
    budgetBreakdown: {
        totalBudget: 50000,
        remaining: 2000,
        categories: {
            accommodation: {
                amount: 10000,
                percentage: 20,
            },
            flights: {
                amount: 25000,
                percentage: 50,
            },
            dining: {
                amount: 7500,
                percentage: 15,
            },
            activities_entertainment: {
                amount: 3000,
                percentage: 6,
            },
            transportation: {
                amount: 2500,
                percentage: 5,
            },
        },
    },
    travelTips: [
        {
            title: "Japan Rail Pass Not Recommended for Short Tokyo Trip",
            description:
                "For a 3-day trip focused only on Tokyo, a Japan Rail Pass is usually not cost-effective. Utilize a Suica or Pasmo IC card for convenient public transportation.",
        },
        {
            title: "Cash is King (Sometimes)",
            description:
                "While major stores accept cards, many smaller restaurants, shops, and guesthouses, especially outside major tourist areas, prefer or only accept cash. Carry enough Yen.",
        },
        {
            title: "Learn Basic Japanese Phrases",
            description:
                "Learning a few basic phrases like 'Arigato' (Thank you), 'Sumimasen' (Excuse me/Sorry), and 'Konnichiwa' (Hello) will greatly enhance your experience and show respect.",
        },
        {
            title: "Google Maps for Navigation",
            description:
                "Google Maps is incredibly accurate for public transport in Japan, including train and subway times and platforms. It's essential for getting around.",
        },
        {
            title: "Respect Local Customs",
            description:
                "Be mindful of local customs: bow slightly when greeting, avoid talking loudly on public transport, and remove shoes before entering homes or some traditional establishments.",
        },
    ],
    recommendedAccommodations: [
        {
            name: "Nohga Hotel Ueno Tokyo",
            location: "Ueno, Tokyo",
            rating: 4.3,
            type: "Boutique Hotel",
            pricePerNight: 4000,
            description:
                "A stylish hotel in Ueno, offering comfortable rooms and excellent connectivity, perfect for exploring cultural sites. Good value for a saver budget.",
        },
        {
            name: "APA Hotel Asakusa Tawaramachi Ekimae",
            location: "Asakusa, Tokyo",
            rating: 3.9,
            type: "Business Hotel",
            pricePerNight: 3000,
            description:
                "A budget-friendly option near Tawaramachi Station, offering compact but efficient rooms. Close to Senso-ji Temple and easy access to subway lines.",
        },
        {
            name: "Khaosan Tokyo Origami",
            location: "Asakusa, Tokyo",
            rating: 4.1,
            type: "Hostel/Guesthouse",
            pricePerNight: 2000,
            description:
                "A popular hostel offering both dormitory and private rooms. Known for its friendly atmosphere and proximity to major Asakusa attractions, ideal for solo saver travelers.",
        },
    ],
    topActivitiesAttractions: [
        {
            name: "Senso-ji Temple",
            location: "Asakusa, Tokyo",
            rating: 4.7,
            type: "Historical/Religious Site",
            durationHours: 2,
            groupSize: "Any",
            price: 0,
            description:
                "Tokyo's oldest and most significant temple, featuring impressive gates, a five-story pagoda, and the bustling Nakamise-dori market leading up to it.",
        },
        {
            name: "Shibuya Scramble Crossing",
            location: "Shibuya, Tokyo",
            rating: 4.6,
            type: "Landmark/Experience",
            durationHours: 1,
            groupSize: "Any",
            price: 0,
            description:
                "The world's busiest pedestrian crossing, an iconic symbol of modern Tokyo. Experience the organized chaos and explore the surrounding shops.",
        },
        {
            name: "Meiji Jingu Shrine",
            location: "Harajuku/Shibuya, Tokyo",
            rating: 4.8,
            type: "Spiritual/Nature",
            durationHours: 1.5,
            groupSize: "Any",
            price: 0,
            description:
                "A peaceful Shinto shrine dedicated to Emperor Meiji and Empress Shoken, surrounded by a vast forest, offering a tranquil escape from city life.",
        },
        {
            name: "Tsukiji Outer Market",
            location: "Tsukiji, Tokyo",
            rating: 4.5,
            type: "Market/Food",
            durationHours: 2,
            groupSize: "Any",
            price: 500,
            description:
                "A vibrant public market featuring numerous stalls selling fresh seafood, produce, kitchenware, and a wide array of delicious street food and small restaurants.",
        },
    ],
    diningOptions: [
        {
            name: "Ichiran Ramen (Shibuya)",
            location: "Shibuya, Tokyo",
            rating: 4.5,
            cuisine: "Ramen",
            priceRange: 1000,
            description:
                "A popular ramen chain known for its 'flavor concentration booths' that allow you to customize your ramen experience in a quiet, individual setting.",
        },
        {
            name: "Tempura Tsunahachi (Shinjuku)",
            location: "Shinjuku, Tokyo",
            rating: 4.2,
            cuisine: "Tempura",
            priceRange: 2500,
            description:
                "Offers high-quality, freshly fried tempura at a reasonable price for a specialized restaurant. A good option for a slightly more upscale yet accessible meal.",
        },
        {
            name: "Ueno Yabu Soba",
            location: "Ueno, Tokyo",
            rating: 4,
            cuisine: "Soba",
            priceRange: 1200,
            description:
                "A traditional soba noodle restaurant in Ueno with a long history, serving classic cold and hot soba dishes in a quaint setting.",
        },
        {
            name: "Street Food at Nakamise-dori",
            location: "Asakusa, Tokyo",
            rating: 4.3,
            cuisine: "Japanese Snacks",
            priceRange: 500,
            description:
                "Explore the vibrant market leading to Senso-ji Temple for a variety of traditional Japanese snacks, sweets, and small bites like age-manju and ningyo-yaki.",
        },
    ],
};
export default dummyDetails;
