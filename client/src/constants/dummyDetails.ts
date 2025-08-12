const dummyDetails = {
    tripSummary: {
        title: "A Whirlwind Dublin Adventure",
        subtitle: "Discover the heart of Ireland in two days.",
        location: "Dublin, Ireland",
        aiTripRating: 4.2,
        estimatedCost: 40000,
        overallWeather: "Mild and often rainy, typical for August in Dublin.",
        duration: 2,
    },
    dailyItinerary: [
        {
            day: 1,
            date: "2025-08-13",
            activities: [
                {
                    time: "10:00",
                    location: "Dublin City Centre",
                    title: "Arrival and Hotel Check-in",
                    description:
                        "Arrive at Dublin Airport (DUB), take public transport (Aircoach or Dublin Express) to your accommodation in the city centre. Check-in and drop off luggage.",
                },
                {
                    time: "12:00",
                    location: "Temple Bar Area",
                    title: "Explore Temple Bar",
                    description:
                        "Wander through the lively Temple Bar district, soak in the atmosphere, and browse the unique shops. Grab a quick and affordable lunch at a local cafe.",
                },
                {
                    time: "14:00",
                    location: "Trinity College Dublin",
                    title: "Visit Trinity College and Book of Kells",
                    description:
                        "Take a guided tour of Trinity College and marvel at the ancient Book of Kells and the stunning Long Room library.",
                },
                {
                    time: "17:00",
                    location: "Grafton Street",
                    title: "Shopping on Grafton Street",
                    description:
                        "Enjoy window shopping or grab a souvenir on Dublin's premier shopping street, known for its street performers.",
                },
                {
                    time: "19:00",
                    location: "Dublin City Centre",
                    title: "Dinner at a Traditional Pub",
                    description:
                        "Experience a hearty dinner at a traditional Irish pub, enjoying classic dishes like fish and chips or stew. Look for places offering early bird menus for savings.",
                },
            ],
        },
        {
            day: 2,
            date: "2025-08-14",
            activities: [
                {
                    time: "09:00",
                    location: "Guinness Storehouse",
                    title: "Guinness Storehouse Experience",
                    description:
                        "Embark on an interactive journey through the history of Guinness, ending with a pint at the Gravity Bar with panoramic city views. Book tickets online in advance to save money.",
                },
                {
                    time: "12:00",
                    location: "St. Stephen's Green",
                    title: "Lunch and Stroll in St. Stephen's Green",
                    description:
                        "Grab a packed lunch or a takeaway sandwich and enjoy it in the beautiful Victorian park of St. Stephen's Green, perfect for people-watching and relaxation.",
                },
                {
                    time: "14:00",
                    location: "National Museum of Ireland - Natural History",
                    title: "Discover the National Museum of Ireland",
                    description:
                        "Visit the 'Dead Zoo' for a fascinating journey through Ireland's natural heritage. Admission is free, making it a great budget option.",
                },
                {
                    time: "16:00",
                    location: "O'Connell Street / Spire of Dublin",
                    title: "Farewell Dublin Walk",
                    description:
                        "Take a final walk around O'Connell Street, see the General Post Office, and the iconic Spire of Dublin. Pick up any last-minute souvenirs.",
                },
                {
                    time: "18:00",
                    location: "Dublin Airport (DUB)",
                    title: "Departure",
                    description:
                        "Head to Dublin Airport for your departure, allowing ample time for check-in and security.",
                },
            ],
        },
    ],
    travelTips: [
        {
            title: "Public Transport is Your Friend",
            description:
                "Dublin city centre is very walkable, but for longer distances, utilise the bus system or the Luas (tram). Consider a Leap Card for convenience and savings.",
        },
        {
            title: "Book Attractions in Advance",
            description:
                "Many popular attractions like the Guinness Storehouse offer discounts for online bookings, and it helps to avoid long queues.",
        },
        {
            title: "Eat Like a Local on a Budget",
            description:
                "Look for 'early bird' menus at restaurants, explore local markets for fresh produce, or grab a cheap and cheerful 'chipper' for a true Irish experience.",
        },
        {
            title: "Embrace the Weather",
            description:
                "Dublin weather can be unpredictable. Pack layers, including a waterproof jacket and comfortable walking shoes, regardless of the season.",
        },
        {
            title: "Free Attractions",
            description:
                "Many of Dublin's museums and galleries offer free admission, including the National Museum of Ireland and the National Gallery of Ireland, excellent for budget travelers.",
        },
    ],
    recommendedAccommodations: [
        {
            name: "Generator Dublin",
            location: "Smithfield, Dublin 7",
            rating: 3.9,
            type: "Hostel/Budget Hotel",
            priceRangePerNight: 4000,
            description:
                "A vibrant hostel offering both private rooms and dorms, perfect for solo travelers looking for a social atmosphere and good value. Located near Jameson Distillery.",
        },
        {
            name: "Camden Court Hotel",
            location: "Camden Street, Dublin 2",
            rating: 4.1,
            type: "Mid-range Hotel",
            priceRangePerNight: 7500,
            description:
                "Offers comfortable rooms and good facilities, including a swimming pool, at a reasonable price. A bit further from the main tourist hubs but well-connected by Luas.",
        },
        {
            name: "Travelodge Dublin City Centre",
            location: "Townsend Street, Dublin 2",
            rating: 3.8,
            type: "Budget Hotel",
            priceRangePerNight: 5000,
            description:
                "A reliable and clean option in a central location, offering basic amenities. Great for those prioritising location over luxury.",
        },
    ],
    diningOptions: [
        {
            name: "The Winding Stair",
            location: "Lower Ormond Quay, Dublin 1",
            rating: 4.5,
            cuisine: "Modern Irish",
            priceRangePerPerson: 2000,
            description:
                "A charming restaurant with a focus on seasonal Irish ingredients and a great wine list. Offers an excellent value early bird menu.",
        },
        {
            name: "Burk's Cafe",
            location: "Grafton Street, Dublin 2",
            rating: 3.9,
            cuisine: "Cafe/Casual",
            priceRangePerPerson: 800,
            description:
                "Perfect for a quick and affordable breakfast or lunch, offering sandwiches, soups, and traditional Irish breakfast items.",
        },
        {
            name: "Leo Burdock's Christ Church",
            location: "Werburgh St, Dublin 8",
            rating: 4.3,
            cuisine: "Fish and Chips",
            priceRangePerPerson: 1000,
            description:
                "A Dublin institution famous for its traditional fish and chips. A must-try for an authentic, budget-friendly meal.",
        },
        {
            name: "The Brazen Head",
            location: "Bridge Street Lower, Dublin 8",
            rating: 4.4,
            cuisine: "Traditional Irish Pub Food",
            priceRangePerPerson: 1500,
            description:
                "Ireland's oldest pub, offering classic pub grub in a historic setting. A great place to soak in the atmosphere and enjoy a pint.",
        },
    ],
};

export default dummyDetails;
