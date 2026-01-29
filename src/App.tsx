import "./App.css";
import { ThemeProvider } from "@/components/ui/theme-provider.tsx";
import NavBar from "@/components/navbar";
import SelectBlockchain from "@/components/SelectBlockchain";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SeedPhrase from "./components/SeedPhrase";

function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <div className="flex flex-col items-center h-screen">
            <div className="w-full max-w-6xl">
              <NavBar />
            </div>

            <Routes>
              <Route path="/onboarding/select-chain" element={< SelectBlockchain />}></Route>
              <Route path="/onboarding/seed-phrase" element={< SeedPhrase />}></Route>
              {/* <Route path="/onboarding/select-chain" element={< SelectBlockchain />}></Route> */}
            </Routes>
          </div>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
