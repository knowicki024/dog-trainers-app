#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Dog, Trainer, Class

app.secret_key=b'\x9f\xae\x80\x05q\xe6\xa3EOe\xac\xde#\xf9\xa6\xa7'
# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


class Dogs(Resource):
    def get(self):  
        dogs = [dog.to_dict(rules=('-classes',)) for dog in Dog.query.all()]
        return make_response(dogs, 200)
    
    def post(self):
        try:
            data = request.get_json()
            new_dog = Dog(
                name= data['name'],
                breed= data['breed'],
                owner= data['owner']
            )
            db.session.add(new_dog)
            db.session.commit()
            return make_response(new_dog.to_dict(rules=('-classes',)), 201)
        except ValueError:
            return make_response({'error': 'Failed to add new dog, try again!'}, 400)
        

class DogsById(Resource):
    def get(self, id):
        dog = Dog.query.filter(Dog.id == id).first()
        if dog:
            return make_response(dog.to_dict(), 200)
        return make_response({'error': 'dog not found'},404)
    
    def delete(self, id):
        dog = Dog.query.filter(Dog.id == id).first()
        if dog:
            db.session.delete(dog)
            db.session.commit()
            return make_response({}, 204)
        return make_response({'error': 'Dog not found'}, 404)
    
api.add_resource(Dogs, '/dogs')
api.add_resource(DogsById, '/dogs/<int:id>')






class CheckSession(Resource):
    def get(self):
        trainer = Trainer.query.filter(Trainer.id == session.get('user_id')).first()
        if trainer:
            return trainer.to_dict()
        else:
            return {'message': '401: Not Authorized'}, 401

api.add_resource(CheckSession, '/check_session')

class Login(Resource):
    def post(self):
        trainer = Trainer.query.filter(
            Trainer.name == request.get_json()['username']
        ).first()

        session['user_id'] = trainer.id
        return trainer.to_dict()

api.add_resource(Login, '/login')

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return {'message': '204: No Content'}, 204

api.add_resource(Logout, '/logout')






























if __name__ == '__main__':
    app.run(port=5555, debug=True)

