export const handleCardClickd = (selectedCard, setStep, setData) => {
  setStep((prev) => prev + 1);
  setData((prev) => {
    return {
      ...prev,
      title: selectedCard,
    };
  });
};
