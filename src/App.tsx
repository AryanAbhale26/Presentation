import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group";
import Header from "./components/custom/Header";
import Hero from "./components/custom/Hero";
function App() {
  return (
    <>
      <div className="w-full h-full">
        <Header />
        <Hero />
      </div>
    </>
  );
}

export default App;
