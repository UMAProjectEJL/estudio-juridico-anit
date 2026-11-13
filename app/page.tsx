'use client';

import { type FormEvent, type ReactNode, useState } from 'react';

const whatsapp = 'https://wa.me/5491152290878';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const practices = [
  { number: '01', icon: 'inheritance', title: 'Sucesiones', text: 'Declaratorias de herederos, administración de bienes, particiones, inscripciones y conflictos hereditarios.' },
  { number: '02', icon: 'property', title: 'Prescripción adquisitiva', text: 'Acciones judiciales para la adquisición del dominio por posesión prolongada y regularización dominial.' },
  { number: '03', icon: 'protection', title: 'Medidas cautelares', text: 'Protección judicial urgente de derechos, personas y bienes.' },
  { number: '04', icon: 'health', title: 'Amparos de salud', text: 'Acciones judiciales para solicitar cobertura médica, tratamientos y prestaciones de salud.' },
  { number: '05', icon: 'safety', title: 'Violencia de género', text: 'Asesoramiento jurídico, solicitud de medidas de protección y representación judicial.' },
  { number: '06', icon: 'family', title: 'Derecho de familia', text: 'Alimentos, adopciones, responsabilidad parental y conflictos familiares.' },
  { number: '07', icon: 'globe', title: 'Exequátur', text: 'Reconocimiento judicial en Argentina de sentencias extranjeras, divorcios y otras resoluciones.' },
  { number: '08', icon: 'tax', title: 'Derecho tributario', text: 'Acciones judiciales, planteos de inconstitucionalidad y reclamos vinculados al impuesto a las ganancias.' },
  { number: '09', icon: 'document', title: 'Derecho civil', text: 'Daños y perjuicios, contratos, conflictos patrimoniales y reclamos judiciales.' }
];

type IconName = 'inheritance' | 'property' | 'protection' | 'health' | 'safety' | 'family' | 'globe' | 'tax' | 'document' | 'sparkle' | 'pin' | 'clock';
const iconShapes: Record<IconName, ReactNode> = {
  inheritance: <><path d="M3 9h18M4 9l8-5 8 5M5 10v9m4-9v9m6-9v9m4-9v9M3 21h18" /></>,
  property: <><path d="m3 10 9-7 9 7M5 9v12h14V9M9 21v-7h6v7" /></>,
  protection: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-4" /></>,
  health: <><circle cx="12" cy="12" r="9" /><path d="M12 7v10M7 12h10" /></>,
  safety: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="M12 16s-4-2.2-4-4.8a2.2 2.2 0 0 1 4-1.2 2.2 2.2 0 0 1 4 1.2c0 2.6-4 4.8-4 4.8Z" /></>,
  family: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3 20c.5-3.4 2.5-5.2 6-5.2s5.5 1.8 6 5.2m0-4.2c2.8-.5 5.3.9 6 4.2" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18m0-18a15 15 0 0 0 0 18" /></>,
  tax: <><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 7h6M9 11h2m3 0h1M9 15h2m3 0h1M9 18h6" /></>,
  document: <><path d="M7 3h7l5 5v13H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" /><path d="M14 3v6h5M9 13h6m-6 4h6" /></>,
  sparkle: <><path d="m12 3 1.8 6.2L20 11l-6.2 1.8L12 19l-1.8-6.2L4 11l6.2-1.8L12 3Z" /></>,
  pin: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>
};

function Icon({ name, className = '' }: { name: IconName; className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{iconShapes[name]}</svg>;
}

const faqs = [
  { q: '¿En qué zonas se brinda atención?', a: 'La atención profesional está dirigida a personas de la Ciudad Autónoma de Buenos Aires y la Provincia de Buenos Aires. Escribí por WhatsApp para conversar sobre tu consulta y coordinar la modalidad.' },
  { q: '¿Cómo puedo consultar por mi caso?', a: 'Podés iniciar la conversación por WhatsApp o dejar tus datos en el formulario. Cada situación requiere un análisis particular; la información inicial permite orientar los próximos pasos.' },
  { q: '¿La primera consulta garantiza un resultado?', a: 'No. Cada caso depende de sus circunstancias y de la normativa aplicable. El asesoramiento permite evaluar alternativas, pero no se pueden garantizar resultados judiciales.' },
  { q: '¿Qué información conviene tener a mano?', a: 'Una breve descripción de lo ocurrido, fechas relevantes y la documentación relacionada pueden ayudar a comprender mejor la consulta. No envíes información sensible por canales inseguros.' }
];

function Arrow() { return <svg className="arrow-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M4 12 12 4M5 4h7v7" /></svg>; }
function ArrowDown() { return <svg className="arrow-icon arrow-down" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M8 3v10m-4-4 4 4 4-4" /></svg>; }
function ArrowUp() { return <svg className="arrow-icon arrow-up" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M8 13V3m-4 4 4-4 4 4" /></svg>; }
function WhatsAppIcon() {
  return <svg className="whatsapp-logo" viewBox="0 0 448 512" aria-hidden="true" focusable="false"><path fill="currentColor" d="M380.9 97.1C339 55.1 283.2 32 223.9 32 101.5 32 1.9 131.6 1.9 254c0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27.1 106 27.1h.1c122.3 0 224-99.6 224-222 0-59.3-24.9-115.1-66.9-157.1zM223.8 438.7c-33.2 0-65.8-8.9-94.2-25.7l-6.7-4-69.8 18.3 18.6-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.6 82.7-184.3 184.4-184.3 49.2 0 95.5 19.2 130.3 54s56.7 81.1 56.7 130.3c0 101.7-85.1 184.7-186.7 184.7zm101.1-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8s-14.3 18-17.5 21.7-6.5 4.2-12 1.4c-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.4 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.5-19.4 19-19.4 46.3s19.9 53.7 22.6 57.4c2.8 3.7 39.1 59.7 94.7 83.7 35.2 15.2 49 16.8 66.6 14.1 10.7-1.6 32.8-13.4 37.4-26.4s4.6-24.1 3.2-26.4c-1.4-2.3-5.1-3.7-10.6-6.5z"/></svg>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formMessage, setFormMessage] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    if (data.get('website')) return;
    setFormMessage('Tus datos están completos. El formulario todavía no tiene un servicio de envío conectado; para enviar tu consulta, escribinos directamente por WhatsApp.');
  }

  const legalService = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'Dra. Violeta de las Mercedes Anit',
    description: 'Asesoramiento y representación jurídica en CABA y Provincia de Buenos Aires.',
    telephone: '+5491152290878',
    areaServed: [
      { '@type': 'City', name: 'Ciudad Autónoma de Buenos Aires' },
      { '@type': 'AdministrativeArea', name: 'Provincia de Buenos Aires' }
    ],
    availableLanguage: 'Spanish'
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(legalService) }} />
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="Dra. Violeta de las Mercedes Anit, inicio">
        <span className="brand-mark">VA</span><span className="brand-copy"><strong>Violeta Anit</strong><small>ESTUDIO JURÍDICO</small></span>
      </a>
      <button className="menu-toggle" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span></span><span></span></button>
      <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Navegación principal">
        {[['Inicio', '#inicio'], ['Sobre mí', '#sobre-mi'], ['Servicios jurídicos', '#servicios'], ['Preguntas frecuentes', '#preguntas'], ['Contacto', '#contacto']].map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
        <a className="nav-cta" href={whatsapp} target="_blank" rel="noreferrer">Hablemos <Arrow /></a>
      </nav>
    </header>

    <main id="contenido">
      <section className="hero" id="inicio" aria-labelledby="hero-title">
        <div className="hero-image" style={{ backgroundImage: `url('${basePath}/images/justicia-buenos-aires.jpg')` }} role="img" aria-label="Palacio de Justicia de Buenos Aires y estatua de la Justicia con balanza y espada"></div>
        <div className="hero-shade"></div>
        <div className="hero-content">
          <p className="eyebrow eyebrow-light"><span></span> ASESORAMIENTO Y REPRESENTACIÓN JURÍDICA</p>
          <h1 id="hero-title">Dra. Violeta<br />de las Mercedes <em>Anit</em></h1>
          <p className="hero-lead">Tus derechos merecen ser defendidos.<br /><span>Tu tranquilidad, nuestra prioridad.</span></p>
          <p className="hero-description">Detrás de cada consulta existe una historia, una preocupación y la necesidad de encontrar una solución. Mi compromiso es escucharte y acompañarte con responsabilidad, dedicación y una estrategia adecuada para proteger tus derechos e intereses.</p>
          <div className="hero-actions"><a className="button button-gold" href={whatsapp} target="_blank" rel="noreferrer">Consultá por WhatsApp <Arrow /></a><a className="text-link text-link-light" href="#servicios">Conocé las áreas de práctica <ArrowDown /></a></div>
        </div>
        <div className="hero-index"><span>01</span><i></i><span>BUENOS AIRES · ARGENTINA</span></div>
      </section>

      <section className="intro-strip" aria-label="Ámbito de atención"><div className="intro-item"><span className="intro-icon"><Icon name="sparkle" /></span><span>Atención personalizada</span></div><div className="intro-item"><span className="intro-icon"><Icon name="pin" /></span><span>CABA y Provincia de Buenos Aires</span></div><div className="intro-item"><span className="intro-icon"><Icon name="clock" /></span><span>Orientación clara en cada etapa</span></div></section>

      <section className="about section-pad" id="sobre-mi">
        <div className="about-side"><p className="eyebrow"><span></span> SOBRE MÍ</p><div className="about-monogram">V<span>A</span><i></i></div><p className="side-caption">DRA. VIOLETA<br />DE LAS MERCEDES ANIT</p></div>
        <div className="about-copy"><p className="section-kicker">UN ESPACIO PARA ESCUCHARTE</p><h2>Compromiso profesional,<br /><em>trato cercano.</em></h2><p>Entiendo que enfrentar un conflicto legal puede generar incertidumbre. Por eso, mi propósito es ofrecer un espacio de escucha, asesoramiento claro y acompañamiento profesional.</p><p>Cada situación requiere un análisis particular y una estrategia jurídica adecuada. Trabajo con compromiso, responsabilidad y dedicación para defender los derechos e intereses de quienes depositan su confianza en mi labor.</p><a className="text-link" href="#contacto">Conversemos sobre tu situación <Arrow /></a></div>
      </section>

      <section className="services section-pad" id="servicios">
        <div className="section-heading"><div><p className="eyebrow eyebrow-light"><span></span> ÁREAS DE PRÁCTICA</p><h2>Asesoramiento jurídico<br /><em>para cada situación.</em></h2></div><p>Un abordaje atento y estratégico, pensado para comprender las particularidades de cada caso y acompañar cada etapa.</p></div>
        <div className="practice-grid">{practices.map((practice) => <a className="practice-card" key={practice.number} href={`${whatsapp}?text=${encodeURIComponent(`Hola, quisiera consultar por ${practice.title}.`)}`} target="_blank" rel="noreferrer" aria-label={`Consultar por ${practice.title} por WhatsApp`}><div className="card-top"><span className="practice-icon"><Icon name={practice.icon as IconName} /></span><span className="practice-number">{practice.number}</span></div><h3>{practice.title}</h3><p>{practice.text}</p><span className="card-link">Consultar <Arrow /></span></a>)}</div>
        <p className="services-note">El alcance del asesoramiento se define según las circunstancias de cada consulta.</p>
      </section>

      <section className="quote-band"><div className="quote-mark">“</div><blockquote>Cada caso es único.<br /><em>Cada derecho merece ser protegido.</em></blockquote><span className="quote-rule"></span></section>

      <section className="faq section-pad" id="preguntas"><div className="faq-heading"><p className="eyebrow"><span></span> PREGUNTAS FRECUENTES</p><h2>Información clara<br /><em>para empezar.</em></h2><p>Si tu duda no aparece aquí, podés escribir por WhatsApp.</p><a className="text-link" href={whatsapp} target="_blank" rel="noreferrer">Hacer una consulta <Arrow /></a></div><div className="faq-list">{faqs.map((item, i) => <details className="faq-item" key={item.q}><summary><span className="faq-num">0{i + 1}</span><span>{item.q}</span><i></i></summary><p>{item.a}</p></details>)}</div></section>

      <section className="contact section-pad" id="contacto"><div className="contact-main"><p className="eyebrow eyebrow-light"><span></span> CONTACTO</p><h2>Hablemos de<br /><em>tu situación.</em></h2><p className="contact-text">Un primer mensaje puede ayudarte a dar el próximo paso. Escribime para conversar sobre tu consulta.</p><a className="button button-gold" href={whatsapp} target="_blank" rel="noreferrer"><WhatsAppIcon /> Consultá por WhatsApp <Arrow /></a><div className="contact-region"><span className="region-pin"><Icon name="pin" /></span><div><small>ZONA DE ATENCIÓN</small><strong>Ciudad Autónoma de Buenos Aires<br />y Provincia de Buenos Aires</strong></div></div></div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <p className="form-eyebrow">FORMULARIO DE CONTACTO</p><h3>Contame brevemente<br />en qué puedo ayudarte.</h3>
          <label>Nombre completo<input name="name" type="text" autoComplete="name" placeholder="Tu nombre" required minLength={2} maxLength={100} /></label>
          <div className="form-row"><label>Correo electrónico<input name="email" type="email" autoComplete="email" placeholder="nombre@correo.com" required maxLength={160} /></label><label>Teléfono<input name="phone" type="tel" autoComplete="tel" placeholder="Tu teléfono" required minLength={6} maxLength={30} /></label></div>
          <label>¿En qué puedo ayudarte?<textarea name="message" placeholder="Contame brevemente tu consulta" rows={4} required minLength={10} maxLength={2000}></textarea></label>
          <label className="honeypot" aria-hidden="true">Dejar vacío<input name="website" tabIndex={-1} autoComplete="off" /></label>
          <div className="form-bottom"><p>Tus datos se utilizarán únicamente para responder a tu consulta.</p><button className="button button-navy" type="submit">Preparar consulta <Arrow /></button></div>
          {formMessage && <p className="form-status" role="status">{formMessage} <a href={whatsapp} target="_blank" rel="noreferrer">Abrir WhatsApp <Arrow /></a></p>}
        </form>
      </section>
    </main>

    <footer className="site-footer"><a className="brand footer-brand" href="#inicio"><span className="brand-mark">VA</span><span className="brand-copy"><strong>Violeta Anit</strong><small>ESTUDIO JURÍDICO</small></span></a><p>Asesoramiento y representación jurídica<br />CABA · Provincia de Buenos Aires</p><a className="footer-whatsapp" href={whatsapp} target="_blank" rel="noreferrer">WhatsApp <Arrow /></a><div className="footer-bottom"><span>© {new Date().getFullYear()} Dra. Violeta de las Mercedes Anit</span><a href="#inicio">Volver arriba <ArrowUp /></a><span className="developer-credit">Desarrollado por Elías Saíd Cornejo</span><span>La información de este sitio es general y no constituye asesoramiento legal para un caso particular.</span></div></footer>
    <a className="floating-whatsapp" href={whatsapp} target="_blank" rel="noreferrer" aria-label="Contactar por WhatsApp"><WhatsAppIcon /><small>Escribime</small></a>
  </>;
}
