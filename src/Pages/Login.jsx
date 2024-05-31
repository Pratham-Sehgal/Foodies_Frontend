import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Login() {
  const [userDetails, setUserDetails] = useState({
    password: "",
    email: "",
  });
  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/loginUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: userDetails.password,

        email: userDetails.email,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter Valid detials");
    }else{
      localStorage.setItem("userEmail",userDetails .email)
      localStorage.setItem("authToken",json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }
  };
  const onChange = (event) => {
    setUserDetails({
      ...userDetails,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              name="email"
              value={userDetails.email}
              onChange={onChange}
              aria-describedby="emailHelp"
            />
            <small id="emailHelp" className="form-text text-muted">
              never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={userDetails.password}
              onChange={onChange}
              id="exampleInputPassword1"
            />
          </div>

          <button type="submit" className="btn btn-success">
            Log In
          </button>
          <Link to="/createUser" className="m-3 btn btn-primary">
            New User
          </Link>
        </form>
      </div>
     
    </>
  );
}
