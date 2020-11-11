from app import db


class Plates(db.Model):
    __tablename__ = 'licensePlate'
    id = db.Column(db.Integer, primary_key=True, unique=True, nullable=False)
    plate = db.Column(db.String(7), unique=True, nullable=False)
    make = db.Column(db.String(100), nullable=False)
    model = db.Column(db.String(100), nullable=False)
    color = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(2), nullable=False)
    region = db.Column(db.Integer, nullable=False)


class Regions(db.Model):
    __tablename__ = 'region'
    id = db.Column(db.Integer, primary_key=True, unique=True, nullable=False)
    region = db.Column(db.Integer, nullable=False)
    city = db.Column(db.String(100), nullable=False)




