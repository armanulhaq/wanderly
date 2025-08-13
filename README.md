# Wanderly

**AI-Powered Travel Itinerary Generator**

Wanderly is a full-stack web application that helps users plan personalized trips using AI. Users can search for destinations, set travel preferences, and instantly generate detailed, day-by-day itineraries powered by Google Gemini AI.

## Features

-   User authentication (JWT, HTTP-only cookies)
-   Real-time destination search (Google Places API)
-   AI-generated travel itineraries
-   Responsive UI with React, TypeScript, and Tailwind CSS
-   State management with Redux Toolkit & Persist
-   Secure backend with Node.js, Express, and MongoDB

## Tech Stack

-   **Frontend:** React, TypeScript, Vite, Tailwind CSS, Redux Toolkit
-   **Backend:** Node.js, Express, TypeScript, MongoDB, Mongoose
-   **APIs:** Google Places, Google Gemini AI

## Getting Started

### Prerequisites

-   Node.js & npm
-   MongoDB database
-   Google API keys (Places, Gemini)

### Setup

1. **Clone the repository:**
    ```bash
    git clone https://github.com/armanulhaq/wanderly.git
    cd wanderly
    ```
2. **Install dependencies:**
    - For client:
        ```bash
        cd client
        npm install
        ```
    - For server:
        ```bash
        cd ../server
        npm install
        ```
3. **Configure environment variables:**

4. **Run the app:**
    - Start the backend:
        ```bash
        npm nodemon server.ts
        ```
    - Start the frontend:
        ```bash
        npm run dev
        ```

## Usage

-   Register or log in to your account
-   Search for your destination and set travel details
-   Generate your AI-powered itinerary
-   View and explore your personalized trip plan
