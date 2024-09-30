import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [subjects, setSubjects] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [hours, setHours] = useState(0);

  // Retrieve data from local storage when the app loads
  useEffect(() => {
    const storedSubjects = JSON.parse(localStorage.getItem('subjects'));
    if (storedSubjects) {
      setSubjects(storedSubjects);
    }
  }, []);

  // Save data to local storage whenever subjects change
  useEffect(() => {
    localStorage.setItem('subjects', JSON.stringify(subjects));
  }, [subjects]);

  const addSubject = () => {
    if (subjectName) {
      const newSubject = { name: subjectName, hours: parseInt(hours) };
      setSubjects([...subjects, newSubject]);
      setSubjectName("");
      setHours();
    }
  };

  const increaseHours = (index) => {
    const newSubjects = [...subjects];
    newSubjects[index].hours += 1;
    setSubjects(newSubjects);
  };

  const decreaseHours = (index) => {
    const newSubjects = [...subjects];
    if (newSubjects[index].hours > 0) {
      newSubjects[index].hours -= 1;
      setSubjects(newSubjects);
    }
  };

  const handleDelete = (index) => {
    const newSubjects = subjects.filter((_, i) => i !== index);
    setSubjects(newSubjects);
  };

  return (
    <div className="App">
      <h1>Education Planner</h1>

      <div className="add-subject">
        <input
          type="text"
          placeholder="Enter subject name"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Study hours"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
        />
        <button onClick={addSubject}>Add Subject</button>
      </div>

      <div className="subject-list">
        {subjects.map((subject, index) => (
          <div key={index} className="subject-item">
            <h3>{subject.name}</h3>
            <div className="hours-control">
              <button onClick={() => decreaseHours(index)}>-</button>
              <span>{subject.hours} Hours</span>
              <button onClick={() => increaseHours(index)}>+</button>
            </div>
            <button onClick={() => handleDelete(index)} className="delete-btn">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
