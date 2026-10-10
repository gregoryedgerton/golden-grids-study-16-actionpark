/**
 * The study's own line icons on a 24-unit grid with a round 1.7-unit stroke.
 * None is copied from the reference. `Icon` is inline and takes the text
 * colour; `Imprint` is the same drawing set large and faint behind a
 * square's text.
 */
const PATHS = {
  wave: "M2 9c2.500-3 5-3 7.500 0s5 3 7.500 0 3.500-2 5-1M2 15c2.500-3 5-3 7.500 0s5 3 7.500 0 3.500-2 5-1",
  mountain: "M2 20 9 7l4 7 3-4 6 10z",
  ticket: "M4 7h16v3a2 2 0 0 0 0 4v3H4v-3a2 2 0 0 0 0-4zM14 7v10",
  cross: "M9 4h6v5h5v6h-5v5H9v-5H4V9h5z",
  kart: "M3 15h13l4-3h1v5h-2M5 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0M14 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0M8 15l2-5h3",
  ring: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM5.600 5.600l3.600 3.600M14.800 14.800l3.600 3.600M18.400 5.600l-3.600 3.600M9.200 14.800l-3.600 3.600",
  loop: "M3 19h6a6 6 0 1 0-6-6M9 19h12",
  pin: "M12 21s7-6.200 7-11.500A7 7 0 0 0 5 9.500C5 14.800 12 21 12 21zM12 12a2.500 2.500 0 1 0 0-5 2.500 2.500 0 0 0 0 5z",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2",
  search: "M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM15.5 15.5 21 21",
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18",
  user: "M12 11a3.500 3.500 0 1 0 0-7 3.500 3.500 0 0 0 0 7zM5 20a7 7 0 0 1 14 0",
  chip: "M7 7h10v10H7zM10 10h4v4h-4zM9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4",
  code: "M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14",
  arrow: "M5 12h14M13 6l6 6-6 6",
  check: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM8 12.200l2.700 2.800L16 9.500",
  bolt: "M13 3 5 14h6l-1 7 8-11h-6l1-7z",
  cloud: "M7 18a4 4 0 0 1-.5-8A5.500 5.500 0 0 1 17 8.500 4.500 4.500 0 0 1 17.500 18z",
  gpu: "M3 7h18v10H3zM6 17v3M9 20h12M8 12a2.500 2.500 0 1 0 5 0 2.500 2.500 0 0 0-5 0zM16 10h2M16 14h2",
  play: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM10 8.500v7l6-3.500z",
  download: "M12 4v11M7 11l5 5 5-5M5 20h14",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  pc: "M4 5h16v11H4zM2 19h20M10 16v3M14 16v3",
  car: "M4 16v-4l2-5h12l2 5v4M3 16h18M6 16v3M18 16v3M7 12.500h.01M17 12.500h.01",
  robot: "M6 8h12v10H6zM12 8V4M9 13h.01M15 13h.01M9.500 16h5M3 12v3M21 12v3",
  heart: "M12 20.500s-8-5-8-10.800A4.200 4.200 0 0 1 12 7a4.200 4.200 0 0 1 8 2.700c0 5.800-8 10.800-8 10.800z",
  building: "M5 21V5l7-2 7 4v14M9 9h2M9 13h2M9 17h2M15 11h.01M15 15h.01",
  bank: "M3 9l9-5 9 5M5 9v9M9 9v9M15 9v9M19 9v9M3 20h18",
  leaf: "M5 19c0-8 5-13 14-14 0 9-5 14-14 14zM5 19l8-8",
  film: "M4 5h16v14H4zM8 5v14M16 5v14M4 9h4M4 15h4M16 9h4M16 15h4",
  cart: "M3 4h2.500l2 11h10.500l2-8H7M10 20h.01M17 20h.01",
  factory: "M3 21V9l6 3V9l6 3V5h6v16zM8 17h.01M13 17h.01M18 17h.01",
  health: "M12 5v14M5 12h14M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z",
  signal: "M12 20v-7M8 8a6 6 0 0 1 8 0M5 5a10 10 0 0 1 14 0M12 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
  wafer: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3.500 9h17M3.500 15h17M9 3.500v17M15 3.500v17",
  flask: "M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3M8 15h8",
  food: "M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M17 3c-2 2-2 6 0 8v10",
  home: "M3.500 11.500 12 4l8.500 7.500M5.500 10v9.500h13V10M10 19.500v-5h4v5",
} as const;
export type IconName = keyof typeof PATHS;

export function Icon({ name, size = 24, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg className={`icon${className ? ` ${className}` : ""}`} viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={PATHS[name]} />
    </svg>
  );
}

export function Imprint({ name }: { name: IconName }) {
  return (
    <svg className="box__imprint" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={PATHS[name]} />
    </svg>
  );
}
