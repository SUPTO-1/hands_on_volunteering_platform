import axios from "axios";
import Swal from "sweetalert2";

const AddEvent = () => {
  const handleAddEvent = async(e) =>
  {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const category = form.category.value;
    const date = form.date.value;
    const time = form.time.value;
    const location = form.location.value;
    const description = form.description.value;
    const status = form.status.value;
    //const createdBy = user.id;
    const eventDetails = {title, description, date, time, location, category,status};
    console.log(eventDetails);
    try
    {
      const res = await axios.post("http://localhost:5000/addEvent", eventDetails, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if(res.status == 201)
      {
        Swal.fire({
          title: "success!",
          text: "Event Added Successfully",
          icon: "success",
          confirmButtonText: "Okay",
        }).then(() => {
          form.reset();
          window.location.href = "/events";
        })
      }
    }
    catch(err)
    {
      console.log(err);
    }
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 pt-6 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-poppins font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Add Event
        </h2>

        <form onSubmit={handleAddEvent} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-poppins font-semibold text-gray-700">
              Event Title
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="Type Event Title" name="title" required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-poppins font-semibold text-gray-700">
              Event Category
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="Type Event Category" name="category" required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-poppins font-semibold text-gray-700">
              Event Location
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="Type Event Location" name="location" required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-poppins font-semibold text-gray-700">
                Event Date
              </label>
              <input name="date" required
                type="date"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-poppins font-semibold text-gray-700">
                Start Time
              </label>
              <input name="time" required
                type="time"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-poppins font-semibold text-gray-700">
              Status
            </label>
            <select name="status" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white appearance-none">
              <option>Upcoming</option>
              <option>Ongoing</option>
              <option>Completed</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-poppins font-semibold text-gray-700">
              Description
            </label>
            <textarea
              placeholder="Description" name="description" required
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

export default AddEvent;
