import UniverseLink from "@/components/UniverseLink";
import { fetchUniverses } from "../lib/data";

export default async function Home() {
  const universes = await fetchUniverses();
  return (
    <main className="w-full text-white py-4">
      <div className="flex-col m-auto max-w-[700px] p-4">
        <div
          className="w-1/2 text-[var(--white1)] text-xl sm:text-3xl border-b-[2px] 
      border-[var(--white1)] mb-8 p-1"
        >
          Choose watchlist:
        </div>

        {universes.map((universe) => (
          <UniverseLink key={universe.id} data={universe} />
        ))}
      </div>

      {/* <div className=" grid place-content-center p-4">
        <h1 className="text-[1.5rem] sm:text-[2rem] font-black text-center">
          Explore Cinematic Universes
        </h1>
        <h2 className="text-center">
          Track Your Progress with Interactive Watchlists
        </h2>
      </div> */}

      {/* <div className="flex flex-col mx-auto items-center px-4">
        <h3
          className="bg-custom-primary w-full text-center py-4 text-[1.5rem] text-custom-text m-8 font-medium"
          style={{ boxShadow: "0 0 10px rgb(0 0 0 / 0.8)" }}
        >
          Choose watchlist:
        </h3>
        {universes.map((universe) => (
          <UniverseLink key={universe.id} data={universe} />
        ))}
      </div> */}
    </main>
  );
}
