import { ExpandedCell, type ExpandGroup } from "./expand";
import { Fact as FactBox } from "./boxes";
import { Fit } from "./fit";
import { Imprint, Icon, type IconName } from "../icons";
import { photo, seen } from "../photos";
import { quoted } from "../sources";
import { AREA_NAME, PAGES, RIDES, type Area, type Fact, type Quote, type Ride, type Tone, type Year } from "../content";
export { Icon };

/**
 * What goes in a square. A ride is a card: its photograph (or, where none
 * stands in honestly, a flat tile of the park's own colours), its name and a
 * line; opened, it sells the ride and lists what to know before riding it. Type scales with the square (`--u`, set in styles.css
 * from the square's side), and what a square cannot hold it leaves out whole.
 */
export function Pic({ k, sizes = "(min-width: 1100px) 50vw, 100vw", eager, pos }: { k: string; sizes?: string; eager?: boolean; pos?: string }) {
  const p = photo(k);
  seen.add(k);
  return <img src={p.src} srcSet={p.srcSet} sizes={sizes} alt={p.alt} loading={eager ? "eager" : "lazy"} decoding="async" style={pos ? { objectPosition: pos } : undefined} />;
}
/** A photograph's credit says whether it was taken at the park or stands in for a ride. */
export function Credit({ k }: { k: string }) {
  const p = photo(k);
  return (
    <figcaption className="credit">
      {p.real ? "Photograph taken at the park: " : "Photograph: "}<a href={p.page}>{p.credit}</a>, {p.source}, {p.licence}.{" "}
      {p.real ? "Its author does not say which ride it shows." : "It stands in for the ride and was not taken at the park."}
    </figcaption>
  );
}

/** A button in the park's yellow, for show unless it has somewhere to go. */
export function Cta({ label, href, ghost }: { label: string; href?: string; ghost?: boolean }) {
  const cls = `btn${ghost ? " btn--ghost" : ""}`;
  return href ? <a className={cls} href={href}>{label}</a> : <span className={cls}>{label}</span>;
}

/** The home page's opening square: the park, over a photograph taken there. */
export function HeroCell({ kicker, title, body, k }: { kicker: string; title: string; body: string; k: string }) {
  return (
    <div className="hero">
      <div className="hero__photo"><Pic k={k} sizes="100vw" eager /></div>
      <div className="hero__text">
        <p className="hero__kicker">{kicker}</p>
        <div className="hero__fit"><Fit as="h2" className="fit--display" min={24} max={150}>{title}</Fit></div>
        <div className="hero__body"><Fit as="div" className="fit--body" min={13} max={22}><p>{body}</p></Fit></div>
        <p className="hero__cta"><Cta label="See the rides" href={PAGES.rides} /> <Cta label="Guest stories" href={PAGES.stories} ghost /></p>
      </div>
    </div>
  );
}

export function FactTile({ f }: { f: Fact }) {
  return (
    <FactBox imprint={f.icon ? <Imprint name={f.icon} /> : undefined} label={f.label} fitClass="fit--display fit--num" max={150} spoken={f.spoken} tone={`${f.tone ?? "violet"}${(f.body?.length ?? 0) > 110 ? " box--wordy" : ""}`} body={f.body ? <p>{f.body}</p> : undefined}>
      {f.line}
    </FactBox>
  );
}
export function FactStrip({ f }: { f: Fact }) {
  return (
    <div className={`box box--strip box--${f.tone ?? "violet"}`} role="group" aria-label={`${f.spoken ?? f.line}: ${f.label}`}>
      <p className="box__label">{f.label}</p>
      <div className="box__fit"><Fit as="span" className="fit--display fit--num" min={8} max={150}>{f.line}</Fit></div>
    </div>
  );
}

/** One of the park's three areas: opens to what it held, and leads to its rides. */
export function AreaCard({ a, x, slotKey }: { a: Area; x: ExpandGroup; slotKey: string }) {
  const rides = RIDES.filter((r) => r.area === a.id);
  return (
    <>
      <article className="card">
        <div className="card__media">
          <Pic k={a.photo} />
          <button className="media__open" {...x.triggerProps(slotKey)}><span className="visually-hidden">More: {a.name}</span></button>
          <span className="card__pill" aria-hidden="true">{a.name}</span>
        </div>
        <div className="card__text"><p className="card__kicker">{rides.length} rides</p><p className="card__title">{a.name}</p><p className="card__body card__line--more">{a.line}</p></div>
      </article>
      {x.isOpen(slotKey) && (
        <ExpandedCell id={x.panelId(slotKey)} title={a.name} onClose={x.close} closeRef={x.closeRef}>
          <div className="cell__split">
            <figure className="cell__photo"><Pic k={a.photo} sizes="(min-width: 1100px) 60vw, 100vw" /><Credit k={a.photo} /></figure>
            <div className="detail">
              <p className="detail__lead">{a.line}</p>
              <p>{a.body}</p>
              <ul className="bullets">{rides.map((r) => <li key={r.id}><a href={`${PAGES.rides}?open=${r.id}`}>{r.name}</a></li>)}</ul>
              <p className="detail__actions"><Cta label={`All of ${a.name}`} href={`${PAGES.rides}?area=${a.id}`} /></p>
            </div>
          </div>
        </ExpandedCell>
      )}
    </>
  );
}

function RideDetail({ r }: { r: Ride }) {
  return (
    <div className="detail">
      <p className="detail__kicker">{AREA_NAME[r.area]}{r.tag ? ` · ${r.tag}` : ""}</p>
      <p className="detail__lead">{r.short}</p>
      <p>{r.what}</p>
      {r.know.length > 0 && (
        <div className="know">
          <p className="know__title">Know before you ride</p>
          <ul className="bullets">{r.know.map((k) => <li key={k}>{k}</li>)}</ul>
        </div>
      )}
      <p className="detail__actions"><Cta label="Buy Tickets" /></p>
      <p className="note">No tickets are sold: see About this study, at the foot of the page.</p>
    </div>
  );
}

/** A ride. With a photograph it is a picture over its name; without, a flat tile with the name fitted to the square. */
export function RideCard({ r, x, slotKey, tone }: { r: Ride; x: ExpandGroup; slotKey: string; tone?: Tone }) {
  if (!r.photo) {
    return (
      <FactBox id={`ride-${r.id}`} label={r.tag ?? AREA_NAME[r.area]} fitClass="fit--title" min={12} max={120} tone={r.tone ?? tone ?? "violet"} body={<p>{r.short}</p>}
        expand={{ group: x, slotKey, title: r.name, full: <RideDetail r={r} /> }}>
        {r.name}
      </FactBox>
    );
  }
  return (
    <>
      <article className="card" id={`ride-${r.id}`}>
        <div className="card__media">
          <Pic k={r.photo} />
          <button className="media__open" {...x.triggerProps(slotKey)}><span className="visually-hidden">More: {r.name}</span></button>
          <span className="card__pill" aria-hidden="true">{r.name}</span>
        </div>
        <div className="card__text">
          <p className="card__kicker">{r.tag ?? AREA_NAME[r.area]}</p>
          <p className="card__title">{r.name}</p>
          <p className="card__body card__line--more">{r.short}</p>
        </div>
      </article>
      {x.isOpen(slotKey) && (
        <ExpandedCell id={x.panelId(slotKey)} title={r.name} onClose={x.close} closeRef={x.closeRef}>
          <div className="cell__split">
            <figure className="cell__photo"><Pic k={r.photo} sizes="(min-width: 1100px) 60vw, 100vw" /><Credit k={r.photo} /></figure>
            <RideDetail r={r} />
          </div>
        </ExpandedCell>
      )}
    </>
  );
}

/** A photograph on its own: it opens to the whole frame and its credit. */
export function PhotoCard({ k, x, slotKey, title }: { k: string; x: ExpandGroup; slotKey: string; title: string }) {
  return (
    <>
      <figure className="card card--photo">
        <div className="card__media">
          <Pic k={k} />
          <button className="media__open" {...x.triggerProps(slotKey)}><span className="visually-hidden">More: {title}</span></button>
        </div>
      </figure>
      {x.isOpen(slotKey) && (
        <ExpandedCell id={x.panelId(slotKey)} title={title} onClose={x.close} closeRef={x.closeRef}>
          <figure className="cell__photo cell__photo--full"><Pic k={k} sizes="100vw" /><Credit k={k} /></figure>
        </ExpandedCell>
      )}
    </>
  );
}

/** A year in the park's history: the year fitted to the square, a line, and the fuller account behind More. */
export function YearTile({ y, x, slotKey }: { y: Year; x: ExpandGroup; slotKey: string }) {
  return (
    <FactBox label={y.label} fitClass="fit--display fit--num" max={150} tone={y.tone} body={<p>{y.body}</p>}
      expand={{ group: x, slotKey, title: `${y.year}: ${y.label}`, full: <div className="cell__prose"><p className="detail__lead">{y.body}</p><p>{y.full}</p></div> }}>
      {y.year}
    </FactBox>
  );
}
export function YearStrip({ y }: { y: Year }) {
  return (
    <div className={`box box--strip box--${y.tone}`} role="group" aria-label={`${y.year}: ${y.label}`}>
      <p className="box__label">{y.label}</p>
      <div className="box__fit"><Fit as="span" className="fit--display fit--num" min={8} max={150}>{y.year}</Fit></div>
    </div>
  );
}

/** A word or a name set as large as the square allows, under a small label. */
export function WordTile({ label, word, tone, body, icon }: { label: string; word: string; tone: Tone; body?: string; icon?: IconName }) {
  return (
    <FactBox imprint={icon ? <Imprint name={icon} /> : undefined} label={label} fitClass="fit--title" min={12} max={110} tone={`${tone}${(body?.length ?? 0) > 110 ? " box--wordy" : ""}`} body={body ? <p>{body}</p> : undefined}>
      {word}
    </FactBox>
  );
}

/** A short quotation: the words fitted to the square, the speaker above, a line of context behind More. Where it was said is in the page's credits, which learn of it here. */
export function QuoteTile({ q, x, slotKey }: { q: Quote; x: ExpandGroup; slotKey: string }) {
  const said = `\u201c${q.quote}\u201d`;
  quoted.add(q.id);
  return (
    <>
      <div className={`box box--${q.tone} box--quote`}>
        <p className="box__label">{q.who}<span className="quote__role">, {q.role}</span></p>
        <div className="box__fit"><Fit as="p" className="fit--quote" min={12} max={110}>{said}</Fit></div>
        <div className="box__foot"><button className="more" aria-label={`More: ${q.who}, ${q.role}`} {...x.triggerProps(slotKey)}>More</button></div>
      </div>
      {x.isOpen(slotKey) && (
        <ExpandedCell id={x.panelId(slotKey)} title={q.who} onClose={x.close} closeRef={x.closeRef}>
          <div className="cell__prose">
            <blockquote className="pull"><p>{said}</p><footer>{q.who}, {q.role}</footer></blockquote>
            <p>{q.body}</p>
            <p className="note">{q.altered ? "One word of this quotation has been changed. What it said, and where" : "Where this was said"} is given in <a href="#about-this-study">About this study</a>, at the foot of the page.</p>
          </div>
        </ExpandedCell>
      )}
    </>
  );
}
export type { IconName };
