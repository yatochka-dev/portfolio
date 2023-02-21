import Image from "next/image";

export default function PlaceholderImage({
    h = "90",
    w = "150",
    f = "webp",
                                         }) {
    const src = `https://via.placeholder.com/${w}x${h}.${f}?text=Placeholder+image`
    return <Image src={src} alt={"Placeholder image "} width={parseInt(w)} height={parseInt(h)}/>
}