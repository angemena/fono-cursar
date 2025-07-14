
const materiasPorAnio = {
  1: [
    'Anatomía',
    'Eufonía',
    'Filosofía',
    'Física Acústica para Fonoaudiología',
    'Lingüística general y teorías psicolingüísticas sobre la adquisición del lenguaje y la comunicación',
    'Modulo de Integración Disciplinar I (MID I)',
    'Psicología General y Evolutiva'
  ],
  2: [
    'Audiología I',
    'Desarrollo del lenguaje y la comunicación',
    'Fonoodontoestomatología',
    'Genética y Embriología',
    'Modulo de Integración Disciplinar II (MID II)',
    'Neurología I',
    'Teología Dogmática I'
  ],
  3: [
    'Alteraciones fonoodontoestomatognaticas – Intervención Fonoaudiológica',
    'Alteraciones vocales – Intervención fonoaudiológica',
    'Audiología II',
    'Metodología de la Investigación',
    'Neurología II',
    'Práctica Profesional Supervisada I (PPS I)',
    'Teología Dogmática II'
  ],
  4: [
    'Abordaje fonoaudiológico en la discapacidad auditiva',
    'Alteraciones del lenguaje y la comunicación en niños – Diagnostico e intervención fonoaudiológica',
    'Intervención fonoaudiológica en el déficit cognitivo y la parálisis cerebral',
    'OPTATIVA I',
    'OPTATIVA II',
    'Práctica Profesional Supervisada II (PPS II)',
    'Teología Moral y Doctrina Social de la Iglesia'
  ],
  5: [
    'Alteraciones del lenguaje en adultos – Diagnóstico y abordaje fonoaudiológico',
    'Ejercicio Profesional',
    'Taller de Trabajo Integrador Final',
    'Trabajo Integrador Final'
  ]
};

const correlativas = {
  'Neurología I': ['Anatomía'],
  'Genética y Embriología': ['Anatomía'],
  'Fonoodontoestomatología': ['Anatomía'],
  'Alteraciones vocales – Intervención fonoaudiológica': ['Eufonía'],
  'Práctica Profesional': ['Eufonía'],
  'Teología Dogmática I': ['Filosofía'],
  'Audiología I': ['Física Acústica para Fonoaudiología'],
  'Desarrollo del lenguaje y la comunicación': ['Lingüística general y teorías psicolingüísticas sobre la adquisición del lenguaje y la comunicación', 'Psicología General y Evolutiva'],
  'Modulo de Integración Disciplinar II (MID II)': ['Modulo de Integración Disciplinar I (MID I)', 'Lingüística general y teorías psicolingüísticas sobre la adquisición del lenguaje y la comunicación'],
  'Audiología II': ['Audiología I', 'Genética y Embriología'],
  'Alteraciones fonoodontoestomatognaticas – Intervención Fonoaudiológica': ['Fonoodontoestomatología'],
  'Metodología de la Investigación': ['Desarrollo del lenguaje y la comunicación', 'Modulo de Integración Disciplinar II (MID II)'],
  'Intervención fonoaudiológica en el déficit cognitivo y la parálisis cerebral': ['Desarrollo del lenguaje y la comunicación', 'Neurología II', 'Alteraciones fonoodontoestomatognaticas – Intervención Fonoaudiológica'],
  'Alteraciones del lenguaje y la comunicación en niños – Diagnostico e intervención fonoaudiológica': ['Desarrollo del lenguaje y la comunicación'],
  'Práctica Profesional Supervisada I (PPS I)': ['Desarrollo del lenguaje y la comunicación', 'Modulo de Integración Disciplinar II (MID II)'],
  'Práctica Profesional Supervisada II (PPS II)': ['Práctica Profesional Supervisada I (PPS I)'],
  'OPTATIVA I': ['Desarrollo del lenguaje y la comunicación', 'Alteraciones fonoodontoestomatognaticas – Intervención Fonoaudiológica', 'Alteraciones vocales – Intervención fonoaudiológica', 'Audiología II'],
  'OPTATIVA II': ['Desarrollo del lenguaje y la comunicación', 'Alteraciones fonoodontoestomatognaticas – Intervención Fonoaudiológica', 'Alteraciones vocales – Intervención fonoaudiológica', 'Audiología II'],
  'Teología Dogmática II': ['Teología Dogmática I'],
  'Neurología II': ['Neurología I'],
  'Abordaje fonoaudiológico en la discapacidad auditiva': ['Audiología II', 'Neurología II'],
  'Ejercicio Profesional': ['Abordaje fonoaudiológico en la discapacidad auditiva', 'Intervención fonoaudiológica en el déficit cognitivo y la parálisis cerebral', 'Práctica Profesional Supervisada II (PPS II)'],
  'Alteraciones del lenguaje en adultos – Diagnóstico y abordaje fonoaudiológico': ['Alteraciones del lenguaje y la comunicación en niños – Diagnostico e intervención fonoaudiológica'],
  'Teología Moral y Doctrina Social de la Iglesia': ['Teología Dogmática II'],
  'Taller de Trabajo Integrador Final': ['Metodología de la Investigación'],
  'Trabajo Integrador Final': ['Ejercicio Profesional', 'Taller de Trabajo Integrador Final']
};

const completadas = {};
const container = document.getElementById('malla');

Object.keys(materiasPorAnio).forEach(anio => {
  const columna = document.createElement('div');
  columna.className = 'columna';

  const titulo = document.createElement('h2');
  titulo.textContent = `Año ${anio}`;
  titulo.className = `color-${anio}`;
  columna.appendChild(titulo);

  materiasPorAnio[anio].forEach(materia => {
    completadas[materia] = false;
    const div = document.createElement('div');
    div.className = `materia bloqueada color-${anio}`;
    div.textContent = materia;
    div.onclick = () => toggle(materia, div);
    columna.appendChild(div);
  });

  container.appendChild(columna);
});

function toggle(nombre, elem) {
  if (elem.classList.contains('bloqueada')) {
    alert("Debes completar las correlativas primero.");
    return;
  }
  completadas[nombre] = !completadas[nombre];
  elem.classList.toggle('completada', completadas[nombre]);
  actualizar();
}

function actualizar() {
  const materias = document.querySelectorAll('.materia');
  materias.forEach(elem => {
    const nombre = elem.textContent;
    const reqs = correlativas[nombre] || [];
    const habilitada = reqs.every(r => completadas[r]);
    if (!completadas[nombre]) {
      elem.classList.toggle('bloqueada', !habilitada);
    }
  });
}

actualizar();
