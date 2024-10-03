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

# Função para obter uma conexão com o banco de dados
def get_db_connection():
    try:
        return connector.connect(user="root", password="mudar123", database="restaurante")
    except Exception as e:
        print(f"Erro ao conectar ao banco de dados: {str(e)}")
        return None

# Rota para buscar todos os itens da tabela
@app.route("/")
def buscar_tabela():
    db = get_db_connection()
    if db is None:
        return jsonify({'error': 'Não foi possível conectar ao banco de dados'}), 500
    
    try:
        c = db.cursor(dictionary=True)
        query = """SELECT * FROM tbl_items;"""
        c.execute(query)
        result = c.fetchall()
        c.close()
        db.close()
        return jsonify(result)
    except Exception as e:
        print(f"Erro ao buscar tabela: {str(e)}")
        return jsonify({'error': 'Erro ao buscar tabela'}), 500

# Rota para pegar um item específico pelo ID
@app.route("/getItem/<int:itemId>")
def pegar_item(itemId):
    db = get_db_connection()
    if db is None:
        return jsonify({'error': 'Não foi possível conectar ao banco de dados'}), 500
    
    try:
        c = db.cursor(dictionary=True)
        query = """SELECT * FROM tbl_items where itemId = "%s";""" % (itemId)
        c.execute(query)
        result = c.fetchall()
        c.close()
        db.close()
        return jsonify(result)
    except Exception as e:
        print(f"Erro ao pegar item: {str(e)}")
        return jsonify({'error': 'Erro ao pegar item'}), 500

# Rota para inserir um novo item
@app.route('/submit', methods=["POST"])
def submit_form():
    db = get_db_connection()
    if db is None:
        return jsonify({'error': 'Não foi possível conectar ao banco de dados'}), 500

    try:
        data = request.get_json()
        name = data['item'].get('itemName')
        image = data['item'].get('itemImage')
        description = data['item'].get('itemDescription')
        price = data['item'].get('itemPrice')

        if name and image and description and price:
            c = db.cursor()
            query = """INSERT INTO tbl_items (itemName, itemImage, itemDescription, itemPrice) VALUES (%s, %s, %s, %s);"""
            c.execute(query, (name, image, description, price))
            db.commit()
            c.close()
            db.close()
            return jsonify({'requisicao': 'Feita com sucesso', 'message': [name, image, description, price]})
        else:
            return jsonify({'requisicao': 'Erro', 'message': [name, image, description, price]}), 400
    except Exception as e:
        print(f"Erro ao enviar formulário: {str(e)}")
        return jsonify({'error': 'Erro ao enviar formulário'}), 500

# Rota para deletar um item pelo ID
@app.route('/delete/<int:itemId>', methods=['DELETE'])
def remove_card(itemId):
    db = get_db_connection()
    if db is None:
        return jsonify({'error': 'Não foi possível conectar ao banco de dados'}), 500

    try:
        c = db.cursor()
        query = """DELETE FROM tbl_items WHERE itemId = %s;"""
        c.execute(query, (itemId,))
        db.commit()
        c.close()
        db.close()
        return jsonify({'message': f'Card com ID {itemId} removido com sucesso'})
    except Exception as e:
        print(f"Erro ao deletar card: {str(e)}")
        return jsonify({'error': f'Erro ao deletar card com ID {itemId}'}), 500

# Rota para atualizar um item pelo ID
@app.route('/update/<int:itemId>', methods=['PUT'])
def change_card(itemId):
    db = get_db_connection()
    if db is None:
        return jsonify({'error': 'Não foi possível conectar ao banco de dados'}), 500

    try:
        data = request.get_json()
        name = data['item'].get('itemName')
        image = data['item'].get('itemImage')
        description = data['item'].get('itemDescription')
        price = data['item'].get('itemPrice')

        c = db.cursor()
        query = """ 
        UPDATE tbl_items
        SET itemName = %s,
            itemImage = %s,
            itemDescription = %s,
            itemPrice = %s
        WHERE itemId = %s;
        """
        c.execute(query, (name, image, description, price, itemId))
        db.commit()
        c.close()
        db.close()
        return jsonify({'message': f'Card com ID {itemId} alterado com sucesso'})
    except Exception as e:
        print(f"Erro ao atualizar card: {str(e)}")
        return jsonify({'error': f'Erro ao atualizar card com ID {itemId}'}), 500

# Rota para registrar um novo usuário
@app.route('/register', methods=['POST'])
def register_user():
    db = get_db_connection()
    if db is None:
        return jsonify({'error': 'Não foi possível conectar ao banco de dados'}), 500

    try:
        data = request.get_json()
        name = data['item'].get('name')
        email = data['item'].get('email')
        password = data['item'].get('password')

        if name and email and password:
            hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
            c = db.cursor()
            query = """INSERT INTO tbl_users (username, email, password) VALUES (%s, %s, %s);"""
            c.execute(query, (name, email, hashed_password))
            db.commit()
            c.close()
            db.close()
            return jsonify({'requisicao': 'Feita com sucesso', 'message': [name, email]})
        else:
            return jsonify({'requisicao': 'Erro', 'message': [name, email]}), 400
    except Exception as e:
        print(f"Erro ao registrar usuário: {str(e)}")
        return jsonify({'error': 'Erro ao registrar usuário'}), 500

# Rota para fazer login de um usuário
@app.route('/login', methods=['POST'])
def login_user():
    db = get_db_connection()
    if db is None:
        return jsonify({'error': 'Não foi possível conectar ao banco de dados'}), 500

    try:
        data = request.get_json()
        email = data['email']
        password = data['password']

        c = db.cursor(dictionary=True)
        c.execute("SELECT * FROM tbl_users WHERE email = %s", (email,))
        user = c.fetchone()

        if user is None or not bcrypt.check_password_hash(user['password'], password):
            return jsonify({'message': 'Usuário não encontrado'}), 401
        
        session["user_id"] = user["userId"]
        c.close()
        db.close()
        return jsonify({"message": user['username']})
    except Exception as e:
        print(f"Erro ao fazer login: {str(e)}")
        return jsonify({'error': 'Erro ao fazer login'}), 500

# Rota para obter informações do usuário logado
@app.route('/userinfo')
def get_user_info():
    db = get_db_connection()
    if db is None:
        return jsonify({'error': 'Não foi possível conectar ao banco de dados'}), 500

    try:
        user_id = session.get("user_id")

        if not user_id:
            return jsonify({'error': "Unauthorized"}), 401

        c = db.cursor(dictionary=True)
        c.execute("SELECT * FROM tbl_users WHERE userId = %s", (user_id,))
        user = c.fetchone()
        c.close()
        db.close()

        return jsonify({
            "nome": user['username'],
            "id": user['userId'],
            "email": user['email'],
            "role": user.get('role')
        })
    except Exception as e:
        print(f"Erro ao obter informações do usuário: {str(e)}")
        return jsonify({'error': 'Erro ao obter informações do usuário'}), 500

# Rota para logout
@app.route("/logout", methods=["POST"])
def logout_user():
    try:
        session.pop("user_id")
        return "200"
    except Exception as e:
        print(f"Erro ao fazer logout: {str(e)}")
        return jsonify({'error': 'Erro ao fazer logout'}), 500

if __name__ == '__main__':
    app.run()
