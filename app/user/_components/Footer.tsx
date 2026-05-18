"use client";
const Footer = () => {
  return (
    <footer className="bg-[#0f0f12] text-gray-400">


      <div className="max-w-350 2xl:max-w-400 mx-auto 
                      px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 
                      py-10 sm:py-12 md:py-16">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
                        gap-8 sm:gap-10 md:gap-12">


          <div className="max-w-sm">
            <h2 className="text-white text-lg sm:text-xl font-semibold mb-4">
              cyber
            </h2>

            <p className="text-sm leading-relaxed">
              We are a residential interior design firm located in Portland.
              Our boutique-studio offers more than
            </p>

          </div>


          <div>
            <h3 className="text-white text-sm font-semibold mb-4">
              Services
            </h3>

            <ul className="space-y-2 text-sm">
              {[
                "Bonus program",
                "Gift cards",
                "Credit and payment",
                "Service contracts",
                "Non-cash account",
                "Payment",
              ].map((item) => (
                <li key={item} className="hover:text-white cursor-pointer transition">
                  {item}
                </li>
              ))}
            </ul>
          </div>


          <div>
            <h3 className="text-white text-sm font-semibold mb-4">
              Assistance to the buyer
            </h3>

            <ul className="space-y-2 text-sm">
              {[
                "Find an order",
                "Terms of delivery",
                "Exchange and return of goods",
                "Guarantee",
                "Frequently asked questions",
                "Terms of use of the site",
              ].map((item) => (
                <li key={item} className="hover:text-white cursor-pointer transition">
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>


        <div className="mt-10 pt-6 border-t border-gray-800 
                        text-center text-xs text-gray-500">
          © 2026 Cyber. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;