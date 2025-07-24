import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-[#111418] text-white">
      <div className="section-padding py-10">
        <div className="container-content">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="size-6 text-white">
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 12C8 9.79086 9.79086 8 12 8H36C38.2091 8 40 9.79086 40 12V36C40 38.2091 38.2091 40 36 40H12C9.79086 40 8 38.2091 8 36V12Z" fill="currentColor"/>
                    <path d="M16 20C16 18.8954 16.8954 18 18 18H30C31.1046 18 32 18.8954 32 20V28C32 29.1046 31.1046 30 30 30H18C16.8954 30 16 29.1046 16 28V20Z" fill="#111418"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold">EuroPlast Ltd.</h3>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                Europe's trusted partner for innovative plastic packaging solutions since 2003.
              </p>
            </div>

            {/* Products */}
            <div>
              <h4 className="font-bold mb-4">Products</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <Link href="/products?category=thermoformed-trays" className="hover:text-white transition-colors">
                    Thermoformed Trays
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=plastic-sheets" className="hover:text-white transition-colors">
                    Plastic Sheets
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=blister-packaging" className="hover:text-white transition-colors">
                    Blister Packaging
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=custom-solutions" className="hover:text-white transition-colors">
                    Custom Solutions
                  </Link>
                </li>
              </ul>
            </div>

            {/* Industries */}
            <div>
              <h4 className="font-bold mb-4">Industries</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <Link href="/industries/pharmaceutical" className="hover:text-white transition-colors">
                    Pharmaceutical
                  </Link>
                </li>
                <li>
                  <Link href="/industries/food-beverage" className="hover:text-white transition-colors">
                    Food & Beverage
                  </Link>
                </li>
                <li>
                  <Link href="/industries/retail-electronics" className="hover:text-white transition-colors">
                    Retail & Electronics
                  </Link>
                </li>
                <li>
                  <Link href="/industries/automotive-industrial" className="hover:text-white transition-colors">
                    Automotive
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="hover:text-white transition-colors">
                    Certifications
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © 2024 EuroPlast Ltd. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-sm text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
