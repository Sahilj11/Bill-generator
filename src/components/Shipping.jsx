export function Shipping({ show }) {
    return (
        <>
            <div className="flex relative gap-3 items-center">
                <input
                    type="text"
                    placeholder="Shipping"
                    className="input w-full max-w-xs pl-10"
                />
                <input
                    type="number"
                    placeholder="0"
                    className="input w-full max-w-xs"
                />
                <button className="btn btn-sm btn-ghost text-red-700" onClick={() => show(false)}>
                    X
                </button>
            </div>
        </>
    );
}
