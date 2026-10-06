import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("login");

  // Authentication
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState(null);

  // Job applications
  const [applications, setApplications] = useState([]);

  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Applied");
  const [notes, setNotes] = useState("");

  const [editingId, setEditingId] = useState(null);

  // Search and filter
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Load saved user
  useEffect(() => {
    const savedUser = localStorage.getItem("jobTrackerUser");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setPage("dashboard");
    }
  }, []);

  // Load applications
  useEffect(() => {
    const savedApplications = localStorage.getItem("jobApplications");

    if (savedApplications) {
      setApplications(JSON.parse(savedApplications));
    }
  }, []);

  // Save applications
  useEffect(() => {
    localStorage.setItem(
      "jobApplications",
      JSON.stringify(applications)
    );
  }, [applications]);

  // ---------------- SIGN UP ----------------

  const handleSignup = (e) => {
    e.preventDefault();

    if (!signupName || !signupEmail || !signupPassword) {
      alert("Please fill all fields.");
      return;
    }

    if (signupPassword.length < 6) {
      alert("Password must contain at least 6 characters.");
      return;
    }

    const newUser = {
      name: signupName,
      email: signupEmail,
      password: signupPassword,
    };

    localStorage.setItem("registeredUser", JSON.stringify(newUser));

    alert("Account created successfully!");

    setSignupName("");
    setSignupEmail("");
    setSignupPassword("");

    setPage("login");
  };

  // ---------------- LOGIN ----------------

  const handleLogin = (e) => {
    e.preventDefault();

    if (!loginEmail || !loginPassword) {
      alert("Please enter email and password.");
      return;
    }

    const registeredUser = JSON.parse(
      localStorage.getItem("registeredUser")
    );

    if (!registeredUser) {
      alert("No account found. Please sign up first.");
      setPage("signup");
      return;
    }

    if (
      loginEmail === registeredUser.email &&
      loginPassword === registeredUser.password
    ) {
      setUser(registeredUser);

      localStorage.setItem(
        "jobTrackerUser",
        JSON.stringify(registeredUser)
      );

      setLoginEmail("");
      setLoginPassword("");

      setPage("dashboard");
    } else {
      alert("Invalid email or password.");
    }
  };

  // ---------------- LOGOUT ----------------

  const handleLogout = () => {
    localStorage.removeItem("jobTrackerUser");

    setUser(null);
    setPage("login");
  };

  // ---------------- ADD / EDIT ----------------

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!company || !position || !date) {
      alert("Please fill Company, Position and Date.");
      return;
    }

    if (editingId) {
      setApplications(
        applications.map((application) =>
          application.id === editingId
            ? {
                ...application,
                company,
                position,
                date,
                status,
                notes,
              }
            : application
        )
      );

      setEditingId(null);
      alert("Application updated successfully!");
    } else {
      const newApplication = {
        id: Date.now(),
        company,
        position,
        date,
        status,
        notes,
      };

      setApplications([newApplication, ...applications]);

      alert("Application added successfully!");
    }

    clearForm();
  };

  const clearForm = () => {
    setCompany("");
    setPosition("");
    setDate("");
    setStatus("Applied");
    setNotes("");
  };

  // ---------------- EDIT ----------------

  const handleEdit = (application) => {
    setCompany(application.company);
    setPosition(application.position);
    setDate(application.date);
    setStatus(application.status);
    setNotes(application.notes);
    setEditingId(application.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ---------------- DELETE ----------------

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (confirmDelete) {
      setApplications(
        applications.filter(
          (application) => application.id !== id
        )
      );
    }
  };

  // ---------------- FILTER ----------------

  const filteredApplications = applications.filter(
    (application) => {
      const matchesSearch =
        application.company
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        application.position
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        filterStatus === "All" ||
        application.status === filterStatus;

      return matchesSearch && matchesStatus;
    }
  );

  // ---------------- STATISTICS ----------------

  const total = applications.length;

  const applied = applications.filter(
    (app) => app.status === "Applied"
  ).length;

  const interviews = applications.filter(
    (app) => app.status === "Interview"
  ).length;

  const offers = applications.filter(
    (app) => app.status === "Offer"
  ).length;

  const rejected = applications.filter(
    (app) => app.status === "Rejected"
  ).length;

  // ---------------- SIGNUP PAGE ----------------

  if (page === "signup") {
    return (
      <div className="auth-page">
        <div className="auth-left">
          <div className="brand">
            <div className="brand-icon">💼</div>

            <h1>CareerTrack</h1>

            <p>
              Organize your job search.
              <br />
              Build your career.
            </p>
          </div>

          <div className="auth-feature">
            <div>✓ Track every application</div>
            <div>✓ Monitor interview progress</div>
            <div>✓ Manage your career journey</div>
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-card">
            <h2>Create Account</h2>

            <p className="auth-subtitle">
              Start managing your job applications today.
            </p>

            <form onSubmit={handleSignup}>
              <label>Full Name</label>

              <input
                type="text"
                placeholder="Enter your full name"
                value={signupName}
                onChange={(e) =>
                  setSignupName(e.target.value)
                }
              />

              <label>Email Address</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={signupEmail}
                onChange={(e) =>
                  setSignupEmail(e.target.value)
                }
              />

              <label>Password</label>

              <input
                type="password"
                placeholder="Minimum 6 characters"
                value={signupPassword}
                onChange={(e) =>
                  setSignupPassword(e.target.value)
                }
              />

              <button className="primary-btn">
                Create Account
              </button>
            </form>

            <p className="switch-auth">
              Already have an account?

              <button
                onClick={() => setPage("login")}
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ---------------- LOGIN PAGE ----------------

  if (page === "login") {
    return (
      <div className="auth-page">
        <div className="auth-left">
          <div className="brand">
            <div className="brand-icon">💼</div>

            <h1>CareerTrack</h1>

            <p>
              Your smart job application
              <br />
              management system.
            </p>
          </div>

          <div className="auth-feature">
            <div>📊 Track your applications</div>
            <div>🎯 Manage interview stages</div>
            <div>📈 Monitor your progress</div>
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-card">
            <h2>Welcome Back!</h2>

            <p className="auth-subtitle">
              Login to continue your career journey.
            </p>

            <form onSubmit={handleLogin}>
              <label>Email Address</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={loginEmail}
                onChange={(e) =>
                  setLoginEmail(e.target.value)
                }
              />

              <label>Password</label>

              <input
                type="password"
                placeholder="Enter your password"
                value={loginPassword}
                onChange={(e) =>
                  setLoginPassword(e.target.value)
                }
              />

              <button className="primary-btn">
                Login
              </button>
            </form>

            <p className="switch-auth">
              Don't have an account?

              <button
                onClick={() => setPage("signup")}
              >
                Create Account
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ---------------- DASHBOARD ----------------

  return (
    <div className="dashboard">

      {/* NAVBAR */}

      <nav className="navbar">
        <div className="nav-brand">
          <span>💼</span>
          CareerTrack
        </div>

        <div className="nav-user">
          <div className="user-info">
            <strong>{user?.name}</strong>
            <small>{user?.email}</small>
          </div>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* HERO */}

      <section className="hero">
        <div>
          <p className="welcome-text">
            Welcome back 👋
          </p>

          <h1>
            Track your career journey
          </h1>

          <p>
            Manage applications, interviews and offers
            all in one place.
          </p>
        </div>

        <div className="hero-icon">
          🚀
        </div>
      </section>

      {/* STATISTICS */}

      <section className="stats">

        <div className="stat-card">
          <div className="stat-icon blue">📋</div>
          <div>
            <span>Total Applications</span>
            <strong>{total}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple">📨</div>
          <div>
            <span>Applied</span>
            <strong>{applied}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">🎤</div>
          <div>
            <span>Interviews</span>
            <strong>{interviews}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">🎉</div>
          <div>
            <span>Offers</span>
            <strong>{offers}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon red">❌</div>
          <div>
            <span>Rejected</span>
            <strong>{rejected}</strong>
          </div>
        </div>

      </section>

      {/* ADD APPLICATION */}

      <section className="content-section">

        <div className="section-title">
          <div>
            <h2>
              {editingId
                ? "Edit Application"
                : "Add New Application"}
            </h2>

            <p>
              Keep your job search organized.
            </p>
          </div>
        </div>

        <form
          className="application-form"
          onSubmit={handleSubmit}
        >

          <div className="input-group">
            <label>Company Name</label>

            <input
              type="text"
              placeholder="e.g. Google"
              value={company}
              onChange={(e) =>
                setCompany(e.target.value)
              }
            />
          </div>

          <div className="input-group">
            <label>Job Position</label>

            <input
              type="text"
              placeholder="e.g. Software Engineer"
              value={position}
              onChange={(e) =>
                setPosition(e.target.value)
              }
            />
          </div>

          <div className="input-group">
            <label>Application Date</label>

            <input
              type="date"
              value={date}
              onChange={(e) =>
                setDate(e.target.value)
              }
            />
          </div>

          <div className="input-group">
            <label>Status</label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
            >
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>
          </div>

          <div className="input-group full-width">
            <label>Notes</label>

            <textarea
              placeholder="Add interview details, recruiter information, etc."
              value={notes}
              onChange={(e) =>
                setNotes(e.target.value)
              }
            />
          </div>

          <div className="form-buttons">

            <button className="primary-btn">
              {editingId
                ? "Update Application"
                : "Add Application"}
            </button>

            {editingId && (
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setEditingId(null);
                  clearForm();
                }}
              >
                Cancel
              </button>
            )}

          </div>

        </form>
      </section>

      {/* APPLICATION LIST */}

      <section className="content-section">

        <div className="applications-header">

          <div>
            <h2>Your Applications</h2>

            <p>
              {filteredApplications.length} applications found
            </p>
          </div>

          <div className="filters">

            <input
              type="text"
              placeholder="🔍 Search company or position..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            <select
              value={filterStatus}
              onChange={(e) =>
                setFilterStatus(e.target.value)
              }
            >
              <option>All</option>
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>

          </div>

        </div>

        {filteredApplications.length === 0 ? (
          <div className="empty-state">
            <div>📂</div>

            <h3>No applications yet</h3>

            <p>
              Add your first job application above
              to start tracking your career journey.
            </p>
          </div>
        ) : (
          <div className="application-list">

            {filteredApplications.map(
              (application) => (
                <div
                  className="application-card"
                  key={application.id}
                >

                  <div className="company-logo">
                    {application.company
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div className="application-main">

                    <div className="application-top">

                      <div>
                        <h3>
                          {application.position}
                        </h3>

                        <p className="company-name">
                          {application.company}
                        </p>
                      </div>

                      <span
                        className={`status ${application.status
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {application.status}
                      </span>

                    </div>

                    <div className="application-details">

                      <span>
                        📅 {application.date}
                      </span>

                      {application.notes && (
                        <span>
                          📝 {application.notes}
                        </span>
                      )}

                    </div>

                  </div>

                  <div className="card-actions">

                    <button
                      onClick={() =>
                        handleEdit(application)
                      }
                    >
                      ✏️ Edit
                    </button>

                    <button
                      className="delete"
                      onClick={() =>
                        handleDelete(application.id)
                      }
                    >
                      🗑️ Delete
                    </button>

                  </div>

                </div>
              )
            )}

          </div>
        )}

      </section>

      <footer>
        <p>
          © 2026 CareerTrack • Job Application Tracker
        </p>
      </footer>

    </div>
  );
}

export default App;
