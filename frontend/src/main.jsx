import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

function App() {
  const emptyForm = {
    fullName: '',
    healthCardMasked: '',
    dateOfBirth: '',
    status: 'Active',
    bloodPressure: '',
    heartRate: ''
  };

  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  // GET - Load all patients
  const loadPatients = async () => {
    try {
      const response = await fetch('/api/patients');

      if (!response.ok) {
        throw new Error('Unable to load patients');
      }

      const data = await response.json();

      setPatients(data);

      if (data.length > 0) {
        setSelectedPatient(data[0]);
      } else {
        setSelectedPatient(null);
      }

      setError('');
    } catch (err) {
      setError('Unable to load patient information.');
    }
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value
    });
  };

  // Open form for adding a patient
  const openAddForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
    setError('');
  };

  // Open form for editing selected patient
  const openEditForm = () => {
    if (!selectedPatient) {
      return;
    }

    setEditingId(selectedPatient.id);

    setForm({
      fullName: selectedPatient.fullName || '',
      healthCardMasked: selectedPatient.healthCardMasked || '',
      dateOfBirth: selectedPatient.dateOfBirth || '',
      status: selectedPatient.status || 'Active',
      bloodPressure: selectedPatient.bloodPressure || '',
      heartRate: selectedPatient.heartRate || ''
    });

    setShowForm(true);
    setError('');

    window.scrollTo({
      top: 300,
      behavior: 'smooth'
    });
  };

  // Close Add/Edit form
  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
    setError('');
  };

  // POST or PUT
  const savePatient = async (event) => {
    event.preventDefault();

    const isEditing = editingId !== null;

    const url = isEditing
      ? `/api/patients/${editingId}`
      : '/api/patients';

    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName: form.fullName,
          healthCardMasked: form.healthCardMasked,
          dateOfBirth: form.dateOfBirth,
          status: form.status,
          bloodPressure: form.bloodPressure,
          heartRate: Number(form.heartRate)
        })
      });

      if (!response.ok) {
        throw new Error('Unable to save patient');
      }

      const savedPatient = await response.json();

      if (isEditing) {
        setPatients((currentPatients) =>
          currentPatients.map((patient) =>
            patient.id === savedPatient.id
              ? savedPatient
              : patient
          )
        );
      } else {
        setPatients((currentPatients) => [
          ...currentPatients,
          savedPatient
        ]);
      }

      setSelectedPatient(savedPatient);
      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);
      setError('');
    } catch (err) {
      setError(
        isEditing
          ? 'Unable to update patient.'
          : 'Unable to add patient.'
      );
    }
  };

  // DELETE selected patient
  const deletePatient = async () => {
    if (!selectedPatient) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete ${selectedPatient.fullName}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `/api/patients/${selectedPatient.id}`,
        {
          method: 'DELETE'
        }
      );

      if (!response.ok) {
        throw new Error('Unable to delete patient');
      }

      const remainingPatients = patients.filter(
        (patient) => patient.id !== selectedPatient.id
      );

      setPatients(remainingPatients);

      if (remainingPatients.length > 0) {
        setSelectedPatient(remainingPatients[0]);
      } else {
        setSelectedPatient(null);
      }

      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);
      setError('');
    } catch (err) {
      setError('Unable to delete patient.');
    }
  };

  return (
    <>
      <header className="topbar">
        <div className="brand">
          <div className="maple">🍁</div>

          <div>
            <strong>AsmaCare</strong>
            <span>
              Canadian Patient Health Portal · Demo
            </span>
          </div>
        </div>

        <div className="demo-badge">
          SYNTHETIC DATA
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="hero">
          <div>
            <div className="canada-label">
              🍁 BUILT IN CANADA · DEMO HEALTH PLATFORM
            </div>

            <h1>
              Your health information.
              <br />
              Beautifully organized.
            </h1>

            <p>
              AsmaCare is a fictional patient health portal
              designed as a production-style cloud and DevOps
              workload.
            </p>

            <button
              className="primary-button"
              onClick={openAddForm}
            >
              + Add New Patient
            </button>
          </div>

          <div className="hero-symbol">
            🍁
          </div>
        </section>

        {/* ERROR */}
        {error && (
          <div className="alert">
            {error}
          </div>
        )}

        {/* ADD / EDIT FORM */}
        {showForm && (
          <section className="card form-card">
            <div className="section-heading">
              <div>
                <small>
                  {editingId !== null
                    ? 'EDIT PATIENT'
                    : 'NEW PATIENT'}
                </small>

                <h2>
                  {editingId !== null
                    ? 'Update Patient Record'
                    : 'Add Patient Record'}
                </h2>
              </div>

              <span className="secure-label">
                Demo Record
              </span>
            </div>

            <form
              onSubmit={savePatient}
              className="patient-form"
            >
              <label>
                Full Name

                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Example: Aisha Khan"
                  required
                />
              </label>

              <label>
                Demo Health Card

                <input
                  name="healthCardMasked"
                  value={form.healthCardMasked}
                  onChange={handleChange}
                  placeholder="****-***-456"
                  required
                />
              </label>

              <label>
                Date of Birth

                <input
                  type="date"
                  name="dateOfBirth"
                  value={form.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Status

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="Active">
                    Active
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>
                </select>
              </label>

              <label>
                Blood Pressure

                <input
                  name="bloodPressure"
                  value={form.bloodPressure}
                  onChange={handleChange}
                  placeholder="120/80"
                  required
                />
              </label>

              <label>
                Heart Rate

                <input
                  type="number"
                  name="heartRate"
                  value={form.heartRate}
                  onChange={handleChange}
                  placeholder="72"
                  required
                />
              </label>

              <div className="form-actions">
                <button
                  type="submit"
                  className="save-button"
                >
                  {editingId !== null
                    ? 'Update Patient'
                    : 'Save Patient'}
                </button>

                <button
                  type="button"
                  className="secondary-button"
                  onClick={closeForm}
                >
                  Cancel
                </button>
              </div>
            </form>
          </section>
        )}

        {/* PATIENT DIRECTORY */}
        <section className="patients-section">
          <div className="section-heading">
            <div>
              <small>
                PATIENT DIRECTORY
              </small>

              <h2>
                Patient Records
              </h2>
            </div>

            <span className="patient-count">
              {patients.length}{' '}
              patient
              {patients.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="patient-list">
            {patients.map((patient) => (
              <button
                key={patient.id}
                className={
                  selectedPatient?.id === patient.id
                    ? 'patient-chip active'
                    : 'patient-chip'
                }
                onClick={() =>
                  setSelectedPatient(patient)
                }
              >
                <span className="avatar">
                  {patient.fullName
                    ? patient.fullName.charAt(0)
                    : '?'}
                </span>

                <span>
                  <strong>
                    {patient.fullName}
                  </strong>

                  <small>
                    {patient.status}
                  </small>
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* SELECTED PATIENT */}
        {selectedPatient && (
          <>
            {/* EDIT / DELETE BUTTONS */}
            <div className="patient-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={openEditForm}
              >
                ✏️ Edit Patient
              </button>

              <button
                type="button"
                className="delete-button"
                onClick={deletePatient}
              >
                🗑 Delete Patient
              </button>
            </div>

            {/* HEALTH DASHBOARD */}
            <section className="dashboard-grid">
              <article className="card health-card">
                <div className="health-card-top">
                  <div>
                    <small>
                      CANADA · DEMO HEALTH CARD
                    </small>

                    <h2>
                      {selectedPatient.fullName}
                    </h2>
                  </div>

                  <span className="mini-maple">
                    🍁
                  </span>
                </div>

                <div className="card-number">
                  {selectedPatient.healthCardMasked}
                </div>

                <div className="health-card-bottom">
                  <span>
                    DOB

                    <strong>
                      {selectedPatient.dateOfBirth}
                    </strong>
                  </span>

                  <span>
                    STATUS

                    <strong>
                      {selectedPatient.status}
                    </strong>
                  </span>
                </div>
              </article>

              {/* HEALTH SNAPSHOT */}
              <article className="card">
                <small>
                  TODAY'S SUMMARY
                </small>

                <h2>
                  Health Snapshot
                </h2>

                <div className="metric">
                  <span>
                    Blood pressure
                  </span>

                  <strong>
                    {selectedPatient.bloodPressure}
                  </strong>
                </div>

                <div className="metric">
                  <span>
                    Heart rate
                  </span>

                  <strong>
                    {selectedPatient.heartRate} bpm
                  </strong>
                </div>

                <div className="status-row">
                  <span className="status-dot"></span>

                  Patient record{' '}
                  {selectedPatient.status
                    ? selectedPatient.status.toLowerCase()
                    : ''}
                </div>
              </article>
            </section>

            {/* INFORMATION CARDS */}
            <section className="three">
              <article className="card info-card">
                <div className="icon">
                  📅
                </div>

                <small>
                  NEXT APPOINTMENT
                </small>

                <h3>
                  Family Doctor
                </h3>

                <p>
                  Oct 25 · 10:30 AM
                </p>
              </article>

              <article className="card info-card">
                <div className="icon">
                  🧪
                </div>

                <small>
                  RECENT LAB
                </small>

                <h3>
                  CBC
                </h3>

                <p className="normal">
                  ● Normal
                </p>
              </article>

              <article className="card info-card">
                <div className="icon">
                  💊
                </div>

                <small>
                  MEDICATIONS
                </small>

                <h3>
                  2 active
                </h3>

                <p>
                  View medication history
                </p>
              </article>
            </section>
          </>
        )}

        {/* EMPTY DATABASE MESSAGE */}
        {patients.length === 0 && !error && (
          <section className="card">
            <h2>No patient records</h2>

            <p>
              Add a synthetic patient record to begin.
            </p>
          </section>
        )}

        {/* FOOTER */}
        <footer>
          <span>
            🍁 AsmaCare
          </span>

          <p>
            Fictional healthcare application using synthetic
            demonstration data. Not affiliated with the
            Government of Canada or Ontario.
          </p>
        </footer>
      </main>
    </>
  );
}

createRoot(
  document.getElementById('root')
).render(<App />);