/* ==========================================================================
   TECNOVA 2026 - TEC-RED Interactive Application Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCountdownTimer();
  initAreaSearch();
  initCommitteeTabs();
  initAgendaTabs();
  initRegistrationForm();
  initAbstractModal();
  initContactDirectForm();
  initImageZoomModal();
  initMobileMenu();
  initActiveNavHighlight();
});

/* ==========================================================================
   1. Live Countdown Timer (Target: Nov 11, 2026)
   ========================================================================== */
function initCountdownTimer() {
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
   2. Areas Search & Filter
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
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

/* ==========================================================================
   3. Committee Tabs
   ========================================================================== */
const committeesData = {
  organizador: [
    { name: 'Juan Carlos Guevara Bolaños', role: 'Coordinador General', inst: 'Universidad Distrital Francisco José de Caldas' },
    { name: 'Nancy Esperanza Olarte López', role: 'Comité Organizador', inst: 'Universidad Militar Nueva Granada' },
    { name: 'Giovanni Sánchez Prieto', role: 'Comité Organizador', inst: 'Universidad de San Buenaventura' },
    { name: 'Rosita Alacantara Poma', role: 'Comité Organizador', inst: 'Universidad Nacional Mayor de San Marcos' },
    { name: 'Representante Institucional', role: 'Comité Organizador', inst: 'Fundación Universitaria Compensar' }
  ],
  cientifico: [
    { name: 'Lely Adriana Luengas Contreras', role: 'Evaluación Científica', inst: 'Universidad Distrital Francisco José de Caldas' },
    { name: 'Giovanni Sánchez Prieto', role: 'Comité Científico', inst: 'Universidad de San Buenaventura' },
    { name: 'Javier Alejandro Sáenz Leguizamon', role: 'Comité Científico', inst: 'Universidad Distrital Francisco José de Caldas' },
    { name: 'Gustavo Andrés Romero Duque', role: 'Comité Científico & Memorias', inst: 'Universidad Distrital Francisco José de Caldas' },
    { name: 'Gloria Andrea Cavanzo Nisso', role: 'Comité Científico', inst: 'Universidad Distrital Francisco José de Caldas' }
  ],
  academico: [
    { name: 'Juan Carlos Guevara Bolaños', role: 'Líder Académico', inst: 'Universidad Distrital Francisco José de Caldas' },
    { name: 'Nancy Esperanza Olarte López', role: 'Comité Académico', inst: 'Universidad Militar Nueva Granada' }
  ],
  logistico: [
    { name: 'Lely Adriana Luengas Contreras', role: 'Coordinación Logística & Auditorios', inst: 'Universidad Distrital Francisco José de Caldas' }
  ],
  comunicaciones: [
    { name: 'Nancy Esperanza Olarte López', role: 'Coordinación de Difusión & Medios', inst: 'Universidad Militar Nueva Granada' }
  ]
};

function initCommitteeTabs() {
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
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
}

/* ==========================================================================
   4. Agenda & Schedule Tabs
   ========================================================================== */
const scheduleData = {
  day1: [
    { time: '07:30 - 08:30', activity: 'Inscripción y Registro de Asistentes', place: 'Auditorio Aduanilla de Paiba', resp: 'Equipo de Logística', type: 'presencial' },
    { time: '08:30 - 09:00', activity: 'Instalación Oficial del Congreso TECNOVA 2026', place: 'Auditorio Aduanilla de Paiba', resp: 'Equipo Académico (Palabras de autoridades)', type: 'presencial' },
    { time: '09:00 - 09:45', activity: 'Conferencia Magistral Inaugural', place: 'Auditorio Aduanilla de Paiba', resp: 'Conferencista Invitado Internacional', type: 'presencial' },
    { time: '09:45 - 10:15', activity: 'Receso - Estación de Café & Muestra de Posters', place: 'Foyer Aduanilla de Paiba', resp: 'Equipo Logístico & Académico', type: 'presencial' },
    { time: '10:15 - 11:00', activity: 'Conferencia Magistral Temática', place: 'Auditorio Aduanilla de Paiba', resp: 'Equipo Académico', type: 'presencial' },
    { time: '11:00 - 12:00', activity: 'Mesa de Ponencias Presenciales - Bloque 1', place: 'Auditorio Aduanilla de Paiba', resp: 'Equipo Académico (Ponentes Selección 1)', type: 'presencial' },
    { time: '12:00 - 14:00', activity: 'Receso - Almuerzo Libre', place: 'Sede Aduanilla de Paiba', resp: 'Libre', type: 'presencial' },
    { time: '14:00 - 16:30', activity: 'Mesa de Ponencias Presenciales - Bloque 2', place: 'Auditorio Aduanilla de Paiba', resp: 'Equipo Académico (Ponentes Selección 2)', type: 'presencial' },
    { time: '16:30 - 17:00', activity: 'Cierre de la Jornada Presencial', place: 'Auditorio Aduanilla de Paiba', resp: 'Equipo Académico', type: 'presencial' },
    { time: '18:30 - 20:00', activity: 'Sesión de Ponencias Virtuales Internacionales', place: 'Plataforma Virtual TECNOVA', resp: 'Equipo de Logística & Plataforma Virtual', type: 'virtual' }
  ],
  day2: [
    { time: '07:30 - 08:30', activity: 'Inscripción y Entrega de Certificados', place: 'Auditorio Aduanilla de Paiba', resp: 'Equipo de Logística', type: 'presencial' },
    { time: '08:30 - 10:30', activity: 'Jornada de Empleabilidad Tecnológica & Estands Empresariales', place: 'Auditorio Aduanilla de Paiba', resp: 'Prof. Javier Sáenz & Empresas Participantes', type: 'especial' },
    { time: '10:30 - 11:00', activity: 'Receso - Estación de Café & Networking', place: 'Foyer Aduanilla de Paiba', resp: 'Equipo Logístico', type: 'presencial' },
    { time: '11:00 - 12:00', activity: 'Mesa de Ponencias Presenciales - Bloque 3', place: 'Auditorio Aduanilla de Paiba', resp: 'Equipo Académico', type: 'presencial' },
    { time: '12:00 - 14:00', activity: 'Receso - Almuerzo Libre', place: 'Sede Aduanilla de Paiba', resp: 'Libre', type: 'presencial' },
    { time: '14:00 - 16:30', activity: 'Mesa de Ponencias Presenciales - Bloque 4', place: 'Auditorio Aduanilla de Paiba', resp: 'Equipo Académico', type: 'presencial' },
    { time: '16:30 - 17:00', activity: 'Cierre de la Jornada Presencial', place: 'Auditorio Aduanilla de Paiba', resp: 'Equipo Académico', type: 'presencial' },
    { time: '18:30 - 20:00', activity: 'Sesión de Ponencias Virtuales - Bloque Nocturno', place: 'Plataforma Virtual TECNOVA', resp: 'Equipo Virtual', type: 'virtual' }
  ],
  day3: [
    { time: '07:30 - 08:30', activity: 'Inscripción y Acreditación Final', place: 'Auditorio Aduanilla de Paiba', resp: 'Equipo Logístico', type: 'presencial' },
    { time: '08:30 - 10:30', activity: 'Jornada de Emprendimiento e Innovación - Parte 1', place: 'Auditorio Aduanilla de Paiba', resp: 'Prof. Rosita Alcántara y Yadira García', type: 'especial' },
    { time: '10:30 - 11:00', activity: 'Receso - Estación de Café & Muestra de Prototipos', place: 'Foyer Aduanilla de Paiba', resp: 'Equipo Logístico', type: 'presencial' },
    { time: '11:00 - 13:00', activity: 'Jornada de Emprendimiento e Innovación - Parte 2', place: 'Auditorio Aduanilla de Paiba', resp: 'Prof. Rosita Alcántara y Yadira García', type: 'especial' },
    { time: '13:00 - 14:00', activity: 'Receso - Almuerzo Libre', place: 'Sede Aduanilla de Paiba', resp: 'Libre', type: 'presencial' },
    { time: '14:00 - 16:30', activity: 'Mesa de Ponencias Presenciales de Cierre', place: 'Auditorio Aduanilla de Paiba', resp: 'Equipo Académico', type: 'presencial' },
    { time: '16:30 - 17:00', activity: 'Clausura Oficial y Premiación del Congreso TECNOVA 2026', place: 'Auditorio Aduanilla de Paiba', resp: 'Comité Organizador TECNOVA', type: 'especial' },
    { time: '17:00 - 18:00', activity: 'Reunión Anual de Articulación TEC-RED', place: 'Sala de Consejo Aduanilla', resp: 'Coordinación de Red TEC-RED', type: 'presencial' }
  ]
};

function initAgendaTabs() {
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
          <div style="margin-top:0.3rem;">
            <span class="badge-tag tag-${item.type}">${item.type.toUpperCase()}</span>
          </div>
        </td>
        <td>${item.place}</td>
        <td>${item.resp}</td>
      </tr>
    `).join('');
  }

  dayBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      dayBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderDay(btn.dataset.day);
    });
  });

  renderDay('day1');
}

/* ==========================================================================
   5. Registration Form & Digital Pass Generation + Email Transmission
   ========================================================================== */
function initRegistrationForm() {
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

    // Fill badge content
    document.getElementById('badgeName').innerText = fullName;
    document.getElementById('badgeRole').innerText = typePart.toUpperCase();
    document.getElementById('badgeInst').innerText = inst;
    document.getElementById('badgeDoc').innerText = `${docType}: ${docNum}`;
    document.getElementById('badgeCityCountry').innerText = `${city}, ${country}`;

    // Build Email mailto link
    const subject = `[Inscripción TECNOVA 2026] - ${fullName} (${typePart})`;
    const body = 
      `REGISTRO DE INSCRIPCIÓN AL I CONGRESO INTERNACIONAL TECNOVA 2026\n` +
      `===============================================================\n` +
      `Nombres y Apellidos: ${fullName}\n` +
      `Documento: ${docType} ${docNum}\n` +
      `Correo Electrónico: ${email}\n` +
      `Institución/Universidad: ${inst}\n` +
      `Tipo de Participación: ${typePart}\n` +
      `Ubicación: ${city}, ${country}\n` +
      `===============================================================\n` +
      `Solicitud generada a través de la web oficial del Congreso TECNOVA 2026 / TEC-RED.`;

    currentMailto = `mailto:tecred@usbbog.edu.co?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Show Badge Modal
    modal.classList.add('active');

    // Also trigger mailto in background
    window.location.href = currentMailto;
  });

  if (btnSendRegEmail) {
    btnSendRegEmail.addEventListener('click', () => {
      if (currentMailto) {
        window.open(currentMailto, '_blank');
      }
    });
  }

  if (closeModal) {
    closeModal.addEventListener('click', () => {
      modal.classList.remove('active');
      form.reset();
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
}

/* ==========================================================================
   6. Abstract Submission Modal & Email Verification Modal
   ========================================================================== */
let activeMailtoUrl = '';
let activeMailBody = '';

function initAbstractModal() {
  const modal = document.getElementById('abstractModal');
  const openBtn = document.getElementById('openAbstractModalBtn');
  const closeBtn = document.getElementById('closeAbstractModal');
  const form = document.getElementById('abstractForm');

  if (!modal) return;

  if (openBtn) {
    openBtn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('absTitle').value;
      const authors = document.getElementById('absAuthors').value;
      const area = document.getElementById('absArea').value;
      const mod = document.getElementById('absModality').value;
      const text = document.getElementById('absText').value;

      const subject = `Envío de Resumen TECNOVA 2026: ${title}`;
      activeMailBody = 
        `PROPUESTA DE PONENCIA PARA TECNOVA 2026 (TEC-RED)\n` +
        `===================================================\n` +
        `Título: ${title}\n` +
        `Autores: ${authors}\n` +
        `Área Temática: ${area}\n` +
        `Modalidad de Presentación: ${mod}\n\n` +
        `RESUMEN ESTRUCTURADO:\n${text}\n` +
        `===================================================\n` +
        `Enviado desde el portal oficial del Congreso TECNOVA 2026.`;

      activeMailtoUrl = `mailto:tecred@usbbog.edu.co?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(activeMailBody)}`;

      modal.classList.remove('active');
      form.reset();

      // Show Status Modal
      showEmailConfirmationModal("Envío de Resumen de Ponencia", subject, activeMailBody, activeMailtoUrl);
    });
  }
}

/* ==========================================================================
   7. Direct Contact Form (`#contactDirectForm`)
   ========================================================================== */
function initContactDirectForm() {
  const form = document.getElementById('contactDirectForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const subjectText = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value;

    const subject = `[Consulta TECNOVA 2026] ${subjectText}`;
    activeMailBody = 
      `MENSAJE DE CONSULTA - CONGRESO TECNOVA 2026\n` +
      `=========================================\n` +
      `De: ${name} <${email}>\n` +
      `Asunto: ${subjectText}\n\n` +
      `MENSAJE:\n${message}\n` +
      `=========================================\n` +
      `Transmitido desde la sección de Contacto del portal TECNOVA 2026 / TEC-RED.`;

    activeMailtoUrl = `mailto:tecred@usbbog.edu.co?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(activeMailBody)}`;

    form.reset();
    showEmailConfirmationModal("Mensaje de Contacto", subject, activeMailBody, activeMailtoUrl);
  });
}

/* Helper to display the Email Confirmation Modal */
function showEmailConfirmationModal(typeTitle, subject, body, mailtoUrl) {
  const statusModal = document.getElementById('emailStatusModal');
  const closeBtn = document.getElementById('closeEmailStatusModal');
  const titleElem = document.getElementById('emailStatusTitle');
  const subjectElem = document.getElementById('emailStatusSubject');
  const bodyElem = document.getElementById('emailStatusBody');
  const btnLaunch = document.getElementById('btnLaunchMailClient');
  const btnCopy = document.getElementById('btnCopyEmailContent');

  if (titleElem) titleElem.innerText = `Confirmación: ${typeTitle}`;
  if (subjectElem) subjectElem.innerText = subject;
  if (bodyElem) bodyElem.innerText = body;

  if (btnLaunch) {
    btnLaunch.onclick = () => {
      window.location.href = mailtoUrl;
    };
  }

  if (btnCopy) {
    btnCopy.onclick = () => {
      const fullText = `Destinatario: tecred@usbbog.edu.co\nAsunto: ${subject}\n\n${body}`;
      navigator.clipboard.writeText(fullText).then(() => {
        alert('¡Texto del correo copiado exitosamente al portapapeles!');
      }).catch(() => {
        alert('No se pudo copiar automáticamente. Puedes seleccionar el texto manualmente.');
      });
    };
  }

  if (statusModal) statusModal.classList.add('active');

  if (closeBtn) {
    closeBtn.onclick = () => statusModal.classList.remove('active');
  }

  statusModal.onclick = (e) => {
    if (e.target === statusModal) statusModal.classList.remove('active');
  };

  // Trigger mailto immediately as well
  window.location.href = mailtoUrl;
}

/* ==========================================================================
   8. Image Zoom Modal (Hero Banner Expansion)
   ========================================================================== */
function initImageZoomModal() {
  const heroImage = document.getElementById('heroImage');
  const openBtn = document.getElementById('openZoomHeroBtn');
  const modal = document.getElementById('imageZoomModal');
  const closeBtn = document.getElementById('closeZoomModal');

  if (!modal) return;

  function openZoom() {
    modal.classList.add('active');
  }

  function closeZoom() {
    modal.classList.remove('active');
  }

  if (heroImage) heroImage.addEventListener('click', openZoom);
  if (openBtn) openBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    openZoom();
  });
  if (closeBtn) closeBtn.addEventListener('click', closeZoom);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeZoom();
  });
}

/* ==========================================================================
   9. Mobile Navigation & Scroll Highlighting
   ========================================================================== */
function initMobileMenu() {
  const toggle = document.getElementById('mobileMenuToggle');
  const menu = document.getElementById('navMenu');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
    const icon = toggle.querySelector('i');
    if (icon) {
      icon.className = menu.classList.contains('active') ? 'bi bi-x-lg' : 'bi bi-list';
    }
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
    });
  });
}

function initActiveNavHighlight() {
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
