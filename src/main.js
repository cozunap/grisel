// Grisel Beauty Spa: shared site behavior

document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var header = document.querySelector('.site-header');
  var backdrop = document.querySelector('.nav-backdrop');

  function openNav() {
    header.classList.add('nav-open');
    if (backdrop) backdrop.classList.add('show');
    document.body.classList.add('nav-locked');
    toggle.setAttribute('aria-expanded', 'true');
  }

  function closeNav() {
    header.classList.remove('nav-open');
    if (backdrop) backdrop.classList.remove('show');
    document.body.classList.remove('nav-locked');
    toggle.setAttribute('aria-expanded', 'false');
  }

  if (toggle && header) {
    toggle.addEventListener('click', function () {
      if (header.classList.contains('nav-open')) closeNav();
      else openNav();
    });

    if (backdrop) {
      backdrop.addEventListener('click', closeNav);
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });

    document.querySelectorAll('.nav-links a').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });
  }

  // Front-end form handling stub.
  // NOTE: These forms currently show a confirmation message only.
  // Before launch, wire the "booking-form" and "contact-form" submit events
  // below to a real backend (e.g. Formspree, a booking platform's API, or
  // an email service) so requests actually reach the spa.
  ['booking-form', 'contact-form'].forEach(function (formId) {
    var form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = form.querySelector('.form-status');
      if (status) {
        status.classList.add('success');
        status.textContent = "Thank you! Your request has been received. We'll be in touch within 24 hours to confirm.";
      }
      form.reset();
    });
  });

  // Highlight current page in nav
  var current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
});
