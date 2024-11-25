import React from 'react';

const EventCard = ({ event }) => {
  return (
    <div className="border p-4 rounded-lg shadow hover:shadow-lg transition">
      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
      <p className="text-gray-700 mb-2">{event.description}</p>
      <p className="text-sm text-gray-500">Date: {new Date(event.date).toLocaleDateString()}</p>
      <p className="text-sm text-gray-500">Tickets Available: {event.ticketsAvailable}</p>
      <p className="text-sm text-gray-500">Price: ${event.ticketPrice}</p>
    </div>
  );
};

export default EventCard;
