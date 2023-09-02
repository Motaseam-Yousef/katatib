import { getAnswer } from "../api/chatbot";

export const onSubmit = async (text, setMessages, setText) => {
  if (text) {
    setMessages((prev) => {
      return [
        ...prev,
        {
          from: "me",
          message: text,
        },
        {
          from: "bot",
          message: "",
        },
      ];
    });
    setText("");
    const result = await getAnswer(text);
    setMessages((prev) => {
      const getAllWithoutEmpty = prev.slice(0, -1);
      return [
        ...getAllWithoutEmpty,
        {
          from: "bot",
          message: result,
        },
      ];
    });
  }
};
