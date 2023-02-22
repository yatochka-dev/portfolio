import {useContext} from "react";
import {SectionContext} from "../pages";

export default function useSection() {
    return useContext(SectionContext)
}