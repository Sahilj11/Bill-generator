import { useState } from "react";

export function GrandTotal({ total }) {
    let to = 0;
    let to2 = 0;
    if (total.items.length == 0) {
    } else {
        to = total.items.reduce((acc, curr) => acc + curr.price, 0);
        if (!isNaN(to)) {
            to2 = to;
        }
    }
    return (
        <>
            <div className="w-full grid justify-end">
                <div>Discount</div>
                <div>Tax</div>
                <div>
                    Total <span>{to2}</span>
                </div>
            </div>
        </>
    );
}
