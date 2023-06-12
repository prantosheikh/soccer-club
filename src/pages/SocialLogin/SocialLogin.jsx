import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const SocialLogin = () => {
  const { googleSignIn } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state?.from?.pathname || "/";
  
  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      const loggedInUser = result.user;
        const saveUser = {
          name: loggedInUser.displayName,
          email: loggedInUser.email,
          photo: loggedInUser.photoURL,
          role : "Student"
        };
      console.log(loggedInUser);
      fetch("https://soccer-club-server.vercel.app/users", {
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
      navigate(from, {replace: true})
    });
  };


  return (
    <div>
      <div className="divider">OR</div>
      <div className="flex justify-center text-4xl mb-5">
        <button>
          {" "}
          <FcGoogle onClick={handleGoogleSignIn} className="me-5"></FcGoogle>
        </button>
        <FaGithub></FaGithub>
      </div>
    </div>
  );
};

export default SocialLogin;
