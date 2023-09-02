export const onSubmit = (text, setMessages, setText) => {
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
          message: "TEST TEST TEST",
        },
      ];
    });
    setText("");
  }
};
