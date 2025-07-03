interface Props {
  onClose: () => void;
}

const UserModal = ({ onClose }: Props) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add User</h2>
        <p>Select how you want to add new users:</p>
        <button onClick={() => alert('Open Manual Form')}>📄 Add Manually</button>
        <button onClick={() => alert('Open Excel Upload')}>📂 Upload Excel</button>
        <div>
          <button onClick={onClose} style={{ marginTop: '20px' }}>❌ Close</button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;