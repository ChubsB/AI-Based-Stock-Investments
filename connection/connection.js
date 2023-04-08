//this script will call the python script. The python script will fetch the data using api, process the data and push the data using api

const { spawn } = require('child_process');

// spawn a Python process and run the script
const pythonProcess = spawn('python', ['./script.py']);

// listen for data from the Python process
pythonProcess.stdout.on('data', (data) => {
  console.log(`Received data from Python: ${data}`);
});

// listen for errors from the Python process
pythonProcess.stderr.on('data', (data) => {
  console.error(`Error from Python: ${data}`);
});

// listen for the Python process to exit
pythonProcess.on('exit', (code) => {
  console.log(`Python process exited with code ${code}`);
});
let result = '';

pythonProcess.stdout.on('data', (data) => {
  result += data;
});

pythonProcess.on('exit', (code) => {
  console.log(`Python process exited with code ${code}`);
  console.log(`Result from Python: ${result}`);
});
