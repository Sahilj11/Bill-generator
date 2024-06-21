import { useState, useEffect, useReducer } from "react";
import { Charge } from "./Charge";
const CHARGE_ACTION = {
    CHANGE_CHARGE: "change-charge",
    ADD_CHARGE: "add-charge",
    CHANGE_HEAD: "change-head",
};
export function GrandTotal({ total }) {
    const [gtotal, setTotal] = useState(0);
    const [ftotal, setFtotal] = useState(0);
    const [charges, setCharges] = useState([{}]);
    const [dis, setDis] = useState({ head: "Discount", rate: 0 });
    const [tax, setTax] = useState({ head: "Tax", rate: 0 });
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
                    surc:  [
                        ...state.surc.slice(0, action.payload.index-1),
                        {
                            ...state.surc[action.payload.index-1],
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
                }
            default:
                return state;
        }
    }
    function addCharge() {
        setCharges([...charges, {}]);
        const newObject = { head: "Tax", rate: 0 };
        console.log(state.surc);
        dispatch({ type: CHARGE_ACTION.ADD_CHARGE, payload: { newObject } });
    }
    function discountManage(e) {
        const temp = { ...dis, rate: e.target.value };
        setDis(temp);
    }
    function discountHead(e) {
        const temp = { ...dis, head: e.target.value };
        setDis(temp);
    }
    useEffect(() => {
        if (total.items.length == 0) {
        } else {
            let to = total.items.reduce((acc, curr) => acc + curr.price, 0);
            if (!isNaN(to)) {
                setTotal(to.toLocaleString("en-IN"));
                const temp = (to * dis.rate) / 100;
                to = to - temp;
                const temp2 = (to * tax.rate) / 100;
                to = to + temp2;
                to = to.toFixed(2);
                setFtotal(to.toLocaleString("en-IN"));
            }
        }
    }, [gtotal, total, dis, tax]);
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
                        Sub Total: <span>{`\u20B9${gtotal}`}</span>
                    </div>
                    <div className="flex relative">
                        <input
                            type="text"
                            placeholder="Discount"
                            className="input w-full max-w-xs pl-10"
                            onChange={discountHead}
                            value={dis.head}
                        />
                        <button className="absolute top-1/4 left-2">%</button>
                        <input
                            type="number"
                            placeholder="0"
                            onChange={discountManage}
                            value={dis.rate}
                            className="input w-full max-w-xs pl-10"
                        />
                    </div>
                    {charges.map((item, index) => {
                        return (
                            <Charge
                                placeholder="Tax"
                                setTax={setTax}
                                tax={tax}
                                index={index+1}
                                dispatch={dispatch}
                                consts={CHARGE_ACTION}
                            state={state}
                            />
                        );
                    })}
                    <button className="btn btn-info w-2/3" onClick={addCharge}>
                        Add more charges like shipping or more tax
                    </button>
                    <div>
                        Total: <span>{`\u20B9${ftotal}`}</span>
                    </div>
                </div>
            </div>
        </>
    );
}
// i want to keep track of all the taxes head and rate
// there will be array of taxes
// by default one size , user can add more
// listner on change in valule of head and rate in each tax , using index to differ from each
