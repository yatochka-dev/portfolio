import Section from "../Section";
import {Avatar, Box, Container, IconButton} from "@mui/material";
import TextBox from "../../TextBox";
import bg from "../../../../public/header-background.webp";
import type {Variants} from "framer-motion";
import {motion} from "framer-motion";

import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import useSection from "../../../hooks/useSection";
import UseOnInViewAnimate from "../../../hooks/useOnInViewAnimate";

const buttonVariants: Variants = {
    hover: {
        scale: 1.1,
        transition: {
            yoyo: Infinity

        },
    },
    tap: {
        scale: 0.9,
    },
    animate: {
        scale: [1],
        y: [
            0, 10, 0
        ],

        transition: {

            duration: 1,
            repeat: Infinity,
            type: "spring"

        }
    }

}

export default function Home({scrollToNext}: { scrollToNext: () => void }) {

    const {animation: animateBlock} = UseOnInViewAnimate(
        {
            initial: {
                opacity: 0,
                x: -50,
            },
            animate: {
                opacity: 1,
                x: 0,
            },
            duration: .3,
            delay: .2,
        }
    );

    const {animation: animatePicture} = UseOnInViewAnimate({
        initial: {
            scale: .8,
        },
        animate: {
            scale: 1,
        },
        delay: .3,
        duration: .1,
        easing: "easeInOut",
    });

    return (
        <Section name={"home"} sx={{
            display: "flex",
            backgroundImage: `url(${bg.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",

        }} render={"home" === useSection().name}>
            <Container>
                <Box sx={{
                    display: "flex",
                    minHeight: "100svh",
                    position: "relative",
                }}>
                    <motion.div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }} {...animateBlock}>
                        <motion.div {...animatePicture} >

                            <Avatar src={""}
                                    sx={{
                                        width: 200,
                                        height: 200,
                                    }}/>

                        </motion.div>
                        <Box sx={{ml: 4}}>
                            <TextBox variant={"h2"}>
                                My name is Philip Sagan
                            </TextBox>

                            <TextBox variant={"subtitle1"}>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet
                                beatae consectetur doloremque ducimus eius, enim harum, incidunt
                                non, pariatur quas rerum saepe sint sunt! Autem ducimus illum
                                maxime
                                quae ratione.
                            </TextBox>

                        </Box>

                    </motion.div>
                    <Box sx={{
                        position: "absolute",
                        bottom: "6rem",
                        left: "50%",
                    }}>
                        <motion.div variants={buttonVariants}
                                    whileTap={"tap"}
                                    whileHover={"hover"}
                                    animate={"animate"}

                        >
                            <IconButton onClick={scrollToNext} aria-label={"scroll down"}>
                                <ArrowDownwardRoundedIcon sx={{fontSize: "50px"}}/>
                            </IconButton>
                        </motion.div>
                    </Box>
                </Box>

            </Container>

        </Section>
    )
}