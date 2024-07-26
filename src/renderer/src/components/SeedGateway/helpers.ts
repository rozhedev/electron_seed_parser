import { Dispatch, SetStateAction } from "react";
import { UI_CONTENT } from "../../data/init-data";
import { TUserProjection } from "../../types";

export const getSendedSeed = async (uniqueSelector: string, projection: Partial<TUserProjection>, setMessages: Dispatch<SetStateAction<string[]>>) => {
    let projectionStr = JSON.stringify(projection);
    try {
        const res = await fetch(`/api/user/${uniqueSelector}?projection=${encodeURIComponent(projectionStr)}`, {
            method: "GET",
        });

        if (!res.ok) {
            throw new Error("Error when GET document from collection:" + res.status);
        }
        const data = await res.json();
        const { sended_seed } = data;
        
        if (!sended_seed.length) setMessages([UI_CONTENT.seedFoundStatus.notFound]);
        else setMessages([...sended_seed]);
    } catch (error) {
        console.error(error);
    }
};
