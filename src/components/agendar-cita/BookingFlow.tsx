"use client";

import { useState } from "react";
import AsesoriaTypeStep from "./AsesoriaTypeStep";
import DateTimeStep from "./DateTimeStep";
import BookingForm from "./BookingForm";
import PaymentStep from "./PaymentStep";
import Sidebar from "./Sidebar";

export type AsesoriaType = {
  id: "sencilla" | "personalizada";
  label: string;
  price: number;
  durationLabel: string;
  slotInterval: 30 | 60;
};

export type DateTimeSelection = {
  date: string;
  dateLabel: string;
  time: string;
  timeValue: string;
};

export type BookingFormData = {
  nombre: string;
  telefono: string;
  correo: string;
  servicioInteres: string;
  modalidad: "Llamada" | "Videollamada";
  mensaje: string;
};

type Step = "asesoria" | "datetime" | "form" | "payment";

export default function BookingFlow() {
  const [step, setStep] = useState<Step>("asesoria");
  const [asesoria, setAsesoria] = useState<AsesoriaType | null>(null);
  const [dateTime, setDateTime] = useState<DateTimeSelection | null>(null);
  const [formData, setFormData] = useState<BookingFormData | null>(null);

  if (step === "asesoria" || !asesoria) {
    return (
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AsesoriaTypeStep
            onSelect={(value) => {
              setAsesoria(value);
              setStep("datetime");
            }}
          />
        </div>
      </section>
    );
  }

  if (step === "datetime" || !dateTime) {
    return (
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-4xl lg:px-8">
          <DateTimeStep
            asesoria={asesoria}
            onSelect={(value) => {
              setDateTime(value);
              setStep("form");
            }}
            onBack={() => setStep("asesoria")}
          />
        </div>
      </section>
    );
  }

  if (step === "form" || !formData) {
    return (
      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div className="lg:col-span-2">
            <BookingForm
              asesoria={asesoria}
              dateTime={dateTime}
              initialData={formData}
              onSubmit={(data) => {
                setFormData(data);
                setStep("payment");
              }}
              onChangeAsesoria={() => setStep("asesoria")}
              onChangeDateTime={() => setStep("datetime")}
            />
          </div>
          <Sidebar />
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="lg:col-span-2">
          <PaymentStep
            asesoria={asesoria}
            dateTime={dateTime}
            formData={formData}
            onBack={() => setStep("form")}
          />
        </div>
        <Sidebar />
      </div>
    </section>
  );
}
