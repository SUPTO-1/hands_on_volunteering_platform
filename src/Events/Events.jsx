import { FiPlusSquare } from "react-icons/fi";
import { Link } from "react-router-dom";
const Events = () => {
    return (
        <div>
            <div className="flex justify-between p-2 lg:p-10">
            <h2 className="text-lg lg:text-3xl font-bold ">Upcoming Events</h2>
            <Link to="/addEvent" className="btn btn-sm lg:btn-md"><FiPlusSquare className="mr-2"/> Add Event</Link>
            </div>

        </div>
    );
};

export default Events;