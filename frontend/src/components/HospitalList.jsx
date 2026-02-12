function HospitalList({ hospitals, onSelect }) {
  if (!hospitals || hospitals.length === 0) {
    return <p>No hospitals available</p>;
  }

  return (
    <div className="hospital-list">
      <h3>Available Hospitals</h3>

      {hospitals.map(hospital => (
        <div key={hospital.id} className="hospital-card">
          <h4>{hospital.name}</h4>

          <p>
            <strong>Services:</strong>{" "}
            {hospital.services ? hospital.services.join(", ") : "Not specified"}
          </p>

          <p>
            <strong>Available Beds:</strong>{" "}
            {hospital.beds ?? "Unknown"}
          </p>

          <button onClick={() => onSelect(hospital)}>
            Request Transfer
          </button>
        </div>
      ))}
    </div>
  );
}

export default HospitalList;

