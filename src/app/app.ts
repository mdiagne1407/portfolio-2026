import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class App implements OnInit {
  ngOnInit(): void {
    // Menu mobile
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        menuBtn.textContent = mobileMenu.classList.contains('open') ? '✕' : '☰';
      });
      // Fermer le menu au clic sur un lien
      document.querySelectorAll('.menu-link').forEach((link) => {
        link.addEventListener('click', () => {
          mobileMenu.classList.remove('open');
          menuBtn.textContent = '☰';
        });
      });
    }

    // Cursor glow
    const glow = document.getElementById('cursorGlow');
    if (glow) {
      document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
      });
    }

    // Reveal on scroll
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 },
    );
    reveals.forEach((el) => observer.observe(el));

    // Animate hero immediately
    setTimeout(() => {
      document.querySelectorAll('.hero .reveal').forEach((el) => {
        el.classList.add('visible');
      });
    }, 100);

    // Skill bars animation
    const barObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('.skill-bar-fill').forEach((bar: Element) => {
              const w = (bar as HTMLElement).getAttribute('data-width');
              if (w) (bar as HTMLElement).style.width = w + '%';
            });
            barObserver.unobserve(e.target);
          }
        });
      },
      { threshold: 0.3 },
    );
    document.querySelectorAll('.skill-card').forEach((card) => barObserver.observe(card));

    // Navbar scroll effect
    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      if (nav) {
        nav.style.borderBottomColor =
          window.scrollY > 50 ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.06)';
      }
    });
  }
}
