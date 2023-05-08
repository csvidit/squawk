var axios = require("axios").default;
var auth0 = require("auth0");
import supabase from "@/supabase/supabase";

export default async function handler(
  req: { method: string; body: { user_id: any } },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      end: { (): void; new (): any };
      json: { (arg0: { [x: string]: any }[] | null): void; new (): any };
    };
  }
) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  const onFulfilled = () => {};
  const onRejected = () => {};
  const { user_id } = req.body;

  const { data, error } = await supabase
    .from("Users")
    .select()
    .eq("user_id", user_id);

  // if (error || data.length == 0) {
  //   const { data, error } = await supabase
  //     .from("Users")
  //     .insert({
  //       user_id: user_id,
  //       username: user_id,
  //       accent_color: "lime",
  //       is_complete: false,
  //     })
  //     .select();
  //   // .then(onFulfilled, onRejected);
  //   if (error) {
  //     res.status(500);
  //     return;
  //   } else {
  //     const { data, error } = await supabase
  //       .from("Users")
  //       .update({ is_complete: true })
  //       .eq("user_id", user_id)
  //       .select()
        
  //     res.status(200).json(data);
  //     return;
  //   }
  if(error)
  {
    res.status(500);
  }
  else {
    console.log(data);
    res.status(200).json(data);
    return;
  }
}
