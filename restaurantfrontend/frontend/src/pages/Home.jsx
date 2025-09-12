import React from "react";
import {
  UtensilsCrossed,
  CalendarCheck,
  Users,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: UtensilsCrossed,
    title: "Wide Restaurant Choices",
    description: "Browse and book tables at the best restaurants in your area.",
  },
  {
    icon: CalendarCheck,
    title: "Instant Reservations",
    description: "Reserve your dining experience in just a few clicks.",
  },
  {
    icon: Users,
    title: "For Every Occasion",
    description: "From casual outings to special events, we’ve got you covered.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable & Secure",
    description: "Your bookings and data are always safe with us.",
  },
];

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-70px)]">
      {/* Hero Section */}
      <div className="bg-gray-200 min-h-[calc(50vh-70px)] flex justify-center items-start">
        <div
          className="relative mt-6 sm:mt-10 rounded-lg shadow-md max-w-7xl w-full text-center bg-cover bg-center overflow-hidden"
          style={{
            backgroundImage: "url('/images/table2.jpg')",
          }}
        >
          {/* Black overlay */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Text content */}
          <div className="relative px-4 sm:px-8 md:px-14 py-12 sm:py-16 text-white">
            <h1 className="text-2xl sm:text-4xl md:text-5xl mb-4 sm:mb-6 font-bold leading-snug">
              Reserve Your Perfect <br className="hidden sm:block" /> Dining
              Experience
            </h1>
            <p className="text-sm sm:text-lg md:text-xl max-w-2xl mx-auto">
              Discover and book tables at the finest restaurants in your city
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center mb-10 sm:mb-14 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">
              Why Choose TableReserve?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Making restaurant reservations simple and enjoyable
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="text-center bg-white rounded-xl p-6 sm:p-8 shadow-md hover:shadow-lg transition duration-300"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-gray-700 to-gray-500 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
