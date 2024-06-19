import { useState } from "react";

export function Header() {
    const [disable, setDisable] = useState(false);
    return (
        <>
            <h1 className="text-center text-5xl font-bold mt-5">Invoice Generator</h1>
            <div className="flex justify-around">
                <div className="logoupload">
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Upload a Logo</span>
                        </div>
                        <input
                            type="file"
                            className="file-input file-input-bordered w-full max-w-xs"
                        />
                    </label>
                </div>
                <div className="invoicenum">
                    <div className="label">
                        <span className="label-text">Invoice no.</span>
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="#INV001"
                            className="input input-bordered w-full max-w-xs"
                            disabled
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-around">
                <div>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Seller details</span>
                        </div>
                        <textarea
                            className="textarea textarea-bordered h-24"
                            placeholder="Enter name,phone,address"
                        ></textarea>
                        <div className="label"></div>
                    </label>
                </div>
                <div className="tobuyer">
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Buyer details</span>
                        </div>
                        <textarea
                            className="textarea textarea-bordered h-24"
                            placeholder="Enter name,phone,address"
                        ></textarea>
                        <div className="label"></div>
                    </label>
                </div>
            </div>
            <div className="flex justify-around">
                <div className="dates">
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Selling Date</span>
                        </div>
                        <input
                            type="date"
                            placeholder="Type here"
                            className="input input-bordered w-full max-w-xs"
                        />
                    </label>
                </div>
                <div className="dates">
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Due Date</span>
                            <button
                                className="btn btn-error btn-sm"
                                onClick={() => setDisable(!disable)}
                            >
                                {disable ? "Enable" : "Disable"}
                            </button>
                        </div>
                        <input
                            type="date"
                            placeholder="Type here"
                            className="input input-bordered w-full max-w-xs"
                            disabled={disable}
                        />
                    </label>
                </div>
            </div>
        </>
    );
}
