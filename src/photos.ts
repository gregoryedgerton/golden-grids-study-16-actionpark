import meta from "./photos.json";

/**
 * Photographs are third parties'. Seven were taken at Action Park by Joe
 * Shlabotnik and are on Wikimedia Commons under CC BY 2.0 (`real`); their
 * author does not say which ride each shows, so none is set beside a ride as
 * if it showed it. The rest stand in for a kind of ride and were taken
 * elsewhere: from Wikimedia Commons under Creative Commons licences or in the
 * public domain, and from Unsplash under the Unsplash License. `photos.json`
 * records each one's author, licence and page, and its alt text, which is the
 * only place a picture is described.
 */
export interface Photo { key: string; src: string; srcSet: string; alt: string; credit: string; licence: string; page: string; source: string; profile?: string; real?: boolean; w: number; h: number }
type Meta = Record<string, { credit: string; licence: string; page: string; source: string; alt: string; profile?: string; real?: boolean; w: number; h: number }>;

export function photo(key: string): Photo {
  const m = (meta as Meta)[key];
  if (!m) throw new Error(`photo "${key}" is not in photos.json`);
  const base = `${import.meta.env.BASE_URL}assets/s16-${key}`;
  return { key, src: `${base}-800.jpg`, srcSet: `${base}-800.jpg ${Math.round(m.w / 2)}w, ${base}-1600.jpg ${m.w}w`, alt: m.alt, credit: m.credit.replace(/ from Forest Hills.*$/, ""), licence: m.licence, page: m.page, source: m.source, profile: m.profile, real: m.real, w: m.w, h: m.h };
}

/** Photographs that have been drawn on this page, for the credits in the footer. */
export const seen = new Set<string>();
