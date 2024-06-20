import { useState, useEffect } from "react";

export function GrandTotal({ total }) {
    const [gtotal, setTotal] = useState(0);
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
                <div>
                    <div>
                        SubTotal: <span>{`\u20B9${gtotal}`}</span>
                    </div>
                    <div className="flex">
                        <input
                            type="text"
                            placeholder="Discount"
                            className="input w-full max-w-xs"
                        />
                        <input
                            type="number"
                            placeholder="0"
                            className="input input-bordered w-full max-w-xs"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            className="input input-bordered"
                            placeholder="Daisy"
                        />
                        <label className="flex items-center">Name</label>
                    </div>
                </div>
            </div>
        </>
    );
}
