# PROJECT PITCH
### Owner/s: Katie Nowicki, Tyler Kim

### Phase and Cohort:  Phase 4/ SE111323



## One sentence app description:
App that helps owners to keep track of dog training.

## Domain Model: 
![domainmodel](https://i.imgur.com/f5isEXU.png)


## MVP:
CRUD:

C. Add dogs, trainers, and classes

R. Search trainers, dogs, an

U. Update 

D


## BACKEND (API)
### MODELS
* many-to-many relationship
* A `Customer` has many `Coffee`s through `Order`s
* A `Coffee` has many `Customer`s through `Order`s 
* A `Order` belongs to a `Customer` and belongs to a `Coffee`


### validations 
* Add validations to the `Customer` model:
* - must have a `name`
* Add validations to the `Coffee` model:
* - must have a 'name' 
  - must have a `price` between 1 and 20


## CONTROLLERS
​​API routes 
RESTful conventions 
```
GET /coffees/
POST /coffees/
```

```
GET /coffees/<int:id>
PATCH /coffees/<int:id>
DELETE /coffees/<int:id>
```
```
GET /customers/
POST /customers/
```
```
GET /customers/<int:id>
PATCH /customers/<int:id>
DELETE /customers/<int:id>
```
```
GET /orders/
POST /orders/
```
```
GET /orders/<int:id>
PATCH /orders/<int:id>
DELETE /orders/<int:id>
```


### Serialize rules 
* 


FRONTEND (REACT)
Which components will make requests to your API? What route will the competent send fetch requests too? (i.e: ArtistForm, send a POST requests to /artists) 
-
-
-


EXTRA!
Stretch goals:
-
-
-
-