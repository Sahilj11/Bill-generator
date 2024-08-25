import { BillItem } from "./components/BillItem";
import { GrandTotal } from "./components/GrandTotal";
import { Header } from "./components/Header";

import { useState, useReducer } from "react";
const ACTIONS = {
  ADD_ITEM: "add-item",
  ADD_RATE: "add-rate",
  ADD_QUANTITY: "add-quantity",
  GET_PRICE: "get-price",
  REMOVE_ITEM: "remove-item",
  ADD_FIELD: "add-field",
};
function App() {
  function reducer(state, action) {
    switch (action.type) {
      case ACTIONS.ADD_ITEM:
        return {
          items: [
            ...state.items.slice(0, action.payload.index - 1),
            {
              ...state.items[action.payload.index - 1],
              itemDesc: action.payload.itemDesc,
            },
            ...state.items.slice(action.payload.index),
          ],
        };
      case ACTIONS.ADD_RATE:
        return {
          items: state.items.map((item, index) =>
            index === action.payload.index - 1
              ? {
                  ...item,
                  rate: action.payload.rate,
                  price: action.payload.rate * item.quantity,
                  total: state.items.reduce((acc, curr) => acc + curr.price),
                }
              : item,
          ),
        };
      case ACTIONS.ADD_QUANTITY:
        return {
          items: state.items.map((item, index) =>
            index === action.payload.index - 1
              ? {
                  ...item,
                  quantity: action.payload.quantity,
                  price:
                    Math.round(item.rate * action.payload.quantity * 1000) /
                    1000,
                }
              : item,
          ),
        };

      case ACTIONS.REMOVE_ITEM:
        return {
          items: state.items.filter((_, i) => i != action.payload.index - 1),
        };
      default:
        return state;
    }
  }
  const [items, setItems] = useState([{}]);
  const [state, dispatch] = useReducer(reducer, { items: [] });
  return (
    <>
      <Header />
      <BillItem
        items={items}
        setItems={setItems}
        state={state}
        dispatch={dispatch}
      />
      <GrandTotal total={state} />
    </>
  );
}
export default App;
