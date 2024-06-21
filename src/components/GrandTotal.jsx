import { useState, useEffect } from "react";
import { Tax } from "./Tax";
import { Shipping } from "./Shipping";
export function GrandTotal({ total }) {
    const [sTotal, setSTotal] = useState(0);
    const [ftotal, setFtotal] = useState(0);
    const [taxShow, setTaxShow] = useState(false);
    const [shipShow, setShipShow] = useState(false);
    const [discountRate, setDiscountRate] = useState({
        head: "Discount",
        rate: 0,
    });
    const [amtPaid, setAmtPaid] = useState(0);
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
                subTotal = subTotal - disPrice - amtPaid;
                const finalTotal = subTotal.toLocaleString("en-IN");
                setFtotal(finalTotal);
            }
        }
    }, [sTotal, total, discountRate, amtPaid]);
    return (
        <>
            <div className="flex justify-around">
                <div className="flex flex-col justify-center">
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
                <div className="flex flex-col gap-3 justify-center">
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
                            className="input w-full max-w-xs"
                        />
                    </div>
                    {taxShow && <Tax show={setTaxShow}/>}
                    {shipShow && <Shipping show={setShipShow}/>}
                    <div className="flex gap-3">
                        {!taxShow && (
                            <button
                                className="btn btn-ghost text-blue-600 btn-sm"
                                onClick={() => setTaxShow(true)}
                            >
                                + Add Tax
                            </button>
                        )}
                        {!shipShow && (
                            <button
                                className="btn btn-ghost text-blue-600 btn-sm"
                                onClick={() => setShipShow(true)}
                            >
                                + Shipping
                            </button>
                        )}
                    </div>
                    <div>
                        <span>Amount Paid: </span>
                        <input
                            type="number"
                            className="input"
                            placeholder="0"
                            onChange={(e) => setAmtPaid(e.target.value)}
                        />
                    </div>
                    <div>
                        Balance Due: <span>{`\u20B9${ftotal}`}</span>
                    </div>
                </div>
            </div>
        </>
    );
}
