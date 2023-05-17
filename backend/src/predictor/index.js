const { spawn } = require('child_process');
const jsonData = require('./Engro.json');

const pyfile = spawn('python', ['engro_arima.py']);


var outputt;

pyfile.stdin.write(JSON.stringify(jsonData));
pyfile.stdin.end();

//listening for data from python file
pyfile.stdout.on('data', (data) => {
  //console.log(data.toString());
  outputt=data.toString();
  // Split the output string into individual lines
  const lines = outputt.split('\n');
  // Process each line separately
  for (const line of lines) {
    if (line) {
      console.log(line);
    }
  }
  //console.log(outputt);
});

pyfile.stderr.on('data', (data) => {
  console.error(`Python script error: ${data.toString()}`);
});

pyfile.on('exit', (code) => {
  if (code !== 0) {
    console.error(`Python exited with code ${code}`);
  }
});

//console.log(outputt)
//console.log(jsonData.slice(0,5))



//model says price increase and actual price decrease
//10 companies ka model 