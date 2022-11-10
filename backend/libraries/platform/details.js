import { PythonShell } from "python-shell";

import path from "path";
const __dirname = path.resolve();


const getAllDetailsByDate = (dataStart, dataEnd) => {
  return new Promise((resolve, reject) => {
    let options = {
      mode: "json",
      // pythonPath: 'C:/Users/Raa/AppData/Local/Programs/Python/Python310',
      pythonOptions: ["-u"], // get print results in real-time
      scriptPath: path.join(__dirname, "exec"),
      //   args: ['test', new Date(dataStart).toLocaleDateString("en-US"),new Date(dataEnd).toLocaleDateString("en-US")],
      args: ["test", dataStart, dataEnd],
    };

    PythonShell.run(
      "getAllDetailByDate.py",
      options,
      function (err, results) {
        if (err) {
          console.log("error spawn");
          throw err;
        }
        return resolve(results);
      }
    );
  });
};
 
export default {
    getAllDetailsByDate: getAllDetailsByDate, 
};
