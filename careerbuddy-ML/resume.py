import spacy
import nltk

# import nltk
import requests
from pdfminer.high_level import extract_text
from flask_cors import CORS, cross_origin
import json
import os
from flask import Flask, request, redirect, url_for, flash, jsonify
from werkzeug.utils import secure_filename

# nltk.download('stopwords')
# nltk.download('punkt')

# Load English tokenizer, tagger, parser, NER and word vectors
nlp = spacy.load("en_core_web_sm")


f = open('skills.json')
skills = json.load(f)
dataset = [skill.lower() for skill in skills]


# Process whole documents

def extract_text_from_pdf(pdf_path):
    return extract_text(pdf_path)


def skill_exists(skill):
    list1 = []
    if skill in dataset:
        list1.append(skill)
        return skill


def extract_skills(input_text):
    stop_words = set(nltk.corpus.stopwords.words('english'))
    word_tokens = nltk.tokenize.word_tokenize(input_text)

    # remove the stop words
    filtered_tokens = [w for w in word_tokens if w not in stop_words]

    # remove the punctuation
    filtered_tokens = [w for w in word_tokens if w.isalpha()]

    # generate bigrams and trigrams (such as artificial intelligence)
    bigrams_trigrams = list(
        map(' '.join, nltk.everygrams(filtered_tokens, 2, 3)))

    # we create a set to keep the results in.
    found_skills = set()

    # we search for each token in our skills database
    for token in filtered_tokens:
        if skill_exists(token.lower()):
            found_skills.add(token)

    # we search for each bigram and trigram in our skills database
    for ngram in bigrams_trigrams:
        if skill_exists(ngram.lower()):
            found_skills.add(ngram)
    return found_skills


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/', methods=['GET'])
def index():
    return 'Hello!'


@app.route('/getfile', methods=['POST'])
def getfile():
    if request.method == 'POST':
        f = request.files['the_file']
        f.save('resume0.pdf')
    file = 'resume0.pdf'
    text = extract_text_from_pdf(file)
    skills = extract_skills(text)
    return list(skills)


if __name__ == '__main__':
    app.run(host='0.0.0.0')
