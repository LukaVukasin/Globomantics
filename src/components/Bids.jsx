import { useState, useTransition } from "react";
import useBids from "../hooks/useBids";
import loadingStatus from "../helpers/loadingStatus";
import LoadingIndicator from "./LoadingIndicator";
import currencyFormatter from "../helpers/currencyFormatter";

function Bids({ house }) {
  const { bids, loadingState, addBid } = useBids(house.id);
  const [isPending, startTransition] = useTransition();

  const emptyBid = {
    houseId: house.id,
    bidder: "",
    amount: 0,
  };

  const [newBid, setNewBid] = useState(emptyBid);

  if (loadingState !== loadingStatus.loaded) {
    return <LoadingIndicator loadingState={loadingState}></LoadingIndicator>;
  }

  const onBidSubmitClick = () => {
    startTransition(async () => {
      await addBid(newBid);
    });
    setNewBid(emptyBid);
  };

  return (
    <>
      <div className="row mt-4">
        <div className="col-12">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Bidder</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {bids.map((bid) => {
                return (
                  <tr key={bid.id}>
                    <td>{bid.bidder}</td>
                    <td>{currencyFormatter.format(bid.amount)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="row">
          <div className="col-5">
            <input
              id="bidder"
              className="h-100 form-control"
              type="text"
              value={newBid.bidder}
              onChange={(e) => setNewBid({ ...newBid, bidder: e.target.value })}
              placeholder="Bidder"
            ></input>
          </div>
          <div className="col-5">
            <input
              id="amount"
              className="h-100 form-control"
              type="number"
              value={newBid.amount}
              onChange={(e) =>
                setNewBid({ ...newBid, amount: parseInt(e.target.value) })
              }
              placeholder="Amount"
            ></input>
          </div>
          <div className="col-2">
            <button
              className="btn btn-primary"
              onClick={onBidSubmitClick}
              disabled={isPending}
            >
              Add Bid
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Bids;
