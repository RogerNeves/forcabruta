let json = require('./valores.json')
const md5 = require('md5')
const fs = require('fs')
const gabarito = json.gabarito

start = async () => {
  while (json.resultado == null) {
    if (json.valores.length == 0) {
      console.log('aqui')
      json.valores.push(33)
    }
    console.log(json.valores == [])
    const str = json.valores.map(valor=> String.fromCharCode(valor)).join('')
    const md5Str = md5(str)
    if(md5Str == gabarito)
      json.resultado = str
    console.log(str)
    console.log(md5Str)
    json.valores = adicionar(json.valores, json.valores.length-1)
    await sleep(2)
    await fs.writeFile('./valores.json', JSON.stringify(json) , (err)=>{
      if(err)
        console.log(err)
      else
      console.log('feito')
    })
  }
}
const adicionar = (valores, indice, index) => {
  if (valores[indice] + 1 >= 127 && indice > 0) {
    valores[indice] = 33
    valores = adicionar(valores, indice - 1, index)
  }
  else if (valores[indice] + 1 >= 127 && indice == 0) {
    valores[indice] = 33
    valores.push(33)
  }
  else if (valores[indice] + 1 < 127) {
    valores[indice] = valores[indice] + 1
  }
  return valores
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

start()