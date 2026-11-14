import React, { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Minus,
  Monitor,
  Plus,
  User,
  Users,
  X,
} from 'lucide-react';
import {
  Room,
  formatUZS,
  validateCustomerName,
  validateHours,
} from '../data/rooms';

interface BookingModalProps {
  room: Room | null;
  onClose: () => void;
}

interface BookingConfirmation {
  customerName: string;
  roomId: string;
  roomName: string;
  hours: number;
  totalPrice: number;
}

export function BookingModal({ room, onClose }: BookingModalProps) {
  const [hoursInput, setHoursInput] = useState<string>('1');
  const [customerName, setCustomerName] = useState<string>('');
  const [hoursTouched, setHoursTouched] = useState<boolean>(false);
  const [nameTouched, setNameTouched] = useState<boolean>(false);
  const [submittedAttempted, setSubmittedAttempted] = useState<boolean>(false);
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null);

  const hoursRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (room) {
      setHoursInput('1');
      setCustomerName('');
      setHoursTouched(false);
      setNameTouched(false);
      setSubmittedAttempted(false);
      setConfirmation(null);
    }
  }, [room]);

  useEffect(() => {
    if (!room) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [room, onClose]);

  if (!room) return null;

  const hoursValidation = validateHours(hoursInput);
  const nameValidation = validateCustomerName(customerName);

  const showHoursError = (hoursTouched || submittedAttempted) && !hoursValidation.valid;
  const showNameError = (nameTouched || submittedAttempted) && !nameValidation.valid;

  const totalPrice =
    hoursValidation.valid && hoursValidation.hours !== null
      ? room.hourlyPrice * hoursValidation.hours
      : null;

  const handleStepHours = (delta: number) => {
    const current = hoursValidation.valid && hoursValidation.hours !== null ? hoursValidation.hours : 1;
    const next = Math.min(8, Math.max(1, current + delta));
    setHoursInput(String(next));
    setHoursTouched(true);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmittedAttempted(true);
    setHoursTouched(true);
    setNameTouched(true);

    if (!hoursValidation.valid || hoursValidation.hours === null) {
      hoursRef.current?.focus();
      return;
    }

    if (!nameValidation.valid) {
      nameRef.current?.focus();
      return;
    }

    setConfirmation({
      customerName: nameValidation.trimmedName,
      roomId: room.id,
      roomName: room.name,
      hours: hoursValidation.hours,
      totalPrice: room.hourlyPrice * hoursValidation.hours,
    });
  };

  const handleResetToForm = () => {
    setHoursInput('1');
    setCustomerName('');
    setHoursTouched(false);
    setNameTouched(false);
    setSubmittedAttempted(false);
    setConfirmation(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-[2px] overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-room-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative my-auto w-full max-w-xl rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-mono font-semibold text-[#1D4ED8]">{room.id}</span>
              <span aria-hidden="true">·</span>
              <span>{confirmation ? 'So‘rov natijasi' : 'Xona tafsilotlari va band qilish'}</span>
            </div>
            <h2
              id="modal-room-title"
              className="mt-1 font-display text-2xl font-bold tracking-tight text-slate-900"
            >
              {room.name}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Oynani yopish"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] cursor-pointer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {confirmation ? (
          /* Confirmation Screen */
          <div className="p-6 sm:p-7 space-y-6">
            <div
              role="status"
              aria-live="polite"
              className="flex items-start gap-3.5 rounded-xl border border-emerald-200 bg-emerald-50/80 p-4 text-emerald-950"
            >
              <CheckCircle2
                className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700"
                aria-hidden="true"
              />
              <p className="text-sm font-medium leading-relaxed">
                Band qilish so‘rovingiz muvaffaqiyatli yuborildi. Bu band qilish so‘rovi bo‘lib, tasdiqlangan bron emas.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/70 divide-y divide-slate-200">
              <div className="flex items-center justify-between gap-4 px-5 py-3.5">
                <span className="text-sm text-slate-500">Mijoz ismi</span>
                <span className="text-sm font-semibold text-slate-900 text-right">
                  {confirmation.customerName}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 px-5 py-3.5">
                <span className="text-sm text-slate-500">Tanlangan xona</span>
                <span className="text-sm font-semibold text-slate-900 text-right">
                  <span className="font-mono text-slate-500 mr-1.5">
                    {confirmation.roomId}
                  </span>
                  {confirmation.roomName}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 px-5 py-3.5">
                <span className="text-sm text-slate-500">Ijara davomiyligi</span>
                <span className="text-sm font-semibold tabular-nums text-slate-900">
                  {confirmation.hours} soat
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 px-5 py-4 bg-white rounded-b-xl">
                <span className="text-sm font-semibold text-slate-700">
                  Umumiy ijara narxi
                </span>
                <span className="font-display text-xl font-bold tabular-nums text-[#1D4ED8]">
                  {formatUZS(confirmation.totalPrice)}
                </span>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-1">
              <button
                type="button"
                onClick={handleResetToForm}
                className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] whitespace-nowrap cursor-pointer"
              >
                Yangi so‘rov yuborish
              </button>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[#0F172A] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1D4ED8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] whitespace-nowrap cursor-pointer"
              >
                Bosh sahifaga qaytish
              </button>
            </div>
          </div>
        ) : (
          /* Room Details & Booking Request Form */
          <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-7 space-y-6">
            {/* Selected Room Details Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
              <div>
                <span className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Users className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Sig‘imi</span>
                </span>
                <span className="mt-1 block text-sm font-semibold text-slate-900">
                  {room.capacityLabel}
                </span>
              </div>

              <div>
                <span className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Monitor className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Jihozlar</span>
                </span>
                <span className="mt-1 block text-sm font-semibold text-slate-900">
                  {room.equipment}
                </span>
              </div>

              <div>
                <span className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Soatlik narx</span>
                </span>
                <span className="mt-1 block font-display text-base font-bold tabular-nums text-[#1D4ED8]">
                  {formatUZS(room.hourlyPrice)}
                </span>
              </div>
            </div>

            {/* Rental Duration Input */}
            <div>
              <div className="flex items-baseline justify-between gap-2">
                <label
                  htmlFor="rental-hours"
                  className="block text-sm font-semibold text-slate-900"
                >
                  Ijara davomiyligi (soat)
                </label>
                <span className="text-xs text-slate-500">1 dan 8 soatgacha</span>
              </div>

              <div className="mt-2 flex items-stretch gap-2">
                <button
                  type="button"
                  onClick={() => handleStepHours(-1)}
                  disabled={hoursValidation.valid && hoursValidation.hours === 1}
                  aria-label="Soatni kamaytirish"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] cursor-pointer"
                >
                  <Minus className="h-4 w-4" aria-hidden="true" />
                </button>

                <input
                  ref={hoursRef}
                  id="rental-hours"
                  name="hours"
                  type="text"
                  inputMode="numeric"
                  value={hoursInput}
                  onChange={(e) => {
                    setHoursInput(e.target.value);
                    setHoursTouched(true);
                  }}
                  onBlur={() => setHoursTouched(true)}
                  placeholder="1–8"
                  aria-invalid={showHoursError}
                  aria-describedby={showHoursError ? 'hours-error' : 'hours-hint'}
                  className={`h-11 w-full rounded-lg border px-4 text-center font-display text-base font-semibold tabular-nums text-slate-900 transition-colors focus:outline-none ${
                    showHoursError
                      ? 'border-red-500 bg-red-50/40 focus:border-red-600 focus:ring-2 focus:ring-red-500/20'
                      : 'border-slate-300 bg-white focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/20'
                  }`}
                />

                <button
                  type="button"
                  onClick={() => handleStepHours(1)}
                  disabled={hoursValidation.valid && hoursValidation.hours === 8}
                  aria-label="Soatni oshirish"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] cursor-pointer"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              {showHoursError ? (
                <p
                  id="hours-error"
                  role="alert"
                  className="mt-2 flex items-start gap-1.5 text-xs font-medium text-red-700"
                >
                  <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>{hoursValidation.error}</span>
                </p>
              ) : (
                <p id="hours-hint" className="mt-2 text-xs text-slate-500">
                  Faqat 1 dan 8 gacha butun son kiriting (masalan: 2 yoki 3).
                </p>
              )}
            </div>

            {/* Automatic Total Price Display */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-900 px-5 py-4 text-white">
              <div>
                <span className="block text-xs text-slate-300">
                  Umumiy ijara narxi
                </span>
                <span className="mt-0.5 block text-xs tabular-nums text-slate-400">
                  {hoursValidation.valid && hoursValidation.hours !== null
                    ? `${formatUZS(room.hourlyPrice)} × ${hoursValidation.hours} soat`
                    : `${formatUZS(room.hourlyPrice)} × soat soni`}
                </span>
              </div>

              <div className="sm:text-right">
                <span
                  data-testid="total-price"
                  className="font-display text-2xl font-bold tabular-nums tracking-tight text-white"
                >
                  {totalPrice !== null ? formatUZS(totalPrice) : '— UZS'}
                </span>
              </div>
            </div>

            {/* Customer Full Name Input */}
            <div>
              <label
                htmlFor="customer-name"
                className="block text-sm font-semibold text-slate-900"
              >
                Mijozning to‘liq ismi <span className="text-red-600">*</span>
              </label>

              <div className="relative mt-2">
                <User
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  aria-hidden="true"
                />
                <input
                  ref={nameRef}
                  id="customer-name"
                  name="customerName"
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => {
                    setCustomerName(e.target.value);
                    if (nameTouched || submittedAttempted) {
                      setNameTouched(true);
                    }
                  }}
                  onBlur={() => setNameTouched(true)}
                  placeholder="Masalan: Azizbek Rahimov"
                  aria-invalid={showNameError}
                  aria-describedby={showNameError ? 'name-error' : undefined}
                  className={`h-11 w-full rounded-lg border pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none ${
                    showNameError
                      ? 'border-red-500 bg-red-50/40 focus:border-red-600 focus:ring-2 focus:ring-red-500/20'
                      : 'border-slate-300 bg-white focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/20'
                  }`}
                />
              </div>

              {showNameError && (
                <p
                  id="name-error"
                  role="alert"
                  className="mt-2 flex items-start gap-1.5 text-xs font-medium text-red-700"
                >
                  <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>{nameValidation.error}</span>
                </p>
              )}
            </div>

            {/* Submit Actions */}
            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 border-t border-slate-100 pt-5">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] whitespace-nowrap cursor-pointer"
              >
                Bekor qilish
              </button>

              <button
                type="submit"
                className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[#1D4ED8] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1E40AF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] whitespace-nowrap cursor-pointer"
              >
                Band qilish so‘rovini yuborish
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
