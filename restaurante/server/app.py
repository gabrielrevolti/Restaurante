from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt
from config import AplicationConfig
from flask_session import Session
from mysql import connector
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(AplicationConfig)

CORS(app, supports_credentials=True)
server_session = Session(app)
bcrypt = Bcrypt(app)

db = connector.connect(user="root", password="mudar123", database="restaurante")


@app.route("/")
def buscar_tabela():
    c = db.cursor(dictionary=True)
    query = """SELECT * FROM tbl_items;"""
    c.execute(query)
    result = c.fetchall()
    c.close()
    return jsonify(result)



@app.route("/getItem/<int:itemId>")
def pegar_item(itemId):
    c = db.cursor(dictionary=True)
    query = """SELECT * FROM tbl_items where itemId = "%s"; """ %(itemId)
    c.execute(query)
    result = c.fetchall()
    c.close()
    return jsonify(result)



@app.route('/submit', methods=["GET","POST"])
def submit_form():
    data = request.get_json()
    print(data)
    name = data['item'].get('itemName')
    image = data['item'].get('itemImage')
    description = data['item'].get('itemDescription')
    price = data['item'].get('itemPrice')
      
    if name and image and description and price:
        c = db.cursor()
        query = """ insert into tbl_items ( itemName, itemImage, itemDescription, itemPrice ) values ("%s", "%s", "%s", "%s");""" %(name, image, description, price)
        c.execute(query)
        db.commit()
        c.close()
        return jsonify({
          'requisicao': 'Feita com sucesso',
          'message': [name, image, description, price]})
    else:
        return jsonify({
          'requisicao': 'erro',
          'message': [name, image, description, price]
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
    

    
@app.route('/update/<int:itemId>', methods=['PUT'])
def change_card(itemId):
    data = request.get_json()
    name = data['item'].get('itemName')
    image = data['item'].get('itemImage')
    description = data['item'].get('itemDescription')
    price = data['item'].get('itemPrice')
    try:
        c = db.cursor()
        query = """ 
        update tbl_items
        set itemName = "%s",
	        itemImage = "%s",
            itemDescription = "%s",
            itemPrice = "%s"
        where itemId = "%s"; """ %(name, image, description, price, itemId)
        c.execute(query)
        db.commit()
        c.close()
        return jsonify({'message': f'Card com ID {itemId} alterado com sucesso'})
    except:
        return jsonify({'message': f'Card com ID {itemId} não encontrado'}), 404
    

    
@app.route('/register', methods=['GET', 'POST'])
def register_user():
    data = request.get_json()
    name = data['item'].get('name')
    email = data['item'].get('email')
    password = data['item'].get('password')
    
    if name and email and password:
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        c = db.cursor()
        query = """ insert into tbl_users ( username, email, password) values ("%s", "%s", "%s");""" %(name, email, hashed_password)
        c.execute(query)
        db.commit()
        c.close()
        return jsonify({
            'requisicao': 'Feita com sucesso',
            'message': [name, email]})
    else:
        return jsonify({
          'requisicao': 'erro',
          'message': [name, email]
        })
    
@app.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    email = data['email']
    password = data['password']

    
    c = db.cursor(dictionary=True)
    c.execute("select * from tbl_users where email = %s", (email,))
    user = c.fetchone()

    if user is None:
        return jsonify({'message': 'usuário não encontrado'}), 401
    
    userPass = user['password']
    
    if not bcrypt.check_password_hash(userPass, password):
        return jsonify({'message': 'usuário não encontrado'}), 401
    
    session["user_id"] = user["userId"]
    
    return jsonify ({"message": user['username']})

@app.route('/userinfo')
def get_user_info():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({'error': "Unauthorized"}), 401
    
    user =  c = db.cursor(dictionary=True)
    c.execute("select * from tbl_users where userId = %s", (user_id,))
    user = c.fetchone()

    return jsonify ({
        "id": user['userId'],
        "email": user['email'],
        "role": user['role']
    })

@app.route("/logout", methods=["POST"])
def logout_user():
    print(session['user_id'])
    session.pop("user_id")
    return "200"
    
if __name__ == '__main__':
    app.run(debug=True)

# todos os gets = result = c.fetchall() one | all (usar dicionary=true) no cursor
    #se nao for get commit db.commit
    