import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiHide, BiShow } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import login from '../../assets/img/20824344_6343825.jpg';
import useAuth from "../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const { signIn } = useAuth();
  const [error, setError] = useState("");
  const location = useLocation()
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
 
    const handleTogglePassword = () => {
      setPasswordVisible(!passwordVisible);
  };
  
   


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setError("");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Account created successfully ",
          showConfirmButton: false,
          timer: 1500,
        });
       navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };

  console.log(watch("example"));
  return (
    <div className="hero min-h-screen bg-base-200 ">
      <div className="hero-content flex-col lg:flex-row-reverse w-full gap-12">
        <div className="text-center lg:text-left w-1/2">
          <img src={login} alt="" />
        </div>
        <div className="card flex-shrink-0 max-w-sm shadow-2xl bg-base-100 w-1/2">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                {...register("email", { required: true })}
                className="input input-bordered"
              />
              {errors.email && (
                <span className="text-red-600 mt-3">
                  Email field is required
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                id="password"
                {...register("password", {
                  required: true,
                })}
                placeholder="password"
                className="input input-bordered"
              />
              <span className="text-xl mt-2" onClick={handleTogglePassword}>
                {passwordVisible ? <BiShow></BiShow> : <BiHide></BiHide>}
              </span>
              <label className="label">
                <p className="text-red-600">{error}</p>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
            <p>
              Already registered?{" "}
              <Link to="/signup">
                <span className="text-blue-700 font-semibold">
                  {" "}
                  Go to login{" "}
                </span>
              </Link>
            </p>
          </form>
          <div className="text-center">
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
