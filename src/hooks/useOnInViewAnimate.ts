import type {Transition} from "framer-motion";
import { useAnimation} from "framer-motion";
import {useIntersection} from "@mantine/hooks";
import {useEffect, useState} from "react";

interface UseOnInViewAnimateProps {

    initial: {
        [key: string]: string | number
    },
    animate: {
        [key: string]: string | number
    },

    delay?: number,
    duration?: number,
    easing?: string,
    threshold?: number,
    triggerOnce?: boolean,

}

export default function UseOnInViewAnimate(
    props: UseOnInViewAnimateProps
) {

    const {
        initial,
        animate,
        delay = 0,
        duration = 0.5,
        easing = "linear",
        threshold = 0.5,
        triggerOnce = true,
    } = props;

    const controls = useAnimation();
    const [triggered] = useState(false)

    const {ref: entryRef, entry} = useIntersection({
        threshold,

    });


    useEffect(() => {
        if (entry === null) return;

        console.log(entry.isIntersecting)

        if (entry.isIntersecting) {


            controls.start("animate").catch(
                console.error
            );

        } else {

            controls.start("initial").catch(
                console.error
            );
        }
    }, [controls, entry, initial, animate, triggerOnce, triggered]);

    return {
        animation: {
            ref: entryRef,
            animate: controls,
            initial: "initial",
            variants: {
                initial,
                animate,
            },
            transition: {
                delay,
                duration,
                ease: easing,
            } as Transition

        },
        controls,
    };

}