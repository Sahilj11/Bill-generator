export function Shipping({ show, shipRate, setShipRate, setShipRateState }) {
    function handleHead(e) {
        const temp = { ...shipRate, head: e.target.value };
        setShipRate(temp);
    }
    function handleRate(e) {
        const rate = parseInt(e.target.value, 10);
        if (!isNaN(rate)) {
            const temp = { ...shipRate, rate: rate };
            setShipRateState(temp);
        } else {
            const temp = { ...shipRate, rate: 0 };
            setShipRateState(temp);
        }
    }
    function removingShipping() {
        const temp = { ...shipRate, head: "Shipping", rate: 0 };
        show(false);
        setShipRateState(temp);
    }
    return (
        <>
            <div className="flex relative gap-3 items-center">
                <input
                    type="text"
                    placeholder="Shipping"
                    className="input w-full max-w-xs pl-10"
                    onChange={handleHead}
                />
                <input
                    type="number"
                    placeholder="0"
                    className="input w-full max-w-xs"
                    onChange={handleRate}
                />
                <button
                    className="btn btn-sm btn-ghost text-red-700"
                    onClick={removingShipping}
                >
                    X
                </button>
            </div>
        </>
    );
}
