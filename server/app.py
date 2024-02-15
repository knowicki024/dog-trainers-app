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

@app.before_request        #allows any users to see all dogs and login 
def check_if_logged_in():
    allowed_endpoints = ['dogs', 'login', 'logout', 'trainers', 'classes' ]
    user_id = session.get('user_id')
    if not user_id and request.endpoint not in allowed_endpoints :
        return {'error': 'Unauthorized, Please Login'}, 401

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
    
    def patch(self, id):
        dog = Dog.query.filter(Dog.id == id).first()
        if dog:
            try:
                data = request.get_json()
                for attr in data:
                    setattr(dog, attr, data[attr])
                db.session.commit()
                return make_response(dog.to_dict(rules=('-classes',)), 202)
            except ValueError:
                return make_response({'error': 'Failed to edit dog'}, 400)
            
class Trainers(Resource):
    def get(self):  
        trainers = [t.to_dict() for t in Trainer.query.all()]
        return make_response(trainers, 200)
    
    def post(self):
        try:
            data = request.get_json()
            new_trainer = Trainer(
                name= data['name'],
                price= data['price']
                )
            new_trainer.password_hash = data['password']
            db.session.add(new_trainer)
            db.session.commit()
            return make_response(new_trainer.to_dict(rules=('-classes',)), 201)
        except ValueError:
            return make_response({'error': 'Failed to add new trainer, try again!'}, 400)

class TrainersById(Resource):
    def get(self, id):
        trainer = Trainer.query.filter(Trainer.id == id).first()
        if trainer:
            return make_response(trainer.to_dict(), 200)
        return make_response({'error': 'Trainer not found'},404)
    
    def delete(self, id):
        trainer = Trainer.query.filter(Trainer.id == id).first()
        if trainer:
            db.session.delete(trainer)
            db.session.commit()
            return make_response({}, 204)
        return make_response({'error': 'Trainer not found'}, 404)
    
    def patch(self, id):
        trainer = Trainer.query.filter(Trainer.id == id).first()
        if trainer:
            try:
                data = request.get_json()
                for attr in data:
                    setattr(trainer, attr, data[attr])
                db.session.commit()
                return make_response(trainer.to_dict(rules=('-classes',)), 202)
            except ValueError:
                return make_response({'error': 'Failed to edit trainer'}, 400)
        else:
            return make_response({'error': 'trainer not found'}, 404)

class Classes(Resource):
    def get(self):  
        classes = [c.to_dict() for c in Class.query.all()]
        return make_response(classes, 200)
    
    def post(self):
        try:
            data = request.get_json()
            new_class = Class(
                name= data['name'],
                dog_id= data['dog_id'],
                trainer_id= data['trainer_id']
            )
            db.session.add(new_class)
            db.session.commit()
            return make_response(new_class.to_dict(), 201)
        except ValueError:
            return make_response({'error': 'Failed to add new class, try again!'}, 400)
    
class ClassesById(Resource):
    def get(self, id):
        class_inst = Class.query.filter(Class.id == id).first()
        if class_inst:
            return make_response(class_inst.to_dict(), 200)
        return make_response({'error': 'Class not found'},404)
    
    def delete(self, id):
        class_inst = Class.query.filter(Class.id == id).first()
        if class_inst:
            db.session.delete(class_inst)
            db.session.commit()
            return make_response({}, 204)
        return make_response({'error': 'Class not found'}, 404)
    
    def patch(self, id):
        class_inst = Class.query.filter(Class.id == id).first()
        if class_inst:
            try:
                data = request.get_json()
                for attr in data:
                    setattr(class_inst, attr, data[attr])
                db.session.commit()
                return make_response(class_inst.to_dict(), 202)
            except ValueError:
                return make_response({'error': 'Failed to edit class'}, 400)

api.add_resource(Classes, '/classes')   
api.add_resource(ClassesById, '/classes/<int:id>')
api.add_resource(TrainersById, '/trainers/<int:id>')
api.add_resource(Trainers, '/trainers', endpoint='trainers')
api.add_resource(Dogs, '/dogs', endpoint='dogs')
api.add_resource(DogsById, '/dogs/<int:id>')

#authentification
class CheckSession(Resource):
    def get(self):
        trainer = Trainer.query.filter(Trainer.id == session.get('user_id')).first()
        if trainer:
            return trainer.to_dict()
        else:
            return {'message': '401: Not Authorized'}, 401


class Login(Resource):
    def post(self):
        try:
            username = request.get_json()['username']
            password = request.get_json()['password']

            trainer = Trainer.query.filter(Trainer.name == request.get_json()['username']).first()
            if trainer.authenticate(password):
                session['user_id'] = trainer.id
                return trainer.to_dict(), 200
            return {'error': 'Invalid username or password'}, 401
            
        except ValueError:
            return make_response({'error': 'Login failed'}, 400)
        

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return {'message': '204: No Content'}, 204
    

api.add_resource(CheckSession, '/check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')































if __name__ == '__main__':
    # app.run(host='0.0.0.0')
    app.run(port=8888, debug=True)

