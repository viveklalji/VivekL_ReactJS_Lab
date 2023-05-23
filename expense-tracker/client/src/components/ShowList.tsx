import { useEffect, useState } from "react";
import IDataList from "../model/IDataList";
import { getItemsData } from "../services/ItemServices";
import ExpenseTracker from "./ExpenseTracker";

export default function ShowData() {
  const [items, setItems] = useState<IDataList[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [sum, setSum] = useState<number | null>(0);
  const [rahulSpent, setRahulSpent] = useState<number>(0);
  const [rameshSpent, setRameshSpent] = useState<number>(0);
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    const fetchItemsData = async () => {
      try {
        const data = await getItemsData();
        setItems(data);
        console.log(data);
        calculateShares(data);
      } catch (error) {
        console.error(error);
        setError(error as Error);
      }
    };
    fetchItemsData();
  }, []);

  const calculateShares = (data: IDataList[]) => {
    var rahulSpent: number = 0;
    var rameshSpent: number = 0;
    data.map((items) =>
      items.payeeName === "Rahul"
        ? (rahulSpent = rahulSpent + items.price)
        : (rameshSpent = rameshSpent + items.price)
    );
    var totalSum = Number(rahulSpent) + Number(rameshSpent);
    console.log("Rahul Spend : " + rahulSpent);
    console.log("Ramesh Spend : " + rameshSpent);
    console.log("Total Spend : " + totalSum);
    setRahulSpent(rahulSpent);
    setRameshSpent(rameshSpent);
    setSum(totalSum);
  };

  const getTableHeaders = () => {
    return (
      <>
        <div className="use-inline date header-color">Date</div>
        <div className="use-inline header-color">Product Purchased</div>
        <div className="use-inline price header-color">Price</div>
        <div className="use-inline header-color" style={{ width: 112 }}>
          Payee
        </div>
      </>
    );
  };
  const getSpendDetails = () => {
    return (
      <>
        <div className="use-inline ">Total: </div>
        <span className="use-inline total">{sum}</span> <br />
        <div className="use-inline ">Rahul paid: </div>
        <span className="use-inline total Rahul">{rahulSpent}</span> <br />
        <div className="use-inline ">Ramesh paid: </div>
        <span className="use-inline total Ramesh">{rameshSpent}</span> <br />
        <span className="use-inline payable">
          {rahulSpent > rameshSpent ? "Pay Rahul " : "Pay Ramesh"}
        </span>
        <span className="use-inline payable price">
          {" "}
          {Math.abs((rahulSpent - rameshSpent) / 2)}
        </span>
      </>
    );
  };

  const renderItemDetails = (expenseItems: IDataList) => {
    return (
      <div key={expenseItems.id}>
        <div className="use-inline date">{expenseItems.setDate}</div>
        <div className="use-inline">{expenseItems.product}</div>
        <div className="use-inline price">{expenseItems.price}</div>
        <div className={`use-inline ${expenseItems.payeeName}`}>
          {expenseItems.payeeName}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* <h1> All expenses will be shown here </h1> */}
      <header id="page-header">Expense Tracker</header>
      <button id="Add-Button" onClick={() => setShowForm(true)}>
        Add
      </button>
      {showForm && (
        <div className="form">
          <ExpenseTracker
            onTrue={() => setShowForm(false)}
            onClose={() => setShowForm(false)}
          ></ExpenseTracker>
        </div>
      )}
      {getTableHeaders()}
      {items && items.map((expenseItems) => renderItemDetails(expenseItems))}
      <hr />
      {getSpendDetails()}

      {error && <>{error?.message}</>}
    </>
  );
}
