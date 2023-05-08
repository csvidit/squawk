const OtherProfileHeader = (props: {username: string, numPosts: number | string}) => {
  return (
    <div className="w-screen flex flex-row items-center justify-center bg-black bg-opacity-50 drop-shadow-md shadow-white">
      <div className="p-3 lg:p-5 w-10/12 mt-40 text-lime-500 flex flex-col lg:flex-row lg:justify-between space-y-3 lg:space-y-0 lg:items-center">
        <div className="flex flex-row space-x-2">
          <p className="text-4xl lg:text-6xl font-medium text-white">@</p>
          <h1 className="text-4xl lg:text-6xl font-medium ">{props.username}</h1>
        </div>
        <div className="flex flex-row space-x-5 items-center text-2xl lg:text-4xl">
          <div className="flex flex-row space-x-2 items-center">
            <p className="">{props.numPosts}</p>
            <p className="text-white">posts</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherProfileHeader;