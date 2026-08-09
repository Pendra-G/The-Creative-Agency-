/**
 * A miniature, working mock of a website for one industry.
 *
 * These are live DOM rather than video: nothing to download, sharp at any
 * size, and it demonstrates the actual product. Hovering scrolls the mock and
 * staggers its content in, which is what a recording would have shown.
 *
 * Three archetypes cover the six industries, differentiated by tint and copy:
 *   booking   — services with prices and a book button
 *   gallery   — image-led, the work carries the page
 *   catalogue — products or menu items in a grid
 */

function Bar({ w = "60%", h = 4, className = "", dim = 0.18 }) {
  return (
    <div
      className={`rounded-[2px] ${className}`}
      style={{ width: w, height: h, background: `rgba(255,255,255,${dim})` }}
    />
  );
}

function Tile({ className = "", ratio = "aspect-[4/3]", tinted = false }) {
  return (
    <div
      className={`${ratio} rounded-[3px] ${className}`}
      style={{
        background: tinted
          ? "linear-gradient(140deg, var(--tint) 0%, rgba(255,255,255,0.06) 100%)"
          : "rgba(255,255,255,0.09)",
      }}
    />
  );
}

function Booking({ rows }) {
  return (
    <div className="mt-2 flex flex-col gap-1.5">
      {rows.map((r, i) => (
        <div
          key={r}
          className="ms-row flex items-center justify-between rounded-[3px] px-2 py-[5px]"
          style={{ background: "rgba(255,255,255,0.05)", transitionDelay: `${i * 70}ms` }}
        >
          <Bar w={`${40 + ((i * 13) % 26)}%`} h={3} dim={0.3} />
          <div
            className="rounded-full px-1.5 py-[2px] text-[3.5px] font-bold uppercase tracking-wider"
            style={{ background: "var(--tint)", color: "#0A0A0A" }}
          >
            Book
          </div>
        </div>
      ))}
    </div>
  );
}

function Gallery() {
  return (
    <div className="mt-2 grid grid-cols-3 gap-1.5">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="ms-row" style={{ transitionDelay: `${i * 55}ms` }}>
          <Tile ratio={i % 4 === 0 ? "aspect-[3/4]" : "aspect-square"} tinted={i % 3 === 0} />
        </div>
      ))}
    </div>
  );
}

function Catalogue({ rows }) {
  return (
    <div className="mt-2 grid grid-cols-2 gap-1.5">
      {rows.map((r, i) => (
        <div
          key={r}
          className="ms-row rounded-[3px] p-1.5"
          style={{ background: "rgba(255,255,255,0.05)", transitionDelay: `${i * 70}ms` }}
        >
          <Tile ratio="aspect-[5/3]" tinted={i % 2 === 0} />
          <div className="mt-1.5 flex items-center justify-between">
            <Bar w="55%" h={3} dim={0.28} />
            <div className="text-[3.5px] font-bold" style={{ color: "var(--tint)" }}>
              $
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function MiniSite({ variant, tint, wordmark }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ "--tint": tint, background: "#0A0A0C" }}
      aria-hidden="true"
    >
      {/* faint brand wash */}
      <div
        className="absolute inset-0 opacity-40"
        style={{ background: `radial-gradient(80% 60% at 20% 0%, ${tint}33 0%, transparent 70%)` }}
      />

      {/* the mock's own nav */}
      <div className="relative flex items-center justify-between px-3 pt-[10px]">
        <span
          className="text-[5px] font-black uppercase tracking-[0.14em]"
          style={{ color: "var(--tint)" }}
        >
          {wordmark}
        </span>
        <div className="flex items-center gap-1.5">
          <Bar w="10px" h={2.5} dim={0.25} />
          <Bar w="10px" h={2.5} dim={0.25} />
          <div
            className="rounded-full px-1.5 py-[2px] text-[3.5px] font-bold uppercase"
            style={{ background: "rgba(255,255,255,0.14)", color: "#fff" }}
          >
            Call
          </div>
        </div>
      </div>

      {/* scrolls up on hover — the movement a recording would have shown */}
      <div className="ms-scroll relative px-3 pb-3 pt-3 transition-transform duration-[1600ms] ease-out group-hover:-translate-y-[16%]">
        <div className="ms-row" style={{ transitionDelay: "0ms" }}>
          <Bar w="82%" h={7} dim={0.5} />
          <div className="mt-1.5">
            <Bar w="58%" h={7} dim={0.5} />
          </div>
          <div className="mt-2 flex items-center gap-1.5">
            <div
              className="rounded-full px-2 py-[3px] text-[4px] font-bold uppercase tracking-wider"
              style={{ background: "var(--tint)", color: "#0A0A0A" }}
            >
              Book now
            </div>
            <Bar w="18%" h={3} dim={0.2} />
          </div>
        </div>

        {variant === "booking" && <Booking rows={["a", "b", "c", "d"]} />}
        {variant === "gallery" && <Gallery />}
        {variant === "catalogue" && <Catalogue rows={["a", "b", "c", "d"]} />}

        <div className="ms-row mt-2 flex items-center justify-between rounded-[3px] px-2 py-[6px]"
          style={{ background: "rgba(255,255,255,0.04)", transitionDelay: "320ms" }}>
          <Bar w="30%" h={3} dim={0.22} />
          <Bar w="16%" h={3} dim={0.22} />
        </div>
      </div>
    </div>
  );
}
