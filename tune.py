from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
import os
from langchain.vectorstores import Pinecone
from langchain.embeddings.openai import OpenAIEmbeddings
import pinecone
from langchain.llms import OpenAI
from langchain.chains.question_answering import load_qa_chain

from dotenv import load_dotenv
# get keys
load_dotenv()
OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')
PINECONE_API_KEY = os.environ.get('PINECONE_API_KEY')
PINECONE_API_ENV = os.environ.get('PINECONE_ENV') 

# laod the data
loader = PyPDFLoader("C:/Users/Motasem-PC/Desktop/katatib/data/data.pdf")
data = loader.load()

text_splitter = RecursiveCharacterTextSplitter(chunk_size=100, chunk_overlap=0)
texts = text_splitter.split_documents(data)

# prepare the vector store
pinecone.init(      
	api_key=PINECONE_API_KEY,      
	environment=PINECONE_API_ENV    
)      
index = pinecone.Index('katatib')

# embedding
embeddings = OpenAIEmbeddings(openai_api_key=OPENAI_API_KEY)

docsearch = Pinecone.from_texts([t.page_content for t in texts], embeddings, index_name="katatib")

llm = OpenAI(temperature=0, openai_api_key=OPENAI_API_KEY, model_name="gpt-4")
chain = load_qa_chain(llm, chain_type="stuff")

query = "ما هو الغلاف الجوي؟"
docs = docsearch.similarity_search(query)

chain.run(input_documents=docs, question=query)

