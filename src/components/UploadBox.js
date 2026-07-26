import React, { useRef } from 'react';

/**
 * Explanation: Upload Box Component
 * Displays the box for selecting or dropping an image to process.
 */
export default function UploadBox({ onSelect }) {
  const inputRef = useRef(null);

  return (
    <div
      className="glass-card"
      style={styles.box}
      onClick={() => inputRef.current.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        if (e.dataTransfer.files[0]) onSelect(e.dataTransfer.files[0]);
      }}
    >
      <input
        type="file"
        ref={inputRef}
        accept="image/*"
        onChange={(e) => e.target.files[0] && onSelect(e.target.files[0])}
        style={{ display: 'none' }}
      />
      <h3 style={styles.title}>Click or Drop Image Here</h3>
      <p style={styles.subtitle}>Supports PNG, JPG, and WEBP formats</p>
      <button type="button" className="btn-primary" style={{ marginTop: '0.8rem' }}>
        Select Image
      </button>
    </div>
  );
}

const styles = {
  box: {
    padding: '3rem 2rem',
    textAlign: 'center',
    cursor: 'pointer',
    maxWidth: '520px',
    margin: '2rem auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.6rem',
  },
  title: {
    fontSize: '1.3rem',
    color: '#ffffff',
    margin: 0,
  },
  subtitle: {
    fontSize: '0.9rem',
    color: '#94a3b8',
  },
};
