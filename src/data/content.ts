export interface TeamMember {
  name: string;
}

export interface PitchProject {
  id: number;
  name: string;
  tag: string;
  members: TeamMember[];
  audioEntrada: string;
  productImage: string;
}

export interface Juror {
  name: string;
  focus: string;
  experience: string;
  image: string;
}

export interface HubMember {
  name: string;
  role: string;
  description: string;
  image: string;
}

export const HUB_MEMBERS: HubMember[] = [
  {
    name: 'América Castiblanco',
    role: 'Gerente del Área de Emprendimiento de la Universidad El Bosque',
    description: 'Ingeniera industrial, magister en innovacion y MBA con 18 años de trayectoria profesional. Fue Vicepresidente de Emprendimiento de iNNpulsa Colombia y COO de SEED MG en Brasil. Socia fundadora de Inventta Colombia, profesora cátedra de 9 universidades.',
    image: '/assets/img/hub_1.png',
  },
  {
    name: 'Paola Machuca',
    role: 'Profesional del Área de Emprendimiento',
    description: 'Administradora de empresas con énfasis en mercadeo; con más de 6 años de experiencia en gestión administrativa y gerencial. Liderazgo, gestión de procesos y comunicación asertiva enfocada en resultados.',
    image: '/assets/img/hub_2.jpg',
  },
  {
    name: 'Juan Esteban Reina',
    role: 'Practicante del Área de Emprendimiento',
    description: 'Estudiante de marketing y transformación digital, productor musical e ingeniero de sonido con más de 6 años de experiencia en medios audiovisuales.',
    image: '/assets/img/hub_3.png',
  },
];

export const JURORS: Juror[] = [
  {
    name: 'Juan Pablo Carreño',
    focus: 'Líder de Emprendimiento en la Universidad de La Sabana',
    experience: 'Ingeniero Biomédico con más de 15 años en gestión de equipos de emprendimiento, diseño de programas para escalamiento de negocios de impacto y liderazgo en estrategias de incubación y aceleración.',
    image: '/assets/img/jurado_1.png',
  },
  {
    name: 'Jairo Enrique Peñuela',
    focus: 'Director de la Especialización en Alta Gerencia de la Universidad Católica',
    experience: 'Profesional en marketing y docente universitario con más de 23 años de experiencia en estrategias de marketing digital, branding, gestión de ventas y consultoría empresarial. Cuenta con 19 años de experiencia docente en universidades reconocidas.',
    image: '/assets/img/jurado_2.png',
  },
  {
    name: 'América Castiblanco',
    focus: 'Gerente del Área de Emprendimiento de la Universidad El Bosque',
    experience: 'Ingeniera industrial, magister en innovacion y MBA con 18 años de trayectoria profesional. Fue Vicepresidente de Emprendimiento de iNNpulsa Colombia y COO de SEED MG en Brasil. Socia fundadora de Inventta Colombia, profesora cátedra de 9 universidades.',
    image: '/assets/img/jurado_3.png',
  },
];

export const PROJECTS: PitchProject[] = [
  {
    id: 1,
    name: 'ACTIVECREDITS UEB – CRÉDITOS QUE TE MUEVEN',
    tag: 'Integrantes del Equipo',
    members: [
      { name: 'Andrés Felipe Castro García' },
      { name: 'Ana Sofía Gómez Velasco' },
      { name: 'Gabriel Santiago Amórtegui Hernández' },
      { name: 'Jesús Mateo Guerrero Mejía' },
      { name: 'David Felipe Vásquez Mora' },
    ],
    audioEntrada: '/assets/audio/entrada_grupo_1.mp3',
    productImage: '/assets/img/producto_grupo_1.jpg',
  },
  {
    id: 2,
    name: 'CALMMIND U',
    tag: 'Integrantes del Equipo',
    members: [
      { name: 'Paula Andrea Cabra' },
      { name: 'Laura Sofia Torres Rodriguez' },
      { name: 'Mariana Riveros' },
      { name: 'Juanita Flores Palma' },
    ],
    audioEntrada: '/assets/audio/entrada_grupo_2.mp3',
    productImage: '/assets/img/producto_grupo_2.jpg',
  },
  {
    id: 3,
    name: 'MINDCARE U',
    tag: 'Integrantes del Equipo',
    members: [
      { name: 'Gabriela Ibarguen Cortes' },
      { name: 'Juan José Ascuntar Acosta' },
      { name: 'Laura Camila Puentes Salcedo' },
      { name: 'Daniel Felipe Suarez Rico' },
      { name: 'Juan Camilo Hincapié Rodriguez' },
    ],
    audioEntrada: '/assets/audio/entrada_grupo_3.mp3',
    productImage: '/assets/img/producto_grupo_3.jpg',
  },
  {
    id: 4,
    name: 'FLEXIWORK U',
    tag: 'Integrantes del Equipo',
    members: [
      { name: 'Santiago Vásquez Morales' },
      { name: 'Sarah Nicolle Salas Ospina' },
      { name: 'Juan José Cifuentes Linares' },
      { name: 'Ana Isabella Anaya Mejía' },
      { name: 'Luciana García Salavarrieta' },
    ],
    audioEntrada: '/assets/audio/entrada_grupo_4.mp3',
    productImage: '/assets/img/producto_grupo_4.jpg',
  },
  {
    id: 5,
    name: 'FRESHLY',
    tag: 'Integrantes del Equipo',
    members: [
      { name: 'Andrea Muñoz Olaya' },
      { name: 'Mariana Arciniegas Barahona' },
      { name: 'Estefanía Naranjo Rondón' },
      { name: 'María Camila González Garzón' },
    ],
    audioEntrada: '/assets/audio/entrada_grupo_5.mp3',
    productImage: '/assets/img/producto_grupo_5.jpg',
  },
  {
    id: 6,
    name: 'CLIMODA',
    tag: 'Integrantes del Equipo',
    members: [
      { name: 'Silvana Cruz Bahamon' },
      { name: 'Sara Valentina Murcia Vivas' },
      { name: 'Sara Lucia Ramírez Bautista' },
      { name: 'Paula Andrea Rozas Arias' },
      { name: 'Manuela Medina Moller' },
    ],
    audioEntrada: '/assets/audio/entrada_grupo_6.mp3',
    productImage: '/assets/img/producto_grupo_6.jpg',
  },
];

export const AGENDA_ITEMS = [
  'Bienvenida del Área de Emprendimiento del HUB',
  'Equipo de jurados',
  'Reglas y condiciones',
  'Criterios de evaluación',
  'Ronda de pitch',
  'Equipo ganador',
  'Cierre',
];

export const RULES = [
  { icon: 'Shuffle', label: 'Orden', detail: 'Sorteo aleatorio para el orden de participación.' },
  { icon: 'Clock', label: 'Pitch', detail: '5 minutos.' },
  { icon: 'MessageSquare', label: 'Feedback', detail: '5 minutos.' },
  { icon: 'CheckCircle', label: 'Calificación', detail: 'Inmediata tras el pitch según criterios establecidos.' },
  { icon: 'Trophy', label: 'Veredicto', detail: 'Se anunciará al equipo ganador al cierre del Demo Day.' },
];

export const CRITERIA = [
  { label: 'Impacto del proyecto', value: 100 },
  { label: 'Equipo de trabajo', value: 100 },
  { label: 'Claridad y comunicación', value: 100 },
  { label: 'Creatividad en la presentación', value: 100 },
  { label: 'Gestión del tiempo', value: 100 },
];

export const AUDIO_PATHS = {
  pitchLoop: '/assets/audio/pitch_loop.mp3',
  deliberationLoop: '/assets/audio/deliberation_loop.mp3',
  sfxTimesUp: '/assets/audio/sfx_times_up.mp3',
  ambientLoop: '/assets/audio/ambient_loop.mp3',
  winnerReveal: '/assets/audio/winner_reveal.mp3',
};

// ============================================================
// 🎚️ VOLÚMENES — Ajusta cada pista de 0.0 (silencio) a 1.0 (máximo)
//    fadeInMs  → duración del fade-in  en milisegundos
//    fadeOutMs → duración del fade-out en milisegundos
//
//  CONTEXTO DE CADA MOMENTO:
//  ─────────────────────────────────────────────────────────
//  • ambientLoop     → Nadie habla, solo navegación entre pantallas.
//                       Suave para crear atmósfera sin cansar.
//  • walkup          → Grupo caminando al escenario, nadie habla,
//                       momento de hype. Puede sonar con presencia.
//  • pitchLoop       → ⚠️ GENTE HABLANDO (presentación del pitch).
//                       Casi imperceptible, solo para llenar silencios.
//  • sfxTimesUp      → Alerta corta de "se acabó el tiempo".
//                       Notoria pero sin asustar, dura pocos segundos.
//  • deliberationLoop → ⚠️ JURADOS HABLANDO (retroalimentación).
//                       Muy bajita, no debe competir con las voces.
//  • winnerReveal    → Momento épico, nadie habla al inicio.
//                       Alta energía y celebración.
// ============================================================
export const AUDIO_VOLUMES = {
  // 🔈 Navegación entre pantallas — nadie habla, ambiente suave
  ambientLoop: 0.18,

  // 🎶 Entrada al escenario — nadie habla, momento de energía
  walkup: 0.75,

  // 🎤 PITCH EN CURSO — gente hablando, casi imperceptible
  pitchLoop: 0.08,

  // ⏰ Alerta de tiempo — corta y clara, sin ser agresiva
  sfxTimesUp: 0.65,

  // 💬 JURADOS DANDO FEEDBACK — gente hablando, muy bajita
  deliberationLoop: 0.10,

  // 🏆 Revelación del ganador — momento épico, alta energía
  winnerReveal: 0.85,

  // ⏱️ Duración de las transiciones (en milisegundos)
  fadeInMs: 2000,    // 2 segundos — entrada gradual y suave
  fadeOutMs: 1500,   // 1.5 segundos — salida gentil sin cortes
};
