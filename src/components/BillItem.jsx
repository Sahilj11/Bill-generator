import { GrandTotal } from "./GrandTotal";
import { Item } from "./Item";
import { useReducer, useState } from "react";

const ACTIONS = {
    ADD_ITEM: "add-item",
    ADD_RATE: "add-rate",
    ADD_QUANTITY: "add-quantity",
    GET_PRICE: "get-price",
};
export function BillItem({items,dispatch,state,setItems}) {
    
    function addItem() {
        const item = [...items, {}];
        setItems(item);
    }

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
            default:
                return state;
        }
    }
    console.log(state);
    return (
        <>
            <div className="flex justify-center">
                <table className="border-spacing-5 border-separate">
                    <tr className="text-center">
                        <td>
                            <span className="label-text">Sr. No.</span>
                        </td>
                        <td>
                            <span className="label-text">Item</span>
                        </td>
                        <td>
                            <span className="label-text">Rate</span>
                        </td>
                        <td>
                            <span className="label-text">Quantity</span>
                        </td>
                        <td>
                            <span className="label-text">Price</span>
                        </td>
                    </tr>
                    {items.map((item, index) => {
                        return (
                            <Item
                                key={index}
                                index={index + 1}
                                setitem={setItems}
                                items={items}
                                dispatcher={dispatch}
                                state={state}
                            />
                        );
                    })}
                </table>
            </div>
            <div className="flex flex-col justify-center items-center">
                <button onClick={addItem} className="btn btn-circle bg-blue-700">
                    +
                </button>
                <p>Add Item</p>
            </div>
        </>
    );
}
