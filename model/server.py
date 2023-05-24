from flask import Flask, request
from flask_restful import Resource, Api
import numpy as np
from keras.models import Sequential
from keras.layers import LSTM, Dense
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import json

app = Flask(__name__)
api = Api(app)

def extract_close_values(json_data):
    close_values = [data["Close"] for data in json_data]
    return close_values

# def train_lstm_model(historicalData, testData):
#     # Normalize the data
#     close_prices = extract_close_values(historicalData)
#     train_data = np.array(close_prices)
#     scaler = MinMaxScaler(feature_range=(0, 1))
#     train_data = scaler.fit_transform(train_data.reshape(-1, 1))

#     # Split the data into input (X) and output (y) variables
#     X_train = train_data[:-1]
#     y_train = train_data[1:]

#     # Reshape the input data for LSTM (samples, time steps, features)
#     X_train = np.reshape(X_train, (X_train.shape[0], 1, X_train.shape[1]))

#     # Create the LSTM model
#     model = Sequential()
#     model.add(LSTM(50, input_shape=(1, 1)))
#     model.add(Dense(1))
#     model.compile(loss='mean_squared_error', optimizer='adam')

#     # Train the LSTM model
#     model.fit(X_train, y_train, epochs=3, batch_size=1, verbose=1)

#     # Forecast the next 5 days
#     X_forecast = train_data[-1:].reshape((1, 1, 1))
#     predicted_values = []

#     for _ in range(15):
#         y_pred = model.predict(X_forecast)
#         predicted_values.append(y_pred[0, 0])
#         X_forecast = np.array([[[y_pred[0][0]]]])  # Fix the shape of X_forecast

#     predicted_values = np.array(predicted_values).reshape(-1, 1)
#     predicted_values = scaler.inverse_transform(predicted_values)  # convert predictions back to original scale

#     # Calculate errors
#     mae = mean_absolute_error(testData, predicted_values)
#     mse = mean_squared_error(testData, predicted_values)
#     rmse = np.sqrt(mse)
#     r2 = r2_score(testData, predicted_values)

#     # Return the predicted values and evaluation metrics
#     return predicted_values.flatten(), mae, mse, rmse, r2

# class LSTMModel(Resource):
#     def post(self):
#         historical_data = request.json['historical_data']
#         test_data = request.json['test_data']
        
#         # Ensure testData is a numpy array
#         test_data = np.array(test_data)

#         predictions, mae, mse, rmse, r2 = train_lstm_model(historical_data , test_data)
#         return {
#             'predictions': predictions.tolist(), 
#             'mae': mae, 
#             'mse': mse, 
#             'rmse': rmse, 
#             'r2': r2
#         }

def train_lstm_model(historicalData):
    # Normalize the data
    close_prices = extract_close_values(historicalData)
    train_data = np.array(close_prices)
    scaler = MinMaxScaler(feature_range=(0, 1))
    train_data = scaler.fit_transform(train_data.reshape(-1, 1))

    # Split the data into input (X) and output (y) variables
    X_train = train_data[:-1]
    y_train = train_data[1:]

    # Reshape the input data for LSTM (samples, time steps, features)
    X_train = np.reshape(X_train, (X_train.shape[0], 1, X_train.shape[1]))

    # Create the LSTM model
    model = Sequential()
    model.add(LSTM(50, input_shape=(1, 1)))
    model.add(Dense(1))
    model.compile(loss='mean_squared_error', optimizer='adam')

    # Train the LSTM model
    model.fit(X_train, y_train, epochs=3, batch_size=1, verbose=1)

    # Forecast the next 5 days
    X_forecast = train_data[-1:].reshape((1, 1, 1))
    predicted_values = []

    for _ in range(5):
        y_pred = model.predict(X_forecast)
        predicted_values.append(y_pred[0, 0])
        X_forecast = np.array([[[y_pred[0][0]]]])  # Fix the shape of X_forecast

    predicted_values = np.array(predicted_values).reshape(-1, 1)
    predicted_values = scaler.inverse_transform(predicted_values)  # convert predictions back to original scale

    # Return the predicted values and evaluation metrics
    return predicted_values.flatten()

class LSTMModel(Resource):
    def post(self):
        historical_data = request.json['historical_data']
        # test_data = request.json['test_data']
        
        # # Ensure testData is a numpy array
        # test_data = np.array(test_data)

        predictions = train_lstm_model(historical_data)
        return {
            'predictions': predictions.tolist(), 
        }

api.add_resource(LSTMModel, '/forecast')

if __name__ == '__main__':
    app.run(debug=True)


# "test_data": [270.07, 269.36, 270.31, 277.5, 284.68]