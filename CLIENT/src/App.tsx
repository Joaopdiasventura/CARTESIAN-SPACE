import { BrowserRouter, Route, Routes } from "react-router-dom";

import Exercise from "./pages/Exercises";
import Enter from "./pages/Enter";
import Score from "./pages/Score";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/exercise" element={<Exercise/>}></Route>
        <Route path="/enter" element={<Enter/>}></Route>
        <Route path="/score" element={<Score/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
