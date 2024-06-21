export function Tax({ show }) {
    return (
        <>
            <div className="flex relative items-center gap-2">
                <input
                    type="text"
                    placeholder="Tax"
                    className="input w-full max-w-xs pl-10"
                />
                <button className="absolute top-1/4 left-2">%</button>
                <input
                    type="number"
                    placeholder="0"
                    className="input w-full max-w-xs"
                />
                <button className="btn btn-sm btn-ghost text-red-700" onClick={()=>show(false)}>
                    X
                </button>
            </div>
        </>
    );
}
