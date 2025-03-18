import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

const AddTeam = () => {
    //const {user} = useAuth();
    const navigate = useNavigate();
    const handleAddTeam = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const type = form.type.value;
        const description = form.description.value;
        const teamDetails = {name, type, description};
        //console.log(teamDetails);

        try
        {
            const response = await axios.post(`http://localhost:5000/addTeam`, teamDetails,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            console.log(response);
            if(response.status == 200)
            {
                Swal.fire({
                    title: "success!",
                    text: "Team Added Successfully",
                    icon: "success",
                    confirmButtonText: "Okay",
                }).then(() => {
                    form.reset();
                    navigate("/teams");
                })
            }
        }
        catch(err)
        {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to add team",
            });
        }
    }
    return (
        <div className="min-h-screen flex flex-col items-center justify-start p-4 pt-6 bg-gray-50">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-2xl font-poppins font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Create Team
          </h2>
  
          <form onSubmit={handleAddTeam} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-poppins font-semibold text-gray-700">
                Team Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="Type Team Name"
                name="name"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-poppins font-semibold text-gray-700">
                Team Type
              </label>
              <select
                name="type"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white appearance-none"
              >
                <option>Public</option>
                <option>Private</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-poppins font-semibold text-gray-700">
                Description
              </label>
              <textarea
                placeholder="Description"
                name="description"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all h-32 resize-none"
              ></textarea>
            </div>
            <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 active:scale-95">
              Create Team
            </button>
          </form>
        </div>
      </div>
    );
};

export default AddTeam;