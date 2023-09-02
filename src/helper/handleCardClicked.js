import { handleActivate } from "./handleActivate";

export const handleCardClickd = (selectedCard, setStep) => {
  if (handleActivate(selectedCard)) {
    setStep((prev) => prev + 1);
  }
};
