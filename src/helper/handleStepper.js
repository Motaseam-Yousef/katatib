import { chatBotSteps } from "../statics/chatBotSteps";

export const handleStepper = (number) => {
  switch (number) {
    case 1:
      return chatBotSteps[number - 1];
    case 2:
      return chatBotSteps[number - 1];
    case 3:
      return chatBotSteps[number - 1];
    case 4:
      return chatBotSteps[number - 1];
    default:
      return [];
  }
};
