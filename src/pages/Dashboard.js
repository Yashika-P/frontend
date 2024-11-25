import React, { useState } from 'react';
import { createEvent } from '../services/eventService';

const Dashboard = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [ticketsAvailable, setTicketsAvailable] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEvent({
        title,
        description,
        date,
        ticketsAvailable,
        ticketPrice,
      });
      alert('Event created successfully!');
    } catch (err) {
      alert('Error creating event. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create a New Event</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-lg max-w-lg mx-auto"
      >
        <input
          type="text"
          placeholder="Event Title"
          className="border w-full p-2 rounded mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="border w-full p-2 rounded mb-4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="date"
          className="border w-full p-2 rounded mb-4"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Tickets Available"
          className="border w-full p-2 rounded mb-4"
          value={ticketsAvailable}
          onChange={(e) => setTicketsAvailable(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Ticket Price ($)"
          className="border w-full p-2 rounded mb-4"
          value={ticketPrice}
          onChange={(e) => setTicketPrice(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 w-full text-white p-2 rounded hover:bg-blue-700"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
