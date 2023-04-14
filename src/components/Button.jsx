import classNames from "classnames";

function Button({
  children,
  primary,
  secondary,
  success,
  tertiary,
  rounded,
  danger,
  className,
  ...rest
}) {
  const classes = classNames(
    className,
    "flex items-center justify-center px-6 py-3 border-2 cursor-pointer rounded-xl shadow-md shadow-gray-500",
    {
      "border-yellow-400 bg-yellow-400 text-black": primary,
      "border-blue-700 bg-blue-700 text-white": secondary,
      "border-stone-700 bg-transparent text-stone-700": tertiary,
      "border-green-700 bg-green-700 text-white": success,
      "border-red-600 bg-red-600 text-white": danger,
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
  checkVariation: ({ primary, secondary, success, danger, tertiary }) => {
    const count =
      Number(!!primary) +
      Number(!!secondary) +
      Number(!!tertiary) +
      Number(!!danger) +
      Number(!!success);
    if (count > 1)
      return new Error("Only one of primary, secondary or success can be true");
  },
};

export default Button;
