from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello():
    return "<h1>Hello World</h1>"

@app.route('/submit', methods=["GET",'POST'])
def submit_form():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    if name and email:
        return jsonify({
          'requisicao': 'Feita com sucesso',
          'message': [name, email]})
    else:
        return jsonify({
          'requisicao': 'erro',
          'message': [name, email]
        })
    # Faça o que desejar com os dados (por exemplo, salvar no banco de dados)
    

if __name__ == '__main__':
    app.run(debug=True)

