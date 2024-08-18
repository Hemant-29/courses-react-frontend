import { useState, useEffect } from "react";
import "./courses_list.css";

function ListInstances(props) {
  return (
    <>
      <div className="courses_table">
        <ul className="table_heading">
          <li>Course Title</li>
          <li>Course Code</li>
          <li>Action</li>
        </ul>
        {props.courses_data.map((element, index) => (
          <ul key={index} className="table_entries">
            <li>{element.title || "No title available"}</li>
            <li>{element.course_code || "No course code available"}</li>
            <li id="table_action">
              <a href=""></a>
              <button></button>
            </li>
          </ul>
        ))}
      </div>
    </>
  );
}

export default ListInstances;
