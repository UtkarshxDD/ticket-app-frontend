import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 shadow-md">
        <h1 className="text-2xl font-bold text-blue-600">Trackify</h1>
        <nav className="space-x-6">
          <Link to="/login" className="text-gray-700 hover:text-blue-600">
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="text-center py-24 px-6 bg-gradient-to-br from-blue-50 to-blue-100">
        <h2 className="text-4xl font-bold mb-4 text-gray-900">
          Organize. Track. Succeed.
        </h2>
        <p className="text-lg text-gray-700 max-w-xl mx-auto mb-8">
          Trackify helps teams streamline ticket management, boost productivity,
          and never miss a task again.
        </p>
        <Link
          to="/signup"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Start Tracking Now
        </Link>
      </section>

      {/* Features */}
      <section className="py-16 px-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "Real-Time Updates",
            desc: "Stay updated with live ticket statuses and assignments.",
          },
          {
            title: "Smart Filters",
            desc: "Easily group, sort, and manage your tickets with intelligent filters.",
          },
          {
            title: "User-Friendly Dashboard",
            desc: "Clean and modern UI built for speed and clarity.",
          },
        ].map((feature, idx) => (
          <div
            key={idx}
            className="p-6 bg-white rounded-lg shadow hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to supercharge your workflow?
        </h2>
        <p className="text-lg mb-6">
          Sign up today and experience the power of streamlined ticket tracking.
        </p>
        <Link
          to="/signup"
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
        >
          Get Started
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Trackify. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;

