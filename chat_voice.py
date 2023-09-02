from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os
import pinecone
import logging

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
import base64
from elevenlabs import generate

# Initialize Flask and Logging
app = Flask(__name__)
logging.basicConfig(level=logging.DEBUG)

# Load environment variables
load_dotenv()
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
PINECONE_API_KEY = os.getenv('PINECONE_API_KEY')
PINECONE_API_ENV = os.getenv('PINECONE_ENV')
audio_path = r"./audio"

# Check for missing environment variables
if not OPENAI_API_KEY or not PINECONE_API_KEY or not PINECONE_API_ENV:
    app.logger.error("Missing environment variables")
    exit(1)

# Initialize other modules
pinecone.init(api_key=PINECONE_API_KEY, environment=PINECONE_API_ENV)
embed = OpenAIEmbeddings()
reload_docs = Pinecone.from_existing_index("katatib", embedding=embed)
llm = ChatOpenAI(temperature=0, openai_api_key=OPENAI_API_KEY, model_name="gpt-3.5-turbo")
chain = load_qa_chain(llm, chain_type="stuff")

@app.route('/ask', methods=['POST'])
def ask_question():
    try:
        # Input validation
        query = request.json.get('query')
        if not query:
            return jsonify({"error": "Query is missing or empty"}), 400

        # Execute logic
        docs = reload_docs.similarity_search(query)
        res = chain.run(input_documents=docs, question=query)

        # Prepare system and human templates
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

        audio = generate(
            text=response_content,
            voice="Bella",
            model="eleven_multilingual_v1"
        )

        # Save audio
        audio_file_path = os.path.join(audio_path, "res.mp3")
        with open(audio_file_path, "wb") as f:
            f.write(audio)

        # Read and encode audio
        with open(audio_file_path, 'rb') as f:
            mp3_data = f.read()
            base64_audio = base64.b64encode(mp3_data).decode('utf-8')

        return jsonify({"response": response_content, "audio": base64_audio})

    except Exception as e:
        app.logger.error(f"An error occurred: {str(e)}")
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
