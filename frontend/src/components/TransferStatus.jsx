function TransferStatus({ transfer }) {
  if (!transfer) return null

  return (
    <div className="transfer-status">
      <h3>Transfer Status</h3>
      <p><strong>Patient:</strong> {transfer.patientName}</p>
      <p><strong>Hospital:</strong> {transfer.hospital}</p>
      <p><strong>Condition:</strong> {transfer.condition}</p>
      <p><strong>Status:</strong> {transfer.status}</p>
    </div>
  )
}

export default TransferStatus
