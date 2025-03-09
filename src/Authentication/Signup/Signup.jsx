import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Signup = () => {
  const handleRegister = async(event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const skills = form.skills.value;
    const causes = form.causes.value;
    const userData = { name, email, password, confirmPassword, skills, causes };
    if(password != confirmPassword)
      {
        Swal.fire({
          title: "error!",
          text: "Password and Confirm Password doesn't Match",
          icon: "error",
          confirmButtonText: "Okay",
        });
        return;
      }
   try{
    const res = await axios.post("http://localhost:5000/signup", userData);
    if(res.status == 201)
    {
      localStorage.setItem("token", res.data.token);
      Swal.fire({
        title: "success!",
        text: "Account Created Successfully",
        icon: "success",
        confirmButtonText: "Okay",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      })
    }
    form.reset();
    //window.location.href = "/login";
   }
   catch(err)
   {
    Swal.fire({
      title: "error!",
      text: err.response.data.message,
      icon: "error",
      confirmButtonText: "Okay",
    });
   }
  };
  return (
    <div className="hero sm:bg-white lg:bg-[#E1EACD] justify-center min-h-screen flex items-center">
      <div className="hero-content flex-col w-full max-w-lg">
        <div className="card bg-base-100 w-full shadow-2xl p-6">
          <form onSubmit={handleRegister} className="card-body">
            <fieldset className="fieldset">
              <label className="fieldset-label">Name</label>
              <input type="text" className="input input-bordered w-full" placeholder="Name" name="name" required />
              
              <label className="fieldset-label">Email</label>
              <input type="email" className="input input-bordered w-full" placeholder="Email" name="email" required />
              
              <label className="fieldset-label">Password</label>
              <input type="password" className="input input-bordered w-full" placeholder="Password" name="password" required />
              
              <label className="fieldset-label">Confirm Password</label>
              <input type="password" className="input input-bordered w-full" placeholder="Confirm Password" name="confirmPassword" required />
              
              <label className="fieldset-label">Skills</label>
              <input type="text" className="input input-bordered w-full" placeholder="Skills" name="skills" required />
              
              <label className="fieldset-label">Causes</label>
              <input type="text" className="input input-bordered w-full" placeholder="Causes" name="causes" required />
              
              <button className="btn btn-neutral w-full mt-4">Signup</button>
              
              <div className="pt-2 text-center">
                <p className="text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="link link-hover text-sm">Login</Link>
                </p>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
