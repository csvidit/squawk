import React from "react";
import styles from "./MainContent.module.scss"

const MainContent = (props: {children: any}) =>
{
    return (<div id="main-content" className={"w-screen h-screen flex flex-col bg-zinc-200 dark:bg-black justify-center items-center "+styles.main_content}>{props.children}</div>);
}

export default MainContent;