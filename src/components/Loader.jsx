import React from 'react'
import { HashLoader } from 'react-spinners'

const Loader = () => {
    return (
        <div className="flex items-center justify-center min-h-screen w-full">
            <div className="flex flex-col items-center gap-1">
                <HashLoader
                    size="70px"
                    color='#306cce'
                />
                <p className="text-slate-700">Please Wait...</p>
            </div>
        </div>
    )
}

export default Loader
