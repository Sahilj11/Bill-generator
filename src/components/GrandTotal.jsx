import { useState, useEffect, useReducer } from "react";
import { Charge } from "./Charge";
const CHARGE_ACTION = {
    ADD_CHARGE: "add-charge",
};
export function GrandTotal({ total }) {
    const [gtotal, setTotal] = useState(0);
    const [charges, setCharges] = useState([{}]);
    const [dis, setDis] = useState({ head: "Discount", rate: 0 });
    const [state, dispatch] = useReducer(reducer, { surcharges: [] });

    function reducer(state, action) {
        switch (action.type) {
            case CHARGE_ACTION.ADD_CHARGE:
                return {
                    surcharges: [
                        ...state.surcharges.slice(0, action.payload.index),
                        { head: "Tax", rate: 0 },
                    ],
                };
            default:
        }
    }
    function addCharge() {
        setCharges([...charges, {}]);
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
            const to = total.items.reduce((acc, curr) => acc + curr.price, 0);
            if (!isNaN(to)) {
                setTotal(to.toLocaleString("en-IN"));
            }
        }
    }, [gtotal, total]);
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
                        SubTotal: <span>{`\u20B9${gtotal}`}</span>
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
                        return <Charge placeholder="Tax" />;
                    })}
                    <button className="btn btn-info w-2/3" onClick={addCharge}>
                        Add more charges like shipping or more tax
                    </button>
                    <div>Total</div>
                </div>
            </div>
        </>
    );
}
