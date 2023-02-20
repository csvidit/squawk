import React from "react";
import styles from "./MainContent.module.scss"

const MainContent = (props: {children: any}) =>
{
    return (<section id="main-content" data-scroll className={"w-screen h-screen flex flex-col bg-transparent justify-center items-center scroll-smooth"}>{props.children}</section>);
}

export default MainContent;