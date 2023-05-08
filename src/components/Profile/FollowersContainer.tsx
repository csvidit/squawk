const FollowersContainer = (props: {children: React.ReactNode}) => {
    return(<div className="flex flex-col lg:space-y-5 space-y-3 justify-center w-10/12">{props.children}</div>)
}

export default FollowersContainer;