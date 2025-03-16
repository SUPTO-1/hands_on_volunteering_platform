import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const EventAttendanceList = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventRes, attendeesRes] = await Promise.all([
          axios.get(`http://localhost:5000/events/${eventId}`),
          axios.get(`http://localhost:5000/events/${eventId}/attendees`),
        ]);

        setEvent(eventRes.data.event);
        setAttendees(attendeesRes.data.attendees);
        setLoading(false);
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load attendance list",
        });
        setLoading(false);
      }
    };

    fetchData();
  }, [eventId]);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="mb-6">
        <Link to="/events" className="btn btn-ghost">
          ← Back to Events
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <>
          {/* Event Details Card */}
          <div className="card bg-base-100 shadow-lg mb-8 font-poppins">
            <div className="card-body">
              <h2 className="card-title text-3xl mb-4">{event?.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="mb-2">
                    <strong>Date:</strong>{" "}
                    {new Date(event?.date).toLocaleDateString()}
                  </p>
                  <p className="mb-2">
                    <strong>Time:</strong> {event?.time}
                  </p>
                  <p className="mb-2">
                    <strong>Location:</strong> {event?.location}
                  </p>
                </div>
                <div>
                  <p className="mb-2">
                    <strong>Status:</strong>{" "}
                    <span
                      className={`badge ${
                        event?.status === "upcoming"
                          ? "badge-primary p-2"
                          : event?.status === "ongoing"
                          ? "badge-secondary p-2"
                          : "badge-accent"
                      }`}
                    >
                      {event?.status}
                    </span>
                  </p>
                  <p className="mb-2">
                    <strong>Organizer:</strong> {event?.creator_name}
                  </p>
                  <p className="mb-2">
                    <strong>Total Attendees:</strong> {attendees.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Attendance Table */}
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Joined At</th>
                </tr>
              </thead>
              <tbody>
                {attendees.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center py-4 text-gray-500">
                      No attendees yet
                    </td>
                  </tr>
                ) : (
                  attendees.map((attendee, index) => (
                    <tr key={index}>
                      <td>{attendee.name}</td>
                      <td>{attendee.email}</td>
                      <td>
                        {new Date(attendee.joined_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default EventAttendanceList;
