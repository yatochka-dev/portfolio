import NonConsistentParent from "../layout/NonConsistentParent";
import Anchor from "../Link";
import type { SxProps} from "@mui/material";
import {IconButton} from "@mui/material";
import React from "react";
import type {SvgIconComponent} from "@mui/icons-material";

interface SideBarIconProps {
    // UI
    Icon?: SvgIconComponent,
    children?: React.ReactNode,
    color?: "inherit" | "primary" | "secondary" | "action" | "disabled" | "error" | undefined,
    sx?: SxProps,

    // state
    active?: boolean,
    disabled?: boolean,

    // Actions
    onClick?: ((event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | ((event: never) => void) | (() => void) | never,
    href?: string,
    newTab?: boolean,

}

export function SideBarIcon({
                                Icon,
                                children,
                                color,
                                sx,
                                disabled,
                                onClick,
                                href,
                                newTab,

                            }: SideBarIconProps) {

    if (!Icon && !children) {
        throw new Error("Icon or children must be provided")
    }

    const linkProps = {
        href: href ?? "#",
        target: newTab ? "_blank" : "_self",
        referrer: "no-referrer",
    }

    return (
        <NonConsistentParent Parent={Anchor} parentProps={linkProps} renderParent={!!href}>
            <IconButton sx={{
                width: "5vw",
                height: "5vw",
                borderRadius: 0,
            }}
                        centerRipple={false}
                        disabled={disabled}

                        //eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        onClick={onClick ?? (() => 0)}
            >

                {Icon && <Icon color={color} sx={{...sx, fontSize: "48px"}}/>}
                {children && children}

            </IconButton>
        </NonConsistentParent>
    )

}