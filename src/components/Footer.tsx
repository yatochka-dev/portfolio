import {Box, Divider, IconButton, Paper, Stack, Tooltip} from "@mui/material";
import type {SvgIconComponent} from "@mui/icons-material";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import TextBox from "./TextBox";
import Link from "next/link";

const socials: { label: string, link: string, Icon: SvgIconComponent, color: string, newTab?: boolean }[] = [
    {
        label: "LinkedIn",
        link: "https://www.linkedin.com/in/philip-sagan-896586267/",
        Icon: LinkedInIcon,
        color: "#0a66c2",
        newTab: true
    },
    {
        label: "Email",
        link: "mailto:philip.chef13@gmail.com",
        Icon: AlternateEmailIcon,
        color: "#d44638",
        newTab: false
    },
    {
        label: "GitHub",
        link: "https://github.com/yatochka-dev/",
        Icon: GitHubIcon,
        color: "#f0f0f0",
        newTab: true
    },
    {
        label: "Instagram",
        link: "https://www.instagram.com/sagan.philip/",
        Icon: InstagramIcon,
        color: "#ff2485",
        newTab: true
    },
]

export function Footer() {
    return (
        <Paper variant={"elevation"} elevation={5} sx={{
            borderRadius: 0,
            borderTopLeftRadius: 0,
            transition: "border-radius 0.3s",
            "&:hover": {
                borderTopLeftRadius: 80,
            }
        }}>
            <Box component={"footer"} sx={{
                display: "grid",
                gap: 3,
                p: 3,
                minHeight: "100px",
                gridTemplateRows: {
                    md: "1fr",
                    sm: "1fr 1fr"
                },
                gridTemplateColumns: {
                    md: "1fr 1fr",
                    sm: "1fr"
                },

            }}>

                <Box sx={{
                    display: "flex",
                    ml: 4,
                    flexDirection: "column",
                    alignItems: {
                        xs: "center",
                    }
                }}>
                    <TextBox variant={"h6"}>
                        Philip Sagan was with you.
                    </TextBox>
                    <TextBox>
                        I hope you enjoyed my website.
                    </TextBox>
                </Box>
                <Box sx={{

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <Stack direction={"row"} divider={
                        <Divider flexItem orientation={"vertical"}/>
                    } columnGap={2}>
                        {
                            socials.map((social, i) => {
                                const {label, link, Icon, color, newTab} = social;
                                const anchorProps = newTab ? {
                                    href: link,
                                    target: "_blank",
                                    rel: "noopener noreferrer"
                                } : {
                                    href: link
                                }
                                return (
                                    <Link {...anchorProps}
                                          key={`footer-social-icon-${i}`}>
                                        <Tooltip title={label}>
                                            <IconButton>
                                                <Icon fontSize={"large"} sx={{
                                                    color: color
                                                }}/>
                                            </IconButton>
                                        </Tooltip>
                                    </Link>
                                )
                            })
                        }

                    </Stack>

                </Box>

            </Box>
        </Paper>
    );
}