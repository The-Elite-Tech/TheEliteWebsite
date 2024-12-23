import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaTelegram  } from "react-icons/fa";

const LINKS = [
  {
    title: "Product",
    items: ["Overview", "Features", "Solutions", "Tutorials"],
  },
  {
    title: "Company",
    // items: ["About us", "Careers", "Press", "News"],
    items: ["About us", "Careers"],

  },
  {
    title: "Resource",
    items: ["Blog", "Newsletter", "Events", "Help center"],
  },
];

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="pt-6 w-full footer">
      <div className="mx-auto w-full max-w-7xl px-8">
        <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
          <h1 className="mb-6">The Elite International</h1>
          <div className="grid grid-cols-3 justify-between gap-4">
            {LINKS.map(({ title, items }) => (
              <div key={title}>
                <p className="mb-3 font-medium opacity-">{title}</p>
                <ul>
                  {items.map((link) => (
                    <li key={link}>
                      <Link
                        to="#"
                        className="py-1.5 font-normal transition-colors text-gray hover:text-blue-gray-900"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
          <p className="mb-4 text-center font-normal text-blue-gray-900 md:mb-0">
            &copy; {currentYear} The Elite International. All Rights Reserved.
          </p>
          <div className="flex gap-4 text-blue-gray-900 sm:justify-center">
            <a
              href="#"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              <FaFacebook title="Facebook" aria-label="Facebook"/>
            </a>
            <a
              href="https://www.instagram.com/theeliteinternational?igsh=MXNqcGR6ZTY0cWpwcg=="
              target="blank"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              <FaInstagram title="Instagram" aria-label="Instagram" />
            </a>
            <a
              href="https://t.me/+bvlbKzq7CHxmZDE1"
              target="blank"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              <FaTelegram title="Telegram" aria-label="Telegram"/>
            </a>
            {/* <a href="#" className="opacity-80 transition-opacity hover:opacity-100">
              <FaLinkedin />
            </a> */}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;