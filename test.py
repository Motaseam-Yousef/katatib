from langchain.document_loaders import UnstructuredPDFLoader, OnlinePDFLoader, PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
import os
from langchain.vectorstores import Chroma, Pinecone
from langchain.embeddings.openai import OpenAIEmbeddings
import pinecone
import openai
from langchain.llms import OpenAI
from langchain.chains.question_answering import load_qa_chain

from dotenv import load_dotenv
# get keys
load_dotenv()
OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')
PINECONE_API_KEY = os.environ.get('OPENAI_API_KEY')
PINECONE_API_ENV = os.environ.get('PINECONE_ENV') 

# laod the data
loader = PyPDFLoader("C:/Users/Motasem-PC/Desktop/katatib/data/data.pdf")
data = loader.load()

text_splitter = RecursiveCharacterTextSplitter(chunk_size=100, chunk_overlap=0)
texts = text_splitter.split_documents(data)

# prepare the vector store
pinecone.init(      
	api_key='e0cc0ebe-6a71-4e03-b961-9661057a1391',      
	environment='us-west1-gcp-free'      
)      
index = pinecone.Index('katatib')

# embedding
embeddings = OpenAIEmbeddings(openai_api_key=OPENAI_API_KEY)

docsearch = Pinecone.from_texts([t.page_content for t in texts], embeddings, index_name=index)

llm = OpenAI(temperature=0, openai_api_key=OPENAI_API_KEY)
chain = load_qa_chain(llm, chain_type="stuff")

query = "ما هو الغلاف الجوي؟"
docs = docsearch.similarity_search(query)

chain.run(input_documents=docs, question=query)

