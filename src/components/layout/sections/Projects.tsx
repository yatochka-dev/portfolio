import Section from "../Section";
import {Box, Card, CardActionArea, CardContent, CardMedia, Container, Grid} from "@mui/material";
import TextBox from "../../TextBox";
import type {Project} from "../../../lib/models";
import {useEffect, useState} from "react";
import pb from "../../../lib/pocketbase";
import useAsset from "../../../hooks/useAsset";
import {useRouter} from "next/router";
import useSection from "../../../hooks/useSection";
import {useIntersection} from "@mantine/hooks";
import {motion} from "framer-motion";

function ProjectCard({project}: { project: Project }) {

    const media = useAsset(project, "picture", {thumb: "348x140"})

    const router = useRouter();

    const handleClick = () => {
        router.push(`/projects/${project.id}`).catch(console.error)
    }
    const {ref, } = useIntersection({});
    const [opacity, ] = useState(1);

    // const delay = Math.floor(Math.random() * 500);
    //
    // const {start: assignStyles} = useTimeout(() => {
    //     setOpacity(1)
    //
    // }, delay + 100);
    //
    // useEffect(() => {
    //     if (!entry?.isIntersecting) {
    //         setOpacity(0)
    //
    //     } else {
    //         assignStyles()
    //     }
    //
    //
    // }, [entry, delay, assignStyles]);

    return (
        <Grid item ref={ref}>
            <motion.div animate={{
                opacity: opacity,
            }}>
                <Card sx={{maxWidth: 350}} variant={"outlined"}>
                    <CardActionArea onClick={
                        handleClick
                    }>
                        <CardMedia
                            component="img"
                            height="140"
                            image={media}
                            alt={project.picture}
                        />
                        <CardContent>
                            <TextBox gutterBottom variant="h5">
                                {project.name}
                            </TextBox>
                            <TextBox variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </TextBox>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </motion.div>
        </Grid>
    )
}

export default function Projects({scrollToNext}: { scrollToNext: () => void }) {
    const [projects, setProjects] = useState<Project[]>();

    useEffect(() => {
        async function loadProjects() {
            const data = await pb.collection("projects").getFullList<Project>(
                2500,
                {}
            )

            setProjects(data)
        }


        loadProjects().catch(console.error)
    }, []);


    return (
        <Section name={"project"} render={"project" === useSection().name}>

            <Container maxWidth={"xl"}>
                <Box sx={{

                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",

                }}>
                    <Box>
                        <TextBox variant={"h2"} textAlign={"center"} mt={16}>
                            My Awesome Projects
                        </TextBox>
                        <TextBox variant={"h6"} textAlign={"center"}>
                            Want me to build something for you? <Box component={"b"}
                                                                     onClick={scrollToNext} sx={{
                            cursor: "pointer",
                        }}>Contact Me!</Box>
                        </TextBox>
                    </Box>

                    <Box sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                    }}>
                        <Grid container rowSpacing={4} columnSpacing={2} sx={{

                            overflow: "auto",
                            maxHeight: "100svh",
                            mb: 16,
                            mt: 4,
                            pb: "350px"
                        }}>
                            {
                                projects?.map((project, index) => (
                                    <ProjectCard key={`project-${index}`} project={project}/>
                                ))
                            }
                        </Grid>
                    </Box>

                </Box>
            </Container>
        </Section>
    );
}