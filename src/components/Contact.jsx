"use client";
import React, { useState, useCallback } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState({ submitting: false, submitted: false, error: null });

  const handleFormChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleFormSubmit = useCallback(async (e) => {
    e.preventDefault();
    setFormStatus({ submitting: true, submitted: false, error: null });
    try {
      await fetch("https://script.google.com/macros/s/AKfycbz3OPky4HfShXveekQkjmnTXDW8zIwupVhC5Nk7fKVmSjiiyP0v4_HqewNz9pMfbYTPRw/exec", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, timestamp: new Date().toISOString() }),
      });
      setFormStatus({ submitting: false, submitted: true, error: null });
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setFormStatus({ submitting: false, submitted: false, error: null }), 5000);
    } catch (error) {
      setFormStatus({ submitting: false, submitted: false, error: "Failed to send message. Please try again." });
    }
  }, [formData]);

  return (
    <div id="contact" className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 w-full max-w-4xl rounded-3xl p-8 md:p-12 shadow-2xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 shiny-silver">Get In Touch</h2>
          <p className="text-gray-300 text-lg">I'm currently open to new opportunities and collaborations. Whether you have a question, a project idea, or just want to say hello, feel free to drop me a message!</p>
        </div>
        <div className="w-full">
          {formStatus.submitted ? (
            <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-green-400 mb-2">Message Sent!</h3>
              <p className="text-gray-300">Thank you for reaching out. I'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Your Name*</label>
                  <input type="text" name="name" value={formData.name} onChange={handleFormChange} required className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-300" placeholder="Enter Your Name" />
                </div>
                <div className="group">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Your Email*</label>
                  <input type="email" name="email" value={formData.email} onChange={handleFormChange} required className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-300" placeholder="Enter Your Email Address" />
                </div>
              </div>
              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-2">Your Message</label>
                <textarea name="message" value={formData.message} onChange={handleFormChange} required rows={6} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-300 resize-none custom-scrollbar" placeholder="Your Message" />
              </div>
              {formStatus.error && <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-center"><p className="text-red-400">{formStatus.error}</p></div>}
              <button type="submit" disabled={formStatus.submitting} className="w-full py-4 px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/50 transform hover:scale-[1.02] active:scale-[0.98]">
                {formStatus.submitting ? <span className="flex items-center justify-center gap-2"><svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>Sending...</span> : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
