import axios from "axios";
import { useEffect, useState } from "react";
import { FiPlusSquare } from "react-icons/fi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../Context/AuthContext"; // Adjust path as needed

const Events = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/events");
        setEvents(response.data.events);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load events",
        });
      }
    };
    fetchEvents();
  }, []);

  const handleJoinEvent = async (eventId) => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to join events",
      });
      return;
    }

    try {
      const { data } = await axios.post(
        `http://localhost:5000/events/${eventId}/join`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setEvents(events.map(event => 
        event.id === eventId ? { 
          ...event, 
          hasJoined: true,
          attendee_count: event.attendee_count + 1 
        } : event
      ));

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: data.message || "Successfully joined the event",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Failed to join event",
      });
    }
  };

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
                <div className="xl:flex justify-between items-center gap-2">
                  <div className="mt-4 text-sm text-gray-500">
                    Created by: {event.creator_name}
                  </div>
                  <div className="flex flex-col gap-2 mt-4 xl:mt-0">
                    <button
                      onClick={() => handleJoinEvent(event.id)}
                      className={`btn ${
                        event.hasJoined ? "btn-success" : "btn-primary"
                      } gap-2`}
                      disabled={event.hasJoined}
                    >
                      {event.hasJoined ? "Joined ✓" : "Join Event"}
                    </button>
                    <Link
                      to={`/events/${event.id}/attendanceList`}
                      className="btn btn-outline gap-2"
                    >
                      Attendance List
                    </Link>
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