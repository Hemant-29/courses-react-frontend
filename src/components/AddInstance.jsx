import { useState, useEffect } from "react";
import "./add_instance.css";

function AddCourse(props) {
  const [formData, setFormData] = useState({
    title: "",
    course_code: "",
    description: "",
  });

  const [course_status, set_Course_status] = useState(null);
  const handleFormChange = (event) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  };

  const submitForm = (event) => {
    event.preventDefault();
    console.log(formData);

    const url = "http://localhost:8000/api/courses/";
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.status == 201) set_Course_status(true);
        else set_Course_status(false);
        return response.json();
      })
      .then(() => {
        console.log("form data: ", formData);
        props.fetchCourses();
      });
  };

  return (
    <>
      <h2>Add Instance: </h2>
      <div className="add_instances">
        <form onSubmit={submitForm} className="add_instance_form">
          <select
            name="course_id"
            id="course_select"
            onChange={handleFormChange}
          >
            <option value="">All</option>
            {props.coursesData.map((element, index) => (
              <>
                <option key={index} value={element.id}>
                  {element.title}
                </option>
              </>
            ))}
          </select>

          <input
            name="year"
            type="text"
            placeholder="Year"
            onChange={handleFormChange}
            value={formData.year}
            required
          />
          <input
            name="semester"
            type="text"
            placeholder="Semester"
            onChange={handleFormChange}
            value={formData.semester}
            required
          />
          <button>Add Instance</button>
        </form>
      </div>
    </>
  );
}

export default AddCourse;
