import { Link, useLocation, useNavigate } from "react-router-dom";
import loginImage from "../../../Images/login.jpg";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "../../Context/AuthContext";
const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const handlelogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const userData = { email, password };
    try {
      const res = await axios.post("http://localhost:5000/login", userData);
      if (res.status == 200) {
        Swal.fire({
          title: "success!",
          text: "Login Successfully",
          icon: "success",
          confirmButtonText: "Okay",
        }).then(() => {
          if (res.data.token) {
            login(res.data.user, res.data.token);
            const from = location.state?.from?.pathname || '/';
            navigate(from, { replace: true });
          } else {
            console.error("No token received in response");
          }
          //window.location.href = "/";
        });
      } else {
        Swal.fire({
          title: "error!",
          text: res.data.message,
          icon: "error",
          confirmButtonText: "Okay",
        });
      }
    } catch (err) {
      Swal.fire({
        title: "error!",
        text: err.response.data.message,
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
  };
  return (
    <div className="hero sm:bg-white lg:bg-[#E1EACD] justify-center min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <img
            src={loginImage}
            className="max-w-sm rounded-lg shadow-2xl"
            alt="login image"
          />
        </div>
        <div className="card bg-base-100 sm:p-0 lg:p-12 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handlelogin} className="card-body">
            <fieldset className="fieldset">
              <label className="fieldset-label">Email</label>
              <input
                type="email"
                className="input"
                placeholder="Email"
                name="email"
              />
              <label className="fieldset-label">Password</label>
              <input
                type="password"
                className="input"
                placeholder="Password"
                name="password"
              />
              <button className="btn btn-neutral mt-4">Login</button>
              <div className="pt-2">
                <a className="text-sm">
                  Don't have an account?{" "}
                  <a className="link link-hover text-sm">
                    <Link to="/signup">Sign Up</Link>
                  </a>
                </a>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
