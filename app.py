from flask import Flask, render_template, request, jsonify
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from gensim.corpora import Dictionary
from gensim.models import TfidfModel
from gensim.similarities import SparseMatrixSimilarity
import pickle

stop_words = set(stopwords.words("english"))
def tokenize_clean(document):
    return [w.lower() for w in word_tokenize(document) if w.lower() not in stop_words and w.isalpha()]

my_dict = Dictionary.load_from_text("search_dict.txt")
my_tfidf = TfidfModel.load("model_tfidf.tfidf")
index = SparseMatrixSimilarity.load("model_index.index")
with open("raw_documents.pkl", "rb") as file:
    raw_documents = pickle.load(file)

def generate_results(query, to_return = 10):
    tokens = tokenize_clean(query)
    sims = index[my_tfidf[my_dict.doc2bow(tokens)]]
    sims_pairs = sorted(enumerate(sims), reverse=True, key = lambda x: x[1])
    top_docs = []
    for (i, score) in sims_pairs[:to_return]:
        top_docs.append(raw_documents[i][:100])
    return top_docs

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/search")
def search():
    query = request.args.get("query", "")
    all_results = generate_results(query)
    return jsonify({
        "results" : all_results
    })


app.run(debug = True)