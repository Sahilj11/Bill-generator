export function Tax({ show, taxRate, setTaxRate }) {
    function handleHead(e) {
        const head = e.target.value;
        const temp = { ...taxRate, head: head };
        setTaxRate(temp);
    }
    function handleRate(e) {
        const rate = parseInt(e.target.value, 10);
        const temp = { ...taxRate, rate: rate };
        setTaxRate(temp);
    }
    return (
        <>
            <div className="flex relative items-center gap-2">
                <input
                    type="text"
                    placeholder="Tax"
                    className="input w-full max-w-xs pl-10"
                    onChange={handleHead}
                />
                <button className="absolute top-1/4 left-2">%</button>
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
