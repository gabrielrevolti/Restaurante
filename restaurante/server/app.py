from flask import Flask, request, jsonify,json
from mysql import connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
db = connector.connect(user="root", password="mudar123", database="restaurante")

@app.route("/")
def buscar_tabela():
    c = db.cursor(dictionary=True)
    query = """SELECT * FROM tbl_items;"""
    c.execute(query)
    result = c.fetchall()
    c.close()
    return jsonify(result)

@app.route('/submit', methods=["GET","POST"])
def submit_form():
    data = request.get_json()
    name = data.get('name')
    image = data.get('image')
    description = data.get('description')
      
    if name and image and description:
        c = db.cursor()
        query = """ insert into tbl_items ( itemName, itemImage, itemDescription ) values ("%s", "%s", "%s");""" %(name, image, description)
        c.execute(query)
        db.commit()
        c.close()
        return jsonify({
          'requisicao': 'Feita com sucesso',
          'message': [name, image, description]})
    else:
        return jsonify({
          'requisicao': 'erro',
          'message': [name, image, description]
        })
    
@app.route('/delete/<int:itemId>', methods=['DELETE'])
def remove_card(itemId):
    try:
        c = db.cursor()
        query = """ delete from tbl_items where itemId = "%s";""" %(itemId)
        c.execute(query)
        db.commit()
        c.close()
        return jsonify({'message': f'Card com ID {itemId} removido com sucesso'})
    except:
        return jsonify({'message': f'Card com ID {itemId} não encontrado'}), 404
    
if __name__ == '__main__':
    app.run(debug=True)

# todos os gets = result = c.fetchall() one | all (usar dicionary=true) no cursor
    #se nao for get commit db.commit
    