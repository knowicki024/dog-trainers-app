from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, metadata, bcrypt

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
    serialize_rules=('-classes.dog',)

    # Add validation
    @validates('name', 'owner', 'breed')
    def validate_dog(self, key, value):
        if not value:
            raise ValueError('Name, Owner, and breed must exist!')
        return value

    def __repr__(self):
        return f'<Dog {self.id}: {self.name} Owner:{self.owner}>'
    
class Trainer(db.Model, SerializerMixin):
    __tablename__ = 'trainers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    price = db.Column(db.Integer)
    _password_hash = db.Column(db.String)
    # Add relationship
    classes = db.relationship('Class', back_populates='trainer', cascade = 'all, delete')

    # Add serialization rules
    serialize_rules=('-classes.trainer',)
    @hybrid_property
    def password_hash(self):    
        raise Exception('Password hashes may not be viewed.')
#removed decode, encoding
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password)
        self._password_hash = password_hash

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password)

    @validates('name', 'price')
    def validate_trainer(self, key, value):
        if key == 'name':
            if not value or not isinstance(value, str):
                raise ValueError('Name must be a character!')
            return value
        if key == 'price':
            try:
                int_value = int(value)  # Convert value to integer
            except ValueError:
                raise ValueError('Price must be an integer!')
            
            if not 50 <= int_value <= 100:
                raise ValueError('Price must be between 50 and 100!')
            return int_value

    
def __repr__(self):
    return f'<Trainer {self.id}: {self.name} Hourly:{self.price}>'
    
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
    serialize_rules=('-dog.classes', '-trainer.classes')

    @validates('dog_id', 'trainer_id')
    def validate_class(self, key, value):
        if key == 'dog_id':
            dog = Dog.query.filter(Dog.id == value).first()
            if not dog:
                raise ValueError('Dog must exist!')
            return value
        if key == 'trainer_id':
            trainer = Trainer.query.filter(Trainer.id == value).first()
            if not trainer:
                raise ValueError('Trainer must exist!')
            return value
    
    def __repr__(self):
        return f'<Class {self.id}: {self.name}>'
    

