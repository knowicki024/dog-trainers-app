# Dog Training Application

### Owner/s: Katie Nowicki, Tyler Kim

### Phase and Cohort:  Phase 4/ SE111323


## App Description:
Run your dog training business with this easy to use appliction. Manage your furry students, what trainers you have on staff and the classes they teach, along with managing the different classes you teach.

## Domain Model/ERD: 
<!-- ![domainmodel](https://i.imgur.com/f5isEXU.png) -->
![domainmodel](image-1.png)
![ERD](image.png)

## Deploy Application


Open two terminals side by side and in the first terminal run:
```
pipenv install 
pipenv shell
cd server
flask db upgrade head 
python seed.py 
python app.py
```
Then in the second terminal run:
```
cd client 
npm install 
npm start 

```

## MVP:
CRUD:

C. Add dogs, trainers, and classes

R. View dogs, classes, trainers

U. Update dog, classes, trainers

D. Delete dogs, classes, trainers


## BACKEND (API)
### MODELS
* many-to-many relationship
* A `Dog` has many `Trainer`s through `Classes`
* A `Trainer` has many `Dog`s through `Classes`
* A `Class` belongs to a `Dog` and belongs to a `Trainer`


### validations 
* Add validations to the `Dog` model:
* - must have a `name`
* Add validations to the `Classes` model:
* - must have a 'name' 
* Add validations to the `Trainer` model:
  - must have a `price` between 1 and 100



## CONTROLLERS
​​API routes 
RESTful conventions 

```
```
GET /dogs/
GET /dogs/<int:id>
POST /dogs/
PATCH /dogs/<int:id>
DELETE /dogs/<int:id>
```
```
GET /classes/
GET /classes/<int:id>
POST /classes/
PATCH /classes/<int:id>
DELETE /classes/<int:id>

```
```
GET /trainers/
GET /trainers/<int:id>
PATCH /trainers/<int:id>
POST /trainers/<int:id>
DELETE /trainers/<int:id>
```

## FRONTEND (REACT)
- Classes, Dogs, and Trainer components from the Client side are connected to the Server side. 
- All three components have full CRUD capabilities that transfer and update to the database. 
- There are three different React Routes to manage organization in the app 
- Each component has routes to take you to individual details.


## EXTRA!
Stretch goals:
- Filter trainers based on price
- Create login feature
-Deploy application with Render 

## FIGMA BOARD

https://www.figma.com/file/ukVWmjVXYcEZHs0zmf0xSr/phase4-project?type=whiteboard&node-id=0-1&t=UVazj217DHq9c5Bs-0

