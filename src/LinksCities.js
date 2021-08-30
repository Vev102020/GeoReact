import './App.css';
import React from "react";
import cn from "classnames";
import Cookies from "universal-cookie";
import { close } from "./icon/close.js";
import CreatableSelect from "react-select/creatable";

const cookies = new Cookies();
let areasCity = require("./areasCity.json");

export function LinksCities(props) {
  //Куки города
  let cookieCityName = cookies.get("YmapCity");
  //Находим ID региона
  let regionIDCoockie;
  let cityCookie;
  let ActiveIDCityNow;
  let ActiveNameCityNow;
  areasCity.map((elem) => {
    return elem.areas.map((n) => {
      if (n.name === cookieCityName) {
        regionIDCoockie = n.parent_id;
        cityCookie = { label: n.name, value: n.id, parent_id: n.parent_id };
        ActiveIDCityNow = n.id;
        ActiveNameCityNow = n.name;
      }
      return 0;
    });
  });

  let ArrayCity = [];
  areasCity
    .sort((a, b) => (a.name > b.name ? 1 : -1))
    .map((elem) => {
      return elem.areas
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .map((n, i) => {
          return ArrayCity.push({
            label: n.name,
            value: n.id,
            parent_id: n.parent_id
          });
        });
    });
    console.log(cookieCityName);
  //Регион в списке
  let [SelectRegionID, setSelectRegionID] = React.useState(regionIDCoockie);
  //Город в списке
  let [SelectCity, setSelectCity] = React.useState(cityCookie);
  //Активный город
  let [ActiveIDCity, setActiveIDCity] = React.useState(ActiveIDCityNow);
  //Активный город
  let [ActiveNameCity, setActiveNameCity] = React.useState(ActiveNameCityNow);

  function ClickRegion(r) {
    setSelectRegionID(r);
  }

  function ClickCity(name, id, parent_id) {
    setSelectCity({ label: name, value: id, parent_id: parent_id });
    setActiveIDCity(id);
    setActiveNameCity(name);
  }

  let handleChange = (newValue) => {
    if (newValue === null || newValue.__isNew__ ===  true ) {
        
      setSelectCity(cityCookie);
      setSelectRegionID(regionIDCoockie);
      setActiveIDCity(ActiveIDCityNow);
      setActiveNameCity(ActiveNameCityNow);
    } else {
      setSelectCity({
        label: newValue.label,
        value: newValue.value,
        parent_id: newValue.parent_id
      });
      setSelectRegionID(newValue.parent_id);
      setActiveIDCity(newValue.value);
      setActiveNameCity(newValue.label);
    }
  };


  
  return (
    <div
      className={cn("SearchBlockContainer", {
        active: !props.LinksOpen
      })}
    >
        <span className="close" onClick={()=>{props.setLinksOpen("false")}}>{close}</span>
      <div className="NameCityBlock">
        <span>Выберите город</span>
      </div>
      <div className="SearchBlockUP">
        <CreatableSelect
        className="Select"
        formatCreateLabel={() => "Результат не найден" }
          isClearable
          onChange={handleChange}
        theme={theme => ({
            ...theme,
            borderRadius: 5,
            colors: {
              ...theme.colors,
              primary25: '#dddddd',
              primary: '#9d00ff',
            },
          })}
          options={ArrayCity}
          value={SelectCity}
        />

        <button
          className="saveCity button"
          onClick={() => {
            props.setLinksOpen("false");
            cookies.set("YmapCity", ActiveNameCity, { path: "/" });
          }}
        >
          Сохранить
        </button>
      </div>
      <div id="SearchCityBlock">
        <div className="left">
          <span className="searchTitle">Область</span>
          <div id="region">
            <ul>
              {areasCity
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .map((link, i) => (
                  <li
                    key={i}
                    className={cn("link_region", {
                      active: link.id === SelectRegionID
                    })}
                    value={link.id}
                    onClick={() => {
                      ClickRegion(link.id);
                    }}
                  >
                    {link.name}
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="right">
          <span className="searchTitle">Город</span>
          <div id="city">
            <ul>
              {areasCity.map((elem) => {
                return elem.areas.map((n, i) => {
                  if (n.parent_id === SelectRegionID) {
                    return (
                      <li
                        className={cn("link_city", {
                          active: n.id === ActiveIDCity
                        })}
                        key={i}
                        value={n.id}
                        parent_id={n.parent_id}
                        onClick={() => {
                          ClickCity(n.name, n.id, n.parent_id);
                        }}
                      >
                        {n.name}
                      </li>
                    );
                  }
                });
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
