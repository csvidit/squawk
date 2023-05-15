const FeaturesText = (props: { children: string | React.ReactNode }) => {
  return (
    <div className="font-light text-4xl text-neutral-100 mt-4">
      {props.children}
    </div>
  );
};

export default FeaturesText;
