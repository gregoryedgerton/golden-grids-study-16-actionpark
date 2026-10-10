import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Page } from "../lib/Page";
import { GridBand, type Cell } from "../bands/bands";
import { AreaCard, FactStrip, FactTile, HeroCell, PhotoCard, QuoteTile, RideCard, WordTile, YearStrip, YearTile } from "../lib/cards";
import { AREAS, FACTS, GUEST_QUOTES, HERO, NICKNAMES, PAGES, REFERENCE, RIDES, VISIT, YEARS, type Fact, type Ride, type Year } from "../content";
import { cited } from "../sources";
import "../styles.css";

const fact = (f: Fact): Cell => (_x, _k, flat) => flat ? <FactStrip f={f} /> : <FactTile f={f} />;
const ride = (id: string): Cell => { const r = RIDES.find((i) => i.id === id) as Ride; return (x, key) => <RideCard r={r} x={x} slotKey={key} />; };
const year = (y: Year): Cell => (x, key, flat) => flat ? <YearStrip y={y} /> : <YearTile y={y} x={x} slotKey={key} />;

function App() {
  cited.add("park");
  return (
    <Page current={PAGES.home} source={REFERENCE.park}>
      <h1 className="visually-hidden">GIFpark, Vernon Township, New Jersey: where you control the action</h1>
      <GridBand id="park" title="The park" quiet lead variant={0}
        cells={[() => <HeroCell kicker={HERO.kicker} title={HERO.title} body={HERO.body} k={HERO.photo} />, fact(FACTS.rides), fact(FACTS.million), fact(FACTS.acres)]} />
      <GridBand id="areas" title="Three parks in one" sub="The Alpine Center on the mountain, Motorworld across Route 94, Waterworld below." aside={{ href: PAGES.rides, label: "All rides" }} variant={1} from={2}
        cells={[...AREAS.map((a): Cell => (x, key) => <AreaCard a={a} x={x} slotKey={key} />)]} strip={fact(FACTS.slideFt)} />
      <GridBand id="rides" title="Start with these" sub="Five of the rides our guests talk about most." aside={{ href: PAGES.rides, label: "Ride gallery" }} variant={2}
        cells={["cannonball", "alpine-slide", "wave-pool", "go-karts", "tarzan"].map(ride)} />
      <GridBand id="numbers" title="GIFpark by the numbers" sub="Heights, depths and speeds, from the mountain to the wave pool." variant={3} from={3}
        cells={[fact(FACTS.lifeguards), fact(FACTS.gs), fact(FACTS.waves), fact(FACTS.cliff)]} strip={fact(FACTS.weekend)} />
      <GridBand id="guests" title="What people say" sub="More on the guest stories page." aside={{ href: PAGES.stories, label: "Guest stories" }} variant={5} from={2}
        cells={[(x, key) => <QuoteTile q={GUEST_QUOTES[0]} x={x} slotKey={key} />, (x, key) => <PhotoCard k="ap-chute" x={x} slotKey={key} title="A guest in the flume" />, (x, key) => <QuoteTile q={GUEST_QUOTES[2]} x={x} slotKey={key} />]} strip={fact(FACTS.mph)} />
      <GridBand id="new" title="New this season, every season" sub="Something has opened here almost every summer since 1978." variant={4} from={2} lead
        cells={YEARS.slice(0, 5).map(year)} strip={year(YEARS[6])} />
      <GridBand id="names" title="Also known as" sub="The neighbors have their own names for us." variant={5}
        cells={NICKNAMES.map((n): Cell => () => <WordTile label="Nickname" word={n.name} tone={n.tone} />)} />
      <GridBand id="visit" title="Plan your visit" sub="When to come, what to bring and where to turn off Route 94." variant={0}
        cells={[...VISIT.map((v): Cell => () => <WordTile label={v.label} word={v.line} tone={v.tone} body={v.body} />), (x, key) => <PhotoCard k="route94" x={x} slotKey={key} title="Route 94 at Vernon" />]} />
    </Page>
  );
}
createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
