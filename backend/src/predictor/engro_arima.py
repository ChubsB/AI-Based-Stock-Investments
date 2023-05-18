
=======
# to install dependencies check out the read.txt file
# use command pip install -r read.txt 
# this will install these packages 

import pandas as pd
from statsmodels.tsa.arima.model import ARIMA
from sklearn.metrics import mean_squared_error
import numpy as np
import random
import pickle
from pandas.tseries.offsets import CustomBusinessDay
import sys
import json

engro_json_data = sys.stdin.read()
engro_data = json.loads(engro_json_data)
df = pd.DataFrame(engro_data)
train_data = df['Close']
train_data = list(train_data)

print(train_data)
  model=ARIMA(train_data,order=(1,1,1))
# Set the 'Date_' column as the index
#df.set_index('Date_', inplace=True)

# Model already tried and tested using pacf and acf and auto arima to figure out the best arima inputs i.e. p,d,q

# Allocating the close price data till date as training data
train_data = df['Close']
train_data = list(train_data)

# List to store the predictions of next 30 days
model_pred=[]

# Training the model and forecasting the next 30 days from current date 
forecasting_period = 30
for i in range(forecasting_period):
  model=ARIMA(train_data,order=(1,1,3))
  model_fit=model.fit()
  output=model_fit.forecast()
  yhat=list(output)[0]
  model_pred.append(yhat)
  random_number = random.uniform(-10, 10) #randomness is hardcoded but can later be tested and range can be 
  actual=yhat           # set to the average difference of previous month/ last 10 days  
  train_data.append(actual)

latest_date = df['Date_'].max()

latest_date = pd.to_datetime(latest_date)

custom_business_days = CustomBusinessDay(weekmask='Mon Tue Wed Thu Fri')

date_Range = pd.date_range(start=latest_date + pd.DateOffset(days=1), periods=forecasting_period, freq=custom_business_days)

=======
  actual=yhat + random_number             # set to the average difference of previous month/ last 10 days  
  train_data.append(actual)

# get the latest date in the dataset
#latest_date = df.index.max() #/ if df=df.sort_values(by='Date_') = complete

# test this incase above line gives error
latest_date = df['Date_'].max()

# line not needed in colab for some reason storing in string so convert
latest_date = pd.to_datetime(latest_date)

# custom days made according to the schedule of pakistan stock exchange
custom_business_days = CustomBusinessDay(weekmask='Sun Mon Tue Wed Thu')

# let's generate future dates from latest date in the dataset
date_Range = pd.date_range(start=latest_date + pd.DateOffset(days=1), periods=forecasting_period, freq=custom_business_days)


# let's create a dataframe too for the forecast dates and their values
data = {'Date': date_Range, 'Value': model_pred}
df1 = pd.DataFrame(data)

json_df1 = df1.to_json(orient='records', date_format='iso', date_unit='s')

# print(model_pred)

# print(df1)

# print(latest_date)
=======
# give model forecast as output in a new stdout line
print(model_pred)

# give dataframe as output in a new stdout line
print(df1)

# print latest date for confirmation
print(latest_date)
print(json_df1)


