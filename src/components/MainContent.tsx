import React from "react";
import styles from "./MainContent.module.scss"

const MainContent = (props: {children: any}) =>
{
    return (<div id="main-content" className={"w-screen h-screen flex flex-col bg-transparent justify-center items-center scroll-smooth"}>{props.children}</div>);
}

export default MainContent;