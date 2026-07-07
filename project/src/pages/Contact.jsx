import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendNow = (e) => {
    e.preventDefault();
    // 🔗 "Send Now" redirection directly tracking to Instagram path
    const instagramUrl = "https://instagram.com/cherryside";
    window.open(instagramUrl, "_blank", "noreferrer");
  };

  return (
    <div className="min-h-screen bg-[#FDF7EE] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* ==================== HERO TOP BANNER SECTION ==================== */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#7A0016] mb-4">
          Contact Us
        </h1>
        <p className="text-gray-500 font-light max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          Have a question, need a custom hamper setup, or just want to say hello? 
          We'd love to hear from you. Reach out to us below!
        </p>
      </div>

      {/* ==================== CORE GRID LAYOUT CONTENT ==================== */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT COLUMN: CONTACT INFO CARDS & MAP REPLACEMENT */}
        <div className="lg:col-span-5 flex flex-col gap-6 w-full">
          
          {/* 2x2 Interactive Info Grid - Responsive Design */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      
              {/* CARD 1: PHONE */}
              <div className="bg-[#fffaf6] border border-[#f3e1c7] p-4 sm:p-6 rounded-2xl shadow-sm text-center flex flex-col items-center justify-center gap-1 sm:gap-2 hover:scale-[1.02] transition-transform">
                  <span className="text-xl sm:text-2xl text-[#7A0016]">📞</span>
                  <h4 className="font-serif font-bold text-[#7A0016] text-sm sm:text-md mt-1">Phone</h4>
                  <p className="text-[10px] sm:text-sm text-gray-600 font-medium">+91 9452417747</p>
              </div>

              {/* CARD 2: WHATSAPP */}
              <a 
                  href="https://wa.me/919452417747" 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-[#fffaf6] border border-[#f3e1c7] p-4 sm:p-6 rounded-2xl shadow-sm text-center flex flex-col items-center justify-center gap-1 sm:gap-2 hover:scale-[1.02] transition-transform no-underline"
              >
                  <span className="text-xl sm:text-2xl text-[#7A0016]">💬</span>
                  <h4 className="font-serif font-bold text-[#7A0016] text-sm sm:text-md mt-1">WhatsApp</h4>
                  <p className="text-[10px] sm:text-sm text-gray-600 font-medium">+91 9452417747</p>
              </a>

              {/* CARD 3: EMAIL */}
              <div className="bg-[#fffaf6] border border-[#f3e1c7] p-4 sm:p-6 rounded-2xl shadow-sm text-center flex flex-col items-center justify-center gap-1 sm:gap-2 hover:scale-[1.02] transition-transform">
                  <span className="text-xl sm:text-2xl text-[#7A0016]">✉️</span>
                  <h4 className="font-serif font-bold text-[#7A0016] text-sm sm:text-md mt-1">Email</h4>
                  <p className="text-[10px] sm:text-sm text-gray-600 font-medium truncate w-full">teamcherryside@gmail.com</p>
              </div>

              {/* CARD 4: INSTAGRAM */}
              <a 
                  href="https://instagram.com/cherryside._" 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-[#fffaf6] border border-[#f3e1c7] p-4 sm:p-6 rounded-2xl shadow-sm text-center flex flex-col items-center justify-center gap-1 sm:gap-2 hover:scale-[1.02] transition-transform no-underline"
              >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#7A0016" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-7 sm:h-7">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  <h4 className="font-serif font-bold text-[#7A0016] text-sm sm:text-md mt-1">Instagram</h4>
                  <p className="text-[10px] sm:text-sm text-[#7A0016] font-semibold">@cherryside._</p>
              </a>
          </div>

          {/* MAP REPLACEMENT: Beautiful Brand Vision Content Box Frame */}
          <div className="bg-[#7A0016] text-[#FDF7EE] p-8 rounded-3xl shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[220px]">
            <div className="absolute top-[-20px] right-[-20px] text-9xl opacity-10 pointer-events-none select-none">
              🍒
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold tracking-wide mb-3">
                Cherry Side Gifting Experiences
              </h3>
              <p className="text-xs sm:text-sm text-[#f5efe5] font-light leading-relaxed">
                We believe every gift should feel special and personal. We create beautifully 
                curated gift hampers, handmade keepsakes, premium gift boxes, custom ribbons, 
                scrunchies, and thoughtful presentation styles for your loved ones.
              </p>
            </div>
            <div className="text-xs tracking-[3px] uppercase text-amber-300 font-semibold mt-4">
              ✦ Where Gifting Feels Personal ✦
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: INTERACTIVE INPUT FORM GRID */}
        {/* <div className="lg:col-span-7 bg-[#fffaf6] border border-[#f3e1c7] p-6 sm:p-10 rounded-3xl shadow-sm w-full">
          
          <h2 className="font-serif text-2xl font-bold text-[#7A0016] mb-2">
            Get In Touch
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 font-light mb-8">
            Fill out the form below and our team will get back to you as soon as possible.
          </p>

          <form onSubmit={handleSendNow} className="space-y-5"> */}
            
            {/* Input Field: Name */}
            {/* <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name..."
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-[#e0d3c1] bg-[#fffbf7] p-3.5 text-sm text-gray-700 rounded-xl outline-none focus:ring-1 focus:ring-[#7A0016] focus:border-[#7A0016] font-light transition-all"
                required
              />
            </div> */}

            {/* Input Field: Email */}
            {/* <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="example@yourdomain.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-[#e0d3c1] bg-[#fffbf7] p-3.5 text-sm text-gray-700 rounded-xl outline-none focus:ring-1 focus:ring-[#7A0016] focus:border-[#7A0016] font-light transition-all"
                required
              />
            </div> */}

            {/* Input Field: Subject */}
            {/* <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                placeholder="Title..."
                value={formData.subject}
                onChange={handleChange}
                className="w-full border border-[#e0d3c1] bg-[#fffbf7] p-3.5 text-sm text-gray-700 rounded-xl outline-none focus:ring-1 focus:ring-[#7A0016] focus:border-[#7A0016] font-light transition-all"
                required
              />
            </div> */}

            {/* Input Field: Message */}
            {/* <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Message
              </label>
              <textarea
                name="message"
                placeholder="Type here..."
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-[#e0d3c1] bg-[#fffbf7] p-3.5 text-sm text-gray-700 rounded-xl outline-none focus:ring-1 focus:ring-[#7A0016] focus:border-[#7A0016] font-light resize-none transition-all"
                required
              />
            </div> */}

            {/* Action Trigger Button */}
            {/* <button
              type="submit"
              className="w-full bg-[#7A0016] text-white py-4 mt-4 rounded-xl text-xs font-semibold tracking-[2px] uppercase shadow-md hover:bg-[#610112] transition-all flex items-center justify-center gap-2 cursor-pointer outline-none"
            >
              Send Now
            </button> */}

          {/* </form> */}

        {/* </div> */}

      </div>
    </div>
  );
}