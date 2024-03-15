import "../../css/Footer-Basic.css";
import "../../css/Footer-Dark.css";
import "../../fonts/ionicons.min.css";

function Footer(props) {
  return (
    <footer class="footer-dark">
      <div class="intro">
        <h2 class="text-center">Contact us</h2>
        <br />
        <br />
        <br />
      </div>
      <div class="container">
        <div class="row">
          <div class="col-sm-6 col-md-3 item">
            <h3>Services</h3>
            <ul>
              <li>
                <a href="#">Web design</a>
              </li>
              <li>
                <a href="#">Development</a>
              </li>
              <li>
                <a href="#">Hosting</a>
              </li>
            </ul>
          </div>
          <div class="col-sm-6 col-md-3 item">
            <h3>About</h3>
            <ul>
              <li>
                <a href="#">Company</a>
              </li>
              <li>
                <a href="#">Team</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
            </ul>
          </div>
          <div class="col-md-3 item">
            <h3>Contact Information</h3>
            <ul>
              <li>Email: info@onlinequizmanagement.com</li>
              <li>Phone: +1234567890</li>
              <li>Address: 123 Main Street, City, Country</li>
            </ul>
          </div>
          <div class="col-md-3 item text">
            <h3>Online Quiz Management</h3>
            <p>
              Welcome to Online Quiz Management, where learning meets
              innovation.
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col item social">
            <a href="#">
              <i class="icon ion-social-facebook"></i>
            </a>
            <a href="#">
              <i class="icon ion-social-github"></i>
            </a>
            <a href="#">
              <i class="icon ion-social-instagram"></i>
            </a>
            <a href="#">
              <i class="icon ion-social-twitter"></i>
            </a>
          </div>
        </div>
        <p class="copyright">Online Quiz Management © 2024</p>
      </div>
    </footer>
  );
}

export default Footer;
