// src/helpers/cssHelper.js

export const prefixClassName = (block: string) => (element: string) => {
  return `${block}__${element}`;
};
