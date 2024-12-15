import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>© 2024 Muhammad Fairus Fawas A. All rights reserved.</p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#2a9d8f',
    color: '#fff',
    padding: '10px 0',
    textAlign: 'center',
    position: 'relative',
    bottom: 0,
    width: '100%',
    marginTop: "auto", 
  },
  text: {
    margin: 0,
    fontSize: '14px',
  },
};

export default Footer;
