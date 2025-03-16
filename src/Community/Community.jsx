import { FiPlusSquare } from "react-icons/fi";
import { Link } from "react-router-dom";

const Community = () => {
  return (
    <div className="p-4">
      <div className="lg:flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Community Help Requests</h2>
        <div className="flex items-center gap-4">
          <Link to="/addRequest" className="btn btn-primary gap-2">
            <FiPlusSquare className="text-lg" />
            Add Request
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Community;
