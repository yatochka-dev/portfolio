import Section from "../Section";
import {Box, Container} from "@mui/material";
import TextBox from "../../TextBox";
import useSection from "../../../hooks/useSection";
import pic from "../../../../public/700x600.webp";
import dynamic from "next/dynamic";

const Image = dynamic(() => import('mui-image'), {ssr: false})

// const buttonVariants: Variants = {
//     hover: {
//         scale: 1.1,
//         transition: {
//             yoyo: Infinity
//
//         },
//     },
//     tap: {
//         scale: 0.9,
//     },
//     animate: {
//         scale: [1],
//         y: [
//             0, 10, 0
//         ],
//
//         transition: {
//
//             duration: 1,
//             repeat: Infinity,
//             type: "spring"
//
//         }
//     }
//
// }

export default function About({scrollToNext}: { scrollToNext: () => void }) {


    return (
        <Section name={"about"} render={"about" === useSection().name}>

            <Container>
                <Box sx={{
                    display: "flex",
                    minHeight: "100svh",
                    alignItems: "center",
                    justifyContent: "center",
                }}>

                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: {
                            md: "row",
                            xs: "column"
                        }
                    }}>
                        <Box sx={{
                            maxWidth: {
                                md: "400px",
                                xs: "700px"
                            },
                            maxHeight: {
                                md: "700px",

                            },
                            mb: {
                                md: 0,
                                xs: 4
                            }
                        }}>
                            <Image height={"400px"} width={"100%"} src={pic.src} alt={"My picture"}></Image>
                        </Box>

                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            maxWidth: {
                                lg: "35%",
                                md: "45%",
                                sm: "100%"
                            },
                            px: {
                                md: 4,
                                sm: 2,
                            },
                        }}>
                            <TextBox variant={"h4"} sx={{
                                mb: 2,
                                maxWidth: "150%",
                            }}>
                                Hi, I&apos;m <b>Philip Sagan</b>
                            </TextBox>
                            <TextBox variant={"subtitle1"} sx={{
                                "b": {
                                    transition: "all 0.2s ease-in-out",
                                    ":hover": {
                                        cursor: "pointer",
                                        opacity: 0.5,
                                    }
                                }
                            }}>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus,
                                adipisci, asperiores atque autem
                                beatae commodi consequatur cumque cupiditate delectus dicta dolor
                                doloremque dolorum ea eius
                                eligendi enim eos esse est et eum ex exercitationem explicabo
                                facilis fuga fugiat hic id
                                impedit in incidunt inventore ipsa ipsam ipsum iste iure iusto
                                laboriosam laborum laudantium
                                libero magnam magni maxime minima minus molestiae mollitia nam natus
                                necessitatibus neque
                                nesciunt nisi nobis non nostrum nulla numquam obcaecati officia
                                officiis omnis optio pariatur
                                perferendis perspiciatis placeat praesentium quae quam quas qui
                                my <b onClick={scrollToNext}>skills.</b>
                            </TextBox>


                        </Box>
                    </Box>

                </Box>
            </Container>

        </Section>
    )
}