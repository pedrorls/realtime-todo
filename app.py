from flask import Flask, render_template, request, jsonify
from pusher import Pusher
import json
import os


app = Flask(__name__)

pusher = Pusher(
    app_id=os.getenv('APP_ID'),
    key=os.getenv('KEY'),
    secret=os.getenv('SECRET'),
    cluster='us2',
    ssl=True
)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/add-todo', methods=['POST'])
def add_todo():
    data = json.loads(request.data)
    pusher.trigger('todo', 'item-added', data)
    return jsonify(data)

@app.route('/remove-todo/<item_id>')
def remove_todo(item_id):
    data = {'id': item_id}
    pusher.trigger('todo', 'item-removed', data)
    return jsonify(data)

@app.route('/update-todo/<item_id>', methods=['POST'])
def update_todo(item_id):
    data = {
        'id': item_id,
        'completed': json.loads(request.data).get('completed', 0)
    }
    pusher.trigger('todo', 'item-updated', data)
    return jsonify(data)


app.run(debug=True)