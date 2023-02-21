import React from "react";

interface NonConsistentParentProps<PropsT> {

    children: React.ReactNode,
    Parent: React.FC<PropsT & { children: React.ReactNode }>,
    parentProps?: PropsT,
    renderParent: boolean

}

export default function NonConsistentParent<PropsT>({
                                                        children,
                                                        Parent,
                                                        parentProps,
                                                        renderParent
                                                    }: NonConsistentParentProps<PropsT>) {

    return (


        <>
            {
                !renderParent ? (
                    <>
                        {children}
                    </>
                ) : (
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    <Parent {...parentProps}>
                        {children}
                    </Parent>
                )
            }

        </>

    )

}