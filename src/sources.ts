/** Where the facts come from. The credits list every source the page drew on. */
export const SOURCES = {
  park: { ref: true, short: "Wikipedia, Action Park", full: "Wikipedia contributors, “Action Park”, revision of October 4, 2026 (no. 1378502229), CC BY-SA 4.0. Every feature the page sells is one the article records; the sentences are the study's.", url: "https://en.wikipedia.org/w/index.php?title=Action_Park&oldid=1378502229" },
} as const;
export type SourceKey = keyof typeof SOURCES;
export const cited = new Set<SourceKey>();
/** Quotations that have been drawn on this page, by id, for the credits: a page that shows none says nothing of where they came from. */
export const quoted = new Set<string>();
