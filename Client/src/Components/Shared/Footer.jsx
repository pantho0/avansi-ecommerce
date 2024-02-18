import Logo from "../Logo/Logo";
import Container from "../Ui/Container/Container";

const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]">
        <Container>
        <footer className="footer p-10 text-base-content">
      <aside>
        <Logo/>
        <p className="text-white">
        Where vendors unite, products shine,<br /> 
        and shopping dreams come true. <br />
        Explore our curated marketplace today!” 🛒✨
        </p>
      </aside>
      <nav className="text-white">
        <h6 className="footer-title opacity-1 text-white">About Avansi</h6>
        <a className="link link-hover">Information</a>
        <a className="link link-hover">Store Locator</a>
        <a className="link link-hover">Bulk Purchase</a>
        <a className="link link-hover">Advertisement</a>
      </nav>
      <nav className="text-white">
        <h6 className="footer-title text-white">About Avansi</h6>
        <a className="link link-hover">FAQ</a>
        <a className="link link-hover">Privacy Policy</a>
        <a className="link link-hover">Return Policy</a>    
        <a className="link link-hover">Contact US</a>
      </nav>
      <nav className="text-white">
        <h6 className="footer-title text-white">Account</h6>
        <a className="link link-hover">Membership</a>
        <a className="link link-hover">Address</a>
        <a className="link link-hover">Coupon</a>
      </nav>
      <nav className="text-white">
        <h6 className="footer-title text-white">Contact Us</h6>
        <p>For Consumer:</p>
        <p>Complaint Service:</p>
        <p>(880-99997799)</p>
        <p>E-mail : complain@avansi.av</p>
      </nav>
    </footer>
    <div className="text-center text-sm text-white">
        <p className="uppercase">copyright &copy; {new Date().getFullYear()} AVANSI all rights reserved.</p>
        <div className="">
            <a className="link link-hover">Terms of Service</a>
            {' || '}
            <a className="link link-hover">Privacy Policy</a>
        </div>
        </div>
        </Container>
    </div>
  );
};

export default Footer;
