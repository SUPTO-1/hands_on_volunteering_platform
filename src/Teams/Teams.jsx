import { useEffect, useState } from 'react';
import axios from 'axios';
import { FiPlusSquare, FiUserPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from '../Context/AuthContext';
import Swal from 'sweetalert2';

const Teams = () => {
  const { user } = useAuth();
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [members, setMembers] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/teams', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setTeams(data.teams);
      } catch (err) {
        console.error('Failed to load teams:', err);
      }
    };
    loadTeams();
  }, []);

  const handleJoinTeam = async (teamId) => {
    try {
      await axios.post(`http://localhost:5000/teams/${teamId}/join`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setTeams(teams.map(t => t.id === teamId ? {...t, is_member: true} : t));
    } catch (err) {
      console.error('Failed to join team:', err);
    }
  };

  const viewDetails = async (team) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/teams/${team.id}/members`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setSelectedTeam(team);
      setMembers(data.members);
      setShowDetails(true);
    } catch (err) {
      console.error('Failed to load members:', err);
    }
  };

  const addMember = async (teamId) => {
    try {
      await axios.post(`http://localhost:5000/teams/${teamId}/members`, { email }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setEmail('');
      setShowAddMember(false);
      viewDetails(selectedTeam);
    } catch (err) {
      console.error('Failed to add member:', err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "User not found",
      })
    }
  };

  return (
    <div className="p-4">
      <div className="lg:flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Teams</h2>
        <div className="flex items-center gap-4">
          <Link to="/addTeam" className="btn btn-primary gap-2">
            <FiPlusSquare className="text-lg" />
            Create Team
          </Link>
        </div>
      </div>

      <div className="tabs tabs-lift">
        {/* Public Teams Tab */}
        <input type="radio" name="my_tabs_3" className="tab" aria-label="Public Team" defaultChecked />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teams.filter(t => t.team_type === 'Public').map(team => (
              <div key={team.id} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">{team.name}</h2>
                  <p>{team.description}</p>
                  <div className="text-sm text-gray-500">
                    Created by: {team.creator_name}
                  </div>
                  <div className="card-actions justify-end mt-4">
                    {!team.is_member && (
                      <button 
                        className="btn btn-primary"
                        onClick={() => handleJoinTeam(team.id)}
                      >
                        Join Now
                      </button>
                    )}
                    <button 
                      className="btn btn-ghost"
                      onClick={() => viewDetails(team)}
                    >
                      Team Members
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Private Teams Tab */}
        <input type="radio" name="my_tabs_3" className="tab" aria-label="Private Team" />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teams.filter(t => t.team_type === 'Private' && (t.is_member || t.created_by === user.id)).map(team => (
              <div key={team.id} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">{team.name}</h2>
                  <p>{team.description}</p>
                  <div className="text-sm text-gray-500">
                    Created by: {team.creator_name}
                    {team.created_by === user.id && " (You)"}
                  </div>
                  <div className="card-actions justify-end mt-4">
                    <button 
                      className="btn btn-ghost"
                      onClick={() => viewDetails(team)}
                    >
                      Team Members
                    </button>
                    {team.created_by === user.id && (
                      <button 
                        className="btn btn-primary"
                        onClick={() => {
                          setSelectedTeam(team);
                          setShowAddMember(true);
                        }}
                      >
                        <FiUserPlus className="mr-2" />
                        Add Member
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Details Modal */}
      <dialog open={showDetails} className="modal" onClose={() => setShowDetails(false)}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">{selectedTeam?.name} Members</h3>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Joined At</th>
                </tr>
              </thead>
              <tbody>
                {members.map(member => (
                  <tr key={member.id}>
                    <td>{member.name}</td>
                    <td>{member.email}</td>
                    <td>{new Date(member.joined_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="modal-action">
            <button className="btn" onClick={() => setShowDetails(false)}>
              Close
            </button>
          </div>
        </div>
      </dialog>

      {/* Add Member Modal */}
      <dialog open={showAddMember} className="modal" onClose={() => setShowAddMember(false)}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add Member to {selectedTeam?.name}</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">User Email</span>
            </label>
            <input
              type="email"
              className="input input-bordered"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="modal-action">
            <button className="btn" onClick={() => setShowAddMember(false)}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={() => addMember(selectedTeam.id)}>
              Add Member
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Teams;