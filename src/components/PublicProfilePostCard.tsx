import Image from "next/image";
import { Suspense, useState } from "react";
import ReactionButton from "./ReactionButton";
import { useUser } from "@auth0/nextjs-auth0/client";

const PublicProfilePostCard = (props: {
  reactions_100: any;
  reactions_nailpaint: any;
  reactions_skull: any;
  reactions_snake: any;
  src: string;
  date: string;
  caption: string;
  post_id: string;
}) => {
  console.log(props);

  const { user, error, isLoading } = useUser();
  const user_id = user?.sub;
  const post_id = props.post_id;
  const alt = props.caption != "" ? props.caption : 'User image';

  const [r_100_len, set_r_100_len] = useState(
    props.reactions_100 == null ? 0 : props.reactions_100.length
  );
  const [r_nailpaint_len, set_r_nailpaint_len] = useState(
    props.reactions_nailpaint == null ? 0 : props.reactions_nailpaint.length
  );
  const [r_skull_len, set_r_skull_len] = useState(
    props.reactions_skull == null ? 0 : props.reactions_skull.length
  );
  const [r_snake_len, set_r_snake_len] = useState(
    props.reactions_snake == null ? 0 : props.reactions_snake.length
  );

  const [r_100_checked, set_r_100_checked] = useState(
    props.reactions_100 == null ? false : props.reactions_100.includes(user_id)
  );
  const [r_nailpaint_checked, set_r_nailpaint_checked] = useState(
    props.reactions_nailpaint == null
      ? false
      : props.reactions_nailpaint.includes(user_id)
  );
  const [r_skull_checked, set_r_skull_checked] = useState(
    props.reactions_skull == null
      ? false
      : props.reactions_skull.includes(user_id)
  );
  const [r_snake_checked, set_r_snake_checked] = useState(
    props.reactions_snake == null
      ? false
      : props.reactions_snake.includes(user_id)
  );

  //   const r_100_len = props.reactions_100 == null ? 0 : props.reactions_100.length;
  //   const r_nailpaint_len = props.reactions_nailpaint == null ? 0 : props.reactions_100.length;
  //   const r_skull_len = props.reactions_skull == null ? 0 : props.reactions_skull.length;
  //   const r_snake_len = props.reactions_snake == null ? 0 : props.reactions_snake.length;

  const r_100_clickHandler = () => {
    const updateReactions = async () => {
      const reaction = "reactions_100";
      if (r_100_checked == false) {
        const action = "add";
        const response = await fetch("/api/update_reactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ post_id, user_id, reaction, action }),
        });
        set_r_100_len(r_100_len + 1);
        set_r_100_checked(true);
      } else {
        const action = "remove";
        const response = await fetch("/api/update_reactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ post_id, user_id, reaction, action }),
        });
        set_r_100_len(r_100_len - 1);
        set_r_100_checked(false);
      }
    };
    updateReactions();
  };

  const r_nailpaint_clickHandler = () => {
    const updateReactions = async () => {
      const reaction = "reactions_nailpaint";
      if (r_nailpaint_checked == false) {
        const action = "add";
        const response = await fetch("/api/update_reactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ post_id, user_id, reaction, action }),
        });
        set_r_nailpaint_len(r_nailpaint_len + 1);
        set_r_nailpaint_checked(true);
      } else {
        const action = "remove";
        const response = await fetch("/api/update_reactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ post_id, user_id, reaction, action }),
        });
        set_r_nailpaint_len(r_nailpaint_len - 1);
        set_r_nailpaint_checked(false);
      }
    };
    updateReactions();
  };

  const r_skull_clickHandler = () => {
    const updateReactions = async () => {
      const reaction = "reactions_skull";
      if (r_skull_checked == false) {
        console.log("SKULL CHECKED - ADD");
        const action = "add";
        const response = await fetch("/api/update_reactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ post_id, user_id, reaction, action }),
        });
        set_r_skull_len(r_skull_len + 1);
        set_r_skull_checked(true);
      } else {
        console.log("SKULL CHECKED - REMOVE");
        const action = "remove";
        const response = await fetch("/api/update_reactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ post_id, user_id, reaction, action }),
        });
        set_r_skull_len(r_skull_len - 1);
        set_r_skull_checked(false);
      }
    };
    updateReactions();
  };

  const r_snake_clickHandler = () => {
    const updateReactions = async () => {
      const reaction = "reactions_snake";
      if (r_snake_checked == false) {
        const action = "add";
        const response = await fetch("/api/update_reactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ post_id, user_id, reaction, action }),
        });
        set_r_snake_len(r_snake_len + 1);
        set_r_snake_checked(true);
      } else {
        const action = "remove";
        const response = await fetch("/api/update_reactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ post_id, user_id, reaction, action }),
        });
        set_r_snake_len(r_snake_len - 1);
        set_r_snake_checked(false);
      }
    };
    updateReactions();
  };

  return (
    <div className="rounded-2xl bg-black bg-opacity-50 w-10/12 h-1/3 p-2 lg:p-4 flex flex-col lg:flex-row justify-center items-center">
      <div className="w-full lg:w-1/2">
        {/* <Suspense> */}
        <Image
          unoptimized
          src={props.src}
          alt={alt}
          width="1000"
          height="1000"
          className="rounded-md"
        ></Image>
        {/* </Suspense> */}
      </div>
      <div className="flex flex-col justify-between items-center lg:items-end text-right w-full lg:w-1/2 lg:ml-10 text-2xl lg:text-4xl">
        <div className="text-xl lg:text-2xl text-violet-500 mb-10">
          <p className="">posted on {props.date}</p>
        </div>
        <div className="text-2xl lg:text-4xl text-neutral-100 mb-10 overscroll-conain">
          <p className="">{props.caption}</p>
        </div>
        <div className="grid grid-cols-2 gap-y-10 gap-x-10 self-center mb-10 lg:mb-0 lg:self-end lg:flex lg:flex-col lg:space-y-10 justify-around text-lime-500 text-4xl lg:text-8xl">
          <ReactionButton
            isChecked={r_100_checked}
            checkedChanger={set_r_100_checked}
            onClick={r_100_clickHandler}
            shadow="hover:shadow-red-300"
          >
            <Image
              src="/hundred_points_3d.png"
              width={40}
              height={40}
              alt="Hundred Emoji"
            />
          </ReactionButton>
          <ReactionButton
            isChecked={r_nailpaint_checked}
            checkedChanger={set_r_nailpaint_checked}
            onClick={r_nailpaint_clickHandler}
            shadow="hover:shadow-fuchsia-300"
          >
            <Image
              src="/nail_polish_3d_default.png"
              width={40}
              height={40}
              alt="Nail Paint Emoji"
            />
          </ReactionButton>
          <ReactionButton
            isChecked={r_skull_checked}
            checkedChanger={set_r_skull_checked}
            onClick={r_skull_clickHandler}
            shadow="hover:shadow-slate-300"
          >
            <Image
              src="/skull_3d.png"
              width={40}
              height={40}
              alt="Skull Emoji"
            />
          </ReactionButton>
          <ReactionButton
            isChecked={r_snake_checked}
            checkedChanger={set_r_snake_checked}
            onClick={r_snake_clickHandler}
            shadow="hover:shadow-green-300"
          >
            <Image
              src="/snake_3d.png"
              width={40}
              height={40}
              alt="Snake Emoji"
            />
          </ReactionButton>
        </div>
      </div>
    </div>
  );
};

export default PublicProfilePostCard;
