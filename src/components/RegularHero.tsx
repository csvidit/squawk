const RegularHero = (props: { children: React.ReactNode }) => {
  return (
    <div className="w-screen flex flex-row items-center justify-center bg-neutral-900 bg-opacity-50 drop-shadow-md shadow-neutral-100">
      <div className="p-2 lg:p-5 w-10/12 mt-40 text-lime-500 flex flex-col lg:flex-row lg:justify-between space-y-2 lg:space-y-0 lg:items-center">
        {props.children}
      </div>
    </div>
  );
};

export default RegularHero;


