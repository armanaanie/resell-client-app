"use client";

import { useState } from "react";
import { toast } from "react-toastify";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      // For now just simulate request
      console.log("Contact message:", data);

      toast.success("Message sent successfully!");
      e.target.reset();
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#760031] via-[#4a001f] to-[#1a000b] text-white px-6 py-16">
      
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1
          className="text-5xl font-bold"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          Contact Us
        </h1>

        <p className="mt-4 text-white/70">
          Have questions, feedback, or issues? We’re here to help you anytime.
        </p>
      </div>

      {/* Form Card */}
      <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
        
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Name */}
          <div>
            <label className="text-sm text-white/70">Name</label>
            <input
              name="name"
              type="text"
              required
              className="w-full mt-2 p-3 rounded-2xl bg-white/10 border border-white/20 text-white outline-none focus:border-[#D51C39]"
              placeholder="Your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-white/70">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full mt-2 p-3 rounded-2xl bg-white/10 border border-white/20 text-white outline-none focus:border-[#D51C39]"
              placeholder="you@example.com"
            />
          </div>

          {/* Message */}
          <div>
            <label className="text-sm text-white/70">Message</label>
            <textarea
              name="message"
              rows={5}
              required
              className="w-full mt-2 p-3 rounded-2xl bg-white/10 border border-white/20 text-white outline-none focus:border-[#D51C39]"
              placeholder="Write your message..."
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#D51C39] to-[#FF6060] py-3 rounded-2xl font-semibold hover:scale-[1.02] transition"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      {/* Extra Info */}
      <div className="max-w-3xl mx-auto text-center mt-10 text-white/60 text-sm">
        <p>Email: support@resellhub.com</p>
        <p>We usually reply within 24 hours.</p>
      </div>

    </div>
  );
}