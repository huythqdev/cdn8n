import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      {/* HERO SECTION */}
      <section
        className="relative bg-cover bg-center h-[80vh] flex items-center justify-center text-white"
        style={{ backgroundImage: `url('/images/salon-banner.jpg')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        <div className="relative z-10 text-center p-6 rounded max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Tỏa sáng với mái tóc của bạn ✂️
          </h1>
          <p className="text-lg mb-6 drop-shadow-md">
            Salon tóc chuyên nghiệp - hiện đại - tận tâm
          </p>
          <Link
            to="/booking"
            className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded text-white font-semibold transition transform hover:scale-105"
          >
            Đặt lịch ngay
          </Link>
        </div>
      </section>

      {/* GIỚI THIỆU */}
      <section className="py-16 px-6 md:px-20 bg-white text-center">
        <h2 className="text-3xl font-bold mb-4 text-indigo-600 flex items-center justify-center gap-2">
          <span>Về chúng tôi</span>
          <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 21h20L12 2z" />
          </svg>
        </h2>
        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Chúng tôi là HairSalon uy tín tại TP.HCM với đội ngũ stylist hơn 10 năm kinh nghiệm.
          Cam kết mang đến cho bạn mái tóc đẹp, phong cách và phù hợp nhất!
        </p>
      </section>

      {/* DỊCH VỤ NỔI BẬT */}
      <section className="py-16 px-6 bg-gray-100">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-10">Dịch vụ nổi bật</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { name: "Cắt tóc nam", image: "/images/male-cut.jpg", desc: "Kiểu dáng thời thượng, phù hợp mọi phong cách." },
            { name: "Nhuộm tóc thời trang", image: "/images/color.jpg", desc: "Màu sắc thời thượng, giữ tóc khỏe đẹp." },
            { name: "Uốn tóc nữ", image: "/images/woman-hair.jpg", desc: "Tạo kiểu bồng bềnh, tự nhiên, quyến rũ." }
          ].map((s, i) => (
            <div
              key={i}
              className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer transform transition hover:scale-105 hover:shadow-2xl"
              title={s.desc}
            >
              <img src={s.image} alt={s.name} className="w-full h-52 object-cover" />
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2">{s.name}</h3>
                <p className="text-gray-600">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* KHÁCH HÀNG ĐÁNH GIÁ */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-12">Khách hàng nói gì</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
          {[
            { name: "Lan", review: "Không gian rất đẹp, nhân viên cực kỳ dễ thương!", avatar: "/images/avatar1.jpg" },
            { name: "Hoàng", review: "Cắt tóc cực ưng ý, sẽ quay lại!", avatar: "/images/avatar2.jpg" },
            { name: "My", review: "Thợ làm tóc rất chuyên nghiệp, 10 điểm!", avatar: "/images/avatar3.jpg" }
          ].map((c, i) => (
            <div
              key={i}
              className="bg-gray-100 p-8 rounded-lg shadow-md cursor-default transition hover:shadow-xl"
              title={`Đánh giá của ${c.name}`}
            >
              <img
                src={c.avatar}
                alt={c.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-indigo-600"
              />
              <p className="italic text-gray-700 mb-4 relative before:content-['“'] before:absolute before:-left-3 before:text-indigo-600 before:text-3xl before:top-0 after:content-['”'] after:absolute after:-right-3 after:text-indigo-600 after:text-3xl after:top-0">
                {c.review}
              </p>
              <p className="font-semibold text-indigo-700">{c.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* LIÊN HỆ + GOOGLE MAP */}
      <section className="py-16 px-6 bg-gradient-to-r from-indigo-50 to-white text-center">
        <h2 className="text-3xl font-bold text-indigo-600 mb-6">Liên hệ</h2>
        <div className="max-w-md mx-auto space-y-3 text-gray-700 text-lg">
          <p className="flex items-center justify-center gap-2">
            <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 7 7 13 7 13s7-6 7-13c0-3.87-3.13-7-7-7z" />
            </svg>
            430 Trần Đại Nghĩa, Quận Ngũ Hành Sơn, TP.Đà Nẵng
          </p>
          <p className="flex items-center justify-center gap-2">
            <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79a15.091 15.091 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21 12.083 12.083 0 003.7.59 1 1 0 011 1V20a1 1 0 01-1 1 17 17 0 01-17-17 1 1 0 011-1h3.5a1 1 0 011 1 12.08 12.08 0 00.59 3.7 1 1 0 01-.21 1.11l-2.2 2.2z" />
            </svg>
            0799479563
          </p>
          <p className="flex items-center justify-center gap-2">
            <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 7h-2V4H7v3H5a2 2 0 00-2 2v8h16v-8a2 2 0 00-2-2zM7 9h10v5H7V9z" />
            </svg>
            Giờ mở cửa: 8:00 - 20:00 mỗi ngày
          </p>
        </div>
        <div className="mt-8 max-w-4xl mx-auto rounded overflow-hidden shadow-lg">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18..."
            className="w-full h-72 border-0"
            allowFullScreen=""
            loading="lazy"
          />
        </div>
      </section>

      {/* NÚT ĐẶT LỊCH */}
      <section className="py-12 text-center bg-indigo-600 text-white">
        <h2 className="text-2xl font-semibold mb-4">Sẵn sàng thay đổi diện mạo?</h2>
        <Link
          to="/booking"
          className="inline-block bg-white text-indigo-600 px-8 py-3 rounded font-bold hover:bg-gray-100 transition"
        >
          Đặt lịch ngay
        </Link>
      </section>
    </div>
  );
}

export default Home;
