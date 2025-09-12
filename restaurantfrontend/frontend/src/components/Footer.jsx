import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Left - Brand */}
        <div className="flex flex-col items-center md:items-start">
          <span className="text-lg font-semibold text-white">ServeTable</span>
          <span className="text-sm text-gray-400">
            © {new Date().getFullYear()} All Rights Reserved
          </span>
        </div>

        {/* Center - Links */}
        <div className="flex space-x-6">
          <a href="/" className="hover:text-white transition">Home</a>
          <a href="/about" className="hover:text-white transition">About</a>
          <a href="/contact" className="hover:text-white transition">Contact</a>
        </div>

        {/* Right - Social Media */}
        <div className="flex space-x-4">
          <a href="#" className="hover:text-blue-500 transition">
            <Facebook size={20} />
          </a>
          <a href="#" className="hover:text-sky-400 transition">
            <Twitter size={20} />
          </a>
          <a href="#" className="hover:text-pink-500 transition">
            <Instagram size={20} />
          </a>
          <a href="mailto:info@servetable.com" className="hover:text-yellow-400 transition">
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
