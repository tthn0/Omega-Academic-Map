export const blockClass = (block: string) => (className: string) => {
  return `${block}__${className}`;
};
