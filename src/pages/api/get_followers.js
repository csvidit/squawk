import supabase from "@/supabase/supabase";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  console.log("Inside GET_FOLLOWERS API endpoint");

  const { user_id } = req.body;

//   const { data, error } = await supabase
//     .from('Users')
//     .select('username')
//     .in('user_id', (query) =>
//       query
//         .from('Users')
//         .select('followers')
//         .eq('user_id', user_id)
//         .single()
//         .then((res) => res.data.followers)
//         .catch((err) => {
//           console.error('Error fetching followers:', err);
//           return [];
//         })
//     );

    // const { data, error } = await supabase
    // .from('Users')
    // .select('user_id, username')
    // .in('user_id', (query) =>
    //   query
    //     .from('Users')
    //     .select('followers')
    //     .eq('user_id', user_id)
    //     .single()
    //     .then((res) => res.data.followers)
    //     .catch((err) => {
    //       console.error('Error fetching followers:', err);
    //       return [];
    //     })
    // );

    const {data, error} = await supabase 
    .from('Users')
    .select('followers')
    .eq('user_id', user_id);

  if (error) {
    res.status(500);
    console.log(error);
    return;
  } else {
    console.log(data);
    if(!data)
    {
        res.status(404);
        return;
    }
    res.status(200).json(data);
  }
}
