import React from 'react';

/**
 * Explanation: Result Popup Modal Component
 * Displays "you're image has been generated" message and shows the image in a box below.
 */
export default function ResultModal({ isOpen, resultUrl, onReset }) {
  if (!isOpen || !resultUrl) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={styles.card}>
        {/* Popout Message */}
        <h3 style={styles.message}>you're image has been generated</h3>

        {/* Processed Image Box */}
        <div className="transparent-bg" style={styles.imageBox}>
          <img src={resultUrl} alt="Result" style={styles.img} />
        </div>

        {/* Buttons */}
        <div style={styles.btnGroup}>
          <a href={resultUrl} download="bg_removed.png" className="btn-primary" style={{ textDecoration: 'none' }}>
            Download Image
          </a>
          <button type="button" className="btn-secondary" onClick={onReset}>
            Upload Another
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    padding: '2rem',
    textAlign: 'center',
    maxWidth: '520px',
  },
  message: {
    color: '#6366f1',
    marginBottom: '1.2rem',
    fontSize: '1.25rem',
  },
  imageBox: {
    width: '100%',
    height: '260px',
    borderRadius: '14px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1.5rem',
  },
  img: {
    maxHeight: '100%',
    maxWidth: '100%',
    objectFit: 'contain',
  },
  btnGroup: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
  },
};
