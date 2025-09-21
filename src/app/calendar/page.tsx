"use client";

import { useState } from "react";

type Booking = {
  guest: string;
  start: string; // YYYY-MM-DD
  end: string;   // YYYY-MM-DD
};

function nightsBetween(start: string, end: string) {
  const oneDay = 24 * 60 * 60 * 1000;
  const s = new Date(start).getTime();
  const e = new Date(end).getTime();
  const diff = Math.floor((e - s) / oneDay);
  return Math.max(1, diff);
}

export default function CalendarPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [guest, setGuest] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [error, setError] = useState("");

  function addBooking(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!guest || !start || !end) {
      setError("Please fill guest, start, and end dates.");
      return;
    }
    if (start > end) {
      setError("Start date must be before end date.");
      return;
    }

    setBookings((prev) => [...prev, { guest, start, end }]);
    setGuest("");
    setStart("");
    setEnd("");
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Simple top bar */}
      <header className="border-b bg-white">
        <div className="mx-auto max-w-4xl px-4 py-3 flex items-center justify-between">
          <div className="font-semibold">Airhost</div>
          <nav className="text-sm text-gray-600 space-x-4">
            <a href="/" className="hover:underline">Home</a>
            <a href="/calendar" className="font-medium text-black">Calendar</a>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-8 space-y-6">
        <h1 className="text-3xl font-bold">Calendar</h1>

        {/* Form card */}
        <form
          onSubmit={addBooking}
          className="grid gap-4 sm:grid-cols-4 items-end bg-white p-5 rounded-2xl shadow-sm border"
        >
          <div className="sm:col-span-2">
            <label className="block text-sm mb-1">Guest name</label>
            <input
              value={guest}
              onChange={(e) => setGuest(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="e.g. Sarah Jones"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Start</label>
            <input
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">End</label>
            <input
              type="date"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="sm:col-span-4 rounded-lg px-4 py-2 bg-black text-white hover:bg-gray-800 transition"
          >
            Add booking
          </button>
        </form>

        {error && <p className="text-red-600">{error}</p>}

        {/* Bookings grid */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Bookings</h2>

          {bookings.length === 0 ? (
            <div className="rounded-2xl border bg-white p-6 text-gray-600 shadow-sm">
              No bookings yet.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {bookings.map((b, i) => (
                <article
                  key={i}
                  className="rounded-2xl border bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">{b.guest}</h3>
                    <span className="text-xs uppercase tracking-wide rounded-full border px-2 py-1">
                      {nightsBetween(b.start, b.end)} nights
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    {b.start} → {b.end}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
