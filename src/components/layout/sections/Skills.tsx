import Section from "../Section";
import {useEffect, useState} from "react";
import type {Skill} from "../../../lib/models";
import {SkillCategory} from "../../../lib/models";
import pb from "../../../lib/pocketbase";
import {
    Box,
    Button,
    Container,
    Dialog,
    Divider,
    IconButton,
    LinearProgress,
    Paper,
    Tooltip
} from "@mui/material";
import TextBox from "../../TextBox";
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import CropDinRoundedIcon from '@mui/icons-material/CropDinRounded';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import ArchitectureRoundedIcon from '@mui/icons-material/ArchitectureRounded';
import {randomId, useDisclosure} from "@mantine/hooks";
import Image from "next/image";
import Link from "next/link";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {motion} from "framer-motion";
import useSection from "../../../hooks/useSection";
import useOnInViewAnimate from "../../../hooks/useOnInViewAnimate";

// region SkillCard
const icons = {
    [SkillCategory.LANGUAGES]: CodeRoundedIcon,
    [SkillCategory.FRAMEWORKS]: CropDinRoundedIcon,
    [SkillCategory.LIBRARIES]: LibraryBooksRoundedIcon,
    [SkillCategory.DATABASES]: StorageRoundedIcon,
    [SkillCategory.TOOLS]: ArchitectureRoundedIcon,
}

function SkillCard({skill, delay}: { skill: Skill, delay: number }) {

    const Icon = icons[skill.category]

    const [open, openManager] = useDisclosure(false)

    // const {ref, entry} = useIntersection({});
    //
    //
    // const [opacity, setOpacity] = useState(0);
    // const [X, setX] = useState(-50);
    //
    // const {start: assignStyles, clear} = useTimeout(() => {
    //     setOpacity(1)
    //     setX(0)
    //
    // }, delay + 100);
    //
    // useEffect(() => {
    //
    //     if (!entry?.isIntersecting) {
    //         setOpacity(0)
    //         setX(-50)
    //     } else {
    //         assignStyles()
    //     }
    //
    //
    // }, [entry, delay, assignStyles]);

    const {animation: animateCard} = useOnInViewAnimate(
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
            delay: (delay / 1000) + .1,
        }
    )

    return (
        <>
            <motion.div
                className={`skill-card-container-${randomId()}`}
                {...animateCard}
            >
                <Paper variant={"outlined"} role={"button"}>
                    <Button sx={{
                        display: "flex",
                        flexDirection: "row",
                        px: 1,
                        py: .5,
                        alignItems: "center",
                        justifyContent: "start",
                        backgroundColor: "transparent",
                        transition: "background-color .2s ease-in-out",
                        ":hover": {
                            filter: "brightness(1.9)",
                            backgroundColor: "inherit",
                        },
                        color: "text.primary",
                    }} fullWidth onClick={openManager.open}>
                        <Icon fontSize={"large"}/>
                        <Divider flexItem orientation={"vertical"} sx={{mx: 1}}/>
                        <TextBox variant={"h6"} textAlign={"center"}>
                            {skill.name}
                        </TextBox>
                    </Button>
                </Paper>
            </motion.div>

            <Dialog open={open} onClose={openManager.close}>
                <Paper variant={"outlined"}>
                    <Box>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            px: 1,
                        }}>
                            <Box
                                sx={{
                                    p: 2,
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "start",
                                    gap: 2,
                                }}>


                                <Link href={skill.link_to_source} style={{
                                    textDecoration: "none",
                                }} target={"_blank"}>
                                    <TextBox variant={"h4"} sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        color: "text.primary",
                                        transition: "color .2s ease-in-out",
                                        "&:hover": {
                                            color: "primary.dark",
                                        }

                                    }}>
                                        {skill.name}
                                    </TextBox>
                                </Link>

                                <Image src={pb.getFileUrl(skill, skill.image, {thumb: "50x50"})}
                                       width={40}
                                       height={40} alt={"Skill image"}/>
                            </Box>
                            <IconButton onClick={openManager.close}>
                                <CloseRoundedIcon fontSize={"large"}/>
                            </IconButton>

                        </Box>
                        <Box sx={{px: 2}}>
                            <div dangerouslySetInnerHTML={{__html: skill.description}}/>
                        </Box>
                        <Box sx={{

                            p: 2
                        }}>
                            <TextBox variant={"h6"} sx={{
                                my: 2
                            }}>
                                How good I know this skill:
                            </TextBox>
                            <Tooltip title={
                                skill.knowledge_level === 1 ? "I know the basics" :
                                    skill.knowledge_level === 2 ? "I know how to use it" :
                                        "I'm an expert"
                            }>
                                <LinearProgress variant="determinate" value={
                                    skill.knowledge_level === 1 ? 35 :
                                        skill.knowledge_level === 2 ? 75 :
                                            100
                                } sx={{
                                    height: 15,
                                    borderRadius: 1,
                                }} color={"info"}/>
                            </Tooltip>
                        </Box>
                    </Box>
                </Paper>
            </Dialog>

        </>
    )
}

//endregion

export default function Skills({scrollToNext}: { scrollToNext: () => void }) {
    const [skills, setSkills] = useState<Skill[]>([])


    function isCat(s: Skill[], c: SkillCategory) {
        // return only skills that are in the category
        return s.filter((skill) => skill.category === c)
    }


    function getAllCats() {
        const pre = skills.map((skill) => skill.category)
        return Array.from(new Set(pre))
    }

    useEffect(() => {

        async function loadSkills() {
            const data = await pb.collection("skills").getFullList<Skill>(
                2500,
                {}
            )

            setSkills(data)
        }

        loadSkills().catch(console.error);

    }, [])

    return (
        <Section name={"skills"} render={"skills" === useSection().name}>

            <Container>
                <Box sx={{
                    display: "flex",
                    minHeight: "100svh",
                    flexDirection: "column",
                    justifyContent: "center",
                }}>
                    <Box>
                        <TextBox variant={"h3"} textAlign={"center"}>
                            My technical skills
                        </TextBox>
                        <TextBox variant={"subtitle1"} textAlign={"center"} sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                        }}>
                            Want to know what I built with these skills? Check out my <Box
                            sx={{cursor: "pointer"}} component={"b"}
                            onClick={() => scrollToNext()}>&nbsp;projects</Box>.
                        </TextBox>
                    </Box>

                    <Box sx={{
                        display: "grid",
                        gridTemplateRows: "repeat(1, 1fr)",
                        gridTemplateColumns: "repeat(5, 1fr)",
                        gridGap: 24,


                    }}>
                        {
                            getAllCats().map((cat, cat_index) => (
                                <Box key={`skill-cat-${cat_index}`}>
                                    <TextBox variant={"h4"} sx={{
                                        my: 2
                                    }}>
                                        {cat}
                                    </TextBox>

                                    <Box sx={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                                        gap: 1,
                                    }}>
                                        {
                                            isCat(skills, cat).map((skill, index) => (
                                                <SkillCard key={`skill-${index}`} skill={skill}
                                                           delay={(cat_index + 1) * (index + 1.5) * 100}/>
                                            ))
                                        }
                                    </Box>
                                </Box>
                            ))
                        }

                    </Box>
                </Box>
            </Container>
        </Section>
    )
}