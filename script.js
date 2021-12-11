const fields = document.querySelectorAll('[required]') //procurando todas as tagas que tem o atributo required
console.log(fields)

function customValidation(event) {
  const field = event.target

  //logica para verificar se existem erros

  function verifyErrors() {
    let foundError = false

    for (let error in field.validity) {
      if (error != 'customError' && field.validity[error]) {
        foundError = error
      }
    }

    return foundError
  }

  const error = verifyErrors()
  console.log('erro existe: ', error)

  if (error) {
    //trocar mensagem de required
    field.setCustomValidity('este campo é obrigatorio')
  }
  else {
    field.setCustomValidity("");
  }
}

for (let field of fields) {
  field.addEventListener('invalid', customValidation)
}

document.querySelector('form').addEventListener('submit', event => {
  console.log('enviado o form')
  event.preventDefault() //não envia o formulario
})
