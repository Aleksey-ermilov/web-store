import * as React from "react"

function StarOutline({size  = '24px',border = 'currentColor', ...props}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="prefix__ionicon"
            viewBox="0 0 512 512"
            width={size}
            height={size}
            {...props}
        >
            <path
                d="M480 208H308L256 48l-52 160H32l140 96-54 160 138-100 138 100-54-160z"
                fill="none"
                stroke={border}
                strokeLinejoin="round"
                strokeWidth={32}
            />
        </svg>
    )
}

export default StarOutline
