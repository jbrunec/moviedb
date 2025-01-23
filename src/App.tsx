import FilterSection from "./FilterSection";
import MovieList from "./MovieList";

function App() {
  return (
    <main className="w-full flex justify-center">
      <div className="flex py-8 px-12">
        <FilterSection />
        <div className="flex flex-col gap-8 pl-8">
          <MovieList />
          <button className="max-w-[917px] h-10 bg-moviedbBlue hover:bg-moviedbBlue/80 rounded-lg text-white font-semibold text-lg">
            Load more
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
