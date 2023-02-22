import {Box, CircularProgress, IconButton, Tooltip} from "@mui/material";
import {type NextPage} from "next";
import DotNav from "../components/layout/DotNav";
import type {ReactNode} from "react";
import React from "react";
import {useFullscreen, useHotkeys, useToggle, useWindowEvent} from "@mantine/hooks";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import dynamic from "next/dynamic";

const Home = dynamic(() => import("../components/layout/sections/Home"), {
    ssr: false, loading: () => <div style={{display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100svh"}}><CircularProgress style={{color: "#fff"}}/></div>
})
const About = dynamic(() => import("../components/layout/sections/About"), {ssr: false})
const Skills = dynamic(() => import("../components/layout/sections/Skills"), {ssr: false})
const Projects = dynamic(() => import("../components/layout/sections/Projects"), {ssr: false})
const Contact = dynamic(() => import("../components/layout/sections/Contact"), {ssr: false})

export const SectionContext = React.createContext<{ name: string, scrollToNext: () => void }>({
        name: "home",
        scrollToNext: () => undefined,
    }
);


const IndexHomePage: NextPage = () => {


    const sections = ["home", "about", "skills", "project", "contact"]

    const {toggle, fullscreen} = useFullscreen();


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

    useWindowEvent(
        "resize",
        () => {
            handleClick(lastScrolledTo)
        }
    )


    const sectionElements: { [key: string]: ReactNode } = {
        "home": <Home scrollToNext={() => handleClick("about")}/>,
        "about": <About scrollToNext={() => handleClick("skills")}/>,
        "skills": <Skills scrollToNext={() => handleClick("project")}/>,
        "project": <Projects scrollToNext={() => handleClick("contact")}/>,
        "contact": <Contact/>,
    }


    return (
        <SectionContext.Provider value={{
            name: lastScrolledTo,
            scrollToNext: () => {
                const index = sections.indexOf(lastScrolledTo);
                if (index < sections.length - 1) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    handleClick(sections[index + 1]);
                }
            }
        }}>
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
                                <Box key={`section-${index}`} component={"span"}>
                                    {sectionElements[section]}
                                </Box>
                            ))
                        }
                    </Box>

                </Box>

            </Box>
        </SectionContext.Provider>
    )
}

export default IndexHomePage;
