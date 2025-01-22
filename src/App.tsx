import FilterSection from "./FilterSection";
import MovieList from "./MovieList";

function App() {
  return (
    <main className="flex mx-auto bg-slate-100 min-h-screen gap-2">
      <FilterSection />
      <MovieList />
    </main>
  );
}

export default App;
