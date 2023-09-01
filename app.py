from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os
import pinecone

# Your custom imports
from langchain.vectorstores import Pinecone
from langchain.embeddings import OpenAIEmbeddings
from langchain.chains.question_answering import load_qa_chain
from langchain.chat_models import ChatOpenAI
from langchain.prompts import (
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
)

# Initialize Flask
app = Flask(__name__)

# Load environment variables
load_dotenv()
OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')
PINECONE_API_KEY = os.environ.get('PINECONE_API_KEY')
PINECONE_API_ENV = os.environ.get('PINECONE_ENV')

# Initialize other modules
pinecone.init(api_key=PINECONE_API_KEY, environment=PINECONE_API_ENV)
embed = OpenAIEmbeddings()
reload_docs = Pinecone.from_existing_index("katatib", embedding=embed)
llm = ChatOpenAI(temperature=0, openai_api_key=OPENAI_API_KEY, model_name="gpt-3.5-turbo")
chain = load_qa_chain(llm, chain_type="stuff")

@app.route('/ask', methods=['POST'])
def ask_question():
    try:
        query = request.json.get('query')
        
        # Execute your existing logic here
        docs = reload_docs.similarity_search(query)
        res = chain.run(input_documents=docs, question=query)

        # Prepare the system and human templates
        system_template = '''You are a geography teacher for ninth grade, and your focus is solely on the subject matter provided. 
You answer questions related to this topics
الغلاف الجوي
العوامل المؤثرة في درجة حرارة الغلاف الجوي
الغلاف الحيوي و مكوناته

sure the answer in Arabic langauge ONLY

amy other question please respond with "أنا هنا لمساعدتك بمادة الجغرافيا الصف التاسع."'''
        
        system_message_prompt = SystemMessagePromptTemplate.from_template(system_template)
        human_message_prompt = HumanMessagePromptTemplate.from_template(res)
        
        chat_prompt = ChatPromptTemplate.from_messages([system_message_prompt, human_message_prompt])
        response_content = chat_prompt.format_prompt().to_messages()[1].content
        
        return jsonify({"response": response_content})
        
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
