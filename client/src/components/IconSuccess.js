import * as React from "react"

function SvgComponent(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="prefix__ionicon"
            viewBox="0 0 512 512"
            width="15em"
            height="15em"
            {...props}
        >
            <path
                d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
                fill="none"
                stroke="#198754"
                strokeMiterlimit={10}
                strokeWidth={32}
            />
            <path
                fill="none"
                stroke="#198754"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={32}
                d="M352 176L217.6 336 160 272"
            />
        </svg>
    )
}

export default SvgComponent