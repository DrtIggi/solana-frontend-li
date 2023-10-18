import React from "react";

function Footer() {
    return (
      <footer>
        <div className="footer">
          <p>&copy; 2023 Your App Name</p>
          <div className="social-links">
            <a href="https://discord.com/your-discord-link" target="_blank" rel="noopener noreferrer">
              <i className="discord-icon"></i> Discord
            </a>
            <a href="https://twitter.com/your-twitter-link" target="_blank" rel="noopener noreferrer">
              <i className="twitter-icon"></i> Twitter
            </a>
          </div>
        </div>
      </footer>
    );
  }


export default Footer;