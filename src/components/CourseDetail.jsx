import { useState, useEffect } from "react";
import "./courses_list.css";
import "./course_detail.css";

function CourseDetail(props) {
  return (
    <>
      <h2 id="details_h2">Course Details:</h2>
      <div className="course_details">
        <p className="course_details--title">{props.details.title}</p>
        <p className="course_details--code">
          Code: {props.details.course_code}
        </p>
        <p className="course_details--desc">
          Details: {props.details.description}
        </p>
      </div>
    </>
  );
}

export default CourseDetail;
