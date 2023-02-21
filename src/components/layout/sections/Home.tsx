import Section from "../Section";
import {Avatar, Box, Container, IconButton} from "@mui/material";
import TextBox from "../../TextBox";
import bg from "../../../../public/header-background.jpg";
import type {Variants} from "framer-motion";
import {motion} from "framer-motion";

import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';

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



    return (
        <Section name={"home"} sx={{
            display: "flex",
            backgroundImage: `url(${bg.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",

        }}>
            <Container>
                <Box sx={{
                    display: "flex",
                    minHeight: "100svh",
                    position: "relative",
                }}>
                    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        <Avatar src={""}
                                sx={{
                                    width: 200,
                                    height: 200,
                                }}/>
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

                    </Box>
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
                            <IconButton onClick={scrollToNext}>
                                <ArrowDownwardRoundedIcon sx={{fontSize: "50px"}}/>
                            </IconButton>
                        </motion.div>
                    </Box>
                </Box>

            </Container>

        </Section>
    )
}