import type { IconName } from "./icons";

/**
 * Every word and number on the three pages.
 *
 * GIFpark promotes the park (Greg, 2026-10-10): the pages read as a theme
 * park's own site would, in the present tense, selling its rides. The park
 * behind the name is Action Park, of Vernon Township, New Jersey (1978 to
 * 1996), and every feature the copy sells (a length, a speed, a rule, a year)
 * is one Wikipedia's article on Action Park records. The voice is the
 * study's; the facts are the article's.
 *
 * What the copy leaves out, as a park's own site would, the disclosure puts
 * back: the park closed in 1996, and the article records many injuries and at
 * least six deaths. Nothing on the pages makes light of them.
 *
 * The documentary Class Action Park (2020) is used for quotations only (Greg,
 * 2026-10-10), never for a section or a headline. It is named only in the
 * credits of a page that shows one of those quotations: a page with none (the
 * ride gallery) does not mention the film, and neither does `study.json`,
 * which every page shows. Each quotation is short, is marked as one and
 * carries its speaker. Where a quotation named the park, the name is replaced
 * with GIFpark, without brackets, and that page's credits say the quotation
 * was altered.
 */
export const PAGES = { home: "index.html", rides: "rides.html", stories: "stories.html" } as const;

export const REFERENCE = {
  park: { label: "Wikipedia, “Action Park”", url: "https://en.wikipedia.org/wiki/Action_Park" },
} as const;

/** The header's items, as a park's site has them: the study's pages are links, the rest are for show. */
export const NAV: { label: string; href?: string }[] = [
  { label: "Rides", href: PAGES.rides }, { label: "Guest Stories", href: PAGES.stories },
  { label: "Tickets" }, { label: "Hours" }, { label: "Directions" }, { label: "Groups" },
];
export const FOOTER: [string, string[]][] = [
  ["The park", ["Alpine Center", "Motorworld", "Waterworld", "Park map", "Lockers and tubes"]],
  ["Visit", ["Tickets", "Season passes", "Hours", "Directions", "Lodging"]],
  ["About", ["Employment", "Group sales", "Press", "Contact"]],
];

export type Tone = "violet" | "yellow" | "teal" | "pink" | "tile";

/* ---------- Home ---------- */

export const HERO = {
  kicker: "Route 94, Vernon Township, New Jersey",
  title: "GIFpark",
  body: "Three parks in one: the Alpine Center on the mountain, Motorworld across the road and Waterworld below. Seventy-five rides on 250 acres, and on every one of them you control the action.",
  photo: "ap-rapids",
};

export interface Fact { label: string; line: string; body?: string; tone?: Tone; icon?: IconName; spoken?: string }
export const FACTS = {
  rides: { label: "Rides", line: "75", body: "Thirty-five motorized rides that you drive yourself, and forty water slides.", tone: "violet", icon: "wave" },
  acres: { label: "Acres, both sides of Route 94", line: "250", body: "One of North America's first modern water parks, and a good deal more.", tone: "yellow", icon: "mountain" },
  million: { label: "Guests a year", line: "1,000,000+", body: "As many as 12,000 on our busiest weekends. Come early.", tone: "teal", icon: "ticket" },
  weekend: { label: "Guests on a busy weekend", line: "12,000", tone: "yellow" },
  slides: { label: "Water slides", line: "40", tone: "teal", icon: "wave" },
  motor: { label: "Motorized rides", line: "35", tone: "violet", icon: "kart" },
  lifeguards: { label: "Lifeguards at the Tidal Wave Pool", line: "12", body: "On duty at all times, at a pool 100 feet wide and 250 feet long.", tone: "teal", icon: "ring" },
  gs: { label: "In the Cannonball Loop", line: "9 Gs", body: "Measured in the loop by a former Navy physician.", tone: "violet", icon: "loop", spoken: "nine Gs" },
  slideFt: { label: "Feet of alpine slide", line: "2,700", body: "Down a ski trail, under the chairlift that takes you up.", tone: "yellow", icon: "mountain" },
  waves: { label: "Inches of wave", line: "40", body: "Twenty minutes of waves, ten minutes of rest, all day.", tone: "pink", icon: "wave" },
  mph: { label: "Miles an hour, Super Speedboats", line: "40", tone: "pink" },
  tower: { label: "Feet of bungee tower", line: "70", tone: "violet" },
  cliff: { label: "Feet, the higher diving cliff", line: "23", body: "The lower one is 18. The pool beneath them is 16 feet deep.", tone: "teal" },
  season: { label: "The season", line: "June to\nLabor Day", body: "The gates open in the middle of June and close for the season on Labor Day.", tone: "violet", spoken: "June to Labor Day" },
} satisfies Record<string, Fact>;

export interface Area { id: "alpine" | "motor" | "water"; name: string; line: string; body: string; photo: string }
export const AREAS: Area[] = [
  { id: "alpine", name: "Alpine Center", line: "The mountain: 2,700 feet of alpine slide under the chairlift, and a bungee tower beside it.", body: "Where it all started, with a slide down a ski trail. Ride the lift up and the sled down, jump from the tower, take on a gladiator, and catch the monorail across Route 94 when you are ready for engines.", photo: "ap-lift" },
  { id: "motor", name: "Motorworld", line: "Across Route 94: karts, race cars, tanks and speedboats, and you do the driving.", body: "Everything here has a motor and a steering wheel, and both are yours. Go-karts and open-cockpit race cars on their own tracks, tanks with tennis-ball cannons, and speedboats on our own pond.", photo: "kart" },
  { id: "water", name: "Waterworld", line: "Half the park: forty slides, the Tidal Wave Pool and a river down the hillside.", body: "One of the first modern water parks in America. Slides you ride on your back, on a mat, on a sled or in a raft, a wave pool for a thousand, cliffs to dive from and a wind tunnel to fly in.", photo: "ap-river" },
];

/** New for the season: the year each attraction opened, as the article dates it. */
export interface Year { year: string; label: string; body: string; full: string; tone: Tone }
export const YEARS: Year[] = [
  { year: "1978", label: "Opening day, July 4", body: "Two water slides and a go-kart track join the alpine slide, and GIFpark opens its gates.", full: "The alpine slide came first, in 1976, down a trail of the Vernon Valley/Great Gorge ski area. For the summer of 1978 two water slides and a go-kart track were added, and the park opened formally on July 4 with two opening-day promotions: a Dolly Parton look-alike contest and a tobacco juice-spitting contest.", tone: "violet" },
  { year: "1980", label: "New: Motorworld", body: "The park crosses Route 94, to 250 acres.", full: "Motorworld opens on the west side of State Route 94 with rides built around powered vehicles and boats. More water slides, a deep-water pool, tennis courts and a softball field had come to Waterworld the summer before.", tone: "yellow" },
  { year: "1981", label: "New: Tidal Wave Pool", body: "A hundred feet by two hundred and fifty, with waves to 40 inches.", full: "The Tidal Wave Pool opens at the start of the 1981 season: room for 500 to 1,000 swimmers, waves for 20 minutes at a time with 10-minute breaks, and twelve lifeguards on duty.", tone: "teal" },
  { year: "1983", label: "Built: Cannonball Loop", body: "An enclosed water slide with a complete vertical loop.", full: "The Cannonball Loop goes up beside the Waterworld entrance: an enclosed slide that ends in a full vertical loop, like a roller coaster's. It takes its first guests in the summer of 1985.", tone: "pink" },
  { year: "1987", label: "New: Aerodium", body: "The first skydiving wind tunnel at an American amusement park.", full: "The wind tunnel was invented in Germany in 1984. Ours opens in Waterworld three years later, with stadium seating around it for those who would rather watch.", tone: "violet" },
  { year: "1992", label: "New: Gladiator Challenge", body: "An obstacle course, then a joust. The bungee tower, new the year before, doubles to four stations.", full: "The Gladiator Challenge opens in the Alpine Center, loosely based on television's American Gladiators, with three shows a day. The 70-foot bungee tower beside the alpine slide, opened in 1991 with two jumping stations, now has four. The Sling Shot follows in 1993.", tone: "teal" },
  { year: "1996", label: "New: Space Shot", body: "A tower ride for Motorworld.", full: "The Space Shot, a tower drop ride, opens for the 1996 season.", tone: "yellow" },
];

export const NICKNAMES: { name: string; tone: Tone }[] = [
  { name: "Traction Park", tone: "violet" }, { name: "Accident Park", tone: "yellow" }, { name: "Class Action Park", tone: "pink" }, { name: "Friction Park", tone: "teal" },
];

export const VISIT: { label: string; line: string; body: string; tone: Tone }[] = [
  { label: "The season", line: "June to\nLabor Day", body: "The gates open in the middle of June and close for the season on Labor Day.", tone: "violet" },
  { label: "Extras", line: "Bring $5", body: "Lola Cars and Battle Action Tanks carry an extra charge, and the Sling Shot is $5 a launch.", tone: "yellow" },
  { label: "Also on the grounds", line: "Mini golf", body: "And tennis courts, a softball field, the Cobblestone Village shops and rides sized for children.", tone: "teal" },
];

/* ---------- Rides ---------- */

export interface Ride { id: string; name: string; area: Area["id"]; tag?: string; short: string; what: string; know: string[]; photo?: string; tone?: Tone }

export const RIDES: Ride[] = [
  { id: "alpine-slide", name: "Alpine Slide", area: "alpine", short: "Twenty-seven hundred feet down the mountain. You hold the stick.", what: "Ride the chairlift to the top, sit down on your sled and go. One stick is your brake and your accelerator, and how you take the curves is up to you. The track runs the length of a ski trail in long chutes built into the slope.", know: ["The chairlift to the top is part of the ride.", "The sled has one control: a single stick for braking and accelerating.", "Hay bales mark the curves."], photo: "alpine" },
  { id: "gladiator", name: "Gladiator Challenge", area: "alpine", tag: "New for 1992", short: "Run the course. Then joust one of ours.", what: "Loosely based on television's American Gladiators. Race the obstacle course against other guests, then pick up a pugil stick and face a park gladiator: we found them in the local gyms. The fastest runners of the early shows come back to race each other in the last.", know: ["Three shows a day.", "Designed by bodybuilders Michael and Vince Mancuso."], tone: "pink" },
  { id: "bailey-ball", name: "Bailey Ball", area: "alpine", tag: "In testing", short: "A steel sphere, a track of pipe, and a seat inside for one.", what: "A large steel sphere with a rider secured inside, rolled down the mountain on a track of PVC pipe laid beside a ski trail.", know: ["Not yet open to guests."], tone: "yellow" },
  { id: "bungee", name: "Bungee Tower", area: "alpine", tag: "New for 1991", short: "Seventy feet up, and four ways down.", what: "A 70-foot tower beside the alpine slide, opened with two jumping stations and doubled to four a summer later. You jump tethered to a counterweight, for a short drop with no bounce back to the top.", know: ["Four jumping stations.", "Jumpers are tethered to a weight."], photo: "bungee" },
  { id: "skatepark", name: "Skateboard Park", area: "alpine", short: "Concrete bowls, beside the ski school.", what: "A park of concrete bowls near the ski-school building.", know: ["Open for one season."], photo: "bowl" },
  { id: "transmobile", name: "Transmobile", area: "alpine", short: "The monorail over Route 94, in cars for two.", what: "Sit sideways, two to a car, and ride from the Alpine Center across Route 94 to the Cobblestone Village shops and Motorworld.", know: ["Rides are one way: everyone leaves the car at the end of the line.", "Each stop has two stations, one for each direction."], tone: "teal" },

  { id: "go-karts", name: "Super Go Karts", area: "motor", short: "A loop track and a kart of your own.", what: "Small-engine karts on a tight loop track, with a governor on each engine.", know: ["Governed to about 20 miles an hour."], photo: "kart" },
  { id: "lola", name: "Lola Cars", area: "motor", tag: "Extra charge", short: "Open-cockpit race cars on the long track.", what: "Miniature open-cockpit race cars, on a longer track than the karts'.", know: ["An extra charge applies."], photo: "racecar" },
  { id: "tanks", name: "Battle Action Tanks", area: "motor", tag: "Extra charge", short: "Five minutes in a tank, with a tennis-ball cannon.", what: "Drive a small tank inside the fenced arena and fire tennis balls at the sensor on every other tank. A hit stops a tank for 15 seconds. Friends outside can join in from the cannons on the fence, for less. As seen in our television advertising.", know: ["Five minutes a turn, at an extra charge.", "A tank that is hit stops for 15 seconds.", "Cannons on the perimeter fence cost less."], photo: "tennis" },
  { id: "speedboats", name: "Super Speedboats", area: "motor", short: "Thirty-five to forty miles an hour, around the island.", what: "Speedboats on a pond of our own, on a circuit around a small island.", know: ["35 to 40 miles an hour."], photo: "boat" },
  { id: "bumper-boats", name: "Bumper Boats", area: "motor", short: "Small boats with motors, built to bump.", what: "Motorized boats on the water, made for running into one another.", know: ["The boats are small: taller riders may not fit their legs inside."], tone: "teal" },
  { id: "space-shot", name: "Space Shot", area: "motor", tag: "New for 1996", short: "A tower, and a long way down it.", what: "A tower drop ride, new for the 1996 season.", know: [], tone: "violet" },
  { id: "sling-shot", name: "Sling Shot", area: "motor", tag: "$5 a launch", short: "Two seats, bungee cords, straight up and over.", what: "Two riders are strapped into one seat and shot into the air on bungee cords.", know: ["$5 a launch.", "Two riders at a time.", "You will turn upside down."], tone: "yellow" },

  { id: "cannonball", name: "Cannonball Loop", area: "water", tag: "Selected days", short: "A water slide with a full vertical loop.", what: "An enclosed slide that ends in a complete vertical loop, like a roller coaster's. You will see it from the Waterworld entrance, and so will everyone else.", know: ["Riders are weighed before the ride.", "You will be hosed down with cold water first.", "Remove all jewelry.", "An attendant will show you how to hold your body through the loop.", "A former Navy physician measured as much as nine Gs in the loop."], tone: "violet" },
  { id: "wave-pool", name: "Tidal Wave Pool", area: "water", short: "A hundred feet by two hundred and fifty, with waves to 40 inches.", what: "Room for 500 to 1,000 swimmers. The waves run for 20 minutes, rest for 10, and run again, all day.", know: ["Twelve lifeguards are on duty at all times.", "The pool gets deeper toward the far end.", "Ladders are along the sides."], photo: "wavepool" },
  { id: "aqua-skoot", name: "Aqua Skoot", area: "water", short: "Skip across the water like a stone.", what: "Carry your sled to the top of the tower, ride down a ramp of rollers and skim the pool at the bottom. Invented here, by Ken Bailey.", know: ["Lean back to skip.", "Three slides, each 30 feet long.", "The sled is hard plastic."], tone: "teal" },
  { id: "kamikaze", name: "Kamikaze", area: "water", short: "Drops and rises, on your back, arms and legs crossed.", what: "The blue slide beside the speed slides. It pitches steeply, rises and falls several times and leaves you in a pool.", know: ["Lie on your back with arms and legs crossed."], tone: "yellow" },
  { id: "kayak", name: "Kayak Experience", area: "water", short: "White water, made here.", what: "A whitewater course of our own making: fans under the surface churn the water, and you paddle through it.", know: ["One paddler to a kayak."], photo: "kayak" },
  { id: "tarzan", name: "Tarzan Swing", area: "water", short: "Swing out over the pool. Let go at the top.", what: "A steel arch on a 20-foot cable over a spring-fed pool. Take hold, swing out and drop in when the arch reaches its height. The whole line is watching.", know: ["The pool is spring-fed, 50 to 60°F. Our other pools are 70 to 80°F.", "Let go at the top of the swing."], tone: "pink" },
  { id: "rapids", name: "Roaring Rapids", area: "water", short: "White water by raft, through the grotto.", what: "A raft ride through white water, in a corner of the park laid out as a grotto, with gentler rides all around it.", know: ["Rafts are provided."], photo: "tubes" },
  { id: "surf-hill", name: "Surf Hill", area: "water", short: "Seven lanes of slick slope, on a mat.", what: "Slide on a mat down a water-slick hill, lane beside lane, through the puddles and up to the foam at the end. There is a place to watch beside the snack bar.", know: ["Lane seven has a kicker two thirds of the way down, for jumps."], tone: "violet" },
  { id: "geronimo", name: "Super Speed Water Slides", area: "water", short: "Geronimo Falls: two slides, nearly vertical.", what: "Two slides set apart from the rest of the park, on slopes close to vertical. The water at the bottom stops you, in an enormous splash.", know: ["Lie flat on your back, arms at your sides, all the way down.", "The first few feet of one slide are under screening."], photo: "speedslide" },
  { id: "cliffs", name: "Diving Cliffs", area: "water", short: "Two ledges, 23 feet and 18, over deep water.", what: "Two cliffs above a pool in the grotto beside Roaring Rapids. Pick one and jump.", know: ["The pool is 16 feet deep."], photo: "ropejump" },
  { id: "colorado", name: "Colorado River Ride", area: "water", short: "A river down the hillside, with forks, a waterfall and a tunnel.", what: "The trough is shaped like a natural riverbed, with jets in the bed to roughen the rapids. Choose your fork, pass under the waterfall into the dark, and finish down a hill with a one-foot jump.", know: ["Helmets are required.", "Carry your raft up to the start.", "Rafts for two, and round rafts for four."], tone: "teal" },
  { id: "aerodium", name: "Aerodium", area: "water", tag: "New for 1987", short: "Fly. The first skydiving wind tunnel at an American amusement park.", what: "Step onto the netting over the fan with your instructor, fall forward and let the air lift you. When the fan is cut you come down on air cushions. Friends watch from the stadium seating all around.", know: ["A flight suit, helmet and earplugs are provided.", "An instructor flies with you.", "Flights reach 6 or 7 feet off the ground."], photo: "tunnel" },
];
export const AREA_NAME: Record<Area["id"], string> = { alpine: "Alpine Center", motor: "Motorworld", water: "Waterworld" };
/** Photographs taken at the park, for the gallery's last band. The raft photograph is kept to the hero, under its tint: its riders fill the frame. */
export const PARK_PHOTOS = ["ap-river", "ap-chute", "ap-tube", "ap-splash", "ap-cliff"];

/* ---------- Guest stories ---------- */

/** Where the quotations were read. None was checked against the film itself. */
export const READ = {
  park: { label: "Wikipedia, “Action Park”", url: "https://en.wikipedia.org/w/index.php?title=Action_Park&oldid=1378502229" },
  filmArticle: { label: "Wikipedia, “Class Action Park”", url: "https://en.wikipedia.org/w/index.php?title=Class_Action_Park&oldid=1376695818" },
  reason: { label: "Reason, August 28, 2020", url: "https://reason.com/2020/08/28/review-class-action-park/" },
} as const;

/**
 * A short quotation, its speaker, and the study's own line of context.
 * `credit` says whose words they are and where they were first published, and
 * `read` where the study read them; both are drawn in the credits of whichever
 * page shows the quotation, never in the copy. `film` marks the five from the
 * documentary. `altered` says what was changed, for the one that was. A
 * speaker the source does not identify is not called a guest.
 */
export interface Quote { id: string; who: string; role: string; quote: string; body: string; tone: Tone; film?: boolean; credit: string; read: keyof typeof READ; altered?: string }
export const GUEST_QUOTES: Quote[] = [
  { id: "yes", who: "Said of GIFpark", role: "on what set it apart", quote: "In a world filled with no, GIFpark became the land of yes.", body: "Guests chose their own speed, their own fork in the river and their own moment to let go.", tone: "violet", film: true,
    credit: "An interviewee in the documentary Class Action Park (2020, directed by Chris Charles Scott and Seth Porges). The article does not name the speaker.", read: "park",
    altered: "The speaker says “Action Park”. This page puts GIFpark in its place." },
  { id: "heaven", who: "A guest", role: "who came as a child", quote: "there were no rules, and for a lot of kids, that was heaven.", body: "She is remembering summers at the park when she was young.", tone: "yellow", film: true,
    credit: "A woman interviewed in the documentary Class Action Park (2020), looking back on her youth. The review does not name her.", read: "reason" },
  { id: "ferris", who: "Said of GIFpark", role: "on why people came", quote: "who wants to sit on a Ferris wheel?", body: "He is saying what drew people to the park, and it was not the gentle rides.", tone: "teal", film: true,
    credit: "A man interviewed in the documentary Class Action Park (2020). The review does not name him. In its fuller quotation he is saying that people came to the park because they could get hurt.", read: "reason" },
  { id: "becker", who: "Alison Becker", role: "guest", quote: "I was scared to do those rides", body: "She went on them all the same.", tone: "pink", film: true,
    credit: "Alison Becker, in the documentary Class Action Park (2020). The words are part of a longer sentence.", read: "filmArticle" },
  { id: "gethard", who: "Chris Gethard", role: "guest", quote: "a true rite of passage", body: "He was writing of what the park is to anyone who grew up in New Jersey when he did.", tone: "tile",
    credit: "Chris Gethard, writing in Weird NJ. The words are part of a longer sentence.", read: "park" },
];
export const CREW_QUOTES: Quote[] = [
  { id: "desaye", who: "Jim DeSaye", role: "security director", quote: "an 80s movie that was real life", body: "He joined the crew as a teenager and was running park security at 21.", tone: "yellow", film: true,
    credit: "Jim DeSaye, in the documentary Class Action Park (2020). The words are part of a longer sentence.", read: "filmArticle" },
  { id: "andy", who: "Andy Mulvihill", role: "head lifeguard", quote: "a ride you ride to survive", body: "He was the first to ride the Cannonball Loop, in a full set of ice hockey gear.", tone: "violet",
    credit: "Andy Mulvihill, recalling the Cannonball Loop. The words are part of a longer sentence.", read: "park" },
  { id: "lifeguard", who: "A lifeguard", role: "at the Tidal Wave Pool", quote: "It was legitimately scary", body: "Twelve lifeguards watch the pool at all times.", tone: "teal",
    credit: "One of the park's lifeguards, recalling the Tidal Wave Pool.", read: "park" },
];
export const QUOTES: Quote[] = [...GUEST_QUOTES, ...CREW_QUOTES];

/** For the disclosure on every page: what the promotional voice leaves out. It does not name the film. */
export const LEFT_OUT = "GIFpark is this study's name for Action Park, and the promotional voice is the study's own. Action Park closed after the 1996 season. Wikipedia's article records poorly designed rides, an undertrained staff, many injuries and at least six deaths there between 1980 and 1987, and says several of the rides sold on these pages were closed by the state or after an accident. The pages leave that out, as a park's own site would; nothing on them is meant to make light of it.";
