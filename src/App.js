import "./App.css";
import { Calendar } from "./components/Calendar";

function App() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start sm:justify-center px-2 sm:px-4 bg-black">
      <div className="relative mx-auto my-10 w-full justify-center flex flex-col lg:flex-row items-center gap-14 lg:gap-8">
        <Calendar />
      </div>
    </div>
  );
}

export default App;
