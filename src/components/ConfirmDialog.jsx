import React, { useState } from 'react';

const ConfirmDialog = ({ onConfirm, title = "Are you sure?", description = "This action cannot be undone.", triggerText = "Open Dialog" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>{triggerText}</button>

      {isOpen && (
        <div style={styles.backdrop}>
          <div style={styles.dialog}>
            <h2>{title}</h2>
            <p>{description}</p>
            <div style={styles.actions}>
              <button onClick={() => setIsOpen(false)}>Cancel</button>
              <button onClick={handleConfirm} style={{ backgroundColor: 'red', color: 'white' }}>
                Yes, I'm sure
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  backdrop: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999
  },
  dialog: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    maxWidth: '400px',
    width: '90%',
    boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
  },
  actions: {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
  },
};

export default ConfirmDialog;
