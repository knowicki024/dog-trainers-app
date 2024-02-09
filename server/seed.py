#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Dog, Trainer, Class

fake=Faker()


def create_trainers():
    trainers = []
    for _ in range(5):
        t = Trainer(
            name=fake.name(),
            price=rc(range(50, 101))
        )
        trainers.append(t)

    return trainers

def create_dogs():
    dogs = []
    breeds = ["Labrador Retriever", "German Shepherd", "Golden Retriever", "French Bulldog", "Bulldog", "Poodle", "Beagle", "Rottweiler", "Siberian Husky", "Dachshund"]
    for _ in range(15):
        d = Dog(
            name=fake.first_name(),
            owner=fake.name(),
            breed = rc(breeds)
        )
        dogs.append(d)

    return dogs

def create_classes(dogs, trainers):
    classes = []
    for _ in range(15):
        c = Class(
            name=fake.sentence(),
            dog_id=rc([dog.id for dog in dogs]),
            trainer_id=rc([trainer.id for trainer in trainers])
        )
        classes.append(c)

    return classes



if __name__ == '__main__':
    with app.app_context():
        print("Clearing db...")
        Dog.query.delete()
        Trainer.query.delete()
        Class.query.delete()

        print("Seeding dogs...")
        dogs = create_dogs()
        db.session.add_all(dogs)
        db.session.commit()

        print("Seeding trainers...")
        trainers = create_trainers()
        db.session.add_all(trainers)
        db.session.commit()

        print("Seeding classes...")
        classes = create_classes(dogs, trainers)
        db.session.add_all(classes)
        db.session.commit()

        print("Done seeding!")
        # Seed code goes here!

