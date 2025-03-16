import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const CommunityMembers = () => {
    const {requestId} = useParams();
    const [request, setRequest] = useState(null);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const [requestRes, membersRes] = await Promise.all([
                    axios.get(`http://localhost:5000/requests/${requestId}`),
                    axios.get(`http://localhost:5000/requests/${requestId}/members`)
                ]);

                setRequest(requestRes.data.request);
                setMembers(membersRes.data.members);
                setLoading(false);
            }
            catch(err){
                console.error(err);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load members",
                });
                setLoading(false);
            }
        };

        fetchData();
    },[requestId]);
    return (
        <div className="p-4 max-w-6xl mx-auto">
      <div className="mb-6">
        <Link to="/community" className="btn btn-ghost">
          ← Back to Community
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
              <h2 className="card-title text-3xl mb-4">{request?.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="mb-2">
                    <strong>Location:</strong> {request?.location}
                  </p>
                  <p className="mb-2">
                    <strong>Urgency:</strong>{" "}
                    <span
                      className={`badge ${
                        request?.urgency === "Low"
                          ? "badge-primary p-2"
                          : request?.urgency === "Medium"
                          ? "badge-secondary p-2"
                          : "badge-accent"
                      }`}
                    >
                      {request?.urgency}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="mb-2">
                    <strong>Organizer:</strong> {request?.creator_name}
                  </p>
                  <p className="mb-2">
                    <strong>Total Members:</strong> {members.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Members Table */}
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Skills</th>
                </tr>
              </thead>
              <tbody>
                {members.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center py-4 text-gray-500">
                      No members yet
                    </td>
                  </tr>
                ) : (
                  members.map((member, index) => (
                    <tr key={index}>
                      <td>{member.name}</td>
                      <td>{member.email}</td>
                      <td>{member.skills}</td>
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

export default CommunityMembers;