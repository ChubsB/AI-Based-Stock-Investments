# -*- coding: utf-8 -*-

import numpy as np
from keras.models import Sequential
from keras.layers import LSTM, Dense
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import pandas as pd
# import matplotlib.pyplot as plt
from keras.preprocessing.sequence import TimeseriesGenerator
from tensorflow.keras.optimizers import Adam
from keras.layers import Dropout

# insert here data feeding logic
df = pd.read_json('Engro.json')
#split the column into two using 'T' as delimiter
df[['Date_', 'Time']] = df['Date_'].str.split('T', expand=True)
df['Date_'] = pd.to_datetime(df['Date_'])
df1 = df[['Date_','Close']]
df1.set_index('Date_', inplace=True)

#df1.plot(figsize=(12,6))

train = df1
# train = df1.iloc[:-5]
# test = df1.iloc[-5:]
train = np.array(train)
# test = np.array(test)

train = train.reshape(-1,1)
# test = test.reshape(-1,1)

scaler = MinMaxScaler()
scaler.fit(train)
scaled_train = scaler.transform(train)
#scaled_test = scaler.transform(test)

# define generator
n_input = 500    #100-500
n_features = 1
generator = TimeseriesGenerator(scaled_train, scaled_train, length=n_input, batch_size=64)

model=Sequential()
model.add(LSTM(50,return_sequences=True,input_shape=(n_input,1)))
model.add(LSTM(50,return_sequences=True))
model.add(LSTM(50))
model.add(Dense(1))
model.compile(loss='mean_squared_error',optimizer='adam')

model.fit(generator,validation_data=generator,epochs=5, batch_size=64, verbose=1)

last_train_batch = scaled_train[-n_input:]
last_train_batch = last_train_batch.reshape((1, n_input, n_features))
#model.predict(last_train_batch)[0] , scaled_test[0]

test_predictions = []
#scaled_train2= scaled_train[:-1]
first_eval_batch = last_train_batch[-n_input:]#scaled_train2[-n_input:]
current_batch = first_eval_batch.reshape((1, n_input, n_features))
into_the_future=5

for i in range(into_the_future):
    
    # get the prediction value for the first batch
    current_pred = model.predict(current_batch)[0]
    
    # append the prediction into the array
    test_predictions.append(current_pred) 
    
    # use the prediction to update the batch and remove the first value
    current_batch = np.append(current_batch[:,1:,:],[[current_pred]],axis=1)

test_predictions2=[]
for _ in range(into_the_future):
    # Predict the next value based on the last batch
    current_pred = model.predict(last_train_batch)[0]
    
    # Append the predicted value to the test predictions list
    test_predictions2.append(current_pred)

    # Reshape current_pred to match the shape of scaled_train
    current_pred = current_pred.reshape((1, n_features))

    #update the train data set with predicted value
    scaled_train = np.append(scaled_train, current_pred, axis=0)

    # Update the generator with the new scaled input and targets
    generator = TimeseriesGenerator(scaled_train, scaled_train,
                                    length=n_input, batch_size=64)
    
    # Retrain the model with the updated generator
    model.fit(generator, epochs=1, verbose=1, batch_size=64)


true_predictions = scaler.inverse_transform(test_predictions)
true_predictions2 = scaler.inverse_transform(test_predictions2)
#true_test = scaler.inverse_transform(scaled_test)

average_list = [(x + y) / 2 for x, y in zip(true_predictions, true_predictions2)]

ABC=true_predictions.ravel().tolist()
#XYZ= true_test.ravel().tolist()
ABCD=[item[0] for item in true_predictions2]
ABCE = [item[0] for item in average_list]

# # Calculate errors
# mae = mean_absolute_error(XYZ, ABC)
# mse = mean_squared_error(XYZ, ABC)
# rmse = np.sqrt(mse)
# r2 = r2_score(XYZ, ABC)

# # Return the predicted values and evaluation metrics
# mae, mse, rmse, r2

# # Calculate errors
# mae = mean_absolute_error(XYZ, ABCD)
# mse = mean_squared_error(XYZ, ABCD)
# rmse = np.sqrt(mse)
# r2 = r2_score(XYZ, ABCD)

# # Return the predicted values and evaluation metrics
# mae, mse, rmse, r2

# # Calculate errors
# mae = mean_absolute_error(XYZ, ABCE)
# mse = mean_squared_error(XYZ, ABCE)
# rmse = np.sqrt(mse)
# r2 = r2_score(XYZ, ABCE)

# # Return the predicted values and evaluation metrics
# mae, mse, rmse, r2

for i in range (into_the_future):
  print(ABC[i], ABCD[i], ABCE[i])#, XYZ[i])