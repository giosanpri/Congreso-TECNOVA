/* ==========================================================================
   TECNOVA 2026 - MAIN JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Countdown Timer
  initCountdown();

  // Area Search Filter
  initAreaSearch();

  // Committees Data & Render
  initCommittees();

  // Schedule Data & Render
  initSchedule();

  // Registration Form Modal
  initRegistrationModal();

  // Abstract Submission Modal
  initAbstractModal();

  // Contact Form
  initContactForm();

  // Email Status Modal
  initEmailStatusModal();

  // Image Zoom Modal
  initImageZoomModal();

  // Mobile Menu Toggle
  initMobileMenu();

  // Smooth Scroll Active Link Update
  initScrollSpy();
});

/* ==========================================================================
   1. COUNTDOWN TIMER
   ========================================================================== */
function initCountdown() {
  const targetDate = new Date('November 11, 2026 08:00:00').getTime();

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      document.getElementById('count-days').innerText = '00';
      document.getElementById('count-hours').innerText = '00';
      document.getElementById('count-mins').innerText = '00';
      document.getElementById('count-secs').innerText = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const dElem = document.getElementById('count-days');
    const hElem = document.getElementById('count-hours');
    const mElem = document.getElementById('count-mins');
    const sElem = document.getElementById('count-secs');

    if (dElem) dElem.innerText = String(days).padStart(2, '0');
    if (hElem) hElem.innerText = String(hours).padStart(2, '0');
    if (mElem) mElem.innerText = String(minutes).padStart(2, '0');
    if (sElem) sElem.innerText = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ==========================================================================
   2. AREA SEARCH FILTER
   ========================================================================== */
function initAreaSearch() {
  const searchInput = document.getElementById('areaSearchInput');
  const areaCards = document.querySelectorAll('.area-card');

  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();

    areaCards.forEach(card => {
      const title = card.querySelector('.area-title').innerText.toLowerCase();
      const desc = card.querySelector('.area-desc').innerText.toLowerCase();

      if (title.includes(term) || desc.includes(term)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

/* ==========================================================================
   3. COMMITTEES DATA & RENDER
   ========================================================================== */
const committeesData = {
  organizador: [
    { name: 'Juan Carlos Guevara Bolaños', role: 'Comité Organizador', inst: 'Universidad Distrital Francisco José de Caldas' },
    { name: 'Nancy Esperanza Olarte López', role: 'Comité Organizador', inst: 'Universidad Militar Nueva Granada' },
    { name: 'Giovanni Sánchez Prieto', role: 'Comité Organizador', inst: 'Universidad de San Buenaventura' },
    { name: 'Rosita Alacantara Poma', role: 'Comité Organizador', inst: 'Universidad Nacional Mayor de San Marcos' },
    { name: 'Yadira García Pacheco', role: 'Comité Organizador', inst: 'Fundación Universitaria Compensar' }
  ],
  cientifico: [
    { name: 'Lely Adriana Luengas Contreras', role: 'Comité Científico', inst: 'Universidad Distrital Francisco José de Caldas' },
    { name: 'Giovanni Sánchez Prieto', role: 'Comité Científico', inst: 'Universidad de San Buenaventura' },
    { name: 'Aldemar Gordillo Galeano', role: 'Comité Científico', inst: 'Firma Olarte Moure' },
    { name: 'Nancy Esperanza Olarte López', role: 'Comité Científico', inst: 'Universidad Militar Nueva Granada' },
    { name: 'Javier Alejandro Sáenz Leguizamon', role: 'Comité Científico', inst: 'Universidad Distrital Francisco José de Caldas' },
    { name: 'Gustavo Andrés Romero Duque', role: 'Comité Científico', inst: 'Universidad Distrital Francisco José de Caldas' },
    { name: 'Gloria Andrea Cavanzo Nisso', role: 'Comité Científico', inst: 'Universidad Distrital Francisco José de Caldas' },
    { name: 'Yadira García Pacheco', role: 'Comité Científico', inst: 'Fundación Universitaria Compensar' }
  ],
  academico: [
    { name: 'Gustavo Andrés Romero Duque', role: 'Comité Académico', inst: 'Universidad Distrital Francisco José de Caldas' },
    { name: 'Juan Carlos Guevara Bolaños', role: 'Comité Académico', inst: 'Universidad Distrital Francisco José de Caldas' },
    { name: 'Nancy Esperanza Olarte López', role: 'Comité Académico', inst: 'Universidad Militar Nueva Granada' },
    { name: 'Hugo Alejandro Macías Ramírez', role: 'Comité Académico', inst: 'Universidad de San Buenaventura' },
    { name: 'Fabián Orlando García Saldaña', role: 'Comité Académico', inst: 'Universidad de San Buenaventura' }
  ],
  logistico: [
    { name: 'Lely Adriana Luengas Contreras', role: 'Comité Logístico', inst: 'Universidad Distrital Francisco José de Caldas' },
    { name: 'Ariana Tavera Ochoa', role: 'Comité Logístico', inst: 'Universidad Distrital Francisco José de Caldas' }
  ],
  comunicaciones: [
    { name: 'Nancy Esperanza Olarte López', role: 'Comité de Comunicaciones', inst: 'Universidad Militar Nueva Granada' }
  ]
};

function initCommittees() {
  const tabBtns = document.querySelectorAll('#committeeTabs .tab-btn');
  const grid = document.getElementById('committeeMembersGrid');

  if (!grid || !tabBtns.length) return;

  function renderCommittee(category) {
    const list = committeesData[category] || [];
    grid.innerHTML = list.map(m => `
      <div class="committee-card">
        <div class="member-avatar">
          ${getInitials(m.name)}
        </div>
        <div class="member-info">
          <h4>${m.name}</h4>
          <p><strong>${m.role}</strong></p>
          <p>${m.inst}</p>
        </div>
      </div>
    `).join('');
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.category;
      renderCommittee(cat);
    });
  });

  renderCommittee('organizador');
}

function getInitials(name) {
  const parts = name.split(' ').filter(p => p.length > 2);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

/* ==========================================================================
   4. SCHEDULE DATA & RENDER
   ========================================================================== */
const scheduleData = {
  day1: [
    { time: '07:30 a 08:30', activity: 'Inscripción', place: 'Auditorio Aduanilla de Paiba' },
    { time: '08:30 a 09:00', activity: 'Instalación del evento', place: 'Auditorio Aduanilla de Paiba' },
    { time: '09:00 a 09:45', activity: 'Conferencia magistral', place: 'Auditorio Aduanilla de Paiba' },
    { time: '09:45 a 10:15', activity: 'Receso (Café)', place: 'Auditorio Aduanilla de Paiba' },
    { time: '10:15 a 11:00', activity: 'Conferencia magistral', place: 'Auditorio Aduanilla de Paiba' },
    { time: '11:00 a 12:00', activity: 'Ponencias presenciales', place: 'Auditorio Aduanilla de Paiba' },
    { time: '12:00 a 14:00', activity: 'Receso (Almuerzo)', place: 'Sede Aduanilla de Paiba' },
    { time: '14:00 a 16:30', activity: 'Ponencias presenciales', place: 'Auditorio Aduanilla de Paiba' },
    { time: '16:30 a 17:00', activity: 'Cierre de la jornada presencial', place: 'Auditorio Aduanilla de Paiba' },
    { time: '17:00 a 18:30', activity: 'Receso', place: 'Sede Aduanilla de Paiba' },
    { time: '18:30 a 20:00', activity: 'Ponencias virtuales', place: 'Plataforma virtual' }
  ],
  day2: [
    { time: '07:30 a 08:30', activity: 'Inscripción', place: 'Auditorio Aduanilla de Paiba' },
    { time: '08:30 a 12:00', activity: 'Jornada de empleabilidad', place: 'Auditorio Aduanilla de Paiba' },
    { time: '12:00 a 14:00', activity: 'Receso (Almuerzo)', place: 'Sede Aduanilla de Paiba' },
    { time: '14:00 a 16:30', activity: 'Ponencias presenciales', place: 'Auditorio Aduanilla de Paiba' },
    { time: '16:30 a 17:00', activity: 'Cierre de la jornada presencial', place: 'Auditorio Aduanilla de Paiba' },
    { time: '17:00 a 18:30', activity: 'Receso', place: 'Sede Aduanilla de Paiba' },
    { time: '18:30 a 20:00', activity: 'Ponencias virtuales', place: 'Plataforma virtual' }
  ],
  day3: [
    { time: '07:30 a 08:30', activity: 'Inscripción', place: 'Auditorio Aduanilla de Paiba' },
    { time: '08:30 a 13:00', activity: 'Jornada de emprendimiento', place: 'Auditorio Aduanilla de Paiba' },
    { time: '13:00 a 14:00', activity: 'Receso (Almuerzo)', place: 'Sede Aduanilla de Paiba' },
    { time: '14:00 a 16:30', activity: 'Ponencias presenciales', place: 'Auditorio Aduanilla de Paiba' },
    { time: '16:30 a 17:00', activity: 'Cierre del Congreso', place: 'Auditorio Aduanilla de Paiba' }
  ]
};

function initSchedule() {
  const dayBtns = document.querySelectorAll('#agendaDays .day-btn');
  const tbody = document.getElementById('agendaTableBody');

  if (!tbody || !dayBtns.length) return;

  function renderDay(dayKey) {
    const list = scheduleData[dayKey] || [];
    tbody.innerHTML = list.map(item => `
      <tr>
        <td class="agenda-time">${item.time}</td>
        <td class="agenda-activity">
          ${item.activity}
        </td>
        <td>${item.place}</td>
      </tr>
    `).join('');
  }

  dayBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      dayBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const dayKey = btn.dataset.day;
      renderDay(dayKey);
    });
  });

  renderDay('day1');
}

/* ==========================================================================
   5. REGISTRATION FORM MODAL
   ========================================================================== */
function initRegistrationModal() {
  const form = document.getElementById('registrationForm');
  const modal = document.getElementById('badgeModal');
  const closeModal = document.getElementById('closeBadgeModal');
  const btnSendRegEmail = document.getElementById('btnSendRegEmail');

  if (!form) return;

  let currentMailto = '';

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const docType = document.getElementById('regDocType').value;
    const docNum = document.getElementById('regDocNum').value;
    const names = document.getElementById('regNames').value;
    const surnames = document.getElementById('regSurnames').value;
    const email = document.getElementById('regEmail').value;
    const country = document.getElementById('regCountry').value;
    const city = document.getElementById('regCity').value;
    const typePart = document.getElementById('regTypePart').value;
    const inst = document.getElementById('regInst').value;

    const fullName = `${names} ${surnames}`;
    document.getElementById('badgeName').innerText = fullName;
    document.getElementById('badgeDoc').innerText = `${docType}: ${docNum}`;
    document.getElementById('badgeType').innerText = typePart;
    document.getElementById('badgeInst').innerText = inst;

    const subject = `[Inscripción TECNOVA 2026] - ${fullName} (${typePart})`;
    const body =
`SOLICITUD DE INSCRIPCIÓN - CONGRESO TECNOVA 2026

Datos del Asistente:
--------------------------------------------
Nombres: ${names}
Apellidos: ${surnames}
Documento: ${docType} ${docNum}
Correo Electrónico: ${email}
País: ${country}
Ciudad: ${city}
Institución / Empresa: ${inst}
Tipo de Participación: ${typePart}

Por favor confirmar la inscripción y expedir el comprobante de registro.`;

    currentMailto = `mailto:tecred@usbbog.edu.co?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    if (modal) modal.style.display = 'flex';
  });

  if (closeModal) {
    closeModal.addEventListener('click', () => {
      if (modal) modal.style.display = 'none';
    });
  }

  if (btnSendRegEmail) {
    btnSendRegEmail.addEventListener('click', () => {
      if (currentMailto) {
        window.location.href = currentMailto;
      }
    });
  }
}

/* ==========================================================================
   6. ABSTRACT SUBMISSION MODAL
   ========================================================================== */
function initAbstractModal() {
  const modal = document.getElementById('abstractModal');
  const openBtn = document.getElementById('openAbstractModalBtn');
  const closeBtn = document.getElementById('closeAbstractModal');
  const form = document.getElementById('abstractForm');

  if (openBtn && modal) {
    openBtn.addEventListener('click', () => {
      modal.style.display = 'flex';
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const title = document.getElementById('absTitle').value;
      const authors = document.getElementById('absAuthors').value;
      const area = document.getElementById('absArea').value;
      const mod = document.getElementById('absModality').value;
      const text = document.getElementById('absText').value;

      const subject = `Envío de Resumen TECNOVA 2026: ${title}`;
      const body =
`ENVÍO DE RESUMEN - CONGRESO TECNOVA 2026

Título del Trabajo:
${title}

Autores:
${authors}

Área Temática: ${area}
Modalidad de Presentación: ${mod}

Resumen Estructurado:
--------------------------------------------
${text}
--------------------------------------------`;

      const mailto = `mailto:tecred@usbbog.edu.co?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;

      if (modal) modal.style.display = 'none';
    });
  }
}

/* ==========================================================================
   7. CONTACT FORM
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactDirectForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const subjectText = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value;

    const subject = `[Consulta TECNOVA 2026] ${subjectText}`;
    const body =
`CONSULTA DESDE EL PORTAL WEB - TECNOVA 2026

Nombre: ${name}
Correo: ${email}
Asunto: ${subjectText}

Mensaje:
${message}`;

    const mailto = `mailto:tecred@usbbog.edu.co?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  });
}

/* ==========================================================================
   8. EMAIL STATUS MODAL
   ========================================================================== */
function initEmailStatusModal() {
  const statusModal = document.getElementById('emailStatusModal');
  const closeBtn = document.getElementById('closeEmailStatusModal');
  if (!statusModal) return;

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      statusModal.style.display = 'none';
    });
  }
}

/* ==========================================================================
   9. IMAGE ZOOM MODAL
   ========================================================================== */
function initImageZoomModal() {
  const heroImage = document.getElementById('heroImage');
  const openBtn = document.getElementById('openZoomHeroBtn');
  const modal = document.getElementById('imageZoomModal');
  const closeBtn = document.getElementById('closeZoomModal');

  if (openBtn && modal) {
    openBtn.addEventListener('click', () => {
      modal.style.display = 'flex';
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }
}

/* ==========================================================================
   10. MOBILE MENU TOGGLE
   ========================================================================== */
function initMobileMenu() {
  const toggle = document.getElementById('mobileMenuToggle');
  const menu = document.getElementById('navMenu');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
    const icon = toggle.querySelector('i');
    if (icon) {
      if (menu.classList.contains('active')) {
        icon.className = 'bi bi-x-lg';
      } else {
        icon.className = 'bi bi-list';
      }
    }
  });
}

/* ==========================================================================
   11. SCROLLSPY (ACTIVE NAV LINK ON SCROLL)
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        current = id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}
