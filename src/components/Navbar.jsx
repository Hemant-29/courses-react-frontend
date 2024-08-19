import { useState, useEffect } from "react";
import "./navbar.css";

function Navbar(props) {
  return (
    <>
      <nav className="nav">
        <h2 className="nav--head">Courses App</h2>
        <button
          onClick={() => {
            props.switchTab("course");
          }}
          className="nav--button"
          type="button"
          id="nav--b1"
        >
          Courses
        </button>
        <button
          onClick={() => {
            props.switchTab("instance");
          }}
          className="nav--button"
          type="button"
        >
          Course Instances
        </button>
      </nav>
    </>
  );
}

export default Navbar;
