import "./App.css";
import React from "react";
import { YmapNameCity } from "./Api-maps.yandex.js";
import { locator } from "./icon/locator.js";
import cn from "classnames";
import { LinksCities } from "./LinksCities.js";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function App() {
  let [LinksOpen, setLinksOpen] = React.useState("false");

  const YmapCity = { YmapNameCity }.YmapNameCity;
  const AddCookie = () => {
    setLinksOpen(!LinksOpen);
  };

  if (
    cookies.get("YmapCity") === "null" ||
    cookies.get("YmapCity") === undefined
  ) {
    if (
      YmapCity === null ||
      YmapCity === "Не определен" ||
      YmapCity === undefined
    ) {
      cookies.set("YmapCity", "Москва", { path: "/" });
    } else {
      cookies.set("YmapCity", YmapCity, { path: "/" });
    }
  }

  function RemoveCookie() {
    cookies.remove("YmapCity", { path: "/" });
    window.location.reload();
  }

  return (
    <div className="App">
      <div
        className={cn("overlay", { active: !LinksOpen })}
        onClick={() => {
          setLinksOpen(!LinksOpen);
        }}
      ></div>
      <span className="cookie">
        Город в cookie: <br />
        {cookies.get("YmapCity")}
      </span>
      <header>
        <div className="container header">
          {/* Гео. Определение города */}
          <div id="geoAreas">
            <div className="geo_block" onClick={AddCookie}>
              <span className="locator">{locator}</span>
              <span id="YmapNameCity" className="YmapNameCity">
                {cookies.get("YmapCity")}
              </span>
            </div>
          </div>
          {/* Конец Гео. Определение города */}
          <span id="del_cookie" onClick={RemoveCookie}>
            Сбросить cookie
          </span>
        </div>
      </header>
      <LinksCities setLinksOpen={setLinksOpen} LinksOpen={LinksOpen} />
    </div>
  );
}

export default App;
