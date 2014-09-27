# -*- coding: utf-8 -*-
from application import app
from pusher import Pusher
from flask import request, jsonify, session     # 4-1 add
from user_info import *

p = Pusher(
    app_id=PUSHER_APP_ID,
    key=PUSHER_KEY,
    secret=PUSHER_SECRET,
)

@app.route('/api/echo', methods=['GET', 'POST'])
def test_message():
    data = request.form
    p['uos-pusher'].trigger('echo', {'message' : data['message']})
    return jsonify(status=0)


def emit(action, data, broadcast=False):
    if broadcast:
        p['br'].trigger(action, data)
    else:
        p['private'].trigger(action, data)


@app.route('/api/call/<action_name>', methods=["POST"])
def api_call(action_name):
    data = request.formX

#    emit_new_message(data) # 4-3 delete

    # 4-4 add start
    if action_name == "new_message":
        emit_new_message(data)
    elif action_name == "typing":
        emit_typing()
    elif action_name == "stop_typing":
        emit_stop_typing()
    # 4-4 add end

    return jsonify(status=0)


def emit_new_message(data):
    emit('new_message', {
        'message': data['message'],
        'username': data['username'],
    }, broadcast=True)

# 4-5 add start
def emit_typing():
    emit('typing', {
        'username': session['username'],
        'user_id': session['user_id'],
    }, broadcast=True)


def emit_stop_typing():
    emit('stop_typing', {
        'username': session['username'],
        'user_id': session['user_id'],
    }, broadcast=True)
# 4-5 add end


@app.route('/api/start', methods=["POST"])
def api_start():
    data = request.form
    username = data['username']
    # 4-2 add start
    user_id = data['user_id']

    session['username'] = username
    session['user_id'] = user_id
    # 4-2 add end

    emit('user_joined', {
        'username': username,
    }, broadcast=True)

    return jsonify(status=0)

