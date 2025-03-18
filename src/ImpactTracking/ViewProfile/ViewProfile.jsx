import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiDownload, FiEdit, FiAward, FiClock, FiStar, FiUser, FiTag } from "react-icons/fi";
const ViewProfile = () => {
  const [profile, setProfile] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/viewProfile`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const processField = (field) => {
          if (Array.isArray(field)) return field;
          if (typeof field === 'string') return field.split(',');
          return [];
        };

        const processedData = {
          ...data,
          user: {
            ...data.user,
            skills: processField(data.user?.skills),
            causes: processField(data.user?.causes),
          },
        };

        setProfile(processedData);
      } catch (error) {
        console.error(
          "Error loading profile:",
          error.response?.data || error.message
        );
      }
    };
    loadProfile();
  }, []);

  // console.log("still profile: ",profile);
  const handleDownload = async (certId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/certificates/${certId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          responseType: "blob",
        }
      );

      const file = new Blob([response.data], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);
      const tempLink = document.createElement("a");
      tempLink.href = fileURL;
      tempLink.setAttribute("download", `certificate-${certId}.pdf`);
      document.body.appendChild(tempLink);

      tempLink.click();
      URL.revokeObjectURL(fileURL);
      document.body.removeChild(tempLink);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download certificate");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div className="mb-4 md:mb-0">
          <h2 className="text-4xl font-bold text-gray-800 flex items-center gap-2">
            <FiUser className="text-blue-600" />{user?.name}'s Profile
          </h2>
        </div>
        <Link 
          to="/editProfile" 
          className="btn btn-primary px-6 py-2 rounded-lg flex items-center gap-2"
        >
          <FiEdit /> Edit Profile
        </Link>
      </div>

      {/* Personal Info Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <FiUser className="text-blue-500" /> Personal Information
        </h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <span className="text-gray-600 font-medium w-32 flex items-center gap-2">
              <FiStar className="text-purple-500" /> Email:
            </span>
            <span className="text-gray-800">{profile?.user?.email}</span>
          </div>
          <div className="flex items-start">
            <span className="text-gray-600 font-medium w-32 flex items-center gap-2">
              <FiTag className="text-green-500" /> Skills:
            </span>
            <div className="flex flex-wrap gap-2">
              {profile?.user?.skills?.map((skill, index) => (
                <span key={index} className="badge bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-start">
            <span className="text-gray-600 font-medium w-32 flex items-center gap-2">
              <FiAward className="text-red-500" /> Causes:
            </span>
            <div className="flex flex-wrap gap-2">
              {profile?.user?.causes?.map((cause, index) => (
                <span key={index} className="badge bg-red-100 text-red-800 px-3 py-1 rounded-full">
                  {cause}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-400 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{profile?.points?.total_hours || 0}</div>
              <div className="opacity-90">Total Hours</div>
            </div>
            <FiClock className="w-12 h-12 opacity-75" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-400 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{profile?.points?.total_points || 0}</div>
              <div className="opacity-90">Total Points</div>
            </div>
            <FiStar className="w-12 h-12 opacity-75" />
          </div>
        </div>
      </div>

      {/* Certificates Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <FiAward className="text-green-500" /> Achievements
        </h3>
        {profile?.certificates?.length > 0 ? (
          <div className="space-y-4">
            {profile.certificates.map((cert) => (
              <div 
                key={cert.id}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div>
                  <div className="font-medium text-gray-800">
                    {cert.hours_milestone} Hours Certificate
                  </div>
                  <div className="text-sm text-gray-500">
                    Awarded on {new Date(cert.awarded_at).toLocaleDateString()}
                  </div>
                </div>
                <button
                  onClick={() => handleDownload(cert.id)}
                  className="btn bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600"
                >
                  <FiDownload /> Download
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No certificates yet - keep volunteering!
          </div>
        )}
      </div>

      <Link 
        to="/leaderboard" 
        className="mt-8 btn btn-primary w-full md:w-auto px-8 py-3 rounded-lg text-lg"
      >
        View Leaderboard
      </Link>
    </div>
  );
};

export default ViewProfile;
