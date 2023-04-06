import pandas as pd
from statsmodels.tsa.arima.model import ARIMA
from sklearn.metrics import mean_squared_error
from math import sqrt

# Preprocess data
df['Date'] = pd.to_datetime(df['Date'])
df.set_index('Date', inplace=True)
train, test = df[:-30], df[-30:]

# ARIMA model
model = ARIMA(train['Close'], order=(1, 1, 1))
model_fit = model.fit()
predictions = model_fit.forecast(steps=30)
rmse = sqrt(mean_squared_error(test['Close'], predictions))

print("RMSE:", rmse)
