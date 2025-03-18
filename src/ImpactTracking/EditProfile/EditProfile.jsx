import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { FiSave, FiX, FiUser, FiTool, FiHeart, FiInfo } from "react-icons/fi";
import Swal from "sweetalert2";

const EditProfile = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    skills: [],
    causes: [],
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/viewProfile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        // Helper to safely convert strings to arrays
        const processField = (field) => {
          if (!field) return []; // Handle null/undefined
          if (Array.isArray(field)) return field;
          return field.split(",").map((item) => item.trim()); // Split and trim strings
        };

        setFormData({
          name: data.user.name,
          skills: processField(data.user.skills),
          causes: processField(data.user.causes),
        });
      } catch (error) {
        console.error("Error loading profile:", error);
      }
    };
    loadProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        "http://localhost:5000/updateProfile",
        {
          ...formData,
          skills: formData.skills.join(', '),
          causes: formData.causes.join(', ') 
        },
        {
          headers: { 
            Authorization: `Bearer ${localStorage.getItem("token")}` 
          }
        }
      );
  
      if (data.success) {
        setUser((prev) => ({ ...prev, ...data.user }));
        Swal.fire({
                  title: "success!",
                  text: "Profile updated successfully",
                  icon: "success",
                  confirmButtonText: "Okay",
                }).then(() => {
                  navigate("/viewProfile");
                });
        navigate("/viewProfile");
      } else {
        alert("Update failed: " + (data.error || "Unknown error"));
      }
      
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile: " + error.message);
    }
  };

  const handleArrayChange = (field, value) => {
    const items = value
      .split(',')
      .map(item => item.trim().replace(/['"()]/g, ''));
    setFormData(prev => ({ ...prev, [field]: items }));
  };

  return (
    <div className="p-6 max-w-2xl mx-auto min-h-screen">
            <div className="mb-8">
                <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2">
                    <FiUser className="text-gray-600" />
                    Edit Profile
                </h2>
                <p className="text-gray-500 text-sm">Update your personal information</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Field */}
                <div className="form-control">
                    <label className="label py-1">
                        <span className="label-text font-medium flex items-center gap-2">
                            <FiUser className="text-gray-500" />
                            Full Name
                        </span>
                    </label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your full name"
                        required
                    />
                </div>

                {/* Skills Field */}
                <div className="form-control">
                    <label className="label py-1">
                        <span className="label-text font-medium flex items-center gap-2">
                            <FiTool className="text-gray-500" />
                            Skills
                        </span>
                    </label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={formData.skills.join(', ')}
                        onChange={(e) => handleArrayChange('skills', e.target.value)}
                        placeholder="Example: Sports, Public Speaking"
                    />
                    <div className="text-xs text-gray-500 mt-1">Separate skills with commas</div>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {formData.skills.map((skill, index) => (
                            <div key={index} className="badge badge-outline">
                                {skill}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Causes Field */}
                <div className="form-control">
                    <label className="label py-1">
                        <span className="label-text font-medium flex items-center gap-2">
                            <FiHeart className="text-gray-500" />
                            Causes
                        </span>
                    </label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={formData.causes.join(', ')}
                        onChange={(e) => handleArrayChange('causes', e.target.value)}
                        placeholder="Example: Education, Environment"
                    />
                    <div className="text-xs text-gray-500 mt-1">Separate causes with commas</div>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {formData.causes.map((cause, index) => (
                            <div key={index} className="badge badge-outline">
                                {cause}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-8">
                    <button 
                        type="button" 
                        className="btn btn-ghost"
                        onClick={() => navigate('/profile')}
                    >
                        <FiX /> Cancel
                    </button>
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                    >
                        <FiSave /> Save Changes
                    </button>
                </div>
            </form>
        </div>
  );
};

export default EditProfile;
