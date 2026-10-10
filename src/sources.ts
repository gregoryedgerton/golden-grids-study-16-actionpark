/** Where the facts come from. The credits list every source the page drew on. */
export const SOURCES = {
  park: { ref: true, short: "Wikipedia, Action Park", full: "Wikipedia contributors, “Action Park”, revision of October 4, 2026 (no. 1378502229), CC BY-SA 4.0. Every feature the page sells is one the article records; the sentences are the study's.", url: "https://en.wikipedia.org/w/index.php?title=Action_Park&oldid=1378502229" },
  film: { ref: true, short: "Class Action Park (2020)", full: "Class Action Park, documentary, 2020, directed by Chris Charles Scott and Seth Porges, for five short quotations only; taken from Wikipedia's articles (\u201cAction Park\u201d and \u201cClass Action Park\u201d, revision no. 1376695818, CC BY-SA 4.0) and from Reason's review of the film, August 28, 2020.", url: "https://en.wikipedia.org/w/index.php?title=Class_Action_Park&oldid=1376695818" },
} as const;
export type SourceKey = keyof typeof SOURCES;
export const cited = new Set<SourceKey>();
