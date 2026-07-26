import React from 'react';

/**
 * Explanation: Navigation Bar Component
 * Displays the name "Image Remover" in the top left corner of the page.
 */
export default function Navbar() {
  return (
    <header style={styles.header}>
      <h2 style={styles.title}>Image Remover</h2>
    </header>
  );
}

const styles = {
  header: {
    padding: '1.2rem 2rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
  },
  title: {
    fontSize: '1.3rem',
    fontWeight: '700',
    color: '#6366f1',
    margin: 0,
  },
};
