import json

def my_function():
  i = 0
  listValue = []
  while i < 20 :
      n = 2*i + 1
      listValue.append(n)
      i = i + 1
  return listValue
    
def suffle():
    listValue = my_function()
    length = len(listValue)
    limit = 8
    startFrom = 1
    strVal = "LuxPMsoft" 
    newStr = ''
    newStrWithSeparator = '' 
    for char in strVal:
        if startFrom <= limit:
            newStr = newStr + char + str(listValue[length-startFrom]) 
            newStrWithSeparator = newStrWithSeparator + ":" + char + ":" + str(listValue[length-startFrom])
            startFrom+=1
        else:
            temp = char
            newStr = newStr + char
            newStrWithSeparator = newStrWithSeparator + ':' + char
    data = {
        "expectedOutput" : newStr,
        "forColumnSeparation" : newStrWithSeparator
    }
    return json.dumps(data)     

print(suffle())    
        

     