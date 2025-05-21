import loadingStatus from "../helpers/loadingStatus";
import useHouses from "../hooks/useHouses";
import ErrorBoundary from "./ErrorBoundary";
import HouseRow from "./HouseRow";
import LoadingIndicator from "./LoadingIndicator";

function HouseList() {
  const { houses, setHouses, loadingState } = useHouses();

  if (loadingState !== loadingStatus.loaded) {
    return <LoadingIndicator loadingState={loadingState}></LoadingIndicator>;
  }

  const addHouse = async () => {
    await fetch("https://localhost:4000/house", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: 6,
        address: "32 Valley Way, New York",
        country: "USA",
        price: 1000000,
      }),
    });
    setHouses([
      ...houses,
      {
        id: 6,
        address: "32 Valley Way, New York",
        country: "USA",
        price: 1000000,
      },
    ]);
  };

  return (
    <>
      <div className="row mb-2">
        <h5 className="themeFontColor text-center">
          Houses currently on the market
        </h5>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Address</th>
            <th>Country</th>
            <th>Asking Price</th>
          </tr>
        </thead>
        <tbody>
          <ErrorBoundary fallback="Error loading house rows!">
            {houses.map((house) => {
              return <HouseRow key={house.id} house={house}></HouseRow>;
            })}
          </ErrorBoundary>
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={addHouse}>
        Add
      </button>
    </>
  );
}

export default HouseList;
