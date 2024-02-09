from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!
class Dog(db.Model, SerializerMixin):
    __tablename__ = 'dogs'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    breed = db.Column(db.String)
    owner = db.Column(db.String)

    # Add relationship
    classes = db.relationship('Class', back_populates='dog', cascade = 'all, delete')
    
    # Add serialization rules
    
    def __repr__(self):
        return f'<Activity {self.id}: {self.name} {self.owner}>'
    
class Trainer(db.Model, SerializerMixin):
    __tablename__ = 'trainers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    price = db.Column(db.Integer)
    # Add relationship
    classes = db.relationship('Class', back_populates='trainer', cascade = 'all, delete')

    
    # Add serialization rules
    
    def __repr__(self):
        return f'<Activity {self.id}: {self.name} {self.price}>'
    
class Class(db.Model, SerializerMixin):
    __tablename__ = 'classes'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    # Add relationship
    dog_id = db.Column(db.Integer, db.ForeignKey('dogs.id'))
    trainer_id = db.Column(db.Integer, db.ForeignKey('trainers.id'))

    dog = db.relationship('Dog', back_populates='classes')
    trainer = db.relationship('Trainer', back_populates='classes')



    
    # Add serialization rules
    
    def __repr__(self):
        return f'<Activity {self.id}: {self.name}>'
    

