const PreferencesItemLabel = (props: {children: string}) => {
  return (
    <div className="flex flex-row items-center rounded-l-2xl h-full text-lime-500 w-60">
      <p className="px-4 text-xl lg:text-2xl">{props.children}</p>
    </div>
  );
};

export default PreferencesItemLabel;
