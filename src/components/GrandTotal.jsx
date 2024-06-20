import { useState, useEffect } from "react";
import { Charge } from "./Charge";

export function GrandTotal({ total }) {
    const [gtotal, setTotal] = useState(0);
    const [charges, setCharges] = useState([{}]);
    function addCharge() {
        setCharges([...charges, {}]);
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
                    <Charge placeholder="Discount"/>
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
