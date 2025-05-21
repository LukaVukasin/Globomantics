import Banner from "./components/Banner";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import HouseList from "./components/HouseList";
import House from "./components/House";

function App() {
  return (
    <>
      <BrowserRouter>
        <Banner>Providing houses all over the world</Banner>
        <Routes>
          <Route index element={<HouseList />}></Route>
          <Route path="house/:id" element={<House />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
