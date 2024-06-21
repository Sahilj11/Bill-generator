import { useState } from "react";

export function Charge({
    placeholder,
    index,
    dispatch,
    consts,
    state
}) {
    const [symbol, setSym] = useState("%");

    return (
        <>
            <div className="flex relative">
                <input
                    type="text"
                    placeholder={placeholder}
                    className="input w-full max-w-xs pl-10"
                    onChange={handleHead}
                    value={headValue}
                    data-head={index}
                />
                <button
                    className="absolute top-1/4 left-2"
                    onClick={() => (symbol === "%" ? setSym("\u20B9") : setSym("%"))}
                >
                    {symbol}
                </button>
                <input
                    type="number"
                    placeholder="0"
                    data-rate={index}
                    className="input w-full max-w-xs pl-10"
                    onChange={handleRate}
                    value={rateValue}
                />
            </div>
        </>
    );
}
