import { useState } from "react";
import "./App.css";

function App() {
  const [studentName, setStudentName] = useState("");
  const [allStudents, setAllStudents] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editableStudent, setEditableStudent] = useState(null);

  const createHandler = (e) => {
    e.preventDefault();
    if (studentName.trim()) {
      const newStudent = {
        id: Date.now(),
        name: studentName.trim(),
        isPresent: undefined,
      };
      setAllStudents([...allStudents, newStudent]);
      setStudentName("");
    } else {
      alert("Please do not leave the name empty.");
    }
  };

  const deleteHandler = (id) => {
    setAllStudents(allStudents.filter((s) => s.id !== id));
  };

  const editHandler = (id) => {
    const student = allStudents.find((s) => s.id === id);
    setEditMode(true);
    setEditableStudent(student);
    setStudentName(student.name);
  };

  const updateHandler = (e) => {
    e.preventDefault();
    if (studentName.trim()) {
      setAllStudents(
        allStudents.map((s) =>
          s.id === editableStudent.id ? { ...s, name: studentName.trim() } : s
        )
      );
      setEditMode(false);
      setEditableStudent(null);
      setStudentName("");
    } else {
      alert("Please enter a name.");
    }
  };

  const presentHandler = (id) => {
    const student = allStudents.find((s) => s.id === id);
    if (student.isPresent === true) return alert("Already marked Present.");
    if (student.isPresent === false) return alert("Already marked Absent.");
    setAllStudents(
      allStudents.map((s) => (s.id === id ? { ...s, isPresent: true } : s))
    );
  };

  const absentHandler = (id) => {
    const student = allStudents.find((s) => s.id === id);
    if (student.isPresent === true) return alert("Already marked Present.");
    if (student.isPresent === false) return alert("Already marked Absent.");
    setAllStudents(
      allStudents.map((s) => (s.id === id ? { ...s, isPresent: false } : s))
    );
  };

  const toggleHandler = (id) => {
    setAllStudents(
      allStudents.map((s) =>
        s.id === id ? { ...s, isPresent: !s.isPresent } : s
      )
    );
  };

  return (
    <>
      <form
        onSubmit={(e) => (editMode ? updateHandler(e) : createHandler(e))}
        className="form"
      >
        <div className="form-group">
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Enter student name"
          />
          <button type="submit" disabled={!studentName.trim()}>
            {editMode ? "Update Student Name" : "Add Student"}
          </button>
        </div>
      </form>

      <div className="student-section">
        <div className="all-lists">
          <h2>All Students</h2>
          <ul>
            {allStudents.map((student) => (
              <li
                key={student.id}
                className={editableStudent?.id === student.id ? "editing" : ""}
              >
                <span>{student.name}</span>
                <button onClick={() => editHandler(student.id)}>Edit</button>
                <button
                  className="remove-btn"
                  onClick={() => deleteHandler(student.id)}
                >
                  Delete
                </button>
                <button
                  className="present-btn"
                  onClick={() => presentHandler(student.id)}
                >
                  Present
                </button>
                <button
                  className="absent-btn"
                  onClick={() => absentHandler(student.id)}
                >
                  Absent
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="present-lists">
          <h2>Present Students</h2>
          <ul>
            {allStudents
              .filter((s) => s.isPresent === true)
              .map((student) => (
                <li key={student.id}>
                  <span>{student.name}</span>
                  <button onClick={() => toggleHandler(student.id)}>
                    Accidentally Added
                  </button>
                </li>
              ))}
          </ul>
        </div>

        <div className="absent-lists">
          <h2>Absent Students</h2>
          <ul>
            {allStudents
              .filter((s) => s.isPresent === false)
              .map((student) => (
                <li key={student.id}>
                  <span>{student.name}</span>
                  <button onClick={() => toggleHandler(student.id)}>
                    Accidentally Added
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
