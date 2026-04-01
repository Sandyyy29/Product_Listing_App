import { useEffect, useState } from "react";
import API from "../../api";

export default function Profile() {
  const [user, setUser] = useState(null);


  useEffect(() => {
    API.get("/user")
      .then(res => setUser(res.data))
      .catch(() => {
        window.location = "/"; 
      });
  }, []);


  
  
  const logout = async () => {
    try {
      await API.post("/logout");
    } catch (err) {
      console.log(err.response?.data);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    window.location = "/";
  };

  return (
    <div >
      <h1>My Profile</h1>

      <div >
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {user?.role}</p>

        <button  onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

