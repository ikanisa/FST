"use client";

import Link from "next/link";
import { CalendarBlank } from "@phosphor-icons/react/dist/csr/CalendarBlank";
import { CalendarCheck } from "@phosphor-icons/react/dist/csr/CalendarCheck";
import { UserCircle } from "@phosphor-icons/react/dist/csr/UserCircle";
import { FormEvent, useMemo, useState } from "react";

const topics = [
  "Management advisory, risk & controls",
  "Tax & VAT",
  "Accounting & financial reporting",
  "Corporate & administrative services",
  "Business planning & loan application support",
  "Funding application support",
];

const times = ["09:00", "10:30", "13:00", "14:30", "16:00"];

type MeetingDate = {
  iso: string;
  weekday: string;
  day: string;
  month: string;
  longLabel: string;
};

type BookingDetails = {
  name: string;
  email: string;
  organisation: string;
};

function upcomingWeekdays(): MeetingDate[] {
  const result: MeetingDate[] = [];
  const cursor = new Date();
  cursor.setHours(12, 0, 0, 0);
  cursor.setDate(cursor.getDate() + 1);

  while (result.length < 5) {
    const weekday = cursor.getDay();
    if (weekday !== 0 && weekday !== 6) {
      const year = cursor.getFullYear();
      const month = String(cursor.getMonth() + 1).padStart(2, "0");
      const day = String(cursor.getDate()).padStart(2, "0");
      result.push({
        iso: `${year}-${month}-${day}`,
        weekday: new Intl.DateTimeFormat("en-GB", { weekday: "short" }).format(cursor),
        day: String(cursor.getDate()),
        month: new Intl.DateTimeFormat("en-GB", { month: "short" }).format(cursor),
        longLabel: new Intl.DateTimeFormat("en-GB", {
          weekday: "long",
          day: "numeric",
          month: "long",
        }).format(cursor),
      });
    }
    cursor.setDate(cursor.getDate() + 1);
  }

  return result;
}

function calendarTimestamp(date: string, time: string, extraMinutes = 0) {
  const start = new Date(`${date}T${time}:00+02:00`);
  start.setMinutes(start.getMinutes() + extraMinutes);
  return start.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

export function MeetingScheduler() {
  const dates = useMemo(() => upcomingWeekdays(), []);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [topic, setTopic] = useState(topics[0]);
  const [selectedDate, setSelectedDate] = useState(dates[0].iso);
  const [selectedTime, setSelectedTime] = useState("");
  const [booking, setBooking] = useState<BookingDetails | null>(null);

  const date = dates.find((item) => item.iso === selectedDate) ?? dates[0];

  const calendarUrl = useMemo(() => {
    if (!booking || !selectedTime) return "#";
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: `FST consultation — ${topic}`,
      dates: `${calendarTimestamp(selectedDate, selectedTime)}/${calendarTimestamp(selectedDate, selectedTime, 45)}`,
      ctz: "Africa/Kigali",
      location: "Google Meet",
      details: [
        `Consultation topic: ${topic}`,
        booking.name ? `Requested by: ${booking.name}` : "",
        `Email: ${booking.email}`,
        booking.organisation ? `Organisation: ${booking.organisation}` : "",
        "Please add Google Meet conferencing before saving the invitation.",
      ].filter(Boolean).join("\n"),
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  }, [booking, selectedDate, selectedTime, topic]);

  function chooseDate(iso: string) {
    setSelectedDate(iso);
    setSelectedTime("");
  }

  function handleDetails(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setBooking({
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      organisation: String(data.get("organisation") ?? "").trim(),
    });
    setStep(3);
  }

  function restart() {
    setSelectedTime("");
    setBooking(null);
    setStep(1);
  }

  return (
    <div className="meeting-scheduler" aria-label="Arrange an FST call">
      <div className="scheduler-topline">
        <div>
          <span className="scheduler-kicker">First working call</span>
          <h3>Find a slot for the issue.</h3>
        </div>
      </div>

      <ol className="scheduler-progress" aria-label="Booking progress">
        <li className={step >= 1 ? "is-active" : ""}><span aria-hidden="true"><CalendarBlank size={14} weight="regular" /></span>Slot</li>
        <li className={step >= 2 ? "is-active" : ""}><span aria-hidden="true"><UserCircle size={14} weight="regular" /></span>Context</li>
        <li className={step >= 3 ? "is-active" : ""}><span aria-hidden="true"><CalendarCheck size={14} weight="regular" /></span>Invite</li>
      </ol>

      {step === 1 && (
        <div className="scheduler-step">
          <label className="scheduler-field">
            <span>Which workstream is closest?</span>
            <select value={topic} onChange={(event) => setTopic(event.target.value)}>
              {topics.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>

          <fieldset className="date-picker">
            <legend>Pick a working day</legend>
            <div className="date-options">
              {dates.map((item) => (
                <button
                  className={selectedDate === item.iso ? "is-selected" : ""}
                  type="button"
                  key={item.iso}
                  aria-pressed={selectedDate === item.iso}
                  onClick={() => chooseDate(item.iso)}
                >
                  <span>{item.weekday}</span>
                  <strong>{item.day}</strong>
                  <span>{item.month}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="time-picker">
            <legend>Proposed times · Africa/Kigali</legend>
            <div className="time-options">
              {times.map((time) => (
                <button
                  className={selectedTime === time ? "is-selected" : ""}
                  type="button"
                  key={time}
                  aria-pressed={selectedTime === time}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </fieldset>

          <button className="scheduler-primary" type="button" disabled={!selectedTime} onClick={() => setStep(2)}>
            Continue with {selectedTime || "the slot"}
          </button>
        </div>
      )}

      {step === 2 && (
        <form className="scheduler-step scheduler-details" onSubmit={handleDetails}>
          <div className="booking-summary">
            <span>{topic}</span>
            <strong>{date.longLabel} at {selectedTime}</strong>
            <small>Africa/Kigali · Google Meet · 45 minutes</small>
          </div>
          <div className="field-row">
            <label className="scheduler-field"><span>Your name (optional)</span><input name="name" autoComplete="name" /></label>
            <label className="scheduler-field"><span>Business email</span><input type="email" name="email" autoComplete="email" required /></label>
          </div>
          <label className="scheduler-field"><span>Organisation or project (optional)</span><input name="organisation" autoComplete="organization" /></label>
          <label className="scheduler-consent">
            <input type="checkbox" required />
            <span>I accept the <Link href="/privacy">data notice</Link> and <Link href="/terms">site rules</Link>.</span>
          </label>
          <div className="scheduler-actions">
            <button className="scheduler-secondary" type="button" onClick={() => setStep(1)}>Change slot</button>
            <button className="scheduler-primary" type="submit">Build the invitation</button>
          </div>
        </form>
      )}

      {step === 3 && booking && (
        <div className="scheduler-step scheduler-complete" role="status">
          <span className="scheduler-kicker">Invitation prepared</span>
          <h3>{date.longLabel}<br />at {selectedTime}</h3>
          <p>The meeting details are ready. Open the event, check the content and add conferencing before you save it.</p>
          <a className="scheduler-primary" href={calendarUrl} target="_blank" rel="noreferrer">Review calendar draft</a>
          <button className="scheduler-secondary" type="button" onClick={restart}>Start over</button>
        </div>
      )}
    </div>
  );
}
