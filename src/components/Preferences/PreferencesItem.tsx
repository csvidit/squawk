import PreferencesItemChangeHandler from "./PreferencesItemChangeHandler";
import PreferencesItemLabel from "./PreferencesItemLabel";
import PreferencesItemValue from "./PreferencesItemValue";

const PreferencesItem = (props: {
  children: any
}) => {
  return (
    <div className="flex flex-row items-center bg-black bg-opacity-30 backdrop-blur-md w-full h-14 border-lime-500 rounded-full">
     {props.children}
    </div>
  );
};

export default PreferencesItem;
