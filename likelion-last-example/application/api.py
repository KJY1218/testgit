# -*- coding: utf-8 -*-
from application import app
from pusher import Pusher
from flask import request, jsonify
from user_info import *

p = Pusher(
    app_id=PUSHER_APP_ID,
    key=PUSHER_KEY,
    secret=PUSHER_SECRET,
)

@app.route('/api/echo', methods=['GET', 'POST'])
def test_message():
    data = request.form
    p['your-app-id'].trigger('echo', {'message' : data['message']})
    return jsonify(status=0)