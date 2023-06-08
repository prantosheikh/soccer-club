import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import signup from "../../assets/img/20547283_6310507.jpg";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";

const SignUp = () => {
  const { createUser, updateUserProfile } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        updateUserProfile(data.name, data.photoURL);
        const saveUser = {
          name: data.name,
          email: data.email,
          photo: data.photoURL,
        };
        fetch("http://localhost:3000/users", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(saveUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.insertedId) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/");
            }
          });
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };

  console.log(watch("example"));
  return (
    <div className="my-16">
      <h2 className="text-center text-4xl mb-9 font-semibold">
        {" "}
        Please Registration !
      </h2>
      <div className="hero ">
        <div className="hero-content flex-col lg:flex-row-reverse w-full gap-12">
          <div className="text-center lg:text-left w-1/2">
            <img src={signup} alt="" />
          </div>
          <div className="card flex-shrink-0 max-w-sm shadow-2xl bg-base-100 w-1/2">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  {...register("name", { required: true })}
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className="text-red-600 mt-3">
                    Name field is required
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  placeholder="Photo URL"
                  name="photo"
                  {...register("photoURL", { required: true })}
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className="text-red-600 mt-3">
                    Name field is required
                  </span>
                )}
              </div>
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
                  type="password"
                  name="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                  placeholder="password"
                  className="input input-bordered"
                />
                {errors.password?.type === "required" && (
                  <span className="text-red-600 mt-3">
                    Password field is required
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="text-red-600 mt-3">
                    Password must be 6 Characters
                  </span>
                )}
                {errors.password?.type === "pattern" && (
                  <span className="text-red-600 mt-3">
                    Password must be one upper case one lower case one sipecil
                    Characters
                  </span>
                )}
                <label className="label">
                  <p className="text-red-600">{error}</p>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
              <p>
                Already registered?
                <Link to="/login">
                  <span className="text-blue-700 font-semibold">
                    {" "}
                    Go to login{" "}
                  </span>
                </Link>
              </p>
            </form>
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
