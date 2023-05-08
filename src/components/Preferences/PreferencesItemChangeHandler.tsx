const PreferencesItemChangeHandler = (props: {changeHandler: any}) => {
  return (
    <button onClick={props.changeHandler} className="flex flex-row items-center px-4 bg-transparent h-full text-white border-l border-lime-500 rounded-r-full hover:bg-lime-500 hover:text-black transition-colors">
      <p className="text-xl lg:text-2xl">change</p>
    </button>
  );
};

export default PreferencesItemChangeHandler;