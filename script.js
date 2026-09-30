const form = document.querySelector('#powerForm');
const intensity = document.querySelector('#intensity');
const levelLabel = document.querySelector('#levelLabel');
const vibe = document.querySelector('#vibe');
const count = document.querySelector('#count');
const choices = [...document.querySelectorAll('.choice')];
const placeholder = document.querySelector('#placeholder');
const resultContent = document.querySelector('#resultContent');
const result = document.querySelector('#result');
const saveButton = document.querySelector('#saveButton');
const savedPowers = document.querySelector('#savedPowers');
const savedCount = document.querySelector('#savedCount');
let energy = 'Cosmica';
let currentPower;
let saved = JSON.parse(localStorage.getItem('genesi-powers') || '[]');

const powers = {
  Cosmica: [
    ['Risonanza Astrale', 'Accordi il battito del tuo cuore alle stelle vicine e richiami onde di luce che piegano lo spazio attorno a te.', 'La tua energia si attenua sotto un cielo senza stelle.'],
    ['Marea di Andromeda', 'Con un gesto disegni correnti gravitazionali invisibili, capaci di spostare oggetti e cambiare il corso di una caduta.', 'Ogni onda lascia per un attimo i tuoi piedi senza peso.'],
    ['Archivio delle Comete', 'Sfiori una superficie e ne leggi la storia come una scia luminosa: ogni luogo conserva le sue orbite segrete.', 'Puoi custodire solo tre memorie cosmiche alla volta.']
  ],
  Naturale: [
    ['Radici di Vento', 'Parli con le correnti d’aria e fai germogliare passaggi sicuri tra le nuvole, le foglie e le strade della città.', 'Il potere tace dove non c’è vita vegetale.'],
    ['Cuore di Mare', 'Il tuo respiro guida l’acqua: puoi calmarla, elevarla e ascoltare le storie custodite sotto la sua superficie.', 'L’acqua salata rende le tue emozioni impossibili da nascondere.'],
    ['Prisma Selvatico', 'Trasformi la luce che incontra la natura in creature temporanee che proteggono, esplorano e indicano la via.', 'Le creature svaniscono se provi a comandarle con rabbia.']
  ],
  Mentale: [
    ['Cartografo dei Sogni', 'Entri nei sogni come in città di carta e trovi le porte che qualcuno ha dimenticato di aprire da sveglio.', 'Ogni sogno visitato lascia un piccolo dettaglio nel tuo.'],
    ['Secondo Silenzio', 'Rallenti un singolo istante per osservare tutte le possibilità prima di scegliere quella che vuoi rendere reale.', 'Dopo ogni uso, devi restare in silenzio per lo stesso tempo.'],
    ['Eco Empatica', 'Percepisci le emozioni come colori nell’aria e le trasformi in un linguaggio che anche i cuori chiusi comprendono.', 'Le emozioni troppo intense possono confondere la tua voce.']
  ],
  Tecnologica: [
    ['Sintesi Spettrale', 'Vedi i circuiti come costellazioni e puoi far dialogare oggetti che non sono mai stati progettati per incontrarsi.', 'Il sovraccarico spegne tutti i dispositivi nel raggio di pochi metri.'],
    ['Pixel Nomade', 'Scomponi il tuo riflesso in dati luminosi e attraversi schermi, insegne e superfici digitali per pochi secondi.', 'Ogni viaggio lascia una traccia che qualcuno potrebbe seguire.'],
    ['Frequenza Zero', 'Ascolti la firma nascosta di qualunque macchina e ne riscrivi una funzione con un semplice tocco.', 'Le tecnologie analogiche restano completamente immuni.']
  ]
};

function updateSlider() {
  const value = intensity.value;
  levelLabel.textContent = value;
  intensity.style.setProperty('--fill', `${((value - 1) / 49) * 100}%`);
}
function randomPower() {
  const options = powers[energy];
  return options[Math.floor(Math.random() * options.length)];
}
function createPower() {
  const [name, baseDescription, limit] = randomPower();
  const level = Number(intensity.value);
  const qualifier = vibe.value.trim() ? ` La tua impronta ${vibe.value.trim()} rende ogni manifestazione inconfondibile.` : '';
  return { name, description: baseDescription + qualifier, limit, energy, level, control: Math.min(98, 42 + level + Math.floor(Math.random() * 9)), range: Math.max(3, Math.round(level * .62)), rarity: level >= 42 ? 'MITICA' : level >= 27 ? 'EPICA' : level >= 12 ? 'RARA' : 'SINGOLARE' };
}
function showPower(power) {
  currentPower = power;
  placeholder.classList.add('hidden'); resultContent.classList.remove('hidden');
  document.querySelector('#powerName').textContent = power.name;
  document.querySelector('#powerDescription').textContent = power.description;
  document.querySelector('#limitText').textContent = power.limit;
  document.querySelector('#powerType').textContent = `ENERGIA ${power.energy.toUpperCase()} · LV. ${power.level}`;
  document.querySelector('#controlStat').textContent = `${power.control}%`;
  document.querySelector('#rangeStat').textContent = `${power.range} m`;
  document.querySelector('#rarityStat').textContent = power.rarity;
  document.querySelector('#powerOrb').dataset.energy = power.energy;
  saveButton.classList.toggle('saved', saved.some(item => item.name === power.name));
  saveButton.innerHTML = saveButton.classList.contains('saved') ? '♥ <span>SALVATO</span>' : '♡ <span>SALVA</span>';
  result.classList.add('reveal'); setTimeout(() => result.classList.remove('reveal'), 700);
}
function renderSaved() {
  savedCount.textContent = String(saved.length).padStart(2, '0');
  savedPowers.innerHTML = saved.length ? saved.map((power, index) => `<article class="saved-power"><span>${String(index + 1).padStart(2, '0')}</span><div><b>${power.name}</b><small>${power.energy} · LV. ${power.level}</small></div><button data-remove="${index}" aria-label="Rimuovi ${power.name}">×</button></article>`).join('') : '<p class="empty-archive">Nessun potere nell’archivio. Il primo è sempre il più raro.</p>';
}
choices.forEach(button => button.addEventListener('click', () => { choices.forEach(item => item.classList.remove('selected')); button.classList.add('selected'); energy = button.dataset.value; }));
intensity.addEventListener('input', updateSlider);
vibe.addEventListener('input', () => count.textContent = `${vibe.value.length}/56`);
form.addEventListener('submit', event => { event.preventDefault(); showPower(createPower()); result.scrollIntoView({ behavior: 'smooth', block: 'center' }); });
document.querySelector('#againButton').addEventListener('click', () => showPower(createPower()));
saveButton.addEventListener('click', () => { if (!currentPower) return; const exists = saved.some(power => power.name === currentPower.name); saved = exists ? saved.filter(power => power.name !== currentPower.name) : [currentPower, ...saved].slice(0, 4); localStorage.setItem('genesi-powers', JSON.stringify(saved)); renderSaved(); showPower(currentPower); });
savedPowers.addEventListener('click', event => { const index = event.target.dataset.remove; if (index === undefined) return; saved.splice(index, 1); localStorage.setItem('genesi-powers', JSON.stringify(saved)); renderSaved(); if (currentPower) showPower(currentPower); });
updateSlider(); renderSaved();
