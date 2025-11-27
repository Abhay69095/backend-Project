export default function ConfirmModal({ open, title="Confirm", message="Are you sure?", onCancel, onConfirm }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>⚠️ {title}</h3>
        <p className="small-muted">{message}</p>
        <div style={{ display:'flex', justifyContent:'flex-end', gap:8, marginTop:16 }}>
          <button className="btn" onClick={onCancel} style={{ 
            background:"linear-gradient(135deg, #475569, #64748b)", 
            color:"#fff",
            boxShadow: "0 4px 12px rgba(71, 85, 105, 0.3)"
          }}>Cancel</button>
          <button className="btn" onClick={onConfirm} style={{ 
            background:"linear-gradient(135deg, #ff006e, #ff3860)", 
            color:"#fff",
            boxShadow: "0 4px 12px rgba(255, 0, 110, 0.3)"
          }}>Delete</button>
        </div>
      </div>
    </div>
  );
}

