import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { seen, photo } from "../photos";
import { SOURCES, cited, quoted, type SourceKey } from "../sources";
import { AREA_NAME, QUOTES, READ, RIDES, type Area } from "../content";

/** Flat modules: bars and lists. They are not grids because their content has no hierarchy to descend. */

/** A bar that sticks under the notice tells the page its height, so an opened square's head and in-page links clear it. It reports 0 when it is not sticking (a bar that scrolls away on a phone must not push an opened cell's head down). */
export function useBarHeight<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useLayoutEffect(() => {
    const el = ref.current; if (!el) return;
    const set = () => document.documentElement.style.setProperty("--bar-h", getComputedStyle(el).position === "sticky" ? `${Math.round(el.getBoundingClientRect().height)}px` : "0px");
    set();
    const ro = new ResizeObserver(set); ro.observe(el);
    window.addEventListener("resize", set);
    return () => { ro.disconnect(); window.removeEventListener("resize", set); document.documentElement.style.removeProperty("--bar-h"); };
  }, []);
  return ref;
}

/** The gallery's filter: the park's three areas. */
export type AreaFilter = "all" | Area["id"];
export function FilterBar({ area, setArea, shown }: { area: AreaFilter; setArea: (a: AreaFilter) => void; shown: number }) {
  const ref = useBarHeight<HTMLDivElement>();
  const count = (a: AreaFilter) => RIDES.filter((r) => a === "all" || r.area === a).length;
  return (
    <div className="filterbar" ref={ref}>
      <div className="wrap filterbar__row">
        <div className="chips" role="group" aria-label="Area of the park">
          {(["all", "alpine", "motor", "water"] as const).map((a) => (
            <button key={a} type="button" className="chip" aria-pressed={area === a} onClick={() => setArea(a)}>{a === "all" ? "All rides" : AREA_NAME[a]} <em>{count(a)}</em></button>
          ))}
        </div>
        <p className="filterbar__count" role="status" aria-live="polite">{shown} of {RIDES.length} rides</p>
      </div>
    </div>
  );
}

/** Tell us your story: the form a park's site ends its guest page with. It keeps what is typed on the page and sends nothing. */
export function StoryForm() {
  const [name, setName] = useState(""); const [text, setText] = useState(""); const [sent, setSent] = useState(false);
  return (
    <section className="flat" id="your-story" aria-labelledby="your-story-title">
      <div className="wrap flat__cols">
        <div>
          <h2 id="your-story-title" className="flat__title">Tell us your story</h2>
          <p className="flat__lead">Were you there? Which ride, which summer, and who dared you?</p>
        </div>
        <form className="storyform" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
          <label>Your name<input type="text" value={name} autoComplete="off" onChange={(e) => { setName(e.target.value); setSent(false); }} /></label>
          <label>Your story<textarea rows={4} value={text} onChange={(e) => { setText(e.target.value); setSent(false); }} /></label>
          <button type="submit" className="btn">Send</button>
          <p className="note" role="status">{sent ? "Nothing was sent. This is a layout study: the form keeps your words on this page and nowhere else." : "This form sends nothing."}</p>
        </form>
      </div>
    </section>
  );
}

/**
 * Every photograph, quotation and source on the page, for the disclosure. Rendered after the page has drawn.
 * The quotations' credits are the only place the documentary is named, so a page that shows none of its
 * quotations does not mention it. That a page quotes the film, and that a quotation was altered, are said in
 * plain sight; the list of each quotation's credit is behind a toggle, as the photographs' is.
 */
export function Credits() {
  const [keys, setKeys] = useState<string[]>([]);
  const [src, setSrc] = useState<SourceKey[]>([]);
  const [said, setSaid] = useState<string[]>([]);
  useEffect(() => {
    const read = () => {
      const k = [...seen], s = [...cited], q = [...quoted];
      setSaid((old) => (old.join() === q.join() ? old : q));
      setKeys((old) => (old.join() === k.join() ? old : k));
      setSrc((old) => (old.join() === s.join() ? old : s));
    };
    read();
    const t = setInterval(read, 1500);
    return () => clearInterval(t);
  }, []);
  const quotes = QUOTES.filter((q) => said.includes(q.id));
  const film = quotes.filter((q) => q.film).length;
  const mark = (t: string) => `“${t}”`;
  const COUNT = ["None", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight"];
  return (
    <>
      {quotes.length > 0 && (
        <p>
          <strong>Quotations.</strong> The {quotes.length === 1 ? "quotation" : `${COUNT[quotes.length].toLowerCase()} quotations`} on this page are real people's words, listed below with whose they are and where each was read.
          {film > 0 && <> {film === quotes.length ? (film === 1 ? "It is" : "They are") : `${COUNT[film]} of them ${film === 1 ? "is" : "are"}`} from the documentary Class Action Park (2020, directed by Chris Charles Scott and Seth Porges), read in the article or the review named beside each and not checked against the film itself. This study is not affiliated with the film or its makers.</>}
        </p>
      )}
      {quotes.filter((q) => q.altered).map((q) => (
        <p key={q.id}><strong>A quotation on this page has been altered.</strong> {mark(q.quote)} {q.altered}</p>
      ))}
      {quotes.length > 0 && (
        <details>
          <summary>Quotations on this page ({quotes.length})</summary>
          <ul>{quotes.map((q) => <li key={q.id}>{mark(q.quote)} {q.credit} Read in <a href={READ[q.read].url}>{READ[q.read].label}</a>.{q.altered ? ` Altered: ${q.altered}` : ""}</li>)}</ul>
        </details>
      )}
      {keys.length > 0 && (
        <details>
          <summary>Photographs on this page ({keys.length})</summary>
          <ul>{keys.map((k) => { const p = photo(k); return <li key={k}>{p.alt}. <a href={p.page}>{p.credit}</a>, {p.source}, {p.licence}. {p.real ? "Taken at Action Park." : "Not taken at Action Park."}</li>; })}</ul>
        </details>
      )}
      {src.length > 0 && (
        <details>
          <summary>Sources for the page ({src.length})</summary>
          <ul>{src.map((k) => <li key={k}><a href={SOURCES[k].url}>{SOURCES[k].short}</a>: {SOURCES[k].full}</li>)}</ul>
        </details>
      )}
    </>
  );
}
