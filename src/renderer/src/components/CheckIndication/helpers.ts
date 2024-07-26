// Update boolean prop
export async function sendUpdateBoolRequest(name: string, bool: boolean) {
    const res = await fetch(`/api/user/${name}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            is_search_started: bool,
        }),
    });

    if (!res.ok) {
        throw new Error("Error when updating (PUT) document:" + res.status);
    }
    const data = await res.json();
    return data;
}
