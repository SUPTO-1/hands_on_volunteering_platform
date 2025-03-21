import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddRequest = () => {
  const navigate = useNavigate();
  const handleAddRequest = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const category = form.category.value;
    const location = form.location.value;
    const urgency = form.urgency.value;
    const status = form.status.value;
    const description = form.description.value;
    const requestDetails = {
      title,
      description,
      category,
      location,
      urgency,
      status,
    };
    console.log(requestDetails);
    try {
      const res = await axios.post(
        "http://localhost:5000/addRequest",
        requestDetails,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.status == 201) {
        Swal.fire({
          title: "success!",
          text: "Request Added Successfully",
          icon: "success",
          confirmButtonText: "Okay",
        }).then(() => {
          form.reset();
          navigate("/community");
        });
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add request",
      });
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 pt-6 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-poppins font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Make a Help Request
        </h2>

        <form onSubmit={handleAddRequest} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-poppins font-semibold text-gray-700">
              Request Title
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="Type Request Title"
              name="title"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-poppins font-semibold text-gray-700">
              Request Category
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="Type Request Category"
              name="category"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-poppins font-semibold text-gray-700">
              Event Location
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="Type Location"
              name="location"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-poppins font-semibold text-gray-700">
              Urgency
            </label>
            <select
              name="urgency"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white appearance-none"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>Urgent</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-poppins font-semibold text-gray-700">
              Status
            </label>
            <select
              name="status"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white appearance-none"
            >
              <option>Open</option>
              <option>Closed</option>
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
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRequest;
