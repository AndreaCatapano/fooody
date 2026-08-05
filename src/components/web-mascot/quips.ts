// Short personality lines shown near Nib for specific reaction moments —
// copy only, kept separate from useMascotPose.ts so the voice can be tuned
// without touching interaction logic. Arrays get one pseudo-random pick per
// trigger, never repeating the line just shown; QUIP_HERO is a single
// one-time line (the birth moment only happens once per page load).

export const QUIP_HERO = 'Sono Nib.'
export const QUIP_EXCITED = ['Ehi!', 'Presente.', 'Ci sono!']
export const QUIP_FALLEN = ['Ahia.', 'Rallenta un attimo.']
export const QUIP_GET_UP = ['Tutto ok.', 'Ci risono.']
export const QUIP_WAVE = ['A dopo.', 'Torna quando vuoi.']
export const QUIP_FAQ = ['Bella domanda.', 'Fammi pensare.', 'Giusto.']
export const QUIP_END_OF_PAGE = ['Sei arrivato in fondo.', 'Tutto letto.']
