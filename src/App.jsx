import { useState } from "react";
import "./App.css";

function App() {
  const [applications, setApplications] = useState([]);

  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Applied");

  function addApplication(e) {
    e.preventDefault();

    const newApplication = {
      id: Date.now(),
      company,
      position,
      date,
      status,
    };

    setApplications([...applications, newApplication]);

    setCompany("");
    setPosition("");
    setDate("");
    setStatus("Applied");
  }

  function deleteApplication(id) {
    setApplications(
      applications.filter((application) => application.id !== id)
    );
  }

  const appliedCount = applications.filter(
    (app) => app.status === "Applied"
  ).length;

  const interviewCount = applications.filter(
    (app) => app.status === "Interview"
  ).length;

  const offerCount = applications.filter(
    (app) => app.status === "Offer"
  ).length;

  return (
    <div className="app">

      <header className="header">
        <h1>Job Application Tracker</h1>
        <p>Track and manage your job applications</p>
      </header>

      <main className="container">

        {/* Dashboard */}

        <section className="stats">

          <div className="stat-card">
            <h3>Total Applications</h3>
            <p>{applications.length}</p>
          </div>

          <div className="stat-card">
            <h3>Applied</h3>
            <p>{appliedCount}</p>
          </div>

          <div className="stat-card">
            <h3>Interviews</h3>
            <p>{interviewCount}</p>
          </div>

          <div className="stat-card">
            <h3>Offers</h3>
            <p>{offerCount}</p>
          </div>

        </section>


        {/* Add Application */}

        <section className="form-section">

          <h2>Add Job Application</h2>

          <form onSubmit={addApplication}>

            <input
              type="text"
              placeholder="Company Name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Job Position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
            />

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Rejected">Rejected</option>
              <option value="Offer">Offer</option>
            </select>

            <button type="submit">
              Add Application
            </button>

          </form>

        </section>


        {/* Applications */}

        <section className="applications">

          <h2>My Applications</h2>

          {applications.length === 0 ? (

            <p className="empty">
              No applications added yet.
            </p>

          ) : (

            applications.map((application) => (

              <div className="job-card" key={application.id}>

                <div>

                  <h3>{application.position}</h3>

                  <p>
                    <strong>Company:</strong>{" "}
                    {application.company}
                  </p>

                  <p>
                    <strong>Date:</strong>{" "}
                    {application.date}
                  </p>

                  <span
                    className={`status ${application.status}`}
                  >
                    {application.status}
                  </span>

                </div>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteApplication(application.id)
                  }
                >
                  Delete
                </button>

              </div>

            ))

          )}

        </section>

      </main>

    </div>
  );
}

export default App;