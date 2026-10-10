import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Page } from "../lib/Page";
import { GridBand, type Cell } from "../bands/bands";
import { FactStrip, FactTile, PhotoCard, RideCard } from "../lib/cards";
import { FilterBar, type AreaFilter } from "../lib/modules";
import { AREAS, AREA_NAME, FACTS, PAGES, PARK_PHOTOS, REFERENCE, RIDES, type Fact, type Ride } from "../content";
import { cited } from "../sources";
import "../styles.css";

const fact = (f: Fact): Cell => (_x, _k, flat) => flat ? <FactStrip f={f} /> : <FactTile f={f} />;
const ride = (r: Ride): Cell => (x, key) => <RideCard r={r} x={x} slotKey={key} />;
/** Deal a list into bands of five, then what is left, so no square is too small to read. */
function deal<T>(list: T[]): T[][] {
  const out: T[][] = []; let rest = list;
  while (rest.length > 6) { out.push(rest.slice(0, 5)); rest = rest.slice(5); }
  if (rest.length) out.push(rest);
  return out;
}
const PHOTO_TITLES: Record<string, string> = { "ap-rapids": "A raft in white water", "ap-river": "Tubes leaving the tunnel", "ap-tube": "A tube in the rock chute", "ap-chute": "A guest in the flume", "ap-splash": "The bottom of a slide", "ap-cliff": "A jump into the pool" };

function App() {
  cited.add("park");
  const q = new URLSearchParams(location.search);
  const first = q.get("area");
  const [area, setArea] = useState<AreaFilter>(first === "alpine" || first === "motor" || first === "water" ? first : "all");
  // A link from another page arrives with ?open=<ride>; open its square.
  useEffect(() => {
    const id = q.get("open"); if (!id) return;
    const t = setTimeout(() => { const el = document.querySelector<HTMLElement>(`#ride-${id}`); const b = el?.querySelector<HTMLButtonElement>(".media__open, button.more"); el?.scrollIntoView({ block: "center" }); b?.click(); }, 600);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const shown = RIDES.filter((r) => area === "all" || r.area === area);
  const strips: Record<string, Fact> = { alpine: FACTS.tower, motor: FACTS.motor, water: FACTS.slides };
  return (
    <Page current={PAGES.rides} source={REFERENCE.park}>
      <section className="pagehead" aria-labelledby="rides-title">
        <div className="wrap">
          <p className="pagehead__kicker">Ride gallery</p>
          <h1 id="rides-title" className="pagehead__title">You control the action</h1>
          <p className="pagehead__body">Seventy-five rides, and not one that straps you in and spins you around. Here are twenty-five to start with. Open any square for what it is and what to know before you ride.</p>
        </div>
      </section>
      <FilterBar area={area} setArea={setArea} shown={shown.length} />
      {AREAS.filter((a) => area === "all" || a.id === area).map((a, ai) => {
        const bands = deal(RIDES.filter((r) => r.area === a.id));
        return bands.map((list, bi) => {
          const last = bi === bands.length - 1, strip = last && list.length >= 2 && list.length <= 4 ? fact(strips[a.id]) : undefined;
          return (
            <GridBand key={`${a.id}-${bi}`} id={bi === 0 ? a.id : `${a.id}-${bi + 1}`} title={bi === 0 ? a.name : `${a.name}, part ${bi + 1}`} sub={bi === 0 ? a.line : undefined} quiet={bi > 0}
              variant={ai * 2 + bi} from={strip ? 2 : 1} cells={list.map(ride)} strip={strip} />
          );
        });
      })}
      {area === "all" && (
        <GridBand id="photographs" title="Seen at the park" sub={`Photographs by Joe Shlabotnik, a guest. ${AREA_NAME.water} mostly.`} variant={3}
          cells={PARK_PHOTOS.slice(0, 5).map((k): Cell => (x, key) => <PhotoCard k={k} x={x} slotKey={key} title={PHOTO_TITLES[k]} />)} />
      )}
    </Page>
  );
}
createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
