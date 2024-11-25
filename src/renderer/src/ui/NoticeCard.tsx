import React, { FC } from "react";

type TNoticeCard = {
    icon: React.JSX.Element;
    label: string;
    cardBg?: string;
    textColor?: string;
};

export const NoticeCard: FC<TNoticeCard> = ({ icon, label, cardBg = "bg-emerald-50", textColor = "text-emerald-900" }) => (
    <div className={`flex flex-1 items-center rounded-lg px-3 py-2 text-sm ${cardBg} ${textColor}`}>
        <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-emerald-900 w-10 stroke-1"
        >
            {icon}
        </svg>
        <span className="pl-3">{label}</span>
    </div>
);

