export function Tax({ show, taxRate, setTaxRate }) {
    function handleHead(e) {
        const head = e.target.value;
        const temp = { ...taxRate, head: head };
        setTaxRate(temp);
    }
    function handleRate(e) {
        const rate = parseInt(e.target.value, 10);
        if (!isNaN(rate)) {
            const temp = { ...taxRate, rate: rate };
            setTaxRate(temp);
        } else {
            const temp = { ...taxRate, rate: 0 };
            setTaxRate(temp);
        }
    }
    function removingTax() {
        const temp = { ...taxRate, head: "Tax", rate: 0 };
        show(false);
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
                    onClick={removingTax}
                >
                    X
                </button>
            </div>
        </>
    );
}
