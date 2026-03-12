// ============================================================
// 32 DENTS HUMAINES - SVG Réaliste
// Numérotation FDI (système dentaire international)
// Mâchoire supérieure: 11-18 (droite) + 21-28 (gauche)
// Mâchoire inférieure: 41-48 (droite) + 31-38 (gauche)
// ============================================================
// Couleurs utilisées:
//   Émail:   #F5EFE0 (blanc ivoire)
//   Ombre:   #D4C9A8 (ombre naturelle)
//   Racine:  #C8A97A (racine / cément)
//   Gencive: #E8A0A0 (gencive légère)
//   Pulpe:   #F0D0C0 (canal interne)
// ============================================================

// ── MÂCHOIRE SUPÉRIEURE DROITE ──────────────────────────────

// 11 — Incisive centrale supérieure droite
const dent_11 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 120" width="60" height="120">
  <defs>
    <linearGradient id="g11" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#E8DFC8"/>
      <stop offset="40%" stop-color="#F8F2E2"/>
      <stop offset="100%" stop-color="#D4C9A8"/>
    </linearGradient>
    <linearGradient id="r11" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#B8976A"/>
      <stop offset="50%" stop-color="#D4AA80"/>
      <stop offset="100%" stop-color="#B8976A"/>
    </linearGradient>
  </defs>
  <!-- Racine -->
  <path d="M22,60 C20,80 19,95 21,115 C23,118 37,118 39,115 C41,95 40,80 38,60 Z" fill="url(#r11)" stroke="#A0825A" stroke-width="0.5"/>
  <!-- Collet -->
  <ellipse cx="30" cy="62" rx="14" ry="4" fill="#C8B090" opacity="0.6"/>
  <!-- Couronne -->
  <path d="M16,62 C14,55 13,45 14,35 C15,22 18,12 22,8 C25,5 35,5 38,8 C42,12 45,22 46,35 C47,45 46,55 44,62 Z" fill="url(#g11)" stroke="#C8B896" stroke-width="0.8"/>
  <!-- Bord incisal (bas de la couronne) -->
  <path d="M16,62 C18,64 25,65 30,65 C35,65 42,64 44,62" fill="none" stroke="#B8A880" stroke-width="1"/>
  <!-- Lobes de développement (légères lignes verticales) -->
  <line x1="24" y1="10" x2="23" y2="58" stroke="#D8CCA8" stroke-width="0.4" opacity="0.7"/>
  <line x1="30" y1="8" x2="30" y2="58" stroke="#D8CCA8" stroke-width="0.4" opacity="0.7"/>
  <line x1="36" y1="10" x2="37" y2="58" stroke="#D8CCA8" stroke-width="0.4" opacity="0.7"/>
  <!-- Reflet -->
  <path d="M20,15 C21,12 25,9 28,9 C26,20 20,35 19,50" fill="none" stroke="white" stroke-width="1.5" opacity="0.4" stroke-linecap="round"/>
</svg>`;

// 21 — Incisive centrale supérieure gauche
const dent_21 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 120" width="60" height="120">
  <defs>
    <linearGradient id="g21" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#D4C9A8"/>
      <stop offset="60%" stop-color="#F8F2E2"/>
      <stop offset="100%" stop-color="#E8DFC8"/>
    </linearGradient>
    <linearGradient id="r21" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#B8976A"/>
      <stop offset="50%" stop-color="#D4AA80"/>
      <stop offset="100%" stop-color="#B8976A"/>
    </linearGradient>
  </defs>
  <path d="M22,60 C20,80 19,95 21,115 C23,118 37,118 39,115 C41,95 40,80 38,60 Z" fill="url(#r21)" stroke="#A0825A" stroke-width="0.5"/>
  <ellipse cx="30" cy="62" rx="14" ry="4" fill="#C8B090" opacity="0.6"/>
  <path d="M16,62 C14,55 13,45 14,35 C15,22 18,12 22,8 C25,5 35,5 38,8 C42,12 45,22 46,35 C47,45 46,55 44,62 Z" fill="url(#g21)" stroke="#C8B896" stroke-width="0.8"/>
  <path d="M16,62 C18,64 25,65 30,65 C35,65 42,64 44,62" fill="none" stroke="#B8A880" stroke-width="1"/>
  <line x1="24" y1="10" x2="23" y2="58" stroke="#D8CCA8" stroke-width="0.4" opacity="0.7"/>
  <line x1="30" y1="8" x2="30" y2="58" stroke="#D8CCA8" stroke-width="0.4" opacity="0.7"/>
  <line x1="36" y1="10" x2="37" y2="58" stroke="#D8CCA8" stroke-width="0.4" opacity="0.7"/>
  <path d="M40,15 C39,12 35,9 32,9 C34,20 40,35 41,50" fill="none" stroke="white" stroke-width="1.5" opacity="0.4" stroke-linecap="round"/>
</svg>`;

// 12 — Incisive latérale supérieure droite
const dent_12 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 120" width="50" height="120">
  <defs>
    <linearGradient id="g12" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#E0D5BE"/>
      <stop offset="40%" stop-color="#F5EFE0"/>
      <stop offset="100%" stop-color="#CFC4A0"/>
    </linearGradient>
    <linearGradient id="r12" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#B09060"/>
      <stop offset="50%" stop-color="#CCA878"/>
      <stop offset="100%" stop-color="#B09060"/>
    </linearGradient>
  </defs>
  <path d="M18,58 C16,78 15,95 17,112 C18,116 32,116 33,112 C35,95 34,78 32,58 Z" fill="url(#r12)" stroke="#9A7A4A" stroke-width="0.5"/>
  <ellipse cx="25" cy="60" rx="11" ry="3.5" fill="#C0A880" opacity="0.6"/>
  <path d="M14,60 C12,53 12,42 13,32 C14,20 17,11 20,8 C22,6 28,6 30,8 C33,11 36,20 37,32 C38,42 38,53 36,60 Z" fill="url(#g12)" stroke="#C0B488" stroke-width="0.8"/>
  <path d="M14,60 C16,62 21,63 25,63 C29,63 34,62 36,60" fill="none" stroke="#B0A070" stroke-width="0.8"/>
  <line x1="22" y1="10" x2="21" y2="56" stroke="#D0C498" stroke-width="0.4" opacity="0.6"/>
  <line x1="25" y1="8" x2="25" y2="56" stroke="#D0C498" stroke-width="0.4" opacity="0.6"/>
  <line x1="28" y1="10" x2="29" y2="56" stroke="#D0C498" stroke-width="0.4" opacity="0.6"/>
  <path d="M17,14 C18,11 21,9 23,9 C22,18 17,30 16,44" fill="none" stroke="white" stroke-width="1.2" opacity="0.4" stroke-linecap="round"/>
</svg>`;

// 22 — Incisive latérale supérieure gauche
const dent_22 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 120" width="50" height="120">
  <defs>
    <linearGradient id="g22" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#CFC4A0"/>
      <stop offset="60%" stop-color="#F5EFE0"/>
      <stop offset="100%" stop-color="#E0D5BE"/>
    </linearGradient>
    <linearGradient id="r22" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#B09060"/>
      <stop offset="50%" stop-color="#CCA878"/>
      <stop offset="100%" stop-color="#B09060"/>
    </linearGradient>
  </defs>
  <path d="M18,58 C16,78 15,95 17,112 C18,116 32,116 33,112 C35,95 34,78 32,58 Z" fill="url(#r22)" stroke="#9A7A4A" stroke-width="0.5"/>
  <ellipse cx="25" cy="60" rx="11" ry="3.5" fill="#C0A880" opacity="0.6"/>
  <path d="M14,60 C12,53 12,42 13,32 C14,20 17,11 20,8 C22,6 28,6 30,8 C33,11 36,20 37,32 C38,42 38,53 36,60 Z" fill="url(#g22)" stroke="#C0B488" stroke-width="0.8"/>
  <path d="M14,60 C16,62 21,63 25,63 C29,63 34,62 36,60" fill="none" stroke="#B0A070" stroke-width="0.8"/>
  <line x1="22" y1="10" x2="21" y2="56" stroke="#D0C498" stroke-width="0.4" opacity="0.6"/>
  <line x1="25" y1="8" x2="25" y2="56" stroke="#D0C498" stroke-width="0.4" opacity="0.6"/>
  <line x1="28" y1="10" x2="29" y2="56" stroke="#D0C498" stroke-width="0.4" opacity="0.6"/>
  <path d="M33,14 C32,11 29,9 27,9 C28,18 33,30 34,44" fill="none" stroke="white" stroke-width="1.2" opacity="0.4" stroke-linecap="round"/>
</svg>`;

// 13 — Canine supérieure droite
const dent_13 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 55 140" width="55" height="140">
  <defs>
    <linearGradient id="g13" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#DDD0B0"/>
      <stop offset="35%" stop-color="#F5EFE0"/>
      <stop offset="100%" stop-color="#C8BC98"/>
    </linearGradient>
    <linearGradient id="r13" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#A88050"/>
      <stop offset="50%" stop-color="#C89E70"/>
      <stop offset="100%" stop-color="#A88050"/>
    </linearGradient>
  </defs>
  <!-- Racine longue canine -->
  <path d="M20,68 C18,90 17,110 19,132 C20,136 35,136 36,132 C38,110 37,90 35,68 Z" fill="url(#r13)" stroke="#906040" stroke-width="0.5"/>
  <ellipse cx="27" cy="70" rx="12" ry="4" fill="#B89870" opacity="0.6"/>
  <!-- Couronne canine pointue -->
  <path d="M15,70 C13,60 13,48 15,36 C17,24 20,14 24,8 C26,4 28,3 30,5 C32,3 34,4 36,8 C40,14 43,24 42,36 C41,48 40,60 39,70 Z" fill="url(#g13)" stroke="#B8AC88" stroke-width="0.8"/>
  <!-- Pointe cuspide -->
  <path d="M24,8 C27,2 29,1 30,5 C31,1 33,2 36,8" fill="#F0E8D0" stroke="#C0B490" stroke-width="0.5"/>
  <!-- Crête -->
  <line x1="30" y1="5" x2="30" y2="65" stroke="#D8CC9A" stroke-width="0.5" opacity="0.8"/>
  <path d="M18,18 C19,14 22,10 25,9 C23,22 18,38 17,55" fill="none" stroke="white" stroke-width="1.5" opacity="0.4" stroke-linecap="round"/>
</svg>`;

// 23 — Canine supérieure gauche
const dent_23 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 55 140" width="55" height="140">
  <defs>
    <linearGradient id="g23" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#C8BC98"/>
      <stop offset="65%" stop-color="#F5EFE0"/>
      <stop offset="100%" stop-color="#DDD0B0"/>
    </linearGradient>
    <linearGradient id="r23" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#A88050"/>
      <stop offset="50%" stop-color="#C89E70"/>
      <stop offset="100%" stop-color="#A88050"/>
    </linearGradient>
  </defs>
  <path d="M20,68 C18,90 17,110 19,132 C20,136 35,136 36,132 C38,110 37,90 35,68 Z" fill="url(#r23)" stroke="#906040" stroke-width="0.5"/>
  <ellipse cx="27" cy="70" rx="12" ry="4" fill="#B89870" opacity="0.6"/>
  <path d="M15,70 C13,60 13,48 15,36 C17,24 20,14 24,8 C26,4 28,3 30,5 C32,3 34,4 36,8 C40,14 43,24 42,36 C41,48 40,60 39,70 Z" fill="url(#g23)" stroke="#B8AC88" stroke-width="0.8"/>
  <path d="M24,8 C27,2 29,1 30,5 C31,1 33,2 36,8" fill="#F0E8D0" stroke="#C0B490" stroke-width="0.5"/>
  <line x1="30" y1="5" x2="30" y2="65" stroke="#D8CC9A" stroke-width="0.5" opacity="0.8"/>
  <path d="M42,18 C41,14 38,10 35,9 C37,22 42,38 43,55" fill="none" stroke="white" stroke-width="1.5" opacity="0.4" stroke-linecap="round"/>
</svg>`;

// 14 — Première prémolaire supérieure droite
const dent_14 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 130" width="60" height="130">
  <defs>
    <linearGradient id="g14" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#D8CCAA"/>
      <stop offset="40%" stop-color="#F0E8D0"/>
      <stop offset="100%" stop-color="#C4B890"/>
    </linearGradient>
    <linearGradient id="r14a" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#A07848"/>
      <stop offset="50%" stop-color="#C09468"/>
      <stop offset="100%" stop-color="#A07848"/>
    </linearGradient>
  </defs>
  <!-- Deux racines prémolaire -->
  <path d="M17,68 C15,88 14,108 16,126 C17,129 26,129 27,126 C28,108 27,90 26,68 Z" fill="url(#r14a)" stroke="#886038" stroke-width="0.5"/>
  <path d="M33,68 C32,88 32,108 33,126 C34,129 43,129 44,126 C45,108 45,90 43,68 Z" fill="url(#r14a)" stroke="#886038" stroke-width="0.5"/>
  <ellipse cx="30" cy="70" rx="14" ry="4" fill="#B09068" opacity="0.6"/>
  <!-- Couronne avec 2 cuspides -->
  <path d="M16,70 C14,62 13,50 14,38 C15,26 18,16 22,11 C24,8 26,7 30,9 C34,7 36,8 38,11 C42,16 45,26 46,38 C47,50 46,62 44,70 Z" fill="url(#g14)" stroke="#B4A882" stroke-width="0.8"/>
  <!-- Deux cuspides -->
  <path d="M22,11 C25,5 28,7 30,9 C32,7 35,5 38,11" fill="#EEE4C8" stroke="#B8AC80" stroke-width="0.6"/>
  <!-- Sillon central -->
  <path d="M30,9 C30,25 30,45 30,65" stroke="#C0B488" stroke-width="1" opacity="0.6" fill="none"/>
  <!-- Fosse occlusale -->
  <ellipse cx="30" cy="38" rx="6" ry="3" fill="none" stroke="#A09068" stroke-width="0.5" opacity="0.5"/>
  <path d="M18,18 C19,14 22,11 25,10" fill="none" stroke="white" stroke-width="1.2" opacity="0.4" stroke-linecap="round"/>
</svg>`;

// 24 — Première prémolaire supérieure gauche
const dent_24 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 130" width="60" height="130">
  <defs>
    <linearGradient id="g24" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#C4B890"/>
      <stop offset="60%" stop-color="#F0E8D0"/>
      <stop offset="100%" stop-color="#D8CCAA"/>
    </linearGradient>
    <linearGradient id="r24a" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#A07848"/>
      <stop offset="50%" stop-color="#C09468"/>
      <stop offset="100%" stop-color="#A07848"/>
    </linearGradient>
  </defs>
  <path d="M17,68 C15,88 14,108 16,126 C17,129 26,129 27,126 C28,108 27,90 26,68 Z" fill="url(#r24a)" stroke="#886038" stroke-width="0.5"/>
  <path d="M33,68 C32,88 32,108 33,126 C34,129 43,129 44,126 C45,108 45,90 43,68 Z" fill="url(#r24a)" stroke="#886038" stroke-width="0.5"/>
  <ellipse cx="30" cy="70" rx="14" ry="4" fill="#B09068" opacity="0.6"/>
  <path d="M16,70 C14,62 13,50 14,38 C15,26 18,16 22,11 C24,8 26,7 30,9 C34,7 36,8 38,11 C42,16 45,26 46,38 C47,50 46,62 44,70 Z" fill="url(#g24)" stroke="#B4A882" stroke-width="0.8"/>
  <path d="M22,11 C25,5 28,7 30,9 C32,7 35,5 38,11" fill="#EEE4C8" stroke="#B8AC80" stroke-width="0.6"/>
  <path d="M30,9 C30,25 30,45 30,65" stroke="#C0B488" stroke-width="1" opacity="0.6" fill="none"/>
  <ellipse cx="30" cy="38" rx="6" ry="3" fill="none" stroke="#A09068" stroke-width="0.5" opacity="0.5"/>
  <path d="M42,18 C41,14 38,11 35,10" fill="none" stroke="white" stroke-width="1.2" opacity="0.4" stroke-linecap="round"/>
</svg>`;

// 15 — Deuxième prémolaire supérieure droite
const dent_15 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 125" width="60" height="125">
  <defs>
    <linearGradient id="g15" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#D8CCAA"/>
      <stop offset="40%" stop-color="#EFE6CC"/>
      <stop offset="100%" stop-color="#C4B890"/>
    </linearGradient>
    <linearGradient id="r15" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#A07848"/>
      <stop offset="50%" stop-color="#BE9266"/>
      <stop offset="100%" stop-color="#A07848"/>
    </linearGradient>
  </defs>
  <!-- Racine unique -->
  <path d="M20,66 C18,86 17,104 19,120 C20,123 40,123 41,120 C43,104 42,86 40,66 Z" fill="url(#r15)" stroke="#886038" stroke-width="0.5"/>
  <ellipse cx="30" cy="68" rx="13" ry="3.5" fill="#B09068" opacity="0.6"/>
  <path d="M16,68 C14,60 14,48 15,36 C16,24 19,14 23,10 C25,7 28,6 30,8 C32,6 35,7 37,10 C41,14 44,24 45,36 C46,48 46,60 44,68 Z" fill="url(#g15)" stroke="#B4A882" stroke-width="0.8"/>
  <path d="M23,10 C26,4 29,6 30,8 C31,6 34,4 37,10" fill="#EDE2C4" stroke="#B8AC80" stroke-width="0.6"/>
  <path d="M30,8 C30,24 30,44 30,63" stroke="#C0B488" stroke-width="0.8" opacity="0.6" fill="none"/>
  <ellipse cx="30" cy="36" rx="6" ry="3" fill="none" stroke="#A09068" stroke-width="0.5" opacity="0.5"/>
  <path d="M18,18 C19,14 22,11 25,10" fill="none" stroke="white" stroke-width="1.2" opacity="0.35" stroke-linecap="round"/>
</svg>`;

// 25 — Deuxième prémolaire supérieure gauche
const dent_25 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 125" width="60" height="125">
  <defs>
    <linearGradient id="g25" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#C4B890"/>
      <stop offset="60%" stop-color="#EFE6CC"/>
      <stop offset="100%" stop-color="#D8CCAA"/>
    </linearGradient>
    <linearGradient id="r25" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#A07848"/>
      <stop offset="50%" stop-color="#BE9266"/>
      <stop offset="100%" stop-color="#A07848"/>
    </linearGradient>
  </defs>
  <path d="M20,66 C18,86 17,104 19,120 C20,123 40,123 41,120 C43,104 42,86 40,66 Z" fill="url(#r25)" stroke="#886038" stroke-width="0.5"/>
  <ellipse cx="30" cy="68" rx="13" ry="3.5" fill="#B09068" opacity="0.6"/>
  <path d="M16,68 C14,60 14,48 15,36 C16,24 19,14 23,10 C25,7 28,6 30,8 C32,6 35,7 37,10 C41,14 44,24 45,36 C46,48 46,60 44,68 Z" fill="url(#g25)" stroke="#B4A882" stroke-width="0.8"/>
  <path d="M23,10 C26,4 29,6 30,8 C31,6 34,4 37,10" fill="#EDE2C4" stroke="#B8AC80" stroke-width="0.6"/>
  <path d="M30,8 C30,24 30,44 30,63" stroke="#C0B488" stroke-width="0.8" opacity="0.6" fill="none"/>
  <ellipse cx="30" cy="36" rx="6" ry="3" fill="none" stroke="#A09068" stroke-width="0.5" opacity="0.5"/>
  <path d="M42,18 C41,14 38,11 35,10" fill="none" stroke="white" stroke-width="1.2" opacity="0.35" stroke-linecap="round"/>
</svg>`;

// 16 — Première molaire supérieure droite
const dent_16 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 125" width="75" height="125">
  <defs>
    <linearGradient id="g16" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#CEC098"/>
      <stop offset="40%" stop-color="#EDE4C8"/>
      <stop offset="100%" stop-color="#BCB088"/>
    </linearGradient>
    <linearGradient id="r16" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#9A7240"/>
      <stop offset="50%" stop-color="#B88E60"/>
      <stop offset="100%" stop-color="#9A7240"/>
    </linearGradient>
  </defs>
  <!-- 3 racines molaire supérieure -->
  <path d="M14,70 C12,88 11,106 13,120 C14,123 22,123 23,120 C24,106 23,90 22,70 Z" fill="url(#r16)" stroke="#806030" stroke-width="0.5"/>
  <path d="M30,72 C29,90 28,108 29,120 C30,123 38,123 39,120 C40,108 40,92 39,72 Z" fill="url(#r16)" stroke="#806030" stroke-width="0.5"/>
  <path d="M50,70 C49,88 49,106 50,120 C51,123 61,123 62,120 C63,106 62,90 61,70 Z" fill="url(#r16)" stroke="#806030" stroke-width="0.5"/>
  <ellipse cx="37" cy="73" rx="20" ry="4.5" fill="#A88860" opacity="0.6"/>
  <!-- Couronne large molaire -->
  <path d="M12,73 C11,64 11,52 12,40 C13,28 17,18 22,13 C25,10 28,9 30,11 C33,8 38,8 43,11 C48,9 51,10 54,13 C59,18 63,28 64,40 C65,52 65,64 63,73 Z" fill="url(#g16)" stroke="#ACA07A" stroke-width="0.9"/>
  <!-- 4 cuspides + sillons -->
  <path d="M22,13 C26,7 30,9 30,11 C32,8 37,7 40,9" fill="#EAE0C4" stroke="#B0A478" stroke-width="0.6"/>
  <path d="M43,11 C46,8 50,9 54,13" fill="#EAE0C4" stroke="#B0A478" stroke-width="0.6"/>
  <!-- Sillons occlusaux -->
  <path d="M37,11 C37,30 37,50 37,68" stroke="#BAAE88" stroke-width="0.8" opacity="0.6" fill="none"/>
  <path d="M12,42 C28,42 46,42 64,42" stroke="#BAAE88" stroke-width="0.8" opacity="0.6" fill="none"/>
  <!-- Fossettes -->
  <ellipse cx="25" cy="30" rx="4" ry="2.5" fill="none" stroke="#9A9070" stroke-width="0.5" opacity="0.5"/>
  <ellipse cx="50" cy="30" rx="4" ry="2.5" fill="none" stroke="#9A9070" stroke-width="0.5" opacity="0.5"/>
  <ellipse cx="25" cy="52" rx="4" ry="2.5" fill="none" stroke="#9A9070" stroke-width="0.5" opacity="0.5"/>
  <ellipse cx="50" cy="52" rx="4" ry="2.5" fill="none" stroke="#9A9070" stroke-width="0.5" opacity="0.5"/>
  <path d="M15,20 C16,16 19,13 22,12" fill="none" stroke="white" stroke-width="1.5" opacity="0.35" stroke-linecap="round"/>
</svg>`;

// 26 — Première molaire supérieure gauche
const dent_26 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 125" width="75" height="125">
  <defs>
    <linearGradient id="g26" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#BCB088"/>
      <stop offset="60%" stop-color="#EDE4C8"/>
      <stop offset="100%" stop-color="#CEC098"/>
    </linearGradient>
    <linearGradient id="r26" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#9A7240"/>
      <stop offset="50%" stop-color="#B88E60"/>
      <stop offset="100%" stop-color="#9A7240"/>
    </linearGradient>
  </defs>
  <path d="M14,70 C12,88 11,106 13,120 C14,123 22,123 23,120 C24,106 23,90 22,70 Z" fill="url(#r26)" stroke="#806030" stroke-width="0.5"/>
  <path d="M30,72 C29,90 28,108 29,120 C30,123 38,123 39,120 C40,108 40,92 39,72 Z" fill="url(#r26)" stroke="#806030" stroke-width="0.5"/>
  <path d="M50,70 C49,88 49,106 50,120 C51,123 61,123 62,120 C63,106 62,90 61,70 Z" fill="url(#r26)" stroke="#806030" stroke-width="0.5"/>
  <ellipse cx="37" cy="73" rx="20" ry="4.5" fill="#A88860" opacity="0.6"/>
  <path d="M12,73 C11,64 11,52 12,40 C13,28 17,18 22,13 C25,10 28,9 30,11 C33,8 38,8 43,11 C48,9 51,10 54,13 C59,18 63,28 64,40 C65,52 65,64 63,73 Z" fill="url(#g26)" stroke="#ACA07A" stroke-width="0.9"/>
  <path d="M22,13 C26,7 30,9 30,11 C32,8 37,7 40,9" fill="#EAE0C4" stroke="#B0A478" stroke-width="0.6"/>
  <path d="M43,11 C46,8 50,9 54,13" fill="#EAE0C4" stroke="#B0A478" stroke-width="0.6"/>
  <path d="M37,11 C37,30 37,50 37,68" stroke="#BAAE88" stroke-width="0.8" opacity="0.6" fill="none"/>
  <path d="M12,42 C28,42 46,42 64,42" stroke="#BAAE88" stroke-width="0.8" opacity="0.6" fill="none"/>
  <ellipse cx="25" cy="30" rx="4" ry="2.5" fill="none" stroke="#9A9070" stroke-width="0.5" opacity="0.5"/>
  <ellipse cx="50" cy="30" rx="4" ry="2.5" fill="none" stroke="#9A9070" stroke-width="0.5" opacity="0.5"/>
  <ellipse cx="25" cy="52" rx="4" ry="2.5" fill="none" stroke="#9A9070" stroke-width="0.5" opacity="0.5"/>
  <ellipse cx="50" cy="52" rx="4" ry="2.5" fill="none" stroke="#9A9070" stroke-width="0.5" opacity="0.5"/>
  <path d="M60,20 C59,16 56,13 53,12" fill="none" stroke="white" stroke-width="1.5" opacity="0.35" stroke-linecap="round"/>
</svg>`;

// 17 — Deuxième molaire supérieure droite
const dent_17 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 120" width="72" height="120">
  <defs>
    <linearGradient id="g17" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#C8BC94"/>
      <stop offset="40%" stop-color="#E8DEC2"/>
      <stop offset="100%" stop-color="#B8AC84"/>
    </linearGradient>
    <linearGradient id="r17" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#98703E"/>
      <stop offset="50%" stop-color="#B48C5E"/>
      <stop offset="100%" stop-color="#98703E"/>
    </linearGradient>
  </defs>
  <path d="M14,68 C12,86 11,102 13,116 C14,119 21,119 22,116 C23,102 22,87 21,68 Z" fill="url(#r17)" stroke="#7A5E2E" stroke-width="0.5"/>
  <path d="M30,70 C29,88 28,104 29,116 C30,119 38,119 39,116 C40,104 39,89 38,70 Z" fill="url(#r17)" stroke="#7A5E2E" stroke-width="0.5"/>
  <path d="M48,68 C47,86 47,102 48,116 C49,119 58,119 59,116 C60,102 59,88 58,68 Z" fill="url(#r17)" stroke="#7A5E2E" stroke-width="0.5"/>
  <ellipse cx="36" cy="71" rx="19" ry="4" fill="#A48658" opacity="0.6"/>
  <path d="M13,71 C12,62 12,50 13,38 C14,26 18,16 23,12 C26,9 29,8 31,10 C34,7 39,7 42,10 C45,8 48,9 51,12 C56,16 60,26 61,38 C62,50 61,62 60,71 Z" fill="url(#g17)" stroke="#A89E78" stroke-width="0.9"/>
  <path d="M23,12 C27,6 31,8 31,10 C33,7 38,6 42,10" fill="#E8DEC0" stroke="#AEAA7A" stroke-width="0.6"/>
  <path d="M42,10 C45,7 49,8 51,12" fill="#E8DEC0" stroke="#AEAA7A" stroke-width="0.6"/>
  <path d="M36,10 C36,28 36,48 36,66" stroke="#B8B08A" stroke-width="0.7" opacity="0.6" fill="none"/>
  <path d="M13,40 C27,40 45,40 61,40" stroke="#B8B08A" stroke-width="0.7" opacity="0.6" fill="none"/>
  <ellipse cx="24" cy="28" rx="4" ry="2.5" fill="none" stroke="#989068" stroke-width="0.5" opacity="0.5"/>
  <ellipse cx="48" cy="28" rx="4" ry="2.5" fill="none" stroke="#989068" stroke-width="0.5" opacity="0.5"/>
  <ellipse cx="24" cy="50" rx="4" ry="2.5" fill="none" stroke="#989068" stroke-width="0.5" opacity="0.5"/>
  <ellipse cx="48" cy="50" rx="4" ry="2.5" fill="none" stroke="#989068" stroke-width="0.5" opacity="0.5"/>
  <path d="M15,18 C16,14 20,12 23,11" fill="none" stroke="white" stroke-width="1.2" opacity="0.3" stroke-linecap="round"/>
</svg>`;

// 27 — Deuxième molaire supérieure gauche
const dent_27 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 120" width="72" height="120">
  <defs>
    <linearGradient id="g27" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#B8AC84"/>
      <stop offset="60%" stop-color="#E8DEC2"/>
      <stop offset="100%" stop-color="#C8BC94"/>
    </linearGradient>
    <linearGradient id="r27" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#98703E"/>
      <stop offset="50%" stop-color="#B48C5E"/>
      <stop offset="100%" stop-color="#98703E"/>
    </linearGradient>
  </defs>
  <path d="M14,68 C12,86 11,102 13,116 C14,119 21,119 22,116 C23,102 22,87 21,68 Z" fill="url(#r27)" stroke="#7A5E2E" stroke-width="0.5"/>
  <path d="M30,70 C29,88 28,104 29,116 C30,119 38,119 39,116 C40,104 39,89 38,70 Z" fill="url(#r27)" stroke="#7A5E2E" stroke-width="0.5"/>
  <path d="M48,68 C47,86 47,102 48,116 C49,119 58,119 59,116 C60,102 59,88 58,68 Z" fill="url(#r27)" stroke="#7A5E2E" stroke-width="0.5"/>
  <ellipse cx="36" cy="71" rx="19" ry="4" fill="#A48658" opacity="0.6"/>
  <path d="M13,71 C12,62 12,50 13,38 C14,26 18,16 23,12 C26,9 29,8 31,10 C34,7 39,7 42,10 C45,8 48,9 51,12 C56,16 60,26 61,38 C62,50 61,62 60,71 Z" fill="url(#g27)" stroke="#A89E78" stroke-width="0.9"/>
  <path d="M23,12 C27,6 31,8 31,10 C33,7 38,6 42,10" fill="#E8DEC0" stroke="#AEAA7A" stroke-width="0.6"/>
  <path d="M42,10 C45,7 49,8 51,12" fill="#E8DEC0" stroke="#AEAA7A" stroke-width="0.6"/>
  <path d="M36,10 C36,28 36,48 36,66" stroke="#B8B08A" stroke-width="0.7" opacity="0.6" fill="none"/>
  <path d="M13,40 C27,40 45,40 61,40" stroke="#B8B08A" stroke-width="0.7" opacity="0.6" fill="none"/>
  <ellipse cx="24" cy="28" rx="4" ry="2.5" fill="none" stroke="#989068" stroke-width="0.5" opacity="0.5"/>
  <ellipse cx="48" cy="28" rx="4" ry="2.5" fill="none" stroke="#989068" stroke-width="0.5" opacity="0.5"/>
  <ellipse cx="24" cy="50" rx="4" ry="2.5" fill="none" stroke="#989068" stroke-width="0.5" opacity="0.5"/>
  <ellipse cx="48" cy="50" rx="4" ry="2.5" fill="none" stroke="#989068" stroke-width="0.5" opacity="0.5"/>
  <path d="M57,18 C56,14 52,12 49,11" fill="none" stroke="white" stroke-width="1.2" opacity="0.3" stroke-linecap="round"/>
</svg>`;

// 18 — Troisième molaire supérieure droite (dent de sagesse)
const dent_18 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 115" width="68" height="115">
  <defs>
    <linearGradient id="g18" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#C4B88C"/>
      <stop offset="40%" stop-color="#E4DAC0"/>
      <stop offset="100%" stop-color="#B0A47C"/>
    </linearGradient>
    <linearGradient id="r18" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#946C38"/>
      <stop offset="50%" stop-color="#AE8858"/>
      <stop offset="100%" stop-color="#946C38"/>
    </linearGradient>
  </defs>
  <!-- Racines fusionnées/irrégulières typiques sagesse -->
  <path d="M15,66 C12,84 10,100 12,112 C14,115 54,115 56,112 C58,100 56,84 53,66 Z" fill="url(#r18)" stroke="#765828" stroke-width="0.5"/>
  <!-- Irrégularités racines sagesse -->
  <path d="M25,72 C22,86 21,102 23,112" stroke="#886438" stroke-width="1" fill="none" opacity="0.6"/>
  <path d="M43,72 C45,86 46,102 44,112" stroke="#886438" stroke-width="1" fill="none" opacity="0.6"/>
  <ellipse cx="34" cy="68" rx="19" ry="4" fill="#A08258" opacity="0.6"/>
  <!-- Couronne plus petite, irrégulière -->
  <path d="M14,68 C12,58 12,46 13,35 C14,24 18,15 23,11 C26,8 30,7 34,9 C38,7 42,8 45,11 C50,15 54,24 55,35 C56,46 55,58 54,68 Z" fill="url(#g18)" stroke="#A49C74" stroke-width="0.9"/>
  <!-- Cuspides multiples irrégulières -->
  <path d="M23,11 C27,5 31,7 34,9 C37,7 41,5 45,11" fill="#E2D8BA" stroke="#AAA47A" stroke-width="0.6"/>
  <path d="M18,35 C26,35 42,35 50,35" stroke="#B0A880" stroke-width="0.7" opacity="0.5" fill="none"/>
  <path d="M34,9 C34,26 34,46 34,63" stroke="#B4AC84" stroke-width="0.7" opacity="0.5" fill="none"/>
  <ellipse cx="24" cy="25" rx="3.5" ry="2" fill="none" stroke="#94906A" stroke-width="0.5" opacity="0.5"/>
  <ellipse cx="44" cy="25" rx="3.5" ry="2" fill="none" stroke="#94906A" stroke-width="0.5" opacity="0.5"/>
  <ellipse cx="24" cy="48" rx="3.5" ry="2" fill="none" stroke="#94906A" stroke-width="0.5" opacity="0.5"/>
  <ellipse cx="44" cy="48" rx="3.5" ry="2" fill="none" stroke="#94906A" stroke-width="0.5" opacity="0.5"/>
  <path d="M15,18 C16,14 19,12 22,11" fill="none" stroke="white" stroke-width="1.2" opacity="0.3" stroke-linecap="round"/>
</svg>`;

// 28 — Troisième molaire supérieure gauche (dent de sagesse)
const dent_28 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 115" width="68" height="115">
  <defs>
    <linearGradient id="g28" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#B0A47C"/>
      <stop offset="60%" stop-color="#E4DAC0"/>
      <stop offset="100%" stop-color="#C4B88C"/>
    </linearGradient>
    <linearGradient id="r28" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#946C38"/>
      <stop offset="50%" stop-color="#AE8858"/>
      <stop offset="100%" stop-color="#946C38"/>
    </linearGradient>
  </defs>
  <path d="M15,66 C12,84 10,100 12,112 C14,115 54,115 56,112 C58,100 56,84 53,66 Z" fill="url(#r28)" stroke="#765828" stroke-width="0.5"/>
  <path d="M25,72 C22,86 21,102 23,112" stroke="#886438" stroke-width="1" fill="none" opacity="0.6"/>
  <path d="M43,72 C45,86 46,102 44,112" stroke="#886438" stroke-width="1" fill="none" opacity="0.6"/>
  <ellipse cx="34" cy="68" rx="19" ry="4" fill="#A08258" opacity="0.6"/>
  <path d="M14,68 C12,58 12,46 13,35 C14,24 18,15 23,11 C26,8 30,7 34,9 C38,7 42,8 45,11 C50,15 54,24 55,35 C56,46 55,58 54,68 Z" fill="url(#g28)" stroke="#A49C74" stroke-width="0.9"/>
  <path d="M23,11 C27,5 31,7 34,9 C37,7 41,5 45,11" fill="#E2D8BA" stroke="#AAA47A" stroke-width="0.6"/>
  <path d="M18,35 C26,35 42,35 50,35" stroke="#B0A880" stroke-width="0.7" opacity="0.5" fill="none"/>
  <path d="M34,9 C34,26 34,46 34,63" stroke="#B4AC84" stroke-width="0.7" opacity="0.5" fill="none"/>
  <ellipse cx="24" cy="25" rx="3.5" ry="2" fill="none" stroke="#94906A" stroke-width="0.5" opacity="0.5"/>
  <ellipse cx="44" cy="25" rx="3.5" ry="2" fill="none" stroke="#94906A" stroke-width="0.5" opacity="0.5"/>
  <ellipse cx="24" cy="48" rx="3.5" ry="2" fill="none" stroke="#94906A" stroke-width="0.5" opacity="0.5"/>
  <ellipse cx="44" cy="48" rx="3.5" ry="2" fill="none" stroke="#94906A" stroke-width="0.5" opacity="0.5"/>
  <path d="M53,18 C52,14 49,12 46,11" fill="none" stroke="white" stroke-width="1.2" opacity="0.3" stroke-linecap="round"/>
</svg>`;

// ── MÂCHOIRE INFÉRIEURE DROITE ───────────────────────────────

// 41 — Incisive centrale inférieure droite
const dent_41 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 110" width="45" height="110">
  <defs>
    <linearGradient id="g41" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#DDD4B4"/>
      <stop offset="45%" stop-color="#F2ECE0"/>
      <stop offset="100%" stop-color="#CCC4A0"/>
    </linearGradient>
    <linearGradient id="r41" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#A88058"/>
      <stop offset="50%" stop-color="#C89C78"/>
      <stop offset="100%" stop-color="#A88058"/>
    </linearGradient>
  </defs>
  <!-- Racine fine et longue -->
  <path d="M16,55 C14,72 13,88 15,104 C16,107 29,107 30,104 C31,88 30,72 28,55 Z" fill="url(#r41)" stroke="#906840" stroke-width="0.5"/>
  <ellipse cx="22" cy="57" rx="9" ry="3" fill="#B09060" opacity="0.5"/>
  <!-- Couronne petite et étroite -->
  <path d="M13,57 C11,50 11,41 12,32 C13,22 16,14 19,10 C20,8 22,7 22,9 C22,7 24,8 25,10 C28,14 31,22 32,32 C33,41 33,50 31,57 Z" fill="url(#g41)" stroke="#C0B690" stroke-width="0.7"/>
  <path d="M19,10 C21,6 22,7 22,9 C22,7 23,6 25,10" fill="#EEE8D4" stroke="#BEB490" stroke-width="0.5"/>
  <line x1="22" y1="9" x2="22" y2="54" stroke="#CEC8A2" stroke-width="0.4" opacity="0.6"/>
  <path d="M14,16 C15,12 17,10 19,9" fill="none" stroke="white" stroke-width="1" opacity="0.35" stroke-linecap="round"/>
</svg>`;

// 31 — Incisive centrale inférieure gauche
const dent_31 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 110" width="45" height="110">
  <defs>
    <linearGradient id="g31" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#CCC4A0"/>
      <stop offset="55%" stop-color="#F2ECE0"/>
      <stop offset="100%" stop-color="#DDD4B4"/>
    </linearGradient>
    <linearGradient id="r31" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#A88058"/>
      <stop offset="50%" stop-color="#C89C78"/>
      <stop offset="100%" stop-color="#A88058"/>
    </linearGradient>
  </defs>
  <path d="M16,55 C14,72 13,88 15,104 C16,107 29,107 30,104 C31,88 30,72 28,55 Z" fill="url(#r31)" stroke="#906840" stroke-width="0.5"/>
  <ellipse cx="22" cy="57" rx="9" ry="3" fill="#B09060" opacity="0.5"/>
  <path d="M13,57 C11,50 11,41 12,32 C13,22 16,14 19,10 C20,8 22,7 22,9 C22,7 24,8 25,10 C28,14 31,22 32,32 C33,41 33,50 31,57 Z" fill="url(#g31)" stroke="#C0B690" stroke-width="0.7"/>
  <path d="M19,10 C21,6 22,7 22,9 C22,7 23,6 25,10" fill="#EEE8D4" stroke="#BEB490" stroke-width="0.5"/>
  <line x1="22" y1="9" x2="22" y2="54" stroke="#CEC8A2" stroke-width="0.4" opacity="0.6"/>
  <path d="M30,16 C29,12 27,10 25,9" fill="none" stroke="white" stroke-width="1" opacity="0.35" stroke-linecap="round"/>
</svg>`;

// 42 — Incisive latérale inférieure droite
const dent_42 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 112" width="48" height="112">
  <defs>
    <linearGradient id="g42" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#DDD4B4"/>
      <stop offset="45%" stop-color="#F2ECE0"/>
      <stop offset="100%" stop-color="#CCC4A0"/>
    </linearGradient>
    <linearGradient id="r42" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#A88058"/>
      <stop offset="50%" stop-color="#C89C78"/>
      <stop offset="100%" stop-color="#A88058"/>
    </linearGradient>
  </defs>
  <path d="M17,57 C15,74 14,90 16,106 C17,109 31,109 32,106 C33,90 32,74 30,57 Z" fill="url(#r42)" stroke="#906840" stroke-width="0.5"/>
  <ellipse cx="23" cy="59" rx="10" ry="3" fill="#B09060" opacity="0.5"/>
  <path d="M13,59 C11,52 11,43 12,33 C13,23 16,14 19,10 C21,8 23,7 24,9 C25,7 27,8 29,10 C32,14 35,23 36,33 C37,43 37,52 35,59 Z" fill="url(#g42)" stroke="#C0B690" stroke-width="0.7"/>
  <path d="M19,10 C22,6 24,7 24,9 C24,7 26,6 29,10" fill="#EEE8D4" stroke="#BEB490" stroke-width="0.5"/>
  <line x1="24" y1="9" x2="24" y2="56" stroke="#CEC8A2" stroke-width="0.4" opacity="0.6"/>
  <path d="M15,16 C16,12 18,10 20,9" fill="none" stroke="white" stroke-width="1" opacity="0.35" stroke-linecap="round"/>
</svg>`;

// 32 — Incisive latérale inférieure gauche
const dent_32 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 112" width="48" height="112">
  <defs>
    <linearGradient id="g32" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#CCC4A0"/>
      <stop offset="55%" stop-color="#F2ECE0"/>
      <stop offset="100%" stop-color="#DDD4B4"/>
    </linearGradient>
    <linearGradient id="r32" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#A88058"/>
      <stop offset="50%" stop-color="#C89C78"/>
      <stop offset="100%" stop-color="#A88058"/>
    </linearGradient>
  </defs>
  <path d="M17,57 C15,74 14,90 16,106 C17,109 31,109 32,106 C33,90 32,74 30,57 Z" fill="url(#r32)" stroke="#906840" stroke-width="0.5"/>
  <ellipse cx="23" cy="59" rx="10" ry="3" fill="#B09060" opacity="0.5"/>
  <path d="M13,59 C11,52 11,43 12,33 C13,23 16,14 19,10 C21,8 23,7 24,9 C25,7 27,8 29,10 C32,14 35,23 36,33 C37,43 37,52 35,59 Z" fill="url(#g32)" stroke="#C0B690" stroke-width="0.7"/>
  <path d="M19,10 C22,6 24,7 24,9 C24,7 26,6 29,10" fill="#EEE8D4" stroke="#BEB490" stroke-width="0.5"/>
  <line x1="24" y1="9" x2="24" y2="56" stroke="#CEC8A2" stroke-width="0.4" opacity="0.6"/>
  <path d="M33,16 C32,12 30,10 28,9" fill="none" stroke="white" stroke-width="1" opacity="0.35" stroke-linecap="round"/>
</svg>`;

// 43 — Canine inférieure droite
const dent_43 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 135" width="52" height="135">
  <defs>
    <linearGradient id="g43" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#D4C8A4"/>
      <stop offset="35%" stop-color="#EEE6CA"/>
      <stop offset="100%" stop-color="#C0B490"/>
    </linearGradient>
    <linearGradient id="r43" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#A07848"/>
      <stop offset="50%" stop-color="#BC9468"/>
      <stop offset="100%" stop-color="#A07848"/>
    </linearGradient>
  </defs>
  <!-- Racine très longue canine inf -->
  <path d="M19,65 C17,86 16,108 18,128 C19,132 33,132 34,128 C36,108 35,86 33,65 Z" fill="url(#r43)" stroke="#886040" stroke-width="0.5"/>
  <ellipse cx="26" cy="67" rx="11" ry="3.5" fill="#B09070" opacity="0.5"/>
  <!-- Couronne canine inf (plus fine que sup) -->
  <path d="M15,67 C13,58 13,46 14,35 C15,24 18,14 21,9 C23,5 25,4 26,6 C27,4 29,5 31,9 C34,14 37,24 38,35 C39,46 39,58 37,67 Z" fill="url(#g43)" stroke="#B0A884" stroke-width="0.8"/>
  <path d="M21,9 C24,3 26,4 26,6 C26,4 28,3 31,9" fill="#EAE2CA" stroke="#B8B088" stroke-width="0.5"/>
  <line x1="26" y1="6" x2="26" y2="62" stroke="#CCC499" stroke-width="0.5" opacity="0.7"/>
  <path d="M16,18 C17,14 19,11 21,9" fill="none" stroke="white" stroke-width="1.3" opacity="0.4" stroke-linecap="round"/>
</svg>`;

// 33 — Canine inférieure gauche
const dent_33 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 135" width="52" height="135">
  <defs>
    <linearGradient id="g33" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#C0B490"/>
      <stop offset="65%" stop-color="#EEE6CA"/>
      <stop offset="100%" stop-color="#D4C8A4"/>
    </linearGradient>
    <linearGradient id="r33" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#A07848"/>
      <stop offset="50%" stop-color="#BC9468"/>
      <stop offset="100%" stop-color="#A07848"/>
    </linearGradient>
  </defs>
  <path d="M19,65 C17,86 16,108 18,128 C19,132 33,132 34,128 C36,108 35,86 33,65 Z" fill="url(#r33)" stroke="#886040" stroke-width="0.5"/>
  <ellipse cx="26" cy="67" rx="11" ry="3.5" fill="#B09070" opacity="0.5"/>
  <path d="M15,67 C13,58 13,46 14,35 C15,24 18,14 21,9 C23,5 25,4 26,6 C27,4 29,5 31,9 C34,14 37,24 38,35 C39,46 39,58 37,67 Z" fill="url(#g33)" stroke="#B0A884" stroke-width="0.8"/>
  <path d="M21,9 C24,3 26,4 26,6 C26,4 28,3 31,9" fill="#EAE2CA" stroke="#B8B088" stroke-width="0.5"/>
  <line x1="26" y1="6" x2="26" y2="62" stroke="#CCC499" stroke-width="0.5" opacity="0.7"/>
  <path d="M36,18 C35,14 33,11 31,9" fill="none" stroke="white" stroke-width="1.3" opacity="0.4" stroke-linecap="round"/>
</svg>`;

// 44 — Première prémolaire inférieure droite
const dent_44 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 120" width="56" height="120">
  <defs>
    <linearGradient id="g44" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#CEC49E"/>
      <stop offset="40%" stop-color="#ECE4C6"/>
      <stop offset="100%" stop-color="#BEB48C"/>
    </linearGradient>
    <linearGradient id="r44" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#9C7446"/>
      <stop offset="50%" stop-color="#B89066"/>
      <stop offset="100%" stop-color="#9C7446"/>
    </linearGradient>
  </defs>
  <!-- Racine unique prémolaire inf -->
  <path d="M19,63 C17,82 16,100 18,115 C19,118 37,118 38,115 C40,100 39,82 37,63 Z" fill="url(#r44)" stroke="#846035" stroke-width="0.5"/>
  <ellipse cx="28" cy="65" rx="12" ry="3.5" fill="#AC8865" opacity="0.5"/>
  <path d="M15,65 C13,57 13,46 14,35 C15,24 18,15 21,11 C23,8 26,7 28,9 C30,7 33,8 35,11 C38,15 41,24 42,35 C43,46 43,57 41,65 Z" fill="url(#g44)" stroke="#AAA27E"/> 
  <!-- 2 cuspides (cuspide vestibulaire dominante) -->
  <path d="M21,11 C24,5 27,7 28,9 C29,7 32,5 35,11" fill="#EAE0C2" stroke="#B0A87E" stroke-width="0.6"/>
  <path d="M28,9 C28,26 28,45 28,60" stroke="#BCBA8E" stroke-width="0.7" opacity="0.6" fill="none"/>
  <ellipse cx="28" cy="36" rx="5" ry="2.5" fill="none" stroke="#9A9270" stroke-width="0.5" opacity="0.5"/>
  <path d="M16,18 C17,14 19,11 21,10" fill="none" stroke="white" stroke-width="1.2" opacity="0.35" stroke-linecap="round"/>
</svg>`;

// 34 — Première prémolaire inférieure gauche
const dent_34 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 120" width="56" height="120">
  <defs>
    <linearGradient id="g34" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#BEB48C"/>
      <stop offset="60%" stop-color="#ECE4C6"/>
      <stop offset="100%" stop-color="#CEC49E"/>
    </linearGradient>
    <linearGradient id="r34" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#9C7446"/>
      <stop offset="50%" stop-color="#B89066"/>
      <stop offset="100%" stop-color="#9C7446"/>
    </linearGradient>
  </defs>
  <path d="M19,63 C17,82 16,100 18,115 C19,118 37,118 38,115 C40,100 39,82 37,63 Z" fill="url(#r34)" stroke="#846035" stroke-width="0.5"/>
  <ellipse cx="28" cy="65" rx="12" ry="3.5" fill="#AC8865" opacity="0.5"/>
  <path d="M15,65 C13,57 13,46 14,35 C15,24 18,15 21,11 C23,8 26,7 28,9 C30,7 33,8 35,11 C38,15 41,24 42,35 C43,46 43,57 41,65 Z" fill="url(#g34)" stroke="#AAA27E"/>
  <path d="M21,11 C24,5 27,7 28,9 C29,7 32,5 35,11" fill="#EAE0C2" stroke="#B0A87E" stroke-width="0.6"/>
  <path d="M28,9 C28,26 28,45 28,60" stroke="#BCBA8E" stroke-width="0.7" opacity="0.6" fill="none"/>
  <ellipse cx="28" cy="36" rx="5" ry="2.5" fill="none" stroke="#9A9270" stroke-width="0.5" opacity="0.5"/>
  <path d="M40,18 C39,14 37,11 35,10" fill="none" stroke="white" stroke-width="1.2" opacity="0.35" stroke-linecap="round"/>
</svg>`;

// 45 — Deuxième prémolaire inférieure droite
const dent_45 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 118" width="58" height="118">
  <defs>
    <linearGradient id="g45" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#CCC49C"/>
      <stop offset="40%" stop-color="#EAE2C4"/>
      <stop offset="100%" stop-color="#BCB48A"/>
    </linearGradient>
    <linearGradient id="r45" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#9A7244"/>
      <stop offset="50%" stop-color="#B68E64"/>
      <stop offset="100%" stop-color="#9A7244"/>
    </linearGradient>
  </defs>
  <path d="M20,62 C18,80 17,98 19,113 C20,116 38,116 39,113 C41,98 40,80 38,62 Z" fill="url(#r45)" stroke="#825E33" stroke-width="0.5"/>
  <ellipse cx="29" cy="64" rx="13" ry="3.5" fill="#AA8663" opacity="0.5"/>
  <!-- Couronne légèrement plus large (3 cuspides possible) -->
  <path d="M15,64 C13,56 13,44 14,33 C15,22 18,13 22,9 C24,6 27,5 29,7 C31,5 34,6 36,9 C40,13 43,22 44,33 C45,44 45,56 43,64 Z" fill="url(#g45)" stroke="#A8A07C"/>
  <path d="M22,9 C25,3 28,5 29,7 C30,5 33,3 36,9" fill="#E8DEC0" stroke="#AEA87C" stroke-width="0.6"/>
  <path d="M29,7 C29,24 29,44 29,59" stroke="#BAB88A" stroke-width="0.7" opacity="0.6" fill="none"/>
  <ellipse cx="29" cy="34" rx="5.5" ry="2.5" fill="none" stroke="#989070" stroke-width="0.5" opacity="0.5"/>
  <path d="M16,17 C17,13 20,10 22,9" fill="none" stroke="white" stroke-width="1.2" opacity="0.3" stroke-linecap="round"/>
</svg>`;

// 35 — Deuxième prémolaire inférieure gauche
const dent_35 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 118" width="58" height="118">
  <defs>
    <linearGradient id="g35" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#BCB48A"/>
      <stop offset="60%" stop-color="#EAE2C4"/>
      <stop offset="100%" stop-color="#CCC49C"/>
    </linearGradient>
    <linearGradient id="r35" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#9A7244"/>
      <stop offset="50%" stop-color="#B68E64"/>
      <stop offset="100%" stop-color="#9A7244"/>
    </linearGradient>
  </defs>
  <path d="M20,62 C18,80 17,98 19,113 C20,116 38,116 39,113 C41,98 40,80 38,62 Z" fill="url(#r35)" stroke="#825E33" stroke-width="0.5"/>
  <ellipse cx="29" cy="64" rx="13" ry="3.5" fill="#AA8663" opacity="0.5"/>
  <path d="M15,64 C13,56 13,44 14,33 C15,22 18,13 22,9 C24,6 27,5 29,7 C31,5 34,6 36,9 C40,13 43,22 44,33 C45,44 45,56 43,64 Z" fill="url(#g35)" stroke="#A8A07C"/>
  <path d="M22,9 C25,3 28,5 29,7 C30,5 33,3 36,9" fill="#E8DEC0" stroke="#AEA87C" stroke-width="0.6"/>
  <path d="M29,7 C29,24 29,44 29,59" stroke="#BAB88A" stroke-width="0.7" opacity="0.6" fill="none"/>
  <ellipse cx="29" cy="34" rx="5.5" ry="2.5" fill="none" stroke="#989070" stroke-width="0.5" opacity="0.5"/>
  <path d="M42,17 C41,13 38,10 36,9" fill="none" stroke="white" stroke-width="1.2" opacity="0.3" stroke-linecap="round"/>
</svg>`;

// 46 — Première molaire inférieure droite
const dent_46 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 78 118" width="78" height="118">
  <defs>
    <linearGradient id="g46" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#C6BE96"/>
      <stop offset="40%" stop-color="#E8E0C2"/>
      <stop offset="100%" stop-color="#B4AC82"/>
    </linearGradient>
    <linearGradient id="r46" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#966C3C"/>
      <stop offset="50%" stop-color="#B2885C"/>
      <stop offset="100%" stop-color="#966C3C"/>
    </linearGradient>
  </defs>
  <!-- Deux racines molaire inférieure -->
  <path d="M13,68 C11,86 10,102 12,114 C13,117 28,117 29,114 C30,102 29,87 27,68 Z" fill="url(#r46)" stroke="#7C5C30" stroke-width="0.5"/>
  <path d="M47,68 C46,86 46,102 47,114 C48,117 63,117 64,114 C65,102 64,87 62,68 Z" fill="url(#r46)" stroke="#7C5C30" stroke-width="0.5"/>
  <ellipse cx="38" cy="71" rx="22" ry="4.5" fill="#A08460" opacity="0.6"/>
  <!-- Couronne large (5 cuspides typique molaire inf) -->
  <path d="M12,71 C10,62 10,49 11,37 C12,25 16,15 21,11 C24,8 28,7 30,9 C33,6 40,6 45,9 C47,7 51,8 55,11 C60,15 64,25 65,37 C66,49 66,62 64,71 Z" fill="url(#g46)" stroke="#A49E7A" stroke-width="0.9"/>
  <!-- 5 cuspides -->
  <path d="M21,11 C25,5 29,7 30,9 C32,6 40,5 45,9" fill="#E6DCC0" stroke="#ACA47A" stroke-width="0.6"/>
  <path d="M45,9 C48,6 52,7 55,11" fill="#E6DCC0" stroke="#ACA47A" stroke-width="0.6"/>
  <!-- Sillons caractéristiques molaire inf (en Y) -->
  <path d="M38,9 C38,28 38,48 38,66" stroke="#B6B28A" stroke-width="0.8" opacity="0.6" fill="none"/>
  <path d="M12,40 C26,40 50,40 66,40" stroke="#B6B28A" stroke-width="0.8" opacity="0.6" fill="none"/>
  <path d="M22,40 C28,30 38,9 48,40" stroke="#B0AC82" stroke-width="0.6" opacity="0.4" fill="none"/>
  <!-- 5 fossettes -->
  <ellipse cx="22" cy="25" rx="3.5" ry="2" fill="none" stroke="#969070" stroke-width="0.5" opacity="0.5"/>
  <ellipse cx="54" cy="25" rx="3.5" ry="2" fill="none" stroke="#969070" stroke-width="0.5" opacity="0.5"/>
  <ellipse cx="22" cy="52" rx="3.5" ry="2" fill="none" stroke="#969070" stroke-width="0.5" opacity="0.5"/>
  <ellipse cx="54" cy="52" rx="3.5" ry="2" fill="none" stroke="#969070" stroke-width="0.5" opacity="0.5"/>
  <ellipse cx="38" cy="58" rx="3" ry="2" fill="none" stroke="#969070" stroke-width="0.5" opacity="0.5"/>
  <path d="M14,18 C15,14 18,12 20,11" fill="none" stroke="white" stroke-width="1.5" opacity="0.3" stroke-linecap="round"/>
</svg>`;

// 36 — Première molaire inférieure gauche
const dent_36 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 78 118" width="78" height="118">
  <defs>
    <linearGradient id="g36" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#B4AC82"/>
      <stop offset="60%" stop-color="#E8E0C2"/>
      <stop offset="100%" stop-color="#C6BE96"/>
    </linearGradient>
    <linearGradient id="r36" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#966C3C"/>
      <stop offset="50%" stop-color="#B2885C"/>
      <stop offset="100%" stop-color="#966C3C"/>
    </linearGradient>
  </defs>
  <path d="M13,68 C11,86 10,102 12,114 C13,117 28,117 29,114 C30,102 29,87 27,68 Z" fill="url(#r36)" stroke="#7C5C30" stroke-width="0.5"/>
  <path d="M47,68 C46,86 46,102 47,114 C48,117 63,117 64,114 C65,102 64,87 62,68 Z" fill="url(#r36)" stroke="#7C5C30" stroke-width="0.5"/>
  <ellipse cx="38" cy="71" rx="22" ry="4.5" fill="#A08460" opacity="0.6"/>
  <path d="M12,71 C10,62 10,49 11,37 C12,25 16,15 21,11 C24,8 28,7 30,9 C33,6 40,6 45,9 C47,7 51,8 55,11 C60,15 64,25 65,37 C66,49 66,62 64,71 Z" fill="url(#g36)" stroke="#A49E7A" stroke-width="0.9"/>
  <path d="M21,11 C25,5 29,7 30,9 C32,6 40,5 45,9" fill="#E6DCC0" stroke="#ACA47A" stroke-width="0.6"/>
  <path d="M45,9 C48,6 52,7 55,11" fill="#E6DCC0" stroke="#ACA47A" stroke-width="0.6"/>
  <path d="M38,9 C38,28 38,48 38,66" stroke="#B6B28A" stroke-width="0.8" opacity="0.6" fill="none"/>
  <path d="M12,40 C26,40 50,40 66,40" stroke="#B6B28A" stroke-width="0.8" opacity="0.6" fill="none"/>
  <path d="M22,40 C28,30 38,9 48,40" stroke="#B0AC82" stroke-width="0.6" opacity="0.4" fill="none"/>
  <ellipse cx="22" cy="25" rx="3.5" ry="2" fill="none" stroke="#969070" stroke-width="0.5" opacity="0.5"/>
  <ellipse cx="54" cy="25" rx="3.5" ry="2" fill="none" stroke="#969070" stroke-width="0.5" opacity="0.5"/>
  <ellipse cx="22" cy="52" rx="3.5" ry="2" fill="none" stroke="#969070" stroke-width="0.5" opacity="0.5"/>
  <ellipse cx="54" cy="52" rx="3.5" ry="2" fill="none" stroke="#969070" stroke-width="0.5" opacity="0.5"/>
  <ellipse cx="38" cy="58" rx="3" ry="2" fill="none" stroke="#969070" stroke-width="0.5" opacity="0.5"/>
  <path d="M64,18 C63,14 60,12 58,11" fill="none" stroke="white" stroke-width="1.5" opacity="0.3" stroke-linecap="round"/>
</svg>`;

// 47 — Deuxième molaire inférieure droite
const dent_47 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 74 115" width="74" height="115">
  <defs>
    <linearGradient id="g47" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#C2BA90"/>
      <stop offset="40%" stop-color="#E4DCBE"/>
      <stop offset="100%" stop-color="#B0A87E"/>
    </linearGradient>
    <linearGradient id="r47" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#926A3A"/>
      <stop offset="50%" stop-color="#AE865A"/>
      <stop offset="100%" stop-color="#926A3A"/>
    </linearGradient>
  </defs>
  <path d="M13,65 C11,83 10,99 12,111 C13,114 27,114 28,111 C29,99 28,84 26,65 Z" fill="url(#r47)" stroke="#785A28" stroke-width="0.5"/>
  <path d="M45,65 C44,83 44,99 45,111 C46,114 60,114 61,111 C62,99 61,85 59,65 Z" fill="url(#r47)" stroke="#785A28" stroke-width="0.5"/>
  <ellipse cx="36" cy="68" rx="21" ry="4" fill="#9E8260" opacity="0.6"/>
  <path d="M12,68 C10,59 10,47 11,35 C12,23 16,14 20,10 C23,7 27,6 29,8 C32,5 39,5 44,8 C46,6 50,7 53,10 C57,14 62,23 63,35 C64,47 63,59 62,68 Z" fill="url(#g47)" stroke="#A09A76" stroke-width="0.9"/>
  <path d="M20,10 C24,4 28,6 29,8 C31,5 38,4 44,8" fill="#E2D8BC" stroke="#A8A278" stroke-width="0.6"/>
  <path d="M44,8 C47,5 50,6 53,10" fill="#E2D8BC" stroke="#A8A278" stroke-width="0.6"/>
  <path d="M36,8 C36,26 36,46 36,63" stroke="#B2AE86" stroke-width="0.7" opacity="0.6" fill="none"/>
  <path d="M12,38 C25,38 47,38 63,38" stroke="#B2AE86" stroke-width="0.7" opacity="0.6" fill="none"/>
  <ellipse cx="22" cy="24" rx="3.5" ry="2" fill="none" stroke="#949270" stroke-width="0.5" opacity="0.5"/>
  <ellipse cx="50" cy="24" rx="3.5" ry="2" fill="none" stroke="#949270" stroke-width="0.5" opacity="0.5"/>
  <ellipse cx="22" cy="50" rx="3.5" ry="2" fill="none" stroke="#949270" stroke-width="0.5" opacity="0.5"/>
  <ellipse cx="50" cy="50" rx="3.5" ry="2" fill="none" stroke="#949270" stroke-width="0.5" opacity="0.5"/>
  <path d="M13,17 C14,13 17,11 20,10" fill="none" stroke="white" stroke-width="1.2" opacity="0.3" stroke-linecap="round"/>
</svg>`;

// 37 — Deuxième molaire inférieure gauche
const dent_37 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 74 115" width="74" height="115">
  <defs>
    <linearGradient id="g37" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#B0A87E"/>
      <stop offset="60%" stop-color="#E4DCBE"/>
      <stop offset="100%" stop-color="#C2BA90"/>
    </linearGradient>
    <linearGradient id="r37" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#926A3A"/>
      <stop offset="50%" stop-color="#AE865A"/>
      <stop offset="100%" stop-color="#926A3A"/>
    </linearGradient>
  </defs>
  <path d="M13,65 C11,83 10,99 12,111 C13,114 27,114 28,111 C29,99 28,84 26,65 Z" fill="url(#r37)" stroke="#785A28" stroke-width="0.5"/>
  <path d="M45,65 C44,83 44,99 45,111 C46,114 60,114 61,111 C62,99 61,85 59,65 Z" fill="url(#r37)" stroke="#785A28" stroke-width="0.5"/>
  <ellipse cx="36" cy="68" rx="21" ry="4" fill="#9E8260" opacity="0.6"/>
  <path d="M12,68 C10,59 10,47 11,35 C12,23 16,14 20,10 C23,7 27,6 29,8 C32,5 39,5 44,8 C46,6 50,7 53,10 C57,14 62,23 63,35 C64,47 63,59 62,68 Z" fill="url(#g37)" stroke="#A09A76" stroke-width="0.9"/>
  <path d="M20,10 C24,4 28,6 29,8 C31,5 38,4 44,8" fill="#E2D8BC" stroke="#A8A278" stroke-width="0.6"/>
  <path d="M44,8 C47,5 50,6 53,10" fill="#E2D8BC" stroke="#A8A278" stroke-width="0.6"/>
  <path d="M36,8 C36,26 36,46 36,63" stroke="#B2AE86" stroke-width="0.7" opacity="0.6" fill="none"/>
  <path d="M12,38 C25,38 47,38 63,38" stroke="#B2AE86" stroke-width="0.7" opacity="0.6" fill="none"/>
  <ellipse cx="22" cy="24" rx="3.5" ry="2" fill="none" stroke="#949270" stroke-width="0.5" opacity="0.5"/>
  <ellipse cx="50" cy="24" rx="3.5" ry="2" fill="none" stroke="#949270" stroke-width="0.5" opacity="0.5"/>
  <ellipse cx="22" cy="50" rx="3.5" ry="2" fill="none" stroke="#949270" stroke-width="0.5" opacity="0.5"/>
  <ellipse cx="50" cy="50" rx="3.5" ry="2" fill="none" stroke="#949270" stroke-width="0.5" opacity="0.5"/>
  <path d="M61,17 C60,13 57,11 54,10" fill="none" stroke="white" stroke-width="1.2" opacity="0.3" stroke-linecap="round"/>
</svg>`;

// 48 — Troisième molaire inférieure droite (dent de sagesse)
const dent_48 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 112" width="70" height="112">
  <defs>
    <linearGradient id="g48" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#BEB68C"/>
      <stop offset="40%" stop-color="#E0D8BA"/>
      <stop offset="100%" stop-color="#ACAA7A"/>
    </linearGradient>
    <linearGradient id="r48" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#906636"/>
      <stop offset="50%" stop-color="#AA8256"/>
      <stop offset="100%" stop-color="#906636"/>
    </linearGradient>
  </defs>
  <!-- Racines fusionnées/courbes sagesse inf -->
  <path d="M14,64 C11,82 9,98 11,108 C13,112 57,112 59,108 C61,98 59,82 56,64 Z" fill="url(#r48)" stroke="#745425" stroke-width="0.5"/>
  <path d="M22,70 C19,84 18,100 20,109" stroke="#846234" stroke-width="1" fill="none" opacity="0.5"/>
  <path d="M48,70 C50,84 51,100 49,109" stroke="#846234" stroke-width="1" fill="none" opacity="0.5"/>
  <ellipse cx="34" cy="67" rx="20" ry="4" fill="#9E8060" opacity="0.6"/>
  <!-- Couronne irrégulière, plus petite -->
  <path d="M13,67 C11,57 11,45 12,34 C13,23 17,14 21,10 C24,7 27,6 30,8 C33,5 38,5 41,8 C44,6 47,7 49,10 C53,14 57,23 58,34 C59,45 59,57 57,67 Z" fill="url(#g48)" stroke="#9E9874" stroke-width="0.9"/>
  <path d="M21,10 C25,4 29,6 30,8 C32,5 38,4 41,8" fill="#DED4B8" stroke="#A6A07A" stroke-width="0.6"/>
  <path d="M41,8 C44,5 47,6 49,10" fill="#DED4B8" stroke="#A6A07A" stroke-width="0.6"/>
  <path d="M35,8 C35,26 35,44 35,62" stroke="#AEAC82" stroke-width="0.7" opacity="0.5" fill="none"/>
  <path d="M13,37 C25,37 45,37 58,37" stroke="#AEAC82" stroke-width="0.7" opacity="0.5" fill="none"/>
  <ellipse cx="22" cy="23" rx="3" ry="2" fill="none" stroke="#929070" stroke-width="0.5" opacity="0.5"/>
  <ellipse cx="47" cy="23" rx="3" ry="2" fill="none" stroke="#929070" stroke-width="0.5" opacity="0.5"/>
  <ellipse cx="22" cy="48" rx="3" ry="2" fill="none" stroke="#929070" stroke-width="0.5" opacity="0.5"/>
  <ellipse cx="47" cy="48" rx="3" ry="2" fill="none" stroke="#929070" stroke-width="0.5" opacity="0.5"/>
  <path d="M14,17 C15,13 18,11 20,10" fill="none" stroke="white" stroke-width="1.2" opacity="0.25" stroke-linecap="round"/>
</svg>`;

// 38 — Troisième molaire inférieure gauche (dent de sagesse)
const dent_38 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 112" width="70" height="112">
  <defs>
    <linearGradient id="g38" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ACAA7A"/>
      <stop offset="60%" stop-color="#E0D8BA"/>
      <stop offset="100%" stop-color="#BEB68C"/>
    </linearGradient>
    <linearGradient id="r38" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#906636"/>
      <stop offset="50%" stop-color="#AA8256"/>
      <stop offset="100%" stop-color="#906636"/>
    </linearGradient>
  </defs>
  <path d="M14,64 C11,82 9,98 11,108 C13,112 57,112 59,108 C61,98 59,82 56,64 Z" fill="url(#r38)" stroke="#745425" stroke-width="0.5"/>
  <path d="M22,70 C19,84 18,100 20,109" stroke="#846234" stroke-width="1" fill="none" opacity="0.5"/>
  <path d="M48,70 C50,84 51,100 49,109" stroke="#846234" stroke-width="1" fill="none" opacity="0.5"/>
  <ellipse cx="34" cy="67" rx="20" ry="4" fill="#9E8060" opacity="0.6"/>
  <path d="M13,67 C11,57 11,45 12,34 C13,23 17,14 21,10 C24,7 27,6 30,8 C33,5 38,5 41,8 C44,6 47,7 49,10 C53,14 57,23 58,34 C59,45 59,57 57,67 Z" fill="url(#g38)" stroke="#9E9874" stroke-width="0.9"/>
  <path d="M21,10 C25,4 29,6 30,8 C32,5 38,4 41,8" fill="#DED4B8" stroke="#A6A07A" stroke-width="0.6"/>
  <path d="M41,8 C44,5 47,6 49,10" fill="#DED4B8" stroke="#A6A07A" stroke-width="0.6"/>
  <path d="M35,8 C35,26 35,44 35,62" stroke="#AEAC82" stroke-width="0.7" opacity="0.5" fill="none"/>
  <path d="M13,37 C25,37 45,37 58,37" stroke="#AEAC82" stroke-width="0.7" opacity="0.5" fill="none"/>
  <ellipse cx="22" cy="23" rx="3" ry="2" fill="none" stroke="#929070" stroke-width="0.5" opacity="0.5"/>
  <ellipse cx="47" cy="23" rx="3" ry="2" fill="none" stroke="#929070" stroke-width="0.5" opacity="0.5"/>
  <ellipse cx="22" cy="48" rx="3" ry="2" fill="none" stroke="#929070" stroke-width="0.5" opacity="0.5"/>
  <ellipse cx="47" cy="48" rx="3" ry="2" fill="none" stroke="#929070" stroke-width="0.5" opacity="0.5"/>
  <path d="M56,17 C55,13 52,11 50,10" fill="none" stroke="white" stroke-width="1.2" opacity="0.25" stroke-linecap="round"/>
</svg>`;

// ============================================================
// EXPORT — Toutes les dents dans un objet indexé FDI
// ============================================================
const teeth = {
  // Mâchoire supérieure droite
  11: dent_11,  // Incisive centrale sup droite
  12: dent_12,  // Incisive latérale sup droite
  13: dent_13,  // Canine sup droite
  14: dent_14,  // Prémolaire 1 sup droite
  15: dent_15,  // Prémolaire 2 sup droite
  16: dent_16,  // Molaire 1 sup droite
  17: dent_17,  // Molaire 2 sup droite
  18: dent_18,  // Molaire 3 sup droite (sagesse)

  // Mâchoire supérieure gauche
  21: dent_21,  // Incisive centrale sup gauche
  22: dent_22,  // Incisive latérale sup gauche
  23: dent_23,  // Canine sup gauche
  24: dent_24,  // Prémolaire 1 sup gauche
  25: dent_25,  // Prémolaire 2 sup gauche
  26: dent_26,  // Molaire 1 sup gauche
  27: dent_27,  // Molaire 2 sup gauche
  28: dent_28,  // Molaire 3 sup gauche (sagesse)

  // Mâchoire inférieure gauche
  31: dent_31,  // Incisive centrale inf gauche
  32: dent_32,  // Incisive latérale inf gauche
  33: dent_33,  // Canine inf gauche
  34: dent_34,  // Prémolaire 1 inf gauche
  35: dent_35,  // Prémolaire 2 inf gauche
  36: dent_36,  // Molaire 1 inf gauche
  37: dent_37,  // Molaire 2 inf gauche
  38: dent_38,  // Molaire 3 inf gauche (sagesse)

  // Mâchoire inférieure droite
  41: dent_41,  // Incisive centrale inf droite
  42: dent_42,  // Incisive latérale inf droite
  43: dent_43,  // Canine inf droite
  44: dent_44,  // Prémolaire 1 inf droite
  45: dent_45,  // Prémolaire 2 inf droite
  46: dent_46,  // Molaire 1 inf droite
  47: dent_47,  // Molaire 2 inf droite
  48: dent_48,  // Molaire 3 inf droite (sagesse)
};

export default teeth;

// Usage:
// document.getElementById('slot').innerHTML = teeth[16];
// ou
// document.getElementById('slot').innerHTML = dent_16;