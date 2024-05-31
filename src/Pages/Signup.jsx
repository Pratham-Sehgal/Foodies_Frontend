import  { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [userDetails, setUserDetails] = useState({
    name: "",
    password: "",
    email: "",
    geolocation: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response =await fetch("http://localhost:3000/api/createUser", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: userDetails.name,
        password: userDetails.password,
        location: userDetails.geolocation,
        email: userDetails.email,
      }),

    });
    const json= await response.json();
    console.log(json)
    if(!json.success){
        alert("Enter Valid detials") 
    }
  };
  const onChange = (event) => {
    setUserDetails({
      ...userDetails,
      [event.target.name]: event.target.value
    });
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="Name">Your Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={userDetails.name}
              onChange={onChange}
            />
          </div>
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
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Location</label>
            <input
              type="text"
              className="form-control"
              name="geolocation"
              value={userDetails.geolocation}
              onChange={onChange}
              id="exampleInputPassword1"
            />
          </div>

          <button type="submit" className="btn btn-success">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-primary">
            Already a user
          </Link>
        </form>
      </div>
    </>
  );
}
