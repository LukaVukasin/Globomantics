import navValues from "../navigation/navValues";
import House from "./House";
import HouseList from "./HouseList";

function ComponentPicker({ currentNavLocation }) {
  switch (currentNavLocation) {
    case navValues.home:
      return <HouseList></HouseList>;
    case navValues.house:
      return <House></House>;
    default:
      return (
        <h3>No component for navigation value {currentNavLocation} found</h3>
      );
  }
}

export default ComponentPicker;
