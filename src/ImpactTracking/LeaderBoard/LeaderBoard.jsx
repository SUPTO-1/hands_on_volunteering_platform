import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const LeaderBoard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/leaderboard");
        setLeaderboard(data.leaderboard);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load leaderboard",
        });
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="mb-6">
        <Link to="/viewProfile" className="btn btn-ghost">
          ← Back to Profile
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
      
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Volunteer Name</th>
              <th className="text-right">Earn Points</th>
              <th className="text-right">Total Hours</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((user, index) => (
              <tr key={user.id}>
                <td>
                  <span className="font-bold">
                    #{index + 1}
                    {index === 0 && " 🥇"}
                    {index === 1 && " 🥈"}
                    {index === 2 && " 🥉"}
                  </span>
                </td>
                <td>{user.name}</td>
                <td className="text-right">{user.total_points.toLocaleString()}</td>
                <td className="text-right">{user.total_hours.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {leaderboard.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No leaderboard entries yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderBoard;