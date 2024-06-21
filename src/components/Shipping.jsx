export function Shipping({ show, shipRate, setShipRate }) {
    function handleHead(e) {
        const temp = { ...shipRate, head: e.target.value };
        setShipRate(temp);
    }
    function handleRate(e) {
        const temp = { ...shipRate, rate: parseInt(e.target.value, 10)};
        setShipRate(temp);
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
                    onClick={() => show(false)}
                >
                    X
                </button>
            </div>
        </>
    );
}
