import { Navigate } from "react-router-dom";

const Nav = () => {
  const signOut = () => {
    localStorage.removeItem("_id");
    //👇🏻 redirects to the login page
    Navigate("/");
    alert("Sign out successfully");
  };
  return (
    <nav className="navbar">
      <h2>Threadify</h2>
      <div className="navbarRight">
        <button onClick={signOut}>Sign out</button>
      </div>
    </nav>
  );
};

export default Nav;
