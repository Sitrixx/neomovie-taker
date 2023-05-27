import clsx from "clsx";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div
        className={clsx(
          "bg-left-top bg-welcome bg-cover bg-no-repeat relative min-h-full md:max-h-full md:overflow-x-hidden flex flex-row justify-center bg-[#090A24]"
        )}
      >
        <div className="my-8 px-6 md:px-14 w-full max-w-screen-2xl mx-auto">
          <div className="relative top-0 flex justify-between py-5 px-4 lg:px-5 lg:py-3">
            <h1 className="font-bold text-xl py-2 uppercase text-white">
              <Link href={"/"}>Neomovie</Link>
            </h1>
          </div>
          <div className="flex flex-col py-5 px-4 lg:px-5 lg:py-3 items-center space-y-8 lg:space-y-12 h-[70vh] justify-center">
            <div className="flex flex-col space-y-2 lg:space-y-4 items-center">
              <h1 className="mt-4 text-center text-3xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-medium text-white font-bebas">
                Explore a world of movies with
                <span className="text-[#F692FF]"> Neomovie</span>, your ultimate
                film companion.
              </h1>
              <h3 className="text-white text-xs text-center md:text-sm lg:text-base xl:text-lg lg:max-w-3xl xl:max-w-4xl">
                With Neomovie, you can discover a wide variety of movies and
                easily keep track of them by adding them to your liked or
                watched lists, or even creating custom playlists. Explore now by
                clicking the button below!
              </h3>
            </div>
            <Link
              href={"/auth"}
              className="w-3/6 md:w-1/4 xl:w-1/5 py-2 lg:py-3 lg:text-lg bg-[#F048FF] rounded-xl text-white font-medium border-2 border-[#58006D] flex items-center justify-center"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
