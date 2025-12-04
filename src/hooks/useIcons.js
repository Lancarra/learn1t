import { useMemo } from "react";
import {useGetStaticIconsQuery} from "../redux/profile/staticIcons/staticIconsList.js";

const asDataUrl = (base64, mime = "image/png") =>
    `data:${mime};base64,${base64}`;

export const useIcons = () => {
    const { data, isSuccess } = useGetStaticIconsQuery();

    return useMemo(() => {
        if (!isSuccess || !Array.isArray(data)) return [];

        return data.map((item, i) => {
            const id = item.id ?? item.name ?? item.url ?? i;

            if (item.content) {
                const mime =
                    item.contentType ||
                    (item.url && item.url.endsWith(".svg") ? "image/svg+xml" : "image/png");

                return { id, src: asDataUrl(item.content, mime) };
            }

            if (item.url) {
                return { id, src: item.url };
            }

            if (item.name) {
                const STATIC_BASE =
                    "http://127.0.0.1:10000/devstoreaccount1/static-images";
                return { id, src: `${STATIC_BASE}/${encodeURIComponent(item.name)}` };
            }

            return { id, src: "" };
        });
    }, [data, isSuccess]);
};