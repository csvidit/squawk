const PreferencesItemValue = (props: {children: any}) => {
  return (
    <div className="flex flex-grow mx-4 bg-transparent">
      <p className="text-xl lg:text-2xl text-white">
        {props.children}
      </p>
    </div>
  );
};

export default PreferencesItemValue;
