import { acticateCards } from "../statics/activateCards";

export const handleActivate = (name) => {
  const checkTitle = acticateCards.find((item) => item === name);
  if (checkTitle) return true;
  return false;
};
