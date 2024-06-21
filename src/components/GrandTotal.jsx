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
    const [taxRate, setTaxRate] = useState({
        head: "GST",
        rate: 0,
    });
    const [shippingRate, setShipRate] = useState({
        head: "Shipping",
        rate: 0,
    });
    const [amtPaid, setAmtPaid] = useState(0);
    function discountManage(e) {
        const rate = e.target.value;
        if (!isNaN(rate)) {
            const temp = { ...discountRate, rate: rate };
            setDiscountRate(temp);
        } else {
            const temp = { ...discountRate, rate: 0 };
            setDiscountRate(temp);
        }
    }
    function discountHead(e) {
        const temp = { ...discountRate, head: e.target.value };
        setDiscountRate(temp);
    }
    useEffect(() => {
        if (total.items.length == 0) {
        } else {
            let subTotal = total.items.reduce((acc, curr) => acc + curr.price, 0);
            if (
                !isNaN(subTotal) &&
                subTotal !== null &&
                subTotal !== undefined &&
                !isNaN(discountRate.rate) &&
                discountRate.rate !== null &&
                discountRate.rate !== undefined
            ) {
                setSTotal(
                    subTotal.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    }),
                );

                const disPrice = parseFloat(
                    ((subTotal * discountRate.rate) / 100).toFixed(2),
                );

                let discountedTotal = parseFloat((subTotal - disPrice).toFixed(2));

                const taxTemp = parseFloat(
                    ((discountedTotal * taxRate.rate) / 100).toFixed(2),
                );

                const finalAmount = parseFloat(
                    (discountedTotal + taxTemp + shippingRate.rate).toFixed(2),
                );

                const finalTotal = finalAmount.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                });
                setFtotal(finalTotal);
            }
        }
    }, [
        sTotal,
        total,
        discountRate,
        amtPaid,
        taxShow,
        shipShow,
        taxRate,
        shippingRate,
    ]);

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
                    {taxShow && (
                        <Tax show={setTaxShow} taxRate={taxRate} setTaxRate={setTaxRate} />
                    )}
                    {shipShow && (
                        <Shipping
                            show={setShipShow}
                            shipRate={shippingRate}
                            setShipRateState={setShipRate}
                            setShipRate={setShipShow}
                        />
                    )}
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
