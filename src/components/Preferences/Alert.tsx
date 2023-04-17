const Alert = (props: { children: string }) => {
  return (
    <div className="toast toast-center toast-middle">
      <div className="alert alert-error">
        <div>
          <span>{props.children}</span>
        </div>
      </div>
    </div>
  );
};

export default Alert;
