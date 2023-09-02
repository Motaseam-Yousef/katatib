import axios from "axios";

export const getAnswer = async (question) => {
  const body = {
    query: question,
  };
  let data = await axios.post("https://katatib-01.msarhan.com/ask", body);
  return data?.data?.response;
};
