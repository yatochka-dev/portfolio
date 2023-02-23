import {useMediaQuery} from "@mui/material";
import {useEffect, useState} from "react";


interface useMediaVariantProps {
    def: string;
    variants: {
        [key: string]: string;
    }

}

export default function useMediaVariant({variants, def}: useMediaVariantProps) {

    const xlMatches = useMediaQuery("xl");
    const lgMatches = useMediaQuery("lg");
    const mdMatches = useMediaQuery("md");
    const smMatches = useMediaQuery("sm");
    const xsMatches = useMediaQuery("xs");

    const [current, setCurrent] = useState<string>(def);

    useEffect(
        () => {
            if (xlMatches) {
                setCurrent(variants.xl || def);
            } else if (lgMatches) {
                setCurrent(variants.lg || def);
            } else if (mdMatches) {
                setCurrent(variants.md || def);
            } else if (smMatches) {
                setCurrent(variants.sm || def);
            } else if (xsMatches) {
                setCurrent(variants.xs || def);
            } else {
                setCurrent(def);
            }
        },
        [xlMatches, lgMatches, mdMatches, smMatches, xsMatches, variants.xl, variants.lg, variants.md, variants.sm, variants.xs, def]
    )

    return current;
}