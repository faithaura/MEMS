import { useState } from "react";

function TransferRequest({ hospital, onApprove }) {
  const [patientName, setPatientName] = useState("");
  const [condition, setCondition] = useState("Critical");

  // If no hospital selected, show a message
  if (!hospital) return <p>Select a hospital to request a transfer.</p>;

  const submitRequest = () => {
    // Simulate approval and pass data back to parent
    onApprove({
      patientName,
      hospital: hospital.name,
      condition,
      status: "Approved"
    });
    // Reset input fields
    setPatientName("");
    setCondition("Critical");
  };

  return (
    <div className="transfer-form">
      <h3>Transfer Request</h3>
      <p><strong>Hospital:</strong> {hospital.name}</p>

      <input
        type="text"
        placeholder="Patient Name"
        value={patientName}
        onChange={e => setPatientName(e.target.value)}
      /><br /><br />

      <select value={condition} onChange={e => setCondition(e.target.value)}>
        <option>Stable</option>
        <option>Serious</option>
        <option>Critical</option>
      </select><br /><br />

      <button onClick={submitRequest}>Send Transfer Request</button>
    </div>
  );
}

export default TransferRequest;


