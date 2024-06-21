import { useState, useEffect, useReducer } from "react";
import { Charge } from "./Charge";
const CHARGE_ACTION = {
    CHANGE_CHARGE: "change-charge",
    ADD_CHARGE: "add-charge",
    CHANGE_HEAD: "change-head",
};
export function GrandTotal({ total }) {
    const [sTotal, setSTotal] = useState(0);
    const [ftotal, setFtotal] = useState(0);
    const [discountRate, setDiscountRate] = useState({
        head: "Discount",
        rate: 0,
    });
    const [state, dispatch] = useReducer(reducer, {
        surc: [],
    });

    function reducer(state, action) {
        switch (action.type) {
            case CHARGE_ACTION.ADD_CHARGE:
                return {
                    surc: [...state.surc, action.payload.newObject],
                };
            case CHARGE_ACTION.CHANGE_HEAD:
                return {
                    surc: [
                        ...state.surc.slice(0, action.payload.index - 1),
                        {
                            ...state.surc[action.payload.index - 1],
                            head: action.payload.head,
                        },
                        ...state.surc.slice(action.payload.index),
                    ],
                };
            case CHARGE_ACTION.CHANGE_CHARGE:
                return {
                    surc: state.surc.map((item, index) =>
                        index === action.payload.index - 1
                            ? {
                                ...item,
                                rate: action.payload.rate,
                            }
                            : item,
                    ),
                };
            default:
                return state;
        }
    }
    function discountManage(e) {
        const temp = { ...discountRate, rate: e.target.value };
        setDiscountRate(temp);
    }
    function discountHead(e) {
        const temp = { ...discountRate, head: e.target.value };
        setDiscountRate(temp);
    }
    useEffect(() => {
        if (total.items.length == 0) {
        } else {
            let subTotal = total.items.reduce((acc, curr) => acc + curr.price, 0);
            if (!isNaN(subTotal)) {
                setSTotal(subTotal.toLocaleString("en-IN"));
                const disPrice = (subTotal * discountRate.rate) / 100;
                subTotal = subTotal - disPrice;
                const finalTotal = subTotal.toLocaleString("en-IN");
                setFtotal(finalTotal);
            }
        }
    }, [sTotal, total, discountRate]);
    return (
        <>
            <div className="flex justify-around">
                <div>
                    <div>
                        <label className="form-control">
                            <div className="label">
                                <span className="label-text">Notes</span>
                            </div>
                            <textarea
                                className="textarea textarea-bordered h-24"
                                placeholder="Any Notes"
                            ></textarea>
                        </label>
                    </div>
                    <div>
                        <label className="form-control">
                            <div className="label">
                                <span className="label-text">Terms</span>
                            </div>
                            <textarea
                                className="textarea textarea-bordered h-24"
                                placeholder="Terms and condition: 14 days return"
                            ></textarea>
                        </label>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <div>
                        Sub Total: <span>{`\u20B9${sTotal}`}</span>
                    </div>
                    <div className="flex relative">
                        <input
                            type="text"
                            placeholder="Discount"
                            className="input w-full max-w-xs pl-10"
                            onChange={discountHead}
                            value={discountRate.head}
                        />
                        <button className="absolute top-1/4 left-2">%</button>
                        <input
                            type="number"
                            placeholder="0"
                            onChange={discountManage}
                            value={discountRate.rate}
                            className="input w-full max-w-xs pl-10"
                        />
                    </div>
                    <div className="flex gap-3">
                        <button className="btn btn-ghost text-blue-600 btn-sm">+ Add Tax</button>
                        <button className="btn btn-ghost text-blue-600 btn-sm">+ Shipping</button>
                    </div>
                    <div>
                        Total: <span>{`\u20B9${ftotal}`}</span>
                    </div>
                </div>
            </div>
        </>
    );
}
