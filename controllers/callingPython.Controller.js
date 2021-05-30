const db = require('../config/sequelize');
const Python = db.pythons;
const spawn = require('child_process').spawn;

exports.readPython = (req,res) => {
  const ls = spawn('python', ['pythonService/my_script.py']);
  ls.stdout.on('data', async (data) => {
    try{
      await saveCharOrder(JSON.parse(data)["expectedOutput"],JSON.parse(data)["forColumnSeparation"])
    }
    catch(error)
    {
      console.log("Failed to save Record",error)
    }

    return res.status(200).send({
      "status" : "success",
      "returnType" : typeof(data),
      "response": JSON.parse(data)["expectedOutput"]
    });
  });

  ls.stderr.on('data', (data) => {
    return res.status(500).send({
      "status" : "Failed",
      "message" : "Unable to read Python reference file"
    });
  });

  ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });  
}

async function saveCharOrder(orgStr,strWithdivisor){
  console.log(orgStr,strWithdivisor)
  var charArray = strWithdivisor.split(':');
  var charOrder = []
  for(var i=0;i<charArray.length;i++)
  {
    if(charArray[i]) charOrder.push(charArray[i]); 
  }
  await Python.create({originalData: orgStr,charOrder: charOrder});

}
