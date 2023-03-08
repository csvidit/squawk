import Image from "next/image";

const UserProfilePostCard = (props: {src: string}) => {
  return (
    <div className="rounded-2xl bg-black bg-opacity-50 w-10/12 p-5 lg:p-7 flex flex-row items-center">
      <div className="">
        <Image
          src={props.src}
          alt="Vidit Khandelwal"
          width="500"
          height="500"
          className="rounded-2xl"
        ></Image>
      </div>
      <div className="flex flex-col justify-between ml-10 text-2xl lg:text-4xl">
        <div className="text-xl lg:text-2xl text-red-400 mb-10">
            <p className="">posted on march 01, 2023</p>
        </div>
        <div className="flex flex-col space-y-10 text-lime-500">
          <div className="flex flex-row space-x-2 items-center flex-wrap">
            <p className="flex">kavz</p>
            <p className="flex text-white">and</p>
            <p>5</p>
            <p className="flex text-white">others gave you 💯</p>
          </div>
          <div className="flex flex-row space-x-2 items-center flex-wrap">
            <p className="flex">shwnapollo</p>
            <p className="flex text-white">and</p>
            <p>47</p>
            <p className="flex text-white">others gave you 💅🏽</p>
          </div>
          <div className="flex flex-row space-x-2 items-center flex-wrap">
            <p className="flex">tayloralwyn</p>
            <p className="flex text-white">and</p>
            <p>276</p>
            <p className="flex text-white">others gave you 🐍</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePostCard;
