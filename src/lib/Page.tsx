import type { ReactNode } from "react";
import { Tools } from "./tools";
import { StudyBanner, StudyDisclosure } from "./study";
import { Credits } from "./modules";
import { Icon } from "../icons";
import { FOOTER, LEFT_OUT, NAV, PAGES } from "../content";
import { useFontsReady } from "./fonts";

/**
 * The shell, in the shape of a theme park's site: a line of practical facts
 * (where, and the season), a violet bar with the mark and Rides,
 * Guest Stories, Tickets, Hours, Directions and Groups, and a footer of
 * lists. Action Park had no site like it; the items are a park site's usual
 * ones, for show, and the study's own pages are the links. Nothing in the
 * shell leaves for Wikipedia, whose articles are linked from the notice and
 * the disclosure.
 */
export function Page({ current, source, children }: { current: string; source: { label: string; url: string }; children: ReactNode }) {
  useFontsReady(["400 1em Montserrat", "700 1em Montserrat", "italic 800 1em Montserrat"]);
  return (
    <>
      <a className="skip" href="#content">Skip to content</a>
      <StudyBanner />
      <Tools />
      <header className="top">
        <div className="util">
          <p className="wrap util__row"><span><Icon name="pin" size={16} />Route 94, Vernon Township, New Jersey</span><span><Icon name="clock" size={16} />Open mid-June to Labor Day</span></p>
        </div>
        <div className="wrap top__row">
          <a className="mark" href={PAGES.home} aria-label="GIFpark, home"><span className="mark__tri" aria-hidden="true" /><span className="mark__name"><b>GIF</b>park</span></a>
          <nav className="hnav" aria-label="Primary">
            <ul>{NAV.map((n) => <li key={n.label}>{n.href ? <a href={n.href} aria-current={n.href === current ? "page" : undefined}>{n.label}</a> : <span>{n.label}</span>}</li>)}</ul>
          </nav>
          <span className="btn top__cta">Buy Tickets</span>
        </div>
      </header>
      <main id="content">{children}</main>
      <footer className="foot">
        <div className="wrap foot__cols">
          {FOOTER.map(([title, items]) => <div key={title}><h2>{title}</h2><ul>{items.map((i) => <li key={i}><span>{i}</span></li>)}</ul></div>)}
          <div><h2>GIFpark</h2><ul><li><a href={PAGES.home}>Home</a></li><li><a href={PAGES.rides}>Rides</a></li><li><a href={PAGES.stories}>Guest stories</a></li></ul></div>
        </div>
        <p className="wrap foot__copy">GIFpark sells no tickets and operates no rides.</p>
      </footer>
      <StudyDisclosure>
        <p>{LEFT_OUT}</p>
        <p>The features sold on this page (lengths, speeds, rules, years) are from <a href={source.url}>{source.label}</a>, as the article stood in October 2026. Wikipedia's text is available under the Creative Commons Attribution-ShareAlike 4.0 licence.</p>
        <Credits />
      </StudyDisclosure>
    </>
  );
}
