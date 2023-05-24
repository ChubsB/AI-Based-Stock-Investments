from flask import Flask, request
from flask_restful import Resource, Api
import numpy as np
from keras.models import Sequential
from keras.layers import LSTM, Dense
from sklearn.preprocessing import MinMaxScaler
from keras.preprocessing.sequence import TimeseriesGenerator
import json
import pandas as pd

app = Flask(__name__)
api = Api(app)

def extract_close_values(json_data):
    close_values = [data["Close"] for data in json_data]
    return close_values

def train_lstm_model(historicalData):
    # Normalize the data
    close_prices = extract_close_values(historicalData)
    train_data = np.array(close_prices).reshape(-1,1)
    scaler = MinMaxScaler()
    scaler.fit(train_data)
    scaled_train = scaler.transform(train_data)

    # define generator
    n_input = 500
    n_features = 1
    generator = TimeseriesGenerator(scaled_train, scaled_train, length=n_input, batch_size=64)

    model=Sequential()
    model.add(LSTM(50,return_sequences=True,input_shape=(n_input,1)))
    model.add(LSTM(50,return_sequences=True))
    model.add(LSTM(50))
    model.add(Dense(1))
    model.compile(loss='mean_squared_error',optimizer='adam')

    model.fit(generator,epochs=5, verbose=1)

    last_train_batch = scaled_train[-n_input:]
    last_train_batch = last_train_batch.reshape((1, n_input, n_features))

    test_predictions = []
    first_eval_batch = last_train_batch[-n_input:]
    current_batch = first_eval_batch.reshape((1, n_input, n_features))
    into_the_future=5

    for i in range(into_the_future):    
        current_pred = model.predict(current_batch)[0]
        test_predictions.append(current_pred) 
        current_batch = np.append(current_batch[:,1:,:],[[current_pred]],axis=1)

    test_predictions2=[]
    for _ in range(into_the_future):
        Current_pred = model.predict(last_train_batch)[0]
        test_predictions2.append(Current_pred)
        Current_pred = Current_pred.reshape((1, n_features))
        scaled_train = np.append(scaled_train, Current_pred, axis=0)
        generator = TimeseriesGenerator(scaled_train, scaled_train,
                                        length=n_input, batch_size=64)
        model.fit(generator, epochs=1, verbose=1)

    true_predictions = scaler.inverse_transform(test_predictions)
    true_predictions2 = scaler.inverse_transform(test_predictions2)
    average_list = [(x + y) / 2 for x, y in zip(true_predictions, true_predictions2)]

    ABC=true_predictions.ravel().tolist()
    ABCD=[item[0] for item in true_predictions2]
    ABCE = [item[0] for item in average_list]

    predictions = []
    for i in range (into_the_future):
        predictions.append([ABCE[i]])

    return predictions

class LSTMModel(Resource):
    def post(self):
        historical_data = request.json   # directly get the JSON data as a list
        predictions = train_lstm_model(historical_data)
        return {'predictions': predictions}

api.add_resource(LSTMModel, '/forecast')

if __name__ == '__main__':
    app.run(debug=True)
