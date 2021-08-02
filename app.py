from flask import Flask, render_template, request, redirect, url_for, session

app = Flask(__name__)
app.secret_key = 'key'


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        session['correct'] = int(request.form['correct'])
        session['pass'] = int(request.form['pass'])
        session['passList'] = request.form['passList']
        return redirect(url_for('result'))

    elif request.method == 'GET':
        session.clear()

    return render_template('index.html')

@app.route('/result')
def result():
    return render_template('result.html', correct=session['correct'], passed=session['pass'], passedList=session['passList'])

if __name__ == '__main__':
    app.run(port=5000)