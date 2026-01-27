import "./App.css";
import { ThemeProvider } from "@/components/ui/theme-provider.tsx";
import NavBar from "@/components/navbar";
import SelectBlockchain from "@/components/SelectBlockchain";

function App() {
  
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="flex flex-col items-center">
          <div className="w-full max-w-6xl">
            <NavBar />
          </div>

          <div>
            <SelectBlockchain />
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
