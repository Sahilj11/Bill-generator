import { useState } from "react";

const ACTIONS = {
    ADD_ITEM: "add-item",
    ADD_RATE: "add-rate",
    ADD_QUANTITY: "add-quantity",
    GET_PRICE: "get-price",
    REMOVE_ITEM: "remove-item",
    ADD_FIELD: "add-field",
};
export function Item({ index, setitem, items, dispatcher, state }) {
    const [rateInput, setRate] = useState("");
    const [quan, setQuan] = useState("");
    function removeItem(e) {
        const indexId = parseInt(e.target.id, 10);
        indexId == 1
            ? null
            : setitem(items.filter((_, index) => indexId - 1 != index));
        const index = e.target.id;
        dispatcher({ type: ACTIONS.REMOVE_ITEM, payload: { index } });
    }
    function handleItem(e) {
        const itemDesc = e.target.value;
        dispatcher({ type: ACTIONS.ADD_ITEM, payload: { index, itemDesc } });
    }
    function handleRate(e) {
        if (isValidDecimal(e.target.value)) {
            setRate(e.target.value);
            const rate = parseFloat(e.target.value);
            dispatcher({
                type: ACTIONS.ADD_RATE,
                payload: { index, rate: rate || 0 },
            });
        }
    }
    function handleQuantity(e) {
        if (/^\d*$/.test(e.target.value)) {
            setQuan(e.target.value);
            const quantity = parseInt(e.target.value, 10);
            dispatcher({
                type: ACTIONS.ADD_QUANTITY,
                payload: { index, quantity: quantity || 0 },
            });
        }
    }
    const isValidDecimal = (inputValue) => {
        return inputValue === "" || /^\d*\.?\d*$/.test(inputValue);
    };
    function formatNumberToIndianSystem(number) {
        if (number == null) {
            return "";
        }

        const formattedNumber = number.toLocaleString("en-IN");

        return formattedNumber;
    }
    return (
        <>
            <tr key={index}>
                <td>
                    <p className="text-center">{index}</p>
                </td>
                <td>
                    <input
                        type="text"
                        placeholder="Item details"
                        className="input input-bordered w-full max-w-xs"
                        onChange={handleItem}
                    />
                </td>
                <td>
                    <input
                        type="text"
                        placeholder="Rate"
                        className="input input-bordered w-full max-w-xs"
                        value={rateInput}
                        onChange={handleRate}
                    />
                </td>
                <td>
                    <input
                        type="text"
                        placeholder="Quantity"
                        className="input input-bordered w-full max-w-xs"
                        value={quan}
                        onChange={handleQuantity}
                    />
                </td>
                <td>
                    <p className="mx-8">{`\u20B9${formatNumberToIndianSystem(state.items[index - 1]?.price || 0)}`}</p>
                </td>
                <td>
                    <button
                        onClick={removeItem}
                        className="btn btn-info"
                        id={index}
                        disabled={index == 1}
                    >
                        X
                    </button>
                </td>
            </tr>
        </>
    );
}
