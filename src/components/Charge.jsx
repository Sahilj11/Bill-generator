import { useState } from "react";

export function Charge({ placeholder }) {
    const [sym, setSym] = useState("%");
    return (
        <>
            <div className="flex relative">
                <input
                    type="text"
                    placeholder={placeholder}
                    className="input w-full max-w-xs pl-10"
                />
                <button
                    className="absolute top-1/4 left-2"
                    onClick={() => (sym === "%" ? setSym("\u20B9") : setSym("%"))}
                >
                    {sym}
                </button>
                <input
                    type="number"
                    placeholder="0"
                    className="input w-full max-w-xs pl-10"
                />
            </div>
        </>
    );
}
