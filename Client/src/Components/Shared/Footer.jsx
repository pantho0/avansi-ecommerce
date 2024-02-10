import Logo from "../Logo/Logo";
import Container from "../Ui/Container/Container";

const Footer = () => {
  return (
    <div>
        <Container>
        <footer className="footer p-10 text-base-content">
      <aside>
        <Logo/>
        <p>
        Where vendors unite, products shine,<br /> 
        and shopping dreams come true. <br />
        Explore our curated marketplace today!” 🛒✨
        </p>
      </aside>
      <nav>
        <h6 className="footer-title text-primary">About Avansi</h6>
        <a className="link link-hover">Information</a>
        <a className="link link-hover">Store Locator</a>
        <a className="link link-hover">Bulk Purchase</a>
        <a className="link link-hover">Advertisement</a>
      </nav>
      <nav>
        <h6 className="footer-title text-primary">About Avansi</h6>
        <a className="link link-hover">FAQ</a>
        <a className="link link-hover">Privacy Policy</a>
        <a className="link link-hover">Return Policy</a>    
        <a className="link link-hover">Contact US</a>
      </nav>
      <nav>
        <h6 className="footer-title text-primary">Account</h6>
        <a className="link link-hover">Membership</a>
        <a className="link link-hover">Address</a>
        <a className="link link-hover">Coupon</a>
      </nav>
      <nav>
        <h6 className="footer-title text-primary">Contact Us</h6>
        <p>For Consumer:</p>
        <p>Complaint Service:</p>
        <p>(880-99997799)</p>
        <p>E-mail : complain@avansi.av</p>
      </nav>
    </footer>
        </Container>
    </div>
  );
};

export default Footer;
