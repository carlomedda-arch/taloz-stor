const prompt = document.getElementById('power-prompt');
const generate = document.getElementById('generate');
const card = document.getElementById('power-card');
const powerKind = document.getElementById('power-kind');
const powerIcon = document.getElementById('power-icon');
const powerLevel = document.getElementById('power-level');
const powerName = document.getElementById('power-name');
const powerDescription = document.getElementById('power-description');
const meter = document.getElementById('meter-fill');
const rarity = document.getElementById('rarity');
const powerCode = document.getElementById('power-code');

const powers = [
  { kind: 'POTERE EMPATICO', icon: '◌', name: 'Risonanza<br>gentile', text: 'Trasformi ogni emozione sincera in un piccolo faro per chi ti è vicino.', rarity: 'RARA', color: '#7555ea' },
  { kind: 'POTERE COSMICO', icon: '✦', name: 'Bussola delle<br>possibilità', text: 'Sai trovare la direzione giusta anche quando nessuno ha ancora disegnato la mappa.', rarity: 'EPICO', color: '#5c46c9' },
  { kind: 'POTERE NATURALE', icon: '❋', name: 'Crescita<br>immediata', text: 'Dove passi tu, idee e persone trovano lo spazio per fiorire.', rarity: 'NON COMUNE', color: '#4e9b79' },
  { kind: 'POTERE DEL TEMPO', icon: '◔', name: 'Un minuto<br>in più', text: 'Quando serve davvero, riesci a regalare calma e tempo a chi ne ha bisogno.', rarity: 'LEGGENDARIO', color: '#e65e89' },
  { kind: 'POTERE CREATIVO', icon: '✺', name: 'Scintilla<br>infinita', text: 'Vedi connessioni luminose dove gli altri vedono soltanto punti sparsi.', rarity: 'EPICO', color: '#e28359' }
];

function generatePower() {
  const seed = prompt.value.trim().toLowerCase();
  const sum = [...seed].reduce((total, char) => total + char.charCodeAt(0), 17);
  const power = powers[sum % powers.length];
  const level = Math.max(1, Math.min(50, (sum % 50) + 1));
  powerKind.textContent = power.kind;
  powerIcon.textContent = power.icon;
  powerName.innerHTML = power.name;
  powerDescription.textContent = seed ? power.text : 'Anche il silenzio custodisce una forma di energia tutta sua.';
  powerLevel.textContent = level;
  rarity.textContent = power.rarity;
  powerCode.textContent = `SL-${String(sum % 1000).padStart(3, '0')}`;
  card.style.background = `linear-gradient(148deg, ${power.color} 0%, #6544d5 62%, #442997 100%)`;
  meter.style.width = `${level * 2}%`;
  card.animate([{ transform: 'rotate(5deg) scale(.94)' }, { transform: 'rotate(2deg) scale(1.03)' }, { transform: 'rotate(5deg) scale(1)' }], { duration: 520, easing: 'cubic-bezier(.2,.8,.2,1)' });
  generate.innerHTML = 'Rigenera <span>↻</span>';
}

generate.addEventListener('click', generatePower);
prompt.addEventListener('keydown', event => { if (event.key === 'Enter') generatePower(); });
