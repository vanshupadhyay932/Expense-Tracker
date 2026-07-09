const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">

      <div className="footer-content">

        <p>
          © {currentYear} Expense Tracker. All rights reserved.
        </p>

        <div className="footer-links">

          <span>Made with ❤️ using React & Node.js</span>

        </div>

      </div>

    </footer>
  );
};

export default Footer;