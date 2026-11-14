import { useState } from 'react';
import { ROOMS, Room } from './data/rooms';
import { RoomCard } from './components/RoomCard';
import { BookingModal } from './components/BookingModal';

export default function App() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const scrollToRooms = () => {
    const el = document.getElementById('xonalar');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#0F172A]">
      {/* 3-Zone Top Bar */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 h-16">
          <a
            href="#"
            className="font-display text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
          >
            Makon
          </a>

          <nav
            aria-label="Asosiy navigatsiya"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
          >
            <a
              href="#xonalar"
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              Xonalar
            </a>
            <a
              href="#tartib"
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              Band qilish tartibi
            </a>
            <a
              href="#shartlar"
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              Shartlar
            </a>
          </nav>

          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={scrollToRooms}
              className="inline-flex min-h-[40px] items-center justify-center rounded-lg bg-[#1D4ED8] px-4 py-2 text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-[#1E40AF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] whitespace-nowrap shrink-0 cursor-pointer"
            >
              Xona tanlash
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-[#1D4ED8]">
                Soatlik xonalar ijarasi · O‘zbekiston so‘mi (UZS)
              </p>
              <h1 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 [text-wrap:balance] leading-[1.12]">
                Darslar va kichik uchrashuvlar uchun qulay xonalar
              </h1>
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-600 max-w-2xl">
                O‘quv mashg‘ulotlari, jamoaviy muhokamalar, video suratga olish va seminarlar uchun to‘liq jihozlangan to‘rtta xonadan birini tanlang va 1 dan 8 soatgacha band qilish so‘rovini yuboring.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600">
                <span>4 ta jihozlangan xona</span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span>1–8 soatlik ijara</span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span>Avtomatik UZS hisob-kitob</span>
              </div>
            </div>
          </div>
        </section>

        {/* Rooms Grid Section */}
        <section id="xonalar" className="py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  Mavjud xonalar
                </h2>
                <p className="mt-1.5 text-sm sm:text-base text-slate-600">
                  Ehtiyojingizga mos xonani tanlab, soatlik narxni hisoblang va so‘rov qoldiring.
                </p>
              </div>
              <p className="text-sm font-medium tabular-nums text-slate-500 whitespace-nowrap">
                Jami {ROOMS.length} ta xona
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {ROOMS.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  onSelect={(chosen) => setSelectedRoom(chosen)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* How Booking Works & Terms Section */}
        <section
          id="tartib"
          className="border-t border-slate-200 bg-white py-12 sm:py-16"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Band qilish tartibi
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600">
                So‘rov yuborish uchta sodda bosqichdan iborat va bir daqiqadan kam vaqt oladi.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-slate-200 pt-8">
              <div>
                <span className="font-display text-sm font-semibold text-[#1D4ED8]">
                  01. Xonani tanlang
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold text-slate-900">
                  Sig‘im va jihozlarni solishtiring
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Har bir xona kartasida odam sig‘imi, mavjud texnik jihozlar va soatlik narx aniq ko‘rsatilgan.
                </p>
              </div>

              <div>
                <span className="font-display text-sm font-semibold text-[#1D4ED8]">
                  02. Vaqtni kiriting
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold text-slate-900">
                  Narx avtomatik hisoblanadi
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  1 dan 8 soatgacha butun son kiriting — tizim umumiy summani UZS valyutasida darhol hisoblab beradi.
                </p>
              </div>

              <div>
                <span className="font-display text-sm font-semibold text-[#1D4ED8]">
                  03. So‘rov yuboring
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold text-slate-900">
                  Tasdiq xabarnomasini oling
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  To‘liq ismingizni yozing va so‘rovni yuboring. Yuborilgan ma’lumotlar ekraningizda darhol ko‘rsatiladi.
                </p>
              </div>
            </div>

            <div
              id="shartlar"
              className="mt-10 border-t border-slate-200 pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-slate-600"
            >
              <p>
                <strong className="font-semibold text-slate-900">Muhim eslatma:</strong>{' '}
                Yuborilgan ariza band qilish so‘rovi hisoblanadi, yakuniy tasdiqlangan bron emas.
              </p>
              <span className="tabular-nums text-slate-500 whitespace-nowrap">
                Minimal muddat: 1 soat · Maksimal: 8 soat
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-[#F8F9FA] py-8">
        <div className="mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 text-sm text-slate-500">
          <p>© 2026 Makon — Xonalar ijarasi. Barcha huquqlar himoyalangan.</p>
          <p className="tabular-nums">Narxlar O‘zbekiston so‘mida (UZS) ko‘rsatilgan</p>
        </div>
      </footer>

      {/* Room Details & Booking Request Modal */}
      <BookingModal
        room={selectedRoom}
        onClose={() => setSelectedRoom(null)}
      />
    </div>
  );
}
