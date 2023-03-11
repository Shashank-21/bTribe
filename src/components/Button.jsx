import classNames from "classnames";

function Button({
  children,
  primary,
  secondary,
  success,
  rounded,
  className,
  ...rest
}) {
  const classes = classNames(
    className,
    "flex items-center justify-center px-6 py-3 border-2 cursor-pointer rounded-xl shadow-md shadow-gray-500",
    {
      "border-yellow-400 bg-yellow-400 text-black": primary,
      "border-blue-700 bg-blue-700 text-white": secondary,
      "border-green-800 bg-green-800 text-white": success,
      "rounded-full": rounded,
    }
  );
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

Button.propTypes = {
  checkVariation: ({ primary, secondary, success, warning }) => {
    const count =
      Number(!!primary) +
      Number(!!secondary) +
      Number(!!success);
    if (count > 1)
      return new Error(
        "Only one of primary, secondary or success can be true"
      );
  },
};

export default Button;
