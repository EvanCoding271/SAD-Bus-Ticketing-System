# SAD-Bus-Ticketing-System

A real-time bus seat tracker and allocation system built with Node.js, Express, and Socket.io.

## Features

- Real-time seat availability updates
- Interactive seat selection
- Seat booking functionality
- Simulated real-time booking by other users

## Installation

1. Install dependencies:
   ```
   npm install
   ```

2. Start the server:
   ```
   npm start
   ```

3. Open your browser and go to `http://localhost:3000`

## How to Use

- View the bus layout with 40 seats (10 rows x 4 columns)
- Click on available seats to select them (turns yellow)
- Click "Book Selected Seats" to confirm booking (turns red)
- Seats are automatically booked by simulated users every 10 seconds
- Use "Reset Selection" to deselect all selected seats

## Technologies Used

- Node.js
- Express
- Socket.io
- HTML/CSS/JavaScript