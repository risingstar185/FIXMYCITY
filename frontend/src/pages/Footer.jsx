import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t py-10 px-6 text-gray-700">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo and description */}
        <div>
          <h3 className="text-xl font-bold text-blue-600 mb-2">FixMyCity</h3>
          <p className="text-sm">
          Empowering communities to create positive change through transparent civic engagement.
          </p>
        </div>
        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="/browse-notes" className="hover:text-blue-600">Report an Issues</a></li>
            <li><a href="/categories" className="hover:text-blue-600">Categories</a></li>
            <li><a href="/pricing" className="hover:text-blue-600">Joim Community</a></li>
          </ul>
        </div>
        {/* Support */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Support</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="/help" className="hover:text-blue-600">Help Center</a></li>
            <li><a href="/contact" className="hover:text-blue-600">Contact Us</a></li>
            <li><a href="/faq" className="hover:text-blue-600">FAQ</a></li>
          </ul>
        </div>
        {/* Legal */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Legal</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="/privacy" className="hover:text-blue-600">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-blue-600">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      {/* Bottom copyright */}
      <div className="mt-10 text-center text-sm text-gray-500 border-t pt-4 opacity-75">
        © {new Date().getFullYear()} NoteHub. All rights reserved. Loved by the community and built with Ayush Patel
      </div>
    </footer>
  );
};

export default Footer;
