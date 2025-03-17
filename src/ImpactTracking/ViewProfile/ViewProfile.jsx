import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";

const ViewProfile = () => {
    const [profile, setProfile] = useState(null);
    const { user } = useAuth();
  
    useEffect(() => {
        const loadProfile = async () => {
          try {
            const { data } = await axios.get(`http://localhost:5000/viewProfile`, {
              headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setProfile(data);
          } catch (error) {
            console.error('Error loading profile:', error.response?.data || error.message);
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
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          responseType: 'blob'
        }
      );

      const file = new Blob([response.data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      const tempLink = document.createElement('a');
      tempLink.href = fileURL;
      tempLink.setAttribute('download', `certificate-${certId}.pdf`);
      document.body.appendChild(tempLink);
      
      tempLink.click();
      URL.revokeObjectURL(fileURL);
      document.body.removeChild(tempLink);

    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download certificate');
    }
  };
  
    return (
      <div className="p-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">{user?.name}'s Profile</h2>
        
        <div className="stats shadow mb-6">
          <div className="stat">
            <div className="stat-title">Total Hours</div>
            <div className="stat-value">{profile?.points?.total_hours || 0}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Total Points</div>
            <div className="stat-value">{profile?.points?.total_points || 0}</div>
          </div>
        </div>
  
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="card-title mb-4">Certificates</h3>
            {profile?.certificates?.length>0?(
            profile?.certificates?.map(cert => (
              <div key={cert.id} className="flex items-center justify-between mb-2">
                <span>{cert.hours_milestone} Hours Certificate</span>
                <button onClick={()=>handleDownload(cert.id)} 
                  className="btn btn-sm btn-success"
                >
                  Download
                </button>
              </div>
            ))):(
              <p>No certificates found</p>
            )}
          </div>
        </div>
  
        <Link to="/leaderboard" className="btn btn-primary mt-6">
          View Leaderboard
        </Link>
      </div>
    );
  };
  
export default ViewProfile;