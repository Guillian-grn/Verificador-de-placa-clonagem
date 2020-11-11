import os
import re
from app import app, models
from app import readPlate
from flask import render_template, request, redirect, url_for
from config import ALLOWED_EXTENSIONS
from werkzeug.utils import secure_filename


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html', title='Home', currentHome='active')


@app.route('/checker')
def checker():
    return render_template('checker.html', title='Checker', currentCheck='active')


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/', methods=['POST'])
def upload_file():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'uploadFile' not in request.files:
            # flash('No file selected for uploading', "warning")
            return redirect('/checker')
        file = request.files['uploadFile']
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            # flash('No file selected for uploading', "warning")
            return redirect('/checker')
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

            # read license plate
            licensePlate = readPlate.readImage(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            # print(licensePlate)
            result = re.sub(r'\W+', '', licensePlate)
            # print(result)
            state = request.form.get('estado')
            city = request.form.get('cidade')

            #check if exists in database
            car = models.Plates.query.filter_by(plate=result).first_or_404()
            region = models.Regions.query.filter_by(city=city).first_or_404()

            if car.plate == result and region.region == car.region:
                flag = True
            else:
                flag = False

            return render_template('result.html', title='Checker', currentCheck='active', placa=result, estado=state, cidade=city, flag=flag)


@app.route('/registers')
def registers():
    registers = models.Plates.query.all()
    return render_template('registers.html', title='Registers', registers=registers, len=len(registers),
                           currentRegisters='active')


@app.route('/informPolice')
def informPolice():
    return render_template('informPolice.html', title='InformPolice')
