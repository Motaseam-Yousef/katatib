import axios from "axios";

export const getAnswer = async (question) => {
  const body = {
    query: question,
  };
  let data = await axios.post("/ask", body);
  return data?.data?.response;
};
