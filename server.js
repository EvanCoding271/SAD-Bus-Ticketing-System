const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static('public'));

// Bus seats: 10 rows, 4 seats per row
let seats = [];
for (let row = 1; row <= 10; row++) {
  for (let col = 1; col <= 4; col++) {
    seats.push({
      id: `R${row}C${col}`,
      status: 'available' // available, selected, booked
    });
  }
}

io.on('connection', (socket) => {
  console.log('A user connected');

  // Send initial seats data
  socket.emit('seatsUpdate', seats);

  // Handle seat selection
  socket.on('selectSeat', (seatId) => {
    const seat = seats.find(s => s.id === seatId);
    if (seat && seat.status === 'available') {
      seat.status = 'selected';
      io.emit('seatsUpdate', seats); // Broadcast to all
    }
  });

  // Handle seat booking
  socket.on('bookSeat', (seatId) => {
    const seat = seats.find(s => s.id === seatId);
    if (seat && seat.status === 'selected') {
      seat.status = 'booked';
      io.emit('seatsUpdate', seats);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Simulate real-time updates: randomly book seats
setInterval(() => {
  const availableSeats = seats.filter(s => s.status === 'available');
  if (availableSeats.length > 0) {
    const randomSeat = availableSeats[Math.floor(Math.random() * availableSeats.length)];
    randomSeat.status = 'booked';
    io.emit('seatsUpdate', seats);
  }
}, 10000); // Every 10 seconds

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});