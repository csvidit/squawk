import * as Tabs from "@radix-ui/react-tabs";

const SignupTabs = () => {
  return (
    <Tabs.Root className="bg-white rounded-2xl" defaultValue="tab1" orientation="vertical">
    <Tabs.List aria-label="tabs example">
      <Tabs.Trigger className="m-4 p-2 rounded-full hover:bg-violet-400 active:border-violet-500" value="tab1">Sign Up</Tabs.Trigger>
      <Tabs.Trigger className="m-4 p-2 rounded-full hover:bg-violet-400" value="tab2">Sign In</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="tab1">Tab one content</Tabs.Content>
    <Tabs.Content value="tab2">Tab two content</Tabs.Content>
    <Tabs.Content value="tab3">Tab three content</Tabs.Content>
  </Tabs.Root>

  );
};

export default SignupTabs;
