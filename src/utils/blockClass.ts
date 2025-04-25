export const blockClass =
  (block: string) =>
  (className: string = "") => {
    return `${block} ${className}`;
  };
