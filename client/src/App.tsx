import "./App.css";
import Sidebar from "./components/ui/Sidebar";
import Content from "./components/ui/Content";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <main className="grid grid-cols-5 min-h-screen">
      <RecoilRoot>
        <Sidebar />
        <Content />
      </RecoilRoot>
    </main>
  );
}

export default App;
