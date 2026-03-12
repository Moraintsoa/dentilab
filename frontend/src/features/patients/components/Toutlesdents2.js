// ================================
// INCISIVES
// ================================

export const incisorCentralUpper = `
<svg viewBox="0 0 120 160">
<path d="M60 10
C40 10 30 25 30 50
L30 85
C30 105 45 120 60 120
C75 120 90 105 90 85
L90 50
C90 25 80 10 60 10Z"
fill="#fdfdfd" stroke="#dcdcdc" stroke-width="2"/>

<!-- concave backside -->
<path d="M45 40 Q60 30 75 40 L75 75 Q60 90 45 75Z"
fill="none" stroke="#e8e8e8"/>

<!-- cingulum -->
<ellipse cx="60" cy="82" rx="12" ry="6" fill="#f3f3f3"/>

<!-- root -->
<path d="M60 120 C50 135 50 150 60 155 C70 150 70 135 60 120Z"
fill="#f9f9f9" stroke="#dcdcdc"/>
</svg>
`;

export const incisorLateralUpper = `
<svg viewBox="0 0 120 160">
<path d="
M60 12
C42 12 35 28 35 50
L35 80
C35 100 48 118 60 118
C72 118 85 100 85 80
L85 50
C85 28 75 12 60 12Z"
fill="#ffffff" stroke="#dddddd" stroke-width="2"/>

<!-- asymmetry -->
<path d="M45 40 Q58 33 72 42 L72 72 Q58 86 45 72Z"
fill="none" stroke="#ececec"/>

<ellipse cx="60" cy="78" rx="10" ry="5" fill="#f3f3f3"/>

<path d="M60 118 C52 132 52 150 60 154 C68 150 68 132 60 118Z"
fill="#f9f9f9" stroke="#dcdcdc"/>
</svg>
`;

export const incisorLower = `
<svg viewBox="0 0 100 150">
<path d="
M50 15
C40 15 35 25 35 45
L35 70
C35 85 42 100 50 100
C58 100 65 85 65 70
L65 45
C65 25 60 15 50 15Z"
fill="#ffffff" stroke="#dddddd" stroke-width="2"/>

<path d="M40 38 Q50 32 60 38 L60 65 Q50 78 40 65Z"
fill="none" stroke="#eaeaea"/>

<path d="M50 100 C45 120 45 140 50 145 C55 140 55 120 50 100Z"
fill="#f9f9f9" stroke="#dcdcdc"/>
</svg>
`;


// ================================
// CANINES
// ================================

export const canine = `
<svg viewBox="0 0 120 180">

<!-- crown pentagon -->
<path d="
M60 10
L40 50
L45 90
C45 110 55 120 60 120
C65 120 75 110 75 90
L80 50Z"
fill="#ffffff" stroke="#dcdcdc" stroke-width="2"/>

<!-- ridge -->
<line x1="60" y1="20" x2="60" y2="105"
stroke="#ececec" stroke-width="2"/>

<!-- root -->
<path d="M60 120
C50 140 50 165 60 175
C70 165 70 140 60 120Z"
fill="#f9f9f9" stroke="#dcdcdc"/>

</svg>
`;


// ================================
// PREMOLAIRES
// ================================

export const premolarUpper1 = `
<svg viewBox="0 0 140 160">

<!-- crown -->
<path d="
M70 15
C40 15 30 35 30 60
C30 85 50 105 70 105
C90 105 110 85 110 60
C110 35 100 15 70 15Z"
fill="#ffffff" stroke="#dcdcdc" stroke-width="2"/>

<!-- cusps -->
<circle cx="55" cy="45" r="8" fill="#f3f3f3"/>
<circle cx="85" cy="45" r="6" fill="#f3f3f3"/>

<!-- fissure -->
<line x1="55" y1="45" x2="85" y2="45"
stroke="#dddddd"/>

<!-- two roots -->
<path d="M60 105 C50 125 50 145 55 155"
stroke="#dcdcdc" fill="none" stroke-width="4"/>
<path d="M80 105 C90 125 90 145 85 155"
stroke="#dcdcdc" fill="none" stroke-width="4"/>

</svg>
`;

export const premolarUpper2 = `
<svg viewBox="0 0 140 160">

<path d="
M70 15
C40 15 30 35 30 60
C30 85 50 105 70 105
C90 105 110 85 110 60
C110 35 100 15 70 15Z"
fill="#ffffff" stroke="#dcdcdc" stroke-width="2"/>

<circle cx="55" cy="45" r="7" fill="#f3f3f3"/>
<circle cx="85" cy="45" r="7" fill="#f3f3f3"/>

<line x1="55" y1="45" x2="85" y2="45"
stroke="#dddddd"/>

<!-- single root -->
<path d="M70 105 C60 130 60 150 70 155 C80 150 80 130 70 105Z"
fill="#f9f9f9" stroke="#dcdcdc"/>

</svg>
`;

export const premolarLower = `
<svg viewBox="0 0 140 160">

<path d="
M70 15
C45 15 35 35 35 60
C35 85 55 105 70 105
C85 105 105 85 105 60
C105 35 95 15 70 15Z"
fill="#ffffff" stroke="#dcdcdc" stroke-width="2"/>

<!-- big buccal cusp -->
<circle cx="60" cy="45" r="9" fill="#f3f3f3"/>

<!-- tiny lingual cusp -->
<circle cx="85" cy="48" r="4" fill="#f3f3f3"/>

<path d="M70 105 C60 130 60 150 70 155 C80 150 80 130 70 105Z"
fill="#f9f9f9" stroke="#dcdcdc"/>

</svg>
`;


// ================================
// MOLAIRES
// ================================

export const molarUpper1 = `
<svg viewBox="0 0 160 160">

<!-- crown -->
<rect x="30" y="30" width="100" height="80"
rx="20"
fill="#ffffff"
stroke="#dcdcdc"
stroke-width="2"/>

<!-- cusps -->
<circle cx="55" cy="55" r="8" fill="#f3f3f3"/>
<circle cx="105" cy="55" r="8" fill="#f3f3f3"/>
<circle cx="55" cy="90" r="8" fill="#f3f3f3"/>
<circle cx="105" cy="90" r="8" fill="#f3f3f3"/>

<!-- Carabelli -->
<circle cx="45" cy="75" r="4" fill="#eeeeee"/>

<!-- fissures -->
<path d="M55 55 L105 90 M105 55 L55 90"
stroke="#e0e0e0"/>

</svg>
`;

export const molarLower1 = `
<svg viewBox="0 0 160 160">

<rect x="30" y="30" width="100" height="85"
rx="18"
fill="#ffffff"
stroke="#dcdcdc"
stroke-width="2"/>

<!-- 5 cusps -->
<circle cx="50" cy="55" r="7" fill="#f3f3f3"/>
<circle cx="80" cy="55" r="7" fill="#f3f3f3"/>
<circle cx="110" cy="55" r="7" fill="#f3f3f3"/>
<circle cx="65" cy="90" r="7" fill="#f3f3f3"/>
<circle cx="95" cy="90" r="7" fill="#f3f3f3"/>

<!-- W fissure -->
<path d="M50 70 L80 85 L110 70"
stroke="#e0e0e0"/>

</svg>
`;

export const wisdomTooth = `
<svg viewBox="0 0 140 150">

<path d="
M70 20
C40 20 30 40 30 70
C30 100 50 115 70 115
C90 115 110 100 110 70
C110 40 100 20 70 20Z"
fill="#ffffff" stroke="#dcdcdc" stroke-width="2"/>

<!-- irregular surface -->
<circle cx="55" cy="55" r="6" fill="#f3f3f3"/>
<circle cx="80" cy="70" r="6" fill="#f3f3f3"/>
<circle cx="95" cy="55" r="5" fill="#f3f3f3"/>

<!-- fused root -->
<path d="M70 115 C60 135 60 145 70 148 C80 145 80 135 70 115Z"
fill="#f9f9f9" stroke="#dcdcdc"/>

</svg>
`;
export const teeth = {
11: incisorCentralUpper,
12: incisorLateralUpper,
13: canine,
14: premolarUpper1,
15: premolarUpper2,
16: molarUpper1,
17: molarUpper1,
18: wisdomTooth,

21: incisorCentralUpper,
22: incisorLateralUpper,
23: canine,
24: premolarUpper1,
25: premolarUpper2,
26: molarUpper1,
27: molarUpper1,
28: wisdomTooth,

31: incisorLower,
32: incisorLower,
33: canine,
34: premolarLower,
35: premolarLower,
36: molarLower1,
37: molarLower1,
38: wisdomTooth,

41: incisorLower,
42: incisorLower,
43: canine,
44: premolarLower,
45: premolarLower,
46: molarLower1,
47: molarLower1,
48: wisdomTooth
};