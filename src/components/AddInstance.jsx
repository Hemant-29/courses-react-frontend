import { useState, useEffect } from "react";
import "./add_instance.css";

function AddCourse(props) {
  const [instance_status, set_instance_status] = useState(null);
  const [formData, setFormData] = useState({
    year: "",
    semester: "",
    course: "",
  });

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

    const url = "http://localhost:8000/api/instances/";
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.status == 201) set_instance_status(true);
        else set_instance_status(false);
        return response.json();
      })
      .then(() => {
        console.log("form data: ", formData);
      });
  };

  return (
    <>
      <h2>Add Instance: </h2>
      <div className="add_instances">
        <form onSubmit={submitForm} className="add_instance_form">
          <select
            required
            name="course"
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
          <section>
            {instance_status != null ? (
              instance_status == true ? (
                <p>Instance is Added Sucessfully</p>
              ) : (
                <p>Error Adding Instance</p>
              )
            ) : (
              <></>
            )}
          </section>
        </form>
      </div>
    </>
  );
}

export default AddCourse;
