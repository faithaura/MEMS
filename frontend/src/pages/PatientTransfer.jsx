import { useState } from "react";
import HospitalList from "../components/HospitalList";
import TransferRequest from "../components/TransferRequest";
import TransferStatus from "../components/TransferStatus";

function PatientTransfer() {
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [transfer, setTransfer] = useState(null);

  const hospitals = [
    {
      id: 1,
      name: "Kenyatta National Hospital",
      services: ["ICU", "Surgery", "Trauma"],
      beds: 4,
    },
    {
      id: 2,
      name: "Aga Khan Hospital",
      services: ["Cardiology", "ICU"],
      beds: 2,
    },
  ];

  return (
    <div>
      <h2>Patient Transfer & Referral Interface</h2>

      <HospitalList
        hospitals={hospitals}
        onSelect={setSelectedHospital}
      />

      <TransferRequest
        hospital={selectedHospital}
        onApprove={setTransfer}
      />

      <TransferStatus transfer={transfer} />
    </div>
  );
}

export default PatientTransfer;
