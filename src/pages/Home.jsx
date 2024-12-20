import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const user = useSelector((state) => state.auth.user); 

  return (
    <div style={styles.container}>
      <main style={styles.main}>
        <div style={styles.textContainer}>
          <h2 style={styles.welcome}>Selamat Datang di MufazaStore</h2>
          <h1 style={styles.heading}>Halo, {user ? user.username : "Guest"}!</h1>
          <p style={styles.description}>
          MufazaStore adalah aplikasi belanja online yang memudahkan Anda menemukan berbagai produk berkualitas dengan harga terjangkau, langsung dari kenyamanan rumah Anda. Kami menyediakan berbagai pilihan produk, mulai dari fashion, elektronik, hingga peralatan rumah tangga, semua dengan satu tujuan: memberikan pengalaman berbelanja yang cepat, mudah, dan menyenangkan.
          </p>
          <div style={styles.buttonsContainer}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <button style={styles.shopNowButton}>MULAI BELANJA</button>
            </Link>
            <Link to="https://wa.me/6285745775617" style={{ textDecoration: "none" }}>
            <button style={styles.contactUsButton}>Hubungi Kami</button>
            </Link>
          </div>
        </div>
        <div style={styles.imageContainer}>
          <img
            src="https://oxyconit.com/images/hero.svg"
            alt="Ilustrasi"
            style={styles.image}
          />
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
  },
  main: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "40px",
    flexWrap: "wrap", 
  },
  textContainer: {
    maxWidth: "90%",
    padding: "20px",
    flex: "1 1 300px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center", 
    textAlign: "center", 
  },
  welcome: {
    fontSize: "24px",
    margin: 0,
  },
  heading: {
    fontSize: "48px",
    fontWeight: "bold",
    margin: "10px 0",
    lineHeight: "1.2",
  },
  description: {
    fontSize: "16px",
    lineHeight: "1.5",
  },
  buttonsContainer: {
    marginTop: "20px",
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    justifyContent: "center", 
  },
  shopNowButton: {
    padding: "10px 20px",
    backgroundColor: "#000",
    color: "#fff",
    border: "2px solid #000",
    borderRadius: "4px",
    cursor: "pointer",
  },
  contactUsButton: {
    padding: "10px 20px",
    backgroundColor: "#fff",
    color: "#000",
    border: "2px solid #000",
    borderRadius: "4px",
    cursor: "pointer",
  },
  imageContainer: {
    flex: "1 1 300px",
    textAlign: "center",
  },
  image: {
    maxWidth: "100%", 
    height: "auto",
  },

  "@media (max-width: 768px)": {
    main: {
      flexDirection: "column", 
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    },
    textContainer: {
      maxWidth: "100%", 
      textAlign: "center", 
      padding: "0 20px", 
    },
    welcome: {
      fontSize: "20px", 
    },
    heading: {
      fontSize: "36px", 
    },
    description: {
      fontSize: "14px", 
    },
    imageContainer: {
      display: "none", 
    },
  },
};

export default Home;
