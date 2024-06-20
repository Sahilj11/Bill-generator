import { useState, useEffect } from "react";

export function GrandTotal({ total }) {
    const [gtotal, setTotal] = useState(0);
    useEffect(() => {
        if (total.items.length == 0) {
        } else {
           const to = total.items.reduce((acc, curr) => acc + curr.price, 0);
            if (!isNaN(to)) {
                setTotal(to);
            }
        }
    }, [gtotal,total]);
    return (
        <>
            <div className="w-full grid justify-end">
                <div>Discount</div>
                <div>Tax</div>
                <div>
                    Total <span>{gtotal}</span>
                </div>
            </div>
        </>
    );
}
