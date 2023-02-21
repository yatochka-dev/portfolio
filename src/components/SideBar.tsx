import {Avatar, Box, Button, ButtonGroup, Menu} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import React from "react";
import useSession, {signOut} from "../lib/auth/useSession";
import pb from "../lib/pocketbase";
import PersonIcon from '@mui/icons-material/Person';
import {SideBarIcon} from "./helpers/SideBarIcon";
import TextBox from "./TextBox";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import BookIcon from '@mui/icons-material/Book';


export default function SideBar() {
    const {status, session} = useSession();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    function getUserAvatar(thumb = "40x40") {

        if (status !== "authenticated") {
            return undefined;
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return pb.getFileUrl(session.model, session.model.avatar, {thumb: thumb})
    }


    return (

        <Box sx={{
            maxWidth: "5vw",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,

        }}>
            <SideBarIcon Icon={HomeIcon} color={"action"} href={"/"}/>

            <SideBarIcon disabled>
                <Box/>
            </SideBarIcon>


            <SideBarIcon Icon={BookIcon} color={"action"} href={"/blog"}/>


            {/* Auth */}
            <Box flexGrow={1}/>
            {
                status === "authenticated" ? (
                    <>
                        <SideBarIcon color={"action"} onClick={handleClick}>
                            <Avatar src={getUserAvatar()} alt={session?.model?.username}/>
                        </SideBarIcon>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                            sx={{
                                "& .MuiMenu-paper": {
                                    backgroundColor: "background.dark",
                                }
                            }}
                        >
                            <Box sx={{
                                p: 2
                            }}>
                                <Box display={"flex"}>
                                    <Avatar sx={{height: "48px", width: "48px"}}
                                            src={getUserAvatar("48x48")}
                                            alt={session?.model?.username}/>
                                    <Box display={"flex"} flexDirection={"column"} sx={{
                                        ml: 1
                                    }}>
                                        <TextBox>{session?.model?.username}</TextBox>
                                        <TextBox color={"#c6c6c6"}>{session?.model?.email}</TextBox>
                                    </Box>
                                </Box>
                                <Box>
                                    <ButtonGroup fullWidth variant={"outlined"} sx={{mt: 4}}>
                                        <Button color={"error"} onClick={() => {
                                            signOut();
                                            handleClose();
                                        }}>Logout</Button>
                                    </ButtonGroup>
                                </Box>
                            </Box>
                        </Menu>
                    </>
                ) : (
                    <SideBarIcon color={"action"} Icon={PersonIcon} href={"/auth"}/>
                )
            }

        </Box>

    )
}