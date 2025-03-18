import { FiPlusSquare } from "react-icons/fi";
import { Link } from "react-router-dom";

const Teams = () => {
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
      {/* Teams will be shown here */}
      <div className="tabs tabs-lift">
        <input
          type="radio"
          name="my_tabs_3"
          className="tab"
          aria-label="Public Team"
          defaultChecked
        />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          Content will be shown
        </div>

        <input
          type="radio"
          name="my_tabs_3"
          className="tab"
          aria-label="Private Team"
        />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          Content will be shown
        </div>
      </div>
    </div>
  );
};

export default Teams;
