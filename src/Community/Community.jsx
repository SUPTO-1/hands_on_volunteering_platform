import axios from "axios";
import { useEffect, useState } from "react";
import { FiPlusSquare } from "react-icons/fi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../Context/AuthContext";

const Community = () => {
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:5000/requests");
        setRequests(response.data.requests);
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load requests",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const handleJoinCommunity = async (requestId) => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to join community",
      });
      return;
    }
    try {
      const { data } = await axios.post(
        `http://localhost:5000/requests/${requestId}/response`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setRequests(
        requests.map((request) =>
          request.id === requestId
            ? {
                ...request,
                hasJoined: true,
                attendee_count: request.attendee_count + 1,
              }
            : request
        )
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: data.message || "Successfully joined the community",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Failed to join Community",
      });
    }
  };

  return (
    <div className="p-4">
      <div className="lg:flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Community Help Requests</h2>
        <div className="flex items-center gap-4">
          <Link to="/addRequest" className="btn btn-primary gap-2">
            <FiPlusSquare className="text-lg" />
            Add Request
          </Link>
        </div>
      </div>
      {loading ? (
        <div className="text-center py-8">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : requests.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No upcoming events found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-poppins">
          {requests.map((request) => (
            <div
              key={request.id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
            >
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <h3 className="card-title text-xl">{request.title}</h3>
                  <span
                    className={`badge ${
                      request.urgency === "Low"
                        ? "badge-primary"
                        : request.urgency === "Medium"
                        ? "badge-secondary"
                        : "badge-accent"
                    }`}
                  >
                    {request.urgency}
                  </span>
                </div>
                <p className="text-gray-600">{request.description}</p>
                <div className="space-y-2 mt-4">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Location:</span>
                    {request.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Category:</span>
                    <span className="badge badge-outline">
                      {request.category}
                    </span>
                  </div>
                </div>
                <div className="xl:flex justify-between items-center gap-2">
                  <div className="mt-4 text-sm text-gray-500">
                    Created by: {request.creator_name}
                  </div>
                  <div className="flex flex-col gap-2 mt-4 xl:mt-0">
                    <button
                      onClick={() => handleJoinCommunity(request.id)}
                      className="btn btn-primary"
                    >
                      Help!
                    </button>
                    <Link to ={`/community/${request.id}/members`} className="btn btn-outline gap-2">
                      Community Members
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

export default Community;
