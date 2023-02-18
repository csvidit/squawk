import React from "react";
import localFont from '@next/font/local'

const myFont = localFont({ src: '../fonts/Chromatica-Bold.woff' });

const chromatica = localFont({
    src: [
      {
        path: '../fonts/Chromatica-Regular.woff',
        weight: '400',
        style: 'normal',
      },
      {
        path: '../fonts/Chromatica-Bold.woff',
        weight: '700',
        style: 'bold',
      },
    ],
  });  

const MainContainer = (props: {children: any}) =>
{
    return (<main className={"w-full h-full flex flex-col bg-zinc-200 dark:bg-black "+myFont.className}>{props.children}</main>);
}

export default MainContainer;