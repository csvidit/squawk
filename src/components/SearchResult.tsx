import { Profile } from "@/interfaces/Profile"
import Link from "next/link";

const SearchResult = (props: {profile: Profile}) => {
    return(<Link href={"/user/"+props.profile.username} className="flex flex-row items-center rounded-2xl w-full p-3 lg:p-5 h-16 bg-black border border-transparent bg-opacity-50 backdrop-blur-md hover:border-red-400 hover:bg-violet-900 hover:bg-opacity-50 transition-all">
        <p className="text-neutral-100 text-2xl">{props.profile.username}</p>
    </Link>)
}

export default SearchResult;