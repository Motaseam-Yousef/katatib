export const onSubmit = (text, setMessages, setText) => {
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
};
