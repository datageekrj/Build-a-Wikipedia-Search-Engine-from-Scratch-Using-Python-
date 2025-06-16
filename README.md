# 🔍 Build a Wikipedia Search Engine Using Python, Gensim & Flask

This is a complete hands-on project that lets you build a fully functional **Wikipedia-style search engine** using real-world data and powerful NLP tools like **Gensim**, **TF-IDF**, and **Flask**. It processes over **200,000 Wikipedia articles** and lets users query them through a clean web interface.

---

## 🧠 What You'll Learn

* How to clean and preprocess large-scale text data
* How to create Bag-of-Words and TF-IDF models with Gensim
* How to build a similarity index for fast document retrieval
* How to serve results via Flask and a dynamic Bootstrap + JS frontend

---

## 📁 Repository Contents

| File                              | Description                                                                                                                                            |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Train and Save the models.ipynb` | Full training pipeline: load articles, preprocess, build dictionary, BoW, TF-IDF, and create the similarity index. Saves all necessary models to disk. |
| `Inference Notebook.ipynb`        | Run search queries and evaluate the index using pre-saved dictionary, TF-IDF model, and similarity index.                                              |
| `app.py`                          | Flask backend that powers the live search. Loads the saved models and responds to frontend AJAX requests.                                              |
| `script.js`                       | JavaScript logic to capture user input, fetch results from the backend, and dynamically update the page. Implements "Load More" functionality.         |
| `index.html`                      | Frontend UI for the search engine, styled with Bootstrap. Includes search bar and result cards.                                                        |

---


Thanks! Here's the **final updated section** to include in your GitHub `README.md` for the data download part:

---

## 🗂️ Dataset Source

This project uses the **Simple English Wikipedia dataset** (\~200K articles) available from Hugging Face:

📥 **Download the data here**:
👉 [https://huggingface.co/datasets/legacy-datasets/wikipedia/tree/main/data/20220301.simple](https://huggingface.co/datasets/legacy-datasets/wikipedia/tree/main/data/20220301.simple)

**Recommended Format:**
Download the file ending in `.json.gz` (e.g., `20220301.simple.json.gz`) and extract it.

**How to load:**

```python
from datasets import load_dataset
dataset = load_dataset("legacy-datasets/wikipedia", "20220301.simple")
```

You can then extract titles and text fields using:

```python
articles = [f"{item['title']}: {item['text']}" for item in dataset['train']]
```

---

## 🧰 Requirements

```bash
pip install flask gensim nltk
```

Also make sure to download NLTK stopwords:

```python
import nltk
nltk.download('punkt')
nltk.download('stopwords')
```

---

## ⚙️ How to Generate the Search Models

1. **Open `Train and Save the models.ipynb`**

   * Preprocess the Wikipedia dataset
   * Tokenize the articles
   * Create the Gensim `Dictionary`
   * Generate BoW and TF-IDF corpora
   * Create the `SparseMatrixSimilarity` index
   * Save the following:

     * `myDict.txt` — Gensim dictionary
     * `tfidf.tfidf` — TF-IDF model
     * `myIndex.index` — Similarity index
     * `raw_documents.pkl` — Cleaned article texts for display

2. **Run the Flask App**

   ```bash
   python app.py
   ```

3. Visit `http://127.0.0.1:5000` in your browser to use the search engine.

---

---

## ⭐️ Star This Repo

If you found this project helpful, give it a ⭐ to help others find it too!
