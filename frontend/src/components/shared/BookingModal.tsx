"use client";

import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar as CalendarIcon,
  Clock,
  User,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import { useScrollLock } from "@/hooks/useScrollLock";

const TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

const formatPhoneNumber = (value: string) => {
  const numbers = value.replace(/\D/g, "");
  const chars = numbers.split("");
  let formatted = "";

  for (let i = 0; i < chars.length && i < 9; i++) {
    if (i === 3 || i === 5 || i === 7) {
      formatted += " ";
    }

    formatted += chars[i];
  }

  return formatted;
};

const BookingModal = () => {
  const { isOpen, closeBooking, selectedService } = useBooking();

  useScrollLock(isOpen);

  if (!isOpen) {
    return null;
  }

  return (
    <BookingModalContent
      key={selectedService ?? "booking-default"}
      closeBooking={closeBooking}
      selectedService={selectedService}
    />
  );
};

const BookingModalContent = ({
  closeBooking,
  selectedService,
}: {
  closeBooking: () => void;
  selectedService: string | null;
}) => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [details, setDetails] = useState({
    name: "",
    phone: "",
    notes: selectedService ? `Reserva para: ${selectedService}` : "",
  });

  const nextStep = () => setStep((currentStep) => currentStep + 1);
  const prevStep = () => setStep((currentStep) => currentStep - 1);

  const handleBooking = (event: React.FormEvent) => {
    event.preventDefault();
    nextStep();
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(event.target.value);
    setDetails((currentDetails) => ({ ...currentDetails, phone: formatted }));
  };

  const resetAndClose = () => {
    setTimeout(() => {
      closeBooking();
    }, 200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6">
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={resetAndClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        <m.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-brand-gray/90 shadow-2xl"
        >
          <button
            onClick={resetAndClose}
            className="absolute top-6 right-6 z-10 rounded-full bg-white/5 p-2 transition-colors hover:bg-white/10"
          >
            <X size={20} className="text-white" />
          </button>

          <div className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <m.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="mb-8 flex items-center gap-3">
                    <CalendarIcon className="text-brand-accent" size={24} />
                    <h2 className="text-3xl font-bold tracking-tight text-white">
                      Selecciona una Fecha
                    </h2>
                  </div>
                  <Calendar
                    selectedDate={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date);
                      nextStep();
                    }}
                  />
                </m.div>
              )}

              {step === 2 && (
                <m.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <button
                    onClick={prevStep}
                    className="mb-6 flex items-center gap-2 text-white/40 transition-colors hover:text-white"
                  >
                    <ChevronLeft size={16} /> Volver al calendario
                  </button>
                  <div className="mb-8 flex items-center gap-3">
                    <Clock className="text-brand-accent" size={24} />
                    <h2 className="text-3xl font-bold tracking-tight text-white">
                      ¿A qué hora te viene mejor?
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {TIME_SLOTS.map((time) => (
                      <button
                        key={time}
                        onClick={() => {
                          setSelectedTime(time);
                          nextStep();
                        }}
                        className="rounded-2xl border border-white/5 bg-white/5 py-4 font-bold text-white transition-all hover:border-brand-accent hover:bg-brand-accent/10"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </m.div>
              )}

              {step === 3 && (
                <m.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <button
                    onClick={prevStep}
                    className="mb-6 flex items-center gap-2 text-white/40 transition-colors hover:text-white"
                  >
                    <ChevronLeft size={16} /> Volver a las horas
                  </button>
                  <div className="mb-8 flex items-center gap-3">
                    <User className="text-brand-accent" size={24} />
                    <h2 className="text-3xl font-bold tracking-tight text-white">Tus Datos</h2>
                  </div>
                  <form onSubmit={handleBooking} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="ml-1 text-sm font-medium text-white/40">
                          Nombre Completo
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="Tu nombre..."
                          className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white outline-none transition-colors focus:border-brand-accent"
                          value={details.name}
                          onChange={(event) =>
                            setDetails((currentDetails) => ({
                              ...currentDetails,
                              name: event.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="ml-1 text-sm font-medium text-white/40">
                          Teléfono
                        </label>
                        <div className="relative">
                          <span className="absolute left-6 top-1/2 -translate-y-1/2 font-bold text-white/40">
                            +34
                          </span>
                          <input
                            required
                            type="tel"
                            placeholder="600 00 00 00"
                            className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-16 pr-6 text-white outline-none transition-colors focus:border-brand-accent"
                            value={details.phone}
                            onChange={handlePhoneChange}
                            maxLength={12}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="ml-1 text-sm font-medium text-white/40">
                        ¿Qué quieres hacerte? (Estilo, corte, color...)
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Cuéntanos un poco sobre el cambio que buscas..."
                        className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white outline-none transition-colors focus:border-brand-accent"
                        value={details.notes}
                        onChange={(event) =>
                          setDetails((currentDetails) => ({
                            ...currentDetails,
                            notes: event.target.value,
                          }))
                        }
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full rounded-2xl bg-white py-5 text-lg font-bold text-black shadow-xl shadow-white/5 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Confirmar Cita
                    </button>
                  </form>
                </m.div>
              )}

              {step === 4 && (
                <m.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-center"
                >
                  <div className="mb-8 flex justify-center">
                    <CheckCircle2 size={80} className="text-brand-accent" />
                  </div>
                  <h2 className="mb-4 text-4xl font-bold tracking-tight text-white">
                    ¡Cita Reservada!
                  </h2>
                  <p className="mx-auto mb-10 max-w-sm text-xl text-white/50">
                    Te hemos asignado el {selectedDate?.toLocaleDateString()} a las{" "}
                    {selectedTime}. Nos vemos pronto en Baskunana.
                  </p>
                  <button
                    onClick={resetAndClose}
                    className="rounded-full border border-white/10 bg-white/10 px-10 py-4 font-bold text-white transition-all hover:bg-white/20"
                  >
                    Cerrar
                  </button>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </m.div>
      </div>
    </AnimatePresence>
  );
};

const Calendar = ({
  selectedDate,
  onSelect,
}: {
  selectedDate: Date | null;
  onSelect: (date: Date) => void;
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

  const month = currentMonth.getMonth();
  const year = currentMonth.getFullYear();
  const totalDays = daysInMonth(month, year);
  const firstDay = firstDayOfMonth(month, year);

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const days = [];
  const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

  for (let i = 0; i < adjustedFirstDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-14 md:h-16" />);
  }

  for (let day = 1; day <= totalDays; day++) {
    const date = new Date(year, month, day);
    const isToday = date.toDateString() === new Date().toDateString();
    const isSelected = selectedDate?.toDateString() === date.toDateString();
    const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));

    days.push(
      <button
        key={day}
        disabled={isPast}
        onClick={() => onSelect(date)}
        className={`
          h-14 rounded-2xl font-bold transition-all md:h-16
          ${isPast ? "cursor-not-allowed opacity-10" : "hover:bg-brand-accent/20 hover:text-brand-accent"}
          ${isSelected ? "scale-95 bg-brand-accent text-black" : "text-white"}
          ${isToday && !isSelected ? "border border-brand-accent/50 text-brand-accent" : ""}
        `}
      >
        {day}
      </button>,
    );
  }

  return (
    <div className="w-full">
      <div className="mb-8 flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">
          {monthNames[month]} {year}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentMonth(new Date(year, month - 1))}
            className="rounded-xl bg-white/5 p-2 text-white transition-colors hover:bg-white/10"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => setCurrentMonth(new Date(year, month + 1))}
            className="rounded-xl bg-white/5 p-2 text-white transition-colors hover:bg-white/10"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {["LU", "MA", "MI", "JU", "VI", "SA", "DO"].map((day) => (
          <div
            key={day}
            className="flex h-10 items-center justify-center text-[10px] font-black tracking-widest text-white/20"
          >
            {day}
          </div>
        ))}
        {days}
      </div>
    </div>
  );
};

export default BookingModal;
