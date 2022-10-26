export const SpanTitle = (props) => {
  switch (props.type) {
    case "default":
      return (
        <h1 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-2xl lg:text-2xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-t from-gray-500 to-gray-800">
            {props.title}
          </span>
        </h1>
      );
      break;

    default:
      break;
  }
};
