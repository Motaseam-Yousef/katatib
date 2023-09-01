from langchain.vectorstores import Pinecone
from langchain.embeddings import OpenAIEmbeddings
from langchain.chains.question_answering import load_qa_chain
from langchain.chat_models import ChatOpenAI
from langchain.prompts import (
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
)
import pinecone
from dotenv import load_dotenv
import os

load_dotenv()
OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')
PINECONE_API_KEY = os.environ.get('PINECONE_API_KEY')
PINECONE_API_ENV = os.environ.get('PINECONE_ENV') 

embed = OpenAIEmbeddings()

pinecone.init(      
	api_key=PINECONE_API_KEY,      
	environment=PINECONE_API_ENV    
)      
index = pinecone.Index('katatib')

reload_docs = Pinecone.from_existing_index("katatib",
                                           embedding=embed)

llm = ChatOpenAI(temperature=0, openai_api_key=OPENAI_API_KEY, model_name="gpt-3.5-turbo")

chain = load_qa_chain(llm, chain_type="stuff")


query = "ما هو الغلاف الجوي؟"
docs = reload_docs.similarity_search(query)

res = chain.run(input_documents=docs, question=query)

system_template='''You are a geography teacher for ninth grade, and your focus is solely on the subject matter provided. 
You answer questions related to this topics
الغلاف الجوي
العوامل المؤثرة في درجة حرارة الغلاف الجوي
الغلاف الحيوي و مكوناته

sure the answer in Arabic langauge ONLY

amy other question please respond with "أنا هنا لمساعدتك بمادة الجغرافيا الصف التاسع."'''
system_message_prompt = SystemMessagePromptTemplate.from_template(system_template)

human_template=res
human_message_prompt = HumanMessagePromptTemplate.from_template(human_template)

chat_prompt = ChatPromptTemplate.from_messages([system_message_prompt, human_message_prompt])

print(chat_prompt.format_prompt().to_messages()[1].content)