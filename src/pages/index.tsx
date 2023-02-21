import {Box, IconButton, Tooltip} from "@mui/material";
import {type NextPage} from "next";
import DotNav from "../components/layout/DotNav";
import {ReactNode, useEffect} from "react";
import Home from "../components/layout/sections/Home";
import Section from "../components/layout/Section";
import {useFullscreen, useHotkeys, useScrollLock, useToggle} from "@mantine/hooks";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import About from "../components/layout/sections/About";
import Skills from "../components/layout/sections/Skills";

const IndexHomePage: NextPage = () => {
    const sections = ["home", "about", "skills", "project", "contact", "blog"]

    const {toggle, fullscreen} = useFullscreen();

    const [scrollLocked, setScrollLocked] = useScrollLock(true, {disableBodyPadding: true});

    const [lastScrolledTo, setLastScrolledTo] = useToggle(sections);

    const handleClick = (section: string) => {
        const element = document.getElementById(section);
        if (element) {
            element.scrollIntoView({behavior: "smooth", block: "start"});
            setLastScrolledTo(section);
        } else {
            console.error("Element not found");
        }

    }

    useEffect(() => {
        // scroll to top on page load
        window.scrollTo(0, 0);
    }, [])

    useHotkeys(
        [
            [
                "ArrowDown", () => {
                const index = sections.indexOf(lastScrolledTo);
                if (index < sections.length - 1) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    handleClick(sections[index + 1]);
                }
            }
            ],
            [

                "ArrowUp", () => {
                const index = sections.indexOf(lastScrolledTo);
                if (index > 0) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    handleClick(sections[index - 1]);
                }
            }
            ]
        ]
    )

    const sectionElements: { [key: string]: ReactNode } = {
        "home": <Home scrollToNext={() => handleClick("about")}/>,
        "about": <About scrollToNext={() => handleClick("skills")}/>,
        "skills": <Skills scrollToNext={() => handleClick("projects")}/>,
        "project": <Section name={"project"}>project</Section>,
        "contact": <Section name={"contact"}>contact</Section>,
        "blog": <Section name={"blog"}>blog</Section>,

    }
    return (
        <>
            <Box sx={{
                position: "relative",

            }}>
                <Tooltip title={`${fullscreen ? "Exit" : "Enter"} fullscreen mode`}>
                    <IconButton sx={{
                        position: "fixed",
                        top: "1rem",
                        right: "1rem",
                        zIndex: 1000,
                        color: "text.secondary",
                    }} onClick={() => {
                        toggle().catch(console.error)

                    }}>
                        {
                            fullscreen ? <FullscreenExitIcon fontSize={"large"}/> :
                                <FullscreenIcon fontSize={"large"}/>
                        }
                    </IconButton>
                </Tooltip>
                <Box>
                    <DotNav sections={sections} lastScrolledTo={lastScrolledTo}
                            handleClick={handleClick}/>
                    <Box aria-label={"sections"}>
                        {
                            sections.map((section, index) => (
                                <Box key={`section-${index}`}>
                                    {sectionElements[section]}
                                </Box>
                            ))
                        }
                    </Box>

                </Box>

            </Box>
        </>
    )
}

export default IndexHomePage;
