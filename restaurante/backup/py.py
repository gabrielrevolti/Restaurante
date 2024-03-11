# @app.route('/submit', methods=["GET",'POST'])
# def submit_form():
#     data = request.get_json()
#     name = data.get('name')
#     image = data.get('image')
#     description = data.get('description')
#     if name and image and description:
#         return jsonify({
#           'requisicao': 'Feita com sucesso',
#           'message': [name, image, description]})
#     else:
#         return jsonify({
#           'requisicao': 'erro',
#           'message': [name, image, description]
#         })