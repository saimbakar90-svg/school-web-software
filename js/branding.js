/**
 * TALL PINES SCHOOL — SHEIKHUPURA
 * Dynamic Branding, Color Themes & White-Label Customization Engine
 * Developer Credit Watermark: Design by Saima Mushtaq (saimbakar90@gmail.com)
 */

class BrandingManager {
  constructor() {
    this.colorPresets = [
      {
        id: 'tall-pines',
        name: 'Tall Pines Institutional',
        subtitle: 'Emerald Green & Rich Gold',
        primary: '#0e4d34',
        secondary: '#c99326'
      },
      {
        id: 'royal-navy',
        name: 'Royal Imperial Navy',
        subtitle: 'Deep Navy & Sapphire Blue',
        primary: '#1b2767',
        secondary: '#2563eb'
      },
      {
        id: 'burgundy-crimson',
        name: 'Regal Maroon & Amber',
        subtitle: 'Crimson Burgundy & Gold',
        primary: '#7f1d1d',
        secondary: '#d97706'
      },
      {
        id: 'midnight-violet',
        name: 'Midnight Amethyst',
        subtitle: 'Deep Violet & Royal Lavender',
        primary: '#4c1d95',
        secondary: '#8b5cf6'
      },
      {
        id: 'obsidian-slate',
        name: 'Obsidian Slate & Emerald',
        subtitle: 'Modern Charcoal & Bright Mint',
        primary: '#0f172a',
        secondary: '#10b981'
      },
      {
        id: 'ocean-teal',
        name: 'Ocean Teal & Amber',
        subtitle: 'Vibrant Teal & Sunburst',
        primary: '#0f766e',
        secondary: '#f59e0b'
      }
    ];

    this.schoolPresets = [
      {
        name: 'TALL PINES SCHOOL',
        campus: 'HIRAN MINAR CAMPUS — SHEIKHUPURA',
        tagline: 'Excellence & Integrity — Hiran Minar Campus',
        address: 'Hiran Minar Road, Sheikhupura, Punjab, Pakistan',
        phone: '+92 56 3781200 / +92 300 8475910',
        email: 'info@tallpinesschool.edu.pk',
        website: 'www.tallpinesschool.edu.pk',
        logoUrl: 'assets/logo.png',
        stampUrl: 'assets/stamp.png'
      },
      {
        name: 'AL-QALAM GRAMMAR SCHOOL',
        campus: 'CENTRAL CAMPUS — LAHORE',
        tagline: 'Illuminating Minds & Nurturing Character',
        address: 'Main Boulevard, Gulberg III, Lahore, Pakistan',
        phone: '+92 42 35789012',
        email: 'contact@alqalamgrammar.edu.pk',
        website: 'www.alqalamgrammar.edu.pk',
        logoUrl: 'assets/logo.png',
        stampUrl: 'assets/stamp.png'
      },
      {
        name: 'CADET PUBLIC SCHOOL',
        campus: 'OFFICERS COLONY — FAISALABAD',
        tagline: 'Discipline, Leadership & Academic Eminence',
        address: 'Satyana Road, Officers Colony, Faisalabad',
        phone: '+92 41 8765432',
        email: 'info@cadetpublic.edu.pk',
        website: 'www.cadetpublic.edu.pk',
        logoUrl: 'assets/logo.png',
        stampUrl: 'assets/stamp.png'
      }
    ];

    this.init();
  }

  init() {
    this.applyCurrentBranding();
    window.TPS_STATE.subscribe(() => {
      this.applyCurrentBranding();
    });
  }

  applyCurrentBranding() {
    const s = window.TPS_STATE.data.settings;
    if (!s) return;

    // Apply Dynamic Colors to CSS Root Variables
    const root = document.documentElement;
    if (s.primaryColor) {
      root.style.setProperty('--primary', s.primaryColor);
      root.style.setProperty('--primary-hover', this.darkenColor(s.primaryColor, 15));
      root.style.setProperty('--primary-light', this.lightenColor(s.primaryColor, 92));
      root.style.setProperty('--primary-rgb', this.hexToRgb(s.primaryColor));
      root.style.setProperty('--bg-sidebar', this.darkenColor(s.primaryColor, 35));
      root.style.setProperty('--bg-sidebar-hover', this.darkenColor(s.primaryColor, 20));
      root.style.setProperty('--bg-sidebar-active', this.darkenColor(s.primaryColor, 10));
    }
    if (s.secondaryColor) {
      root.style.setProperty('--secondary', s.secondaryColor);
      root.style.setProperty('--secondary-hover', this.darkenColor(s.secondaryColor, 15));
      root.style.setProperty('--secondary-light', this.lightenColor(s.secondaryColor, 92));
    }

    // Apply Brand Titles & Logos across DOM
    const logoElems = document.querySelectorAll('.dynamic-school-logo');
    const currentLogoUrl = s.logoUrl || 'assets/logo.png';
    logoElems.forEach(el => {
      if (el.tagName === 'IMG') {
        el.src = currentLogoUrl;
      }
    });

    // Update Full Page Background Logo Watermark (Rich & Visible)
    const bgWatermark = document.getElementById('page-bg-watermark');
    if (bgWatermark) {
      bgWatermark.style.backgroundImage = `url("${currentLogoUrl}")`;
      bgWatermark.style.opacity = '0.18';
      bgWatermark.style.display = 'block';
    }
    root.style.setProperty('--school-logo-bg', `url("${currentLogoUrl}")`);

    const nameElems = document.querySelectorAll('.dynamic-school-name');
    nameElems.forEach(el => {
      el.textContent = s.name;
    });

    const taglineElems = document.querySelectorAll('.dynamic-school-tagline');
    taglineElems.forEach(el => {
      el.textContent = s.tagline || s.campus || '';
    });

    const addressElems = document.querySelectorAll('.dynamic-school-address');
    addressElems.forEach(el => {
      el.textContent = s.address;
    });

    const contactElems = document.querySelectorAll('.dynamic-school-contact');
    contactElems.forEach(el => {
      el.textContent = `${s.phone} | ${s.email}`;
    });

    // Update document title
    document.title = `${s.name} | Modern Institutional ERP`;
  }

  hexToRgb(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    const num = parseInt(hex, 16);
    return `${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}`;
  }

  darkenColor(hex, percent) {
    let num = parseInt(hex.replace('#', ''), 16);
    let r = (num >> 16) - Math.round(255 * (percent / 100));
    let g = ((num >> 8) & 0x00FF) - Math.round(255 * (percent / 100));
    let b = (num & 0x0000FF) - Math.round(255 * (percent / 100));
    r = Math.max(Math.min(255, r), 5);
    g = Math.max(Math.min(255, g), 10);
    b = Math.max(Math.min(255, b), 10);
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }

  lightenColor(hex, percent) {
    let num = parseInt(hex.replace('#', ''), 16);
    let r = (num >> 16) + Math.round((255 - (num >> 16)) * (percent / 100));
    let g = ((num >> 8) & 0x00FF) + Math.round((255 - ((num >> 8) & 0x00FF)) * (percent / 100));
    let b = (num & 0x0000FF) + Math.round((255 - (num & 0x0000FF)) * (percent / 100));
    r = Math.min(255, Math.max(0, r));
    g = Math.min(255, Math.max(0, g));
    b = Math.min(255, Math.max(0, b));
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }

  setThemeColors(primary, secondary) {
    const s = window.TPS_STATE.data.settings;
    s.primaryColor = primary;
    s.secondaryColor = secondary;
    window.TPS_STATE.logAction('Theme Colors Changed', `Primary: ${primary}, Secondary: ${secondary}`);
    window.TPS_STATE.save();
    this.applyCurrentBranding();
  }

  saveBranding(newSettings) {
    const current = window.TPS_STATE.data.settings;
    window.TPS_STATE.data.settings = { ...current, ...newSettings };
    window.TPS_STATE.logAction('Branding Updated', 'School visual branding, logo or colors modified');
    window.TPS_STATE.save();
    this.applyCurrentBranding();
  }

  handleImageUpload(file, callback) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      callback(e.target.result);
    };
    reader.readAsDataURL(file);
  }
}

window.TPS_BRANDING = new BrandingManager();
