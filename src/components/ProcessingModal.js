import React from 'react';

/**
 * Explanation: Processing Popup Modal
 * Pops up while processing an image and displays the privacy caution message.
 */
export default function ProcessingModal({ isOpen, progress }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={styles.card}>
        <h3 style={styles.title}>Processing Image... ({progress}%)</h3>

        {/* Privacy Caution Message */}
        <div style={styles.cautionBox}>
          <strong>Caution: don't exploit privacy.</strong> Please ensure you have permission for uploaded images.
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    padding: '2rem',
    textAlign: 'center',
    maxWidth: '440px',
  },
  title: {
    color: '#ffffff',
    marginBottom: '1rem',
  },
  cautionBox: {
    background: 'rgba(99, 102, 241, 0.12)',
    border: '1px solid rgba(99, 102, 241, 0.3)',
    borderRadius: '12px',
    padding: '1rem',
    color: '#a5b4fc',
    fontSize: '0.9rem',
    textAlign: 'left',
  },
};
