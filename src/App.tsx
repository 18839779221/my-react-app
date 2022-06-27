import "./App.css";
import { TopBar, topBarList } from "./topbar/TobBar";
import { Body } from "./body/Body";
import { Route, Routes } from "react-router-dom";
import { FindMusic } from "./find_music/FindMusic";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        {topBarList.map((item, index) => (
          <Route path={item.link} element={item.component} key={index}></Route>
        ))}
        <Route path="*" element={<FindMusic/>}></Route>
      </Route>
    </Routes>
  );
}

function AppLayout() {
  return (
    <div className="App">
      <nav>
        <TopBar />
      </nav>
      <Body />
    </div>
  );
}

export default App;
