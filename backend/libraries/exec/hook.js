import { PythonShell } from "python-shell";
import path from "path";
const __dirname = path.resolve();

const exec = (script, params = []) => {
  return new Promise((resolve, reject) => {
    let options = {
      mode: "json",
      // pythonPath: 'C:/Users/Raa/AppData/Local/Programs/Python/Python310',
      pythonOptions: ["-u"], // get print results in real-time
      scriptPath: path.join(__dirname, "exec"),
      //   args: [user, dataStart, dataEnd],
      args: params,
    };
    PythonShell.run(script, options, function (err, results) {
      if (err) {
        console.log("error spawn");
        throw err;
      }
      return resolve(results);
    });
  });
};

export { exec };
