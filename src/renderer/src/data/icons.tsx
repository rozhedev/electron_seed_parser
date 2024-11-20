const UI_ICONS = {
    ic_infoRounded: (
        <>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 10C12.5523 10 13 10.4477 13 11V16.0009C13 16.5532 12.5523 17.0009 12 17.0009C11.4477 17.0009 11 16.5532 11 16.0009V11C11 10.4477 11.4477 10 12 10Z"
            />
            <circle
                cx="12"
                cy="8"
                r="1"
            />
        </>
    ),
    ic_close: (
        <>
            <path
                d="M4 20L20 4"
                stroke="#111111"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M20 20L4 4"
                stroke="#111111"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </>
    ),
    ic_fullScreen: (
        <>
            <path
                d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                stroke="#111111"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12.6 18.5H16.4C17.9 18.5 18.5 17.9 18.5 16.4V14.6C18.5 13.1 17.9 12.5 16.4 12.5H12.6C11.1 12.5 10.5 13.1 10.5 14.6V16.4C10.5 17.9 11.1 18.5 12.6 18.5Z"
                stroke="#111111"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </>
    ),
    ic_moon: (
        <>
            <path
                d="M2.02997 12.42C2.38997 17.57 6.75997 21.76 11.99 21.99C15.68 22.15 18.98 20.43 20.96 17.72C21.78 16.61 21.34 15.87 19.97 16.12C19.3 16.24 18.61 16.29 17.89 16.26C13 16.06 8.99997 11.97 8.97997 7.14002C8.96997 5.84002 9.23997 4.61002 9.72997 3.49002C10.27 2.25002 9.61997 1.66002 8.36997 2.19002C4.40997 3.86002 1.69997 7.85002 2.02997 12.42Z"
                stroke="#111111"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </>
    ),
    ic_pause: (
        <>
            <path
                d="M10.65 19.11V4.89C10.65 3.54 10.08 3 8.64 3H5.01C3.57 3 3 3.54 3 4.89V19.11C3 20.46 3.57 21 5.01 21H8.64C10.08 21 10.65 20.46 10.65 19.11Z"
                stroke="#111111"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M21 19.11V4.89C21 3.54 20.43 3 18.99 3H15.36C13.93 3 13.35 3.54 13.35 4.89V19.11C13.35 20.46 13.92 21 15.36 21H18.99C20.43 21 21 20.46 21 19.11Z"
                stroke="#111111"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </>
    ),
    ic_play: (
        <>
            <path
                d="M4 12V8.44002C4 4.02002 7.13 2.21002 10.96 4.42002L14.05 6.20002L17.14 7.98002C20.97 10.19 20.97 13.81 17.14 16.02L14.05 17.8L10.96 19.58C7.13 21.79 4 19.98 4 15.56V12Z"
                stroke="#111111"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </>
    ),
    ic_rollUp: (
        <>
            <path
                d="M2 12H22"
                stroke="#111111"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </>
    ),
    ic_stop: (
        <path
            d="M9.3 21H14.7C19.2 21 21 19.2 21 14.7V9.3C21 4.8 19.2 3 14.7 3H9.3C4.8 3 3 4.8 3 9.3V14.7C3 19.2 4.8 21 9.3 21Z"
            stroke="#111111"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    ),
    ic_sun: (
        <>
            <path
                d="M12 18.5C15.5899 18.5 18.5 15.5899 18.5 12C18.5 8.41015 15.5899 5.5 12 5.5C8.41015 5.5 5.5 8.41015 5.5 12C5.5 15.5899 8.41015 18.5 12 18.5Z"
                stroke="#111111"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M19.14 19.14L19.01 19.01M19.01 4.99L19.14 4.86L19.01 4.99ZM4.86 19.14L4.99 19.01L4.86 19.14ZM12 2.08V2V2.08ZM12 22V21.92V22ZM2.08 12H2H2.08ZM22 12H21.92H22ZM4.99 4.99L4.86 4.86L4.99 4.99Z"
                stroke="#111111"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </>
    ),
};
export const { ic_infoRounded, ic_close, ic_fullScreen, ic_moon, ic_pause, ic_play, ic_rollUp, ic_stop, ic_sun } = UI_ICONS;

const CRYPTO_ICONS_COLORED = {
    ic_bnb: (
        <>
            <circle
                cx="23"
                cy="23.5"
                r="23"
                fill="white"
            />
            <g clipPath="url(#clip0_47_290)">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M23 11.5C29.6279 11.5 35 16.8721 35 23.5C35 30.1279 29.6279 35.5 23 35.5C16.3721 35.5 11 30.1279 11 23.5C11 16.8721 16.3721 11.5 23 11.5Z"
                    fill="#F0B90B"
                />
                <path
                    d="M17.5952 23.5L17.6039 26.6731L20.3 28.2596V30.1173L16.026 27.6106V22.5721L17.5952 23.5ZM17.5952 20.3269V22.176L16.025 21.2471V19.3981L17.5952 18.4692L19.1731 19.3981L17.5952 20.3269ZM21.426 19.3981L22.9962 18.4692L24.5741 19.3981L22.9962 20.3269L21.426 19.3981Z"
                    fill="white"
                />
                <path
                    d="M18.7299 26.0154V24.1577L20.3001 25.0865V26.9356L18.7299 26.0154ZM21.426 28.925L22.9962 29.8539L24.5741 28.925V30.774L22.9962 31.7029L21.426 30.774V28.925ZM26.826 19.3981L28.3962 18.4692L29.9741 19.3981V21.2471L28.3962 22.176V20.3269L26.826 19.3981ZM28.3962 26.6731L28.4049 23.5L29.9751 22.5712V27.6096L25.701 30.1164V28.2587L28.3962 26.6731Z"
                    fill="white"
                />
                <path
                    d="M27.2701 26.0154L25.7 26.9356V25.0865L27.2701 24.1577V26.0154Z"
                    fill="white"
                />
                <path
                    d="M27.2702 20.9846L27.2789 22.8423L24.5751 24.4289V27.6096L23.0049 28.5298L21.4347 27.6096V24.4289L18.7308 22.8423V20.9846L20.3077 20.0558L22.9952 21.65L25.6991 20.0558L27.277 20.9846H27.2702ZM18.7299 17.8125L22.9962 15.2971L27.2702 17.8125L25.7001 18.7413L22.9962 17.1471L20.3001 18.7413L18.7299 17.8125Z"
                    fill="white"
                />
            </g>
            <defs>
                <clipPath id="clip0_47_290">
                    <rect
                        width="24"
                        height="24"
                        fill="white"
                        transform="translate(11 11.5)"
                    />
                </clipPath>
            </defs>
        </>
    ),
};

export const { ic_bnb } = CRYPTO_ICONS_COLORED;
