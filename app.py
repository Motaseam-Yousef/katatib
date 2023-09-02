from flask import Flask, request, jsonify
import logging
import os
from dotenv import load_dotenv
import pinecone

# Your custom imports
from langchain.vectorstores import Pinecone
from langchain.embeddings import OpenAIEmbeddings
from langchain.chains.question_answering import load_qa_chain
from langchain.chat_models import ChatOpenAI

# Initialize Flask
app = Flask(__name__)

from flask_cors import CORS

CORS(app, origins=["https://katatib-dpujr07y1-motaseam-yousef.vercel.app", "https://katatib-git-dev-motaseam-yousef.vercel.app"])

# Load environment variables
load_dotenv()
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
PINECONE_API_KEY = os.getenv('PINECONE_API_KEY')
PINECONE_API_ENV = os.getenv('PINECONE_ENV')

# Initialize other modules
pinecone.init(api_key=PINECONE_API_KEY, environment=PINECONE_API_ENV)
embed = OpenAIEmbeddings()
reload_docs = Pinecone.from_existing_index("katatib", embedding=embed)
llm = ChatOpenAI(temperature=0, openai_api_key=OPENAI_API_KEY, model_name="gpt-3.5-turbo")
chain = load_qa_chain(llm, chain_type="stuff")

@app.route('/ask', methods=['POST'])
def ask_question():
    try:
        if not request.json:
            raise ValueError("Invalid JSON payload")

        query = request.json.get('query')

        if query is None:
            raise ValueError("The 'query' field must not be empty.")

        # Execute your existing logic here
        docs = reload_docs.similarity_search(query)
        res = chain.run(input_documents=docs, question=query)

        logging.debug("Chain Run Response: %s", res)
        logging.debug("Response Content: %s", res)

        return jsonify({"response": res})

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)