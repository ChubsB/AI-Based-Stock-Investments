import pandas as pd
from statsmodels.tsa.arima.model import ARIMA
from sklearn.metrics import mean_squared_error
import numpy as np
import random
import pickle
from pandas.tseries.offsets import CustomBusinessDay
import sys
import json
import math

engro_json_data = sys.stdin.read()
engro_data = json.loads(engro_json_data)
df = pd.DataFrame(engro_data)


train_data = df['Close']
train_data = list(train_data)

print(train_data)
  model=ARIMA(train_data,order=(1,1,1))
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

data = {'Date': date_Range, 'Value': model_pred}
df1 = pd.DataFrame(data)

json_df1 = df1.to_json(orient='records', date_format='iso', date_unit='s')

# print(model_pred)

# print(df1)

# print(latest_date)

print(json_df1)


