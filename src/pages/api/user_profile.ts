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
  const { user_id } = req.body;

  const { data, error } = await supabase
    .from("Users")
    .select()
    .eq("user_id", user_id);

  if (error) {
    res.status(500);
  }
  console.log(data);
  res.status(200).json(data);
}
