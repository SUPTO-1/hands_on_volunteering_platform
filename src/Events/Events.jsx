import axios from "axios";
import { useEffect, useState } from "react";
import { FiPlusSquare } from "react-icons/fi";
import { Link } from "react-router-dom";

const Events = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/events");
        setEvents(response.data.events);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Upcoming Events</h2>
        <Link to="/addEvent" className="btn btn-primary gap-2">
          <FiPlusSquare className="text-lg" />
          Add Event
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No upcoming events found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
            >
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <h3 className="card-title text-xl">{event.title}</h3>
                  <span
                    className={`badge ${
                      event.status === "upcoming"
                        ? "badge-primary"
                        : event.status === "ongoing"
                        ? "badge-secondary"
                        : "badge-accent"
                    }`}
                  >
                    {event.status}
                  </span>
                </div>
                <p className="text-gray-600">{event.description}</p>
                <div className="space-y-2 mt-4">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Date:</span>
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Time:</span>
                    {event.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Location:</span>
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Category:</span>
                    <span className="badge badge-outline">
                      {event.category}
                    </span>
                  </div>
                </div>
                <div className="lg:flex justify-between">
                <div className="mt-4 text-sm text-gray-500">
                  Created by: {event.creator_name}
                </div>
                <div>
                <button className="btn btn-primary gap-2 mt-4 lg:mt-0">Join Event</button>
                </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
