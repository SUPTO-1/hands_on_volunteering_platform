const AddEvent = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 pt-6 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-poppins font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Add Event
        </h2>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-poppins font-semibold text-gray-700">
              Event Title
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="Type Event Title"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-poppins font-semibold text-gray-700">
              Event Category
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="Type Event Category"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-poppins font-semibold text-gray-700">
                Event Date
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-poppins font-semibold text-gray-700">
                Start Time
              </label>
              <input
                type="time"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-poppins font-semibold text-gray-700">
              Status
            </label>
            <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white appearance-none">
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
              placeholder="Description"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all h-32 resize-none"
            ></textarea>
          </div>
          <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 active:scale-95">
            Create Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
