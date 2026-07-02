export default function About() {
  return (
    <section className="bg-[transparent] py-20 px-6">

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">

        {/* LEFT CONTENT */}
        <div className="flex-1">

          <span className="text-[#7a0016] tracking-[3px] text-sm font-semibold">
            ABOUT US
          </span>

          <h2 className="text-4xl md:text-5xl font-semibold text-[#3a0a0a] mt-4 leading-tight">
            More Than Gifts — We Create Memories
          </h2>

          <p className="text-[#5a3a3a] mt-5 leading-relaxed">
            Cherry Side is more than just a gifting brand — it's an emotion.
            Since our journey began, we've been on a heartfelt mission to bring
            smiles to the faces of your loved ones through thoughtfully curated
            gifts and personalized experiences.
          </p>

          <p className="text-[#5a3a3a] mt-4 leading-relaxed">
            Founded with passion and creativity, Cherry Side is committed to
            offering beautiful, high-quality gifting products at prices that
            make sense. Whether you're celebrating a special occasion or simply
            making someone's day brighter, we're here to help you gift with love.
          </p>

          <p className="text-[#5a3a3a] mt-4 leading-relaxed">
            We believe our creations are beautiful on their own — but they
            become truly special when they reach your hands and become part of
            your memories.
          </p>

          {/* HIGHLIGHTS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">

            <div className="bg-white p-4 border-l-4 border-[#7a0016] shadow-sm">
              <h4 className="text-[#7a0016] font-semibold">
                Curated Gifts
              </h4>
              <p className="text-sm text-[#5a3a3a] mt-1">
                Thoughtfully selected gifting collections
              </p>
            </div>

            <div className="bg-white p-4 border-l-4 border-[#7a0016] shadow-sm">
              <h4 className="text-[#7a0016] font-semibold">
                Premium Quality
              </h4>
              <p className="text-sm text-[#5a3a3a] mt-1">
                Crafted with care and attention to detail
              </p>
            </div>

            <div className="bg-white p-4 border-l-4 border-[#7a0016] shadow-sm">
              <h4 className="text-[#7a0016] font-semibold">
                Made With Love
              </h4>
              <p className="text-sm text-[#5a3a3a] mt-1">
                Every order packed with warmth and care
              </p>
            </div>

          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="flex-1 relative">

          <img
            src="/gift1.jpeg"
            alt="Cherry Side Gifts"
            className="rounded-xl shadow-xl w-full object-cover"
          />

          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#7a0016] opacity-10 rounded-xl"></div>

        </div>

      </div>

    </section>
  );
}