import {motion} from "framer-motion";
import type {ReactNode} from "react";

const Layout = ({children}: { children: ReactNode }) => (
    <motion.main
        initial={{x: 300, opacity: 0}}
        animate={{x: 0, opacity: 1}}
        exit={{x: 300, opacity: 0}}
        transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
        }}

        style={{
            flex: "1 1 auto",

        }}
    >
        {children}
    </motion.main>
);


export default Layout;