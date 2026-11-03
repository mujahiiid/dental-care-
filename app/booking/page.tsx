"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";

const services = [
  "استشارة وفحص شامل",
  "تجميل الابتسامة",
  "زراعة الأسنان",
  "التقويم الشفاف",
  "علاج الجذور",
  "أسنان الأطفال",
  "العناية الوقائية",
];

const availableTimes = ["10:00 ص", "11:30 ص", "1:00 م", "3:30 م", "6:00 م", "8:30 م"];

type BookingConfirmation = {
  reference: string;
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
};

type DateOption = {
  value: string;
  label: string;
};

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 48 48" fill="none">
        <path d="M16.3 7.4c3.2 0 5.1 1.8 7.7 1.8s4.5-1.8 7.7-1.8c6.2 0 10 5.1 9.1 12.2-.6 4.8-3.2 7.7-5.1 11.8-2.4 5.2-3 9.2-6.1 9.2-3.5 0-2.2-9.1-5.6-9.1s-2.1 9.1-5.6 9.1c-3.1 0-3.7-4-6.1-9.2-1.9-4.1-4.5-7-5.1-11.8-.9-7.1 2.9-12.2 9.1-12.2Z" stroke="currentColor" strokeWidth="2.2" />
        <path d="M18.5 14.5c2.2 1.6 8.8 1.6 11 0" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function formatInputDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatArabicDate(value: string) {
  if (!value) return "لم يتم اختيار اليوم";
  return new Intl.DateTimeFormat("ar-EG", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00`));
}

export default function BookingPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const [dateOptions, setDateOptions] = useState<DateOption[]>([]);
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options: DateOption[] = [];
    const day = new Date();
    for (let index = 1; index <= 30; index += 1) {
      const candidate = new Date(day);
      candidate.setDate(day.getDate() + index);
      if (candidate.getDay() === 5) continue;
      options.push({
        value: formatInputDate(candidate),
        label: new Intl.DateTimeFormat("ar-EG", { weekday: "long", day: "numeric", month: "long" }).format(candidate),
      });
    }
    setDateOptions(options);
  }, []);

  function resetBooking() {
    setConfirmation(null);
    setName("");
    setPhone("");
    setService("");
    setDate("");
    setTime("");
    setNote("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (name.trim().length < 2) {
      setError("اكتب الاسم الكامل علشان نقدر نأكد الحجز.");
      return;
    }

    if (!/^01[0125][0-9]{8}$/.test(phone.trim())) {
      setError("اكتب رقم موبايل مصري صحيح مكوّن من 11 رقمًا.");
      return;
    }

    if (!service || !date || !time) {
      setError("اختار الخدمة واليوم والموعد قبل تأكيد الطلب.");
      return;
    }

    const booking: BookingConfirmation = {
      reference: `DCE-${Date.now().toString().slice(-6)}`,
      name: name.trim(),
      phone: phone.trim(),
      service,
      date,
      time,
    };

    const storedBookings = JSON.parse(localStorage.getItem("dce-bookings") ?? "[]") as BookingConfirmation[];
    localStorage.setItem("dce-bookings", JSON.stringify([...storedBookings, booking]));
    setConfirmation(booking);
    requestAnimationFrame(() => successRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  return (
    <main className="booking-page" dir="rtl">
      <header className="booking-nav">
        <Link className="brand" href="/" aria-label="Dental Care Egypt - الرئيسية">
          <BrandMark />
          <span className="brand-copy"><strong>DENTAL CARE</strong><small>EGYPT</small></span>
        </Link>
        <Link className="booking-back" href="/"><span>→</span> العودة للموقع</Link>
      </header>

      {!confirmation ? (
        <div className="booking-page-shell">
          <section className="booking-page-intro">
            <span className="booking-page-kicker">ONLINE BOOKING · حجز إلكتروني</span>
            <h1>اختار الموعد<br /><em>الأنسب ليومك.</em></h1>
            <p>حدد الخدمة واليوم والساعة، وراجع كل التفاصيل قبل إرسال طلب الموعد.</p>

            <div className="booking-progress" aria-label="خطوات الحجز">
              <div className="is-current"><span>01</span><b>بيانات الزيارة</b></div>
              <i />
              <div><span>02</span><b>مراجعة الطلب</b></div>
              <i />
              <div><span>03</span><b>رقم الحجز</b></div>
            </div>

            <div className="booking-assurance">
              <span>✓</span>
              <div><b>بياناتك في أمان</b><small>نستخدمها فقط لتنسيق موعد الزيارة.</small></div>
            </div>
          </section>

          <section className="booking-workspace">
            <form className="booking-page-form" onSubmit={submitBooking} noValidate>
              <div className="booking-form-title"><div><span>01</span><h2>بيانات الزيارة</h2></div><small>الحقول المطلوبة *</small></div>

              <div className="booking-field-grid">
                <label className="booking-field">
                  <span>الاسم الكامل *</span>
                  <input value={name} onChange={(event) => setName(event.target.value)} type="text" autoComplete="name" placeholder="اكتب اسمك" />
                </label>
                <label className="booking-field">
                  <span>رقم الموبايل *</span>
                  <input value={phone} onChange={(event) => setPhone(event.target.value.replace(/\D/g, "").slice(0, 11))} type="tel" autoComplete="tel" inputMode="numeric" dir="ltr" placeholder="01XXXXXXXXX" />
                </label>
              </div>

              <label className="booking-field">
                <span>الخدمة المطلوبة *</span>
                <select value={service} onChange={(event) => setService(event.target.value)}>
                  <option value="" disabled>اختار الخدمة</option>
                  {services.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </label>

              <div className="booking-field-grid">
                <label className="booking-field">
                  <span>اليوم المناسب *</span>
                  <select value={date} onChange={(event) => { setDate(event.target.value); setTime(""); }}>
                    <option value="" disabled>اختار اليوم</option>
                    {dateOptions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
                  </select>
                </label>
                <label className="booking-field">
                  <span>الموعد المتاح *</span>
                  <select value={time} onChange={(event) => setTime(event.target.value)} disabled={!date}>
                    <option value="" disabled>{date ? "اختار الموعد" : "اختار اليوم أولًا"}</option>
                    {availableTimes.map((item) => <option key={item} value={item}>{item}</option>)}
                  </select>
                </label>
              </div>

              <label className="booking-field">
                <span>ملاحظة للفريق <small>اختياري</small></span>
                <textarea value={note} onChange={(event) => setNote(event.target.value.slice(0, 240))} placeholder="اكتب أي معلومة تساعدنا نجهز زيارتك" rows={3} />
                <small className="character-count">{note.length}/240</small>
              </label>

              {error && <div className="booking-error" role="alert"><span>!</span>{error}</div>}

              <div className="booking-review">
                <div className="booking-review-head"><span>02</span><h2>مراجعة سريعة</h2></div>
                <dl>
                  <div><dt>الخدمة</dt><dd>{service || "لم يتم الاختيار"}</dd></div>
                  <div><dt>اليوم</dt><dd>{formatArabicDate(date)}</dd></div>
                  <div><dt>الموعد</dt><dd>{time || "لم يتم الاختيار"}</dd></div>
                </dl>
              </div>

              <button className="booking-confirm" type="submit">تأكيد طلب الموعد <span>←</span></button>
              <p className="booking-consent">بإرسال الطلب، أنت توافق على تواصل فريق العيادة معك لتأكيد الموعد.</p>
            </form>
          </section>
        </div>
      ) : (
        <section className="booking-success-page" ref={successRef} tabIndex={-1}>
          <div className="success-check">✓</div>
          <span className="booking-page-kicker">REQUEST RECEIVED · تم استلام الطلب</span>
          <h1>طلب موعدك<br /><em>اتسجّل بنجاح.</em></h1>
          <p>احتفظ برقم الطلب. الموعد يصبح مؤكدًا بعد تواصل فريق العيادة معك.</p>

          <div className="confirmation-card">
            <div className="confirmation-reference"><small>رقم الطلب</small><b dir="ltr">{confirmation.reference}</b></div>
            <dl>
              <div><dt>الاسم</dt><dd>{confirmation.name}</dd></div>
              <div><dt>الخدمة</dt><dd>{confirmation.service}</dd></div>
              <div><dt>اليوم</dt><dd>{formatArabicDate(confirmation.date)}</dd></div>
              <div><dt>الساعة</dt><dd>{confirmation.time}</dd></div>
            </dl>
          </div>

          <div className="success-actions">
            <button type="button" onClick={resetBooking}>حجز موعد آخر</button>
            <Link href="/">العودة للرئيسية</Link>
          </div>
        </section>
      )}

      <footer className="booking-page-footer"><span>Dental Care Egypt</span><span>حجز واضح، بخطوات بسيطة.</span></footer>
    </main>
  );
}
