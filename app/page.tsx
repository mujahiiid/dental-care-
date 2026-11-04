"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const services = [
  { number: "01", title: "تجميل الابتسامة", label: "SMILE DESIGN", description: "خطة تجميل متوازنة تحافظ على طبيعة ملامحك وتمنحك ابتسامة تشبهك.", icon: "sparkle", image: "service-shot-6" },
  { number: "02", title: "زراعة الأسنان", label: "DENTAL IMPLANTS", description: "حلول مدروسة لاستعادة الثبات والراحة والمظهر الطبيعي بثقة.", icon: "implant", image: "service-shot-2" },
  { number: "03", title: "التقويم الشفاف", label: "CLEAR ALIGNERS", description: "رحلة تقويم مرنة ومريحة، مصممة لتناسب يومك دون أن تعطل أسلوب حياتك.", icon: "align", image: "service-shot-3" },
  { number: "04", title: "علاج الجذور", label: "ROOT CANAL", description: "علاج دقيق يركز على إزالة الألم والحفاظ على الأسنان الطبيعية لأطول وقت.", icon: "root", image: "service-shot-5" },
  { number: "05", title: "أسنان الأطفال", label: "PEDIATRIC DENTISTRY", description: "زيارة هادئة ولطيفة تبني علاقة إيجابية بين طفلك والعناية بالأسنان.", icon: "heart", image: "service-shot-4" },
  { number: "06", title: "العناية الوقائية", label: "PREVENTIVE CARE", description: "فحص وتنظيف دوري يساعدانك على حماية ابتسامتك قبل ظهور المشكلات.", icon: "shield", image: "service-shot-1" },
];

const teamExpertise = [
  { title: "تجميل وزراعة الأسنان", description: "رؤية تجميلية تحافظ على النتيجة الطبيعية وتوازن ملامح الوجه.", image: "team-shot-1" },
  { title: "التقويم وعلاج الجذور", description: "تخطيط دقيق للحركة والعلاج مع اهتمام مستمر براحة المريض.", image: "team-shot-2" },
  { title: "أسنان الأطفال والوقاية", description: "تجربة هادئة تبني الثقة وتحافظ على صحة الابتسامة من البداية.", image: "team-shot-3" },
];

const faqs = [
  { q: "هل أحتاج إلى حجز موعد قبل الزيارة؟", a: "نعم، الحجز المسبق يساعدنا على تخصيص وقت كافٍ لفحصك وفهم احتياجك دون استعجال." },
  { q: "كيف أعرف العلاج الأنسب لحالتي؟", a: "تبدأ كل رحلة بجلسة تقييم ومناقشة واضحة للخيارات المتاحة، ثم تُبنى الخطة بحسب حالتك وأولوياتك." },
  { q: "هل يمكن تقسيم خطة العلاج على عدة زيارات؟", a: "يمكن ترتيب مراحل العلاج والزيارات بما يناسب احتياج الحالة وجدول المريض بعد التقييم." },
  { q: "ماذا أحضر معي في أول زيارة؟", a: "أحضر أي أشعات أو تقارير سابقة إن وجدت، واكتب الأدوية التي تستخدمها وأي أسئلة تريد مناقشتها." },
];

function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <span className={`brand-mark${light ? " brand-mark-light" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 48 48" fill="none">
        <path d="M16.3 7.4c3.2 0 5.1 1.8 7.7 1.8s4.5-1.8 7.7-1.8c6.2 0 10 5.1 9.1 12.2-.6 4.8-3.2 7.7-5.1 11.8-2.4 5.2-3 9.2-6.1 9.2-3.5 0-2.2-9.1-5.6-9.1s-2.1 9.1-5.6 9.1c-3.1 0-3.7-4-6.1-9.2-1.9-4.1-4.5-7-5.1-11.8-.9-7.1 2.9-12.2 9.1-12.2Z" stroke="currentColor" strokeWidth="2.2" />
        <path d="M18.5 14.5c2.2 1.6 8.8 1.6 11 0" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function Icon({ name }: { name: string }) {
  const common = { width: 28, height: 28, viewBox: "0 0 28 28", fill: "none", xmlns: "http://www.w3.org/2000/svg" };
  if (name === "sparkle") return <svg {...common}><path d="M14 3c.6 5.4 3.6 8.4 9 9-5.4.6-8.4 3.6-9 9-.6-5.4-3.6-8.4-9-9 5.4-.6 8.4-3.6 9-9Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M22 19c.2 2 1.3 3.1 3.2 3.3-1.9.2-3 1.3-3.2 3.2-.2-1.9-1.3-3-3.2-3.2 1.9-.2 3-1.3 3.2-3.3Z" fill="currentColor"/></svg>;
  if (name === "implant") return <svg {...common}><path d="M9.2 4.5c1.7 0 2.8 1.1 4.8 1.1s3.1-1.1 4.8-1.1c3.4 0 5.2 3.1 4.1 7-1 3.5-2.8 4.4-3.7 8.8-.5 2.4-1.1 3.7-2.4 3.7-2 0-1.1-6.3-2.8-6.3S13.2 24 11.2 24c-1.3 0-1.9-1.3-2.4-3.7-.9-4.4-2.7-5.3-3.7-8.8-1.1-3.9.7-7 4.1-7Z" stroke="currentColor" strokeWidth="1.8"/><path d="M10 11.2h8M11 14h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>;
  if (name === "align") return <svg {...common}><rect x="4" y="6" width="20" height="16" rx="7" stroke="currentColor" strokeWidth="1.8"/><path d="M8 12.5c2.2 1.1 9.8 1.1 12 0M9 16.5c2.4 1 7.6 1 10 0M8 9.5v6.8M20 9.5v6.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
  if (name === "root") return <svg {...common}><path d="M8 4.5c2 0 3.5 1.5 6 1.5s4-1.5 6-1.5c3.1 0 4.5 2.7 3.4 6.2-1 3.4-3.6 5-4.2 10.3-.2 1.7-.8 2.5-1.7 2.5-1.7 0-1.1-7.3-3.5-7.3s-1.8 7.3-3.5 7.3c-.9 0-1.5-.8-1.7-2.5-.6-5.3-3.2-6.9-4.2-10.3C3.5 7.2 4.9 4.5 8 4.5Z" stroke="currentColor" strokeWidth="1.8"/><path d="M14 8v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>;
  if (name === "heart") return <svg {...common}><path d="M14 23S4.5 17.7 4.5 10.5A5.5 5.5 0 0 1 14 6.7a5.5 5.5 0 0 1 9.5 3.8C23.5 17.7 14 23 14 23Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M10 12h8M14 8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>;
  return <svg {...common}><path d="M14 3.5 23 7v6.7c0 5.4-3.7 9-9 11-5.3-2-9-5.6-9-11V7l9-3.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="m10 14 2.5 2.5 5.5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  return (
    <main dir="rtl" className="site-shell">
      <div className="top-note"><span>عرض تجريبي للهوية الرقمية الجديدة</span><span className="top-note-dot" /><span>Dental Care Egypt</span></div>

      <header className="nav-wrap">
        <a className="brand" href="#home" aria-label="Dental Care Egypt - الرئيسية">
          <BrandMark />
          <span className="brand-copy"><strong>DENTAL CARE</strong><small>EGYPT</small></span>
        </a>
        <nav className={`main-nav${menuOpen ? " is-open" : ""}`} aria-label="التنقل الرئيسي">
          <a href="#about" onClick={() => setMenuOpen(false)}>عن العيادة</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>الخدمات</a>
          <a href="#team" onClick={() => setMenuOpen(false)}>الفريق</a>
          <a href="#experience" onClick={() => setMenuOpen(false)}>تجربتك</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>الأسئلة</a>
          <Link className="mobile-book" href="/booking" onClick={() => setMenuOpen(false)}>احجز استشارتك</Link>
        </nav>
        <Link className="nav-cta" href="/booking">احجز استشارتك <span aria-hidden="true">↗</span></Link>
        <button className={`menu-toggle${menuOpen ? " is-open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="فتح القائمة"><span /><span /></button>
      </header>

      <section className="hero" id="home">
        <div className="hero-orb hero-orb-one" /><div className="hero-orb hero-orb-two" />
        <div className="hero-copy">
          <div className="eyebrow reveal-up"><span className="eyebrow-icon">✦</span>عناية هادئة. تفاصيل أدق. ابتسامة أجمل.</div>
          <h1 className="reveal-up delay-1">ابتسامتك تستحق<span>رعاية على مقاسك.</span></h1>
          <p className="hero-lead reveal-up delay-2">في <b>Dental Care Egypt</b> تبدأ التجربة بالاستماع إليك، ثم نرسم معًا رحلة علاج واضحة تمنحك الراحة والثقة في كل خطوة.</p>
          <div className="hero-actions reveal-up delay-3">
            <Link className="button button-primary" href="/booking">ابدأ رحلتك الآن <span className="button-arrow">←</span></Link>
            <a className="text-link" href="#services">اكتشف خدماتنا <span>⌄</span></a>
          </div>
          <div className="hero-trust reveal-up delay-4">
            <span className="trust-badge" aria-hidden="true">✓</span>
            <div><b>حجز إلكتروني بسيط</b><small>اختار الخدمة واليوم والموعد من الموقع</small></div>
          </div>
        </div>

        <div className="hero-visual reveal-scale">
          <div className="image-frame">
            <Image src="/dental-care-hero.png" alt="طبيبة أسنان داخل عيادة عصرية" fill priority sizes="(max-width: 900px) 92vw, 46vw" />
            <div className="image-shade" />
          </div>
          <div className="floating-card scan-card"><span className="floating-icon"><Icon name="sparkle" /></span><div><b>ابتسامة تبدأ بالفهم</b><small>تقييم واضح قبل أي خطوة</small></div></div>
          <div className="floating-card care-card"><span className="pulse-dot" /><div><small>تجربة المريض</small><b>راحة • وضوح • ثقة</b></div></div>
          <div className="visual-stamp" aria-hidden="true"><span>DENTAL CARE • CAIRO • </span><b>✦</b></div>
        </div>
        <div className="scroll-cue"><span>اكتشف أكثر</span><i /></div>
      </section>

      <div className="service-ribbon" aria-label="أبرز الخدمات"><div className="ribbon-track"><span>تجميل الابتسامة</span><b>✦</b><span>زراعة الأسنان</span><b>✦</b><span>التقويم الشفاف</span><b>✦</b><span>العناية الوقائية</span><b>✦</b><span>أسنان الأطفال</span><b>✦</b><span>تجميل الابتسامة</span><b>✦</b><span>زراعة الأسنان</span></div></div>

      <section className="about section" id="about">
        <div className="section-kicker"><span>01</span>فلسفتنا في الرعاية</div>
        <div className="about-grid">
          <div className="about-heading"><h2>مش مجرد علاج أسنان.<br /><em>دي تجربة كلها اهتمام.</em></h2></div>
          <div className="about-copy"><p>نؤمن أن أفضل نتيجة تبدأ عندما تفهم كل تفصيلة وتشعر أن صوتك مسموع. لذلك نصمم الزيارة حولك: وقت كافٍ، شرح بسيط، وخيارات واضحة.</p><a className="inline-arrow" href="#experience">اعرف كيف تسير الزيارة <span>←</span></a></div>
        </div>
        <div className="principles-grid">
          <article className="principle-card featured"><div className="principle-number">01</div><div className="principle-graphic precision-graphic"><span className="orbit orbit-one" /><span className="orbit orbit-two" /><span className="orbit-center">✦</span></div><h3>دقة تحترم التفاصيل</h3><p>كل قرار في الخطة مبني على تشخيص واضح وهدف مفهوم لك.</p></article>
          <article className="principle-card dark-card"><div className="principle-number">02</div><div className="principle-graphic comfort-graphic"><span>نبدأ بالاستماع</span><i /></div><h3>راحة من أول لحظة</h3><p>مساحة هادئة، تواصل إنساني، وخطوات محسوبة تقلل القلق.</p></article>
          <article className="principle-card"><div className="principle-number">03</div><div className="principle-graphic clarity-graphic"><span className="clarity-line"><i /> الاستشارة</span><span className="clarity-line"><i /> الخطة</span><span className="clarity-line"><i /> المتابعة</span></div><h3>وضوح بدون تعقيد</h3><p>تعرف الخيارات والمراحل والخطوة التالية قبل أن نبدأ.</p></article>
        </div>
      </section>

      <section className="services section" id="services">
        <div className="services-head"><div><div className="section-kicker light"><span>02</span>الخدمات</div><h2>كل ما تحتاجه ابتسامتك<br /><em>في مكان واحد.</em></h2></div><p>من الوقاية وحتى استعادة الابتسامة، نرتب لك رحلة متكاملة حول احتياجك الحقيقي.</p></div>
        <div className="services-grid">
          {services.map((service) => <article className="service-card" key={service.title}><div className={`service-image ${service.image}`} role="img" aria-label={`صورة توضيحية لخدمة ${service.title}`}><span className="service-icon"><Icon name={service.icon} /></span><span className="service-number">{service.number}</span></div><div className="service-body"><small>{service.label}</small><h3>{service.title}</h3><p>{service.description}</p><Link href="/booking" aria-label={`احجز استشارة ${service.title}`}>احجز الخدمة <span>←</span></Link></div></article>)}
        </div>
      </section>

      <section className="team section" id="team">
        <div className="team-head"><div><div className="section-kicker light"><span>03</span>خبرات متكاملة</div><h2>فريق يرى الصورة كاملة،<br /><em>مش سنًا منفردًا.</em></h2></div><p>كل تخصص يكمل الآخر، عشان تكون الخطة أوضح والنتيجة أكثر اتزانًا من أول زيارة حتى المتابعة.</p></div>
        <div className="team-grid">
          {teamExpertise.map((member, index) => <article className="team-card" key={member.title}><div className={`team-photo ${member.image}`} role="img" aria-label={`طبيب من فريق ${member.title}`}><span>0{index + 1}</span></div><div className="team-card-copy"><h3>{member.title}</h3><p>{member.description}</p><Link href="/booking">احجز مع التخصص <span>←</span></Link></div></article>)}
        </div>
        <div className="team-note"><span>✦</span><p>الصور تمثيلية للعرض البصري، وتُستبدل بصور وبيانات فريق العيادة عند اعتماد المشروع.</p></div>
      </section>

      <section className="experience section" id="experience">
        <div className="experience-copy"><div className="section-kicker"><span>04</span>رحلتك معنا</div><h2>من أول مكالمة<br />لحد ما <em>تبتسم بثقة.</em></h2><p>رحلة بسيطة ومفهومة، بدون مفاجآت. كل مرحلة لها هدف واضح، وأنت شريك في القرار من البداية.</p><Link className="button button-primary" href="/booking">احجز أول زيارة <span className="button-arrow">←</span></Link></div>
        <div className="journey-list">
          <article className="journey-step active"><span className="step-number">01</span><div><small>نسمعك</small><h3>استشارة هادئة</h3><p>نفهم ما يزعجك وما تتمنى تغييره، ونجيب عن كل أسئلتك.</p></div><span className="step-icon">↗</span></article>
          <article className="journey-step"><span className="step-number">02</span><div><small>نفهم الصورة كاملة</small><h3>فحص وتشخيص</h3><p>تقييم شامل يساعدنا على اختيار الطريق الأقصر والأكثر منطقية.</p></div><span className="step-icon">↗</span></article>
          <article className="journey-step"><span className="step-number">03</span><div><small>نخطط معًا</small><h3>خطة واضحة</h3><p>خيارات ومراحل وتوقعات مفهومة قبل البدء في العلاج.</p></div><span className="step-icon">↗</span></article>
          <article className="journey-step"><span className="step-number">04</span><div><small>نستمر بجانبك</small><h3>علاج ومتابعة</h3><p>تنفيذ مريح ومتابعة تحافظ على النتيجة وراحة بالك.</p></div><span className="step-icon">↗</span></article>
        </div>
      </section>

      <section className="promise-section"><div className="promise-card"><div className="promise-glow" /><div className="promise-copy"><span className="mini-label">THE DENTAL CARE PROMISE</span><h2>نشرح كل خطوة.<br />نحترم وقتك.<br /><em>ونصمم الرعاية حولك.</em></h2><p>لأن الثقة ليست شعارًا؛ هي الطريقة التي يجب أن تشعر بها من لحظة دخولك وحتى انتهاء رحلتك.</p></div><div className="promise-seal"><BrandMark light /><span>CARE<br />WITH<br />CLARITY</span></div></div></section>

      <section className="faq section" id="faq">
        <div className="faq-intro"><div className="section-kicker"><span>05</span>أسئلة شائعة</div><h2>قبل ما تزورنا،<br /><em>خلّي الصورة أوضح.</em></h2><p>لو سؤالك مش موجود هنا، اختار موعد استشارة وسنساعدك في تحديد أول خطوة مناسبة.</p><Link href="/booking" className="inline-arrow">احجز استشارة <span>←</span></Link></div>
        <div className="faq-list">{faqs.map((item, index) => <details key={item.q} open={index === 0}><summary><span>{String(index + 1).padStart(2, "0")}</span>{item.q}<i>+</i></summary><p>{item.a}</p></details>)}</div>
      </section>

      <section className="booking section" id="book">
        <div className="contact-booking-grid">
          <div className="contact-intro"><div className="section-kicker"><span>06</span>تواصل معنا</div><h2>خطوتك الأولى<br /><em>تبدأ من هنا.</em></h2><p>اختار الخدمة والموعد المناسب من الموقع، وسيظهر لك ملخص واضح بكل التفاصيل قبل إرسال الطلب.</p><div className="contact-points"><div><span>⌁</span><p><small>الحجز متاح</small><b>أونلاين في أي وقت</b></p></div><div><span>✓</span><p><small>بعد إرسال الطلب</small><b>يتواصل الفريق للتأكيد</b></p></div></div></div>
          <div className="appointment-card">
            <div className="appointment-card-top"><div><small>موعدك التجريبي</small><h3>العيادة الأقرب لابتسامتك</h3></div><span>↗</span></div>
            <div className="appointment-map"><div className="map-route"><i /><i /><i /></div><span>اختار الخدمة</span><b>حدد اليوم</b><em>أكد الوقت</em></div>
            <Link href="/booking">احجز موعدك الآن <span>←</span></Link>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-main"><div className="footer-brand"><a className="brand brand-footer" href="#home"><BrandMark light /><span className="brand-copy"><strong>DENTAL CARE</strong><small>EGYPT</small></span></a><p>رعاية متكاملة لابتسامة صحية، طبيعية، وواثقة.</p></div><div className="footer-links"><div><small>استكشف</small><a href="#about">عن العيادة</a><a href="#services">الخدمات</a><a href="#experience">تجربتك</a></div><div><small>الحجز</small><Link href="/booking">احجز من الموقع</Link><a href="#faq">الأسئلة الشائعة</a><a href="#book">خطوات الحجز</a></div><div><small>الحجز الإلكتروني</small><span>اختار الخدمة</span><span>حدد اليوم والموعد</span><em>تأكيد واضح داخل الموقع</em></div></div></div>
        <div className="footer-bottom"><span>© 2026 Dental Care Egypt. Concept Website.</span><span>Made with care in Cairo ✦</span></div>
      </footer>
    </main>
  );
}
