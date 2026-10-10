import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Page } from "../lib/Page";
import { GridBand, type Cell } from "../bands/bands";
import { FactStrip, FactTile, PhotoCard, QuoteTile } from "../lib/cards";
import { StoryForm } from "../lib/modules";
import { CREW_QUOTES, FACTS, GUEST_QUOTES, PAGES, REFERENCE, type Fact, type Quote } from "../content";
import { cited } from "../sources";
import "../styles.css";

const fact = (f: Fact): Cell => (_x, _k, flat) => flat ? <FactStrip f={f} /> : <FactTile f={f} />;
const quote = (q: Quote): Cell => (x, key) => <QuoteTile q={q} x={x} slotKey={key} />;
const pic = (k: string, title: string): Cell => (x, key) => <PhotoCard k={k} x={x} slotKey={key} title={title} />;

function App() {
  cited.add("park");
  return (
    <Page current={PAGES.stories} source={REFERENCE.park}>
      <section className="pagehead" aria-labelledby="stories-title">
        <div className="wrap">
          <p className="pagehead__kicker">Guest stories</p>
          <h1 id="stories-title" className="pagehead__title">Ask anyone who has been</h1>
          <p className="pagehead__body">Over a million guests a year, and every one of them goes home with a story. Here are a few, from guests and from the crew. Open a square for more.</p>
        </div>
      </section>
      <GridBand id="guests" title="From our guests" sub="In their own words." variant={1} from={2} lead
        cells={[quote(GUEST_QUOTES[0]), quote(GUEST_QUOTES[1]), quote(GUEST_QUOTES[3])]} strip={fact(FACTS.million)} />
      <GridBand id="guests-2" title="More from our guests" quiet variant={3} from={2}
        cells={[quote(GUEST_QUOTES[2]), pic("ap-tube", "A tube in the rock chute"), quote(GUEST_QUOTES[4])]} strip={fact(FACTS.rides)} />
      <GridBand id="crew" title="From the crew" sub="The people who run the rides, and ride them first." variant={2} from={2}
        cells={[...CREW_QUOTES.map(quote), pic("ap-splash", "The bottom of a slide")]} strip={fact(FACTS.gs)} />
      <GridBand id="come" title="Make your own" sub="The stories start at the gate." aside={{ href: PAGES.rides, label: "Ride gallery" }} variant={0}
        cells={[fact(FACTS.season), pic("ap-river", "Tubes leaving the tunnel"), fact(FACTS.lifeguards), pic("ap-cliff", "A jump into the pool")]} />
      <StoryForm />
    </Page>
  );
}
createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
