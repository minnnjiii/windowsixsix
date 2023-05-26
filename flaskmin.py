
from flask import Flask, render_template, request
import RPi.GPIO as GPIO
import time

app = Flask(__name__)

IN1 = 12
IN2 = 16
IN3 = 20
IN4 = 21


step_sequence = [[1, 0, 0, 1],
                 [1, 0, 0, 0],
                 [1, 1, 0, 0],
                 [0, 1, 0, 0],
                 [0, 1, 1, 0],
                 [0, 0, 1, 0],
                 [0, 0, 1, 1],
                 [0, 0, 0, 1]]


step_delay = 0.005


GPIO.setmode(GPIO.BCM)
GPIO.setup(IN1, GPIO.OUT)
GPIO.setup(IN2, GPIO.OUT)
GPIO.setup(IN3, GPIO.OUT)
GPIO.setup(IN4, GPIO.OUT)

def set_step(step):
    GPIO.output(IN1, step[0])
    GPIO.output(IN2, step[1])
    GPIO.output(IN3, step[2])
    GPIO.output(IN4, step[3])


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/rotate', methods=['POST'])
def rotate():
    direction = request.form['direction']
    
    if direction == 'left':
        for _ in range(512):  
            for step in step_sequence:
                set_step(step)
                time.sleep(step_delay)

    elif direction == 'right':
        for _ in range(512):  
            for step in reversed(step_sequence):
                set_step(step)
                time.sleep(step_delay)
    
    
    return "OK"

@app.route('/stop', methods=['POST'])
def stop():
    GPIO.output(IN1, GPIO.LOW)
    GPIO.output(IN2, GPIO.LOW)
    GPIO.output(IN3, GPIO.LOW)
    GPIO.output(IN4, GPIO.LOW)

    return "OK"


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)