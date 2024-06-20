import { GrandTotal } from "./GrandTotal";
import { Item } from "./Item";
import { useReducer, useState } from "react";

export function BillItem({ items, dispatch, state, setItems }) {
    function addItem() {
        const item = [...items, {}];
        setItems(item);
    }
    return (
        <>
            <div className="flex justify-center">
                <table className="border-spacing-5 border-separate">
                    <thead>
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
                    </thead>
                    <tbody>
                        {items.map((_, index) => {
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
                    </tbody>
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
