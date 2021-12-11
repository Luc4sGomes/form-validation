const fields = document.querySelectorAll("[required]"); //procurando todas as tagas que tem o atributo required
console.log(fields);

function validateField(field) {
  function verifyErrors() {
    let foundError = false;

    for (let error in field.validity) {
      if (field.validity[error] && !field.validity.valid) {
        foundError = error;
      }
    }

    console.log(foundError);

    return foundError;
  }

  function setCustomMessage(message) {
    if (message) {
      spanError.classList.add("active");
      spanError.innerHTML = "campo obrigatorio";
    } else {
      spanError.classList.remove("active");
      spanError.innerHTML = "";
    }
  }

  return function () {
    if (verifyErrors()) {
      setCustomMessage("Campo Obrigatorio");
    } else {
      setCustomMessage();
    }
  };
}

function customValidation(event) {
  //eliminar o bubble
  event.preventDefault();

  const field = event.target;
  const validation = valideField(field);

  //logica para verificar se existem erros

  function verifyErrors() {
    let foundError = false;

    for (let error in field.validity) {
      if (field.validity[error] && !field.validity.valid) {
        foundError = error;
      }
    }

    console.log(foundError);

    return foundError;
  }

  console.log("erro existe: ", error);

  const spanError = field.parentNode.querySelector("span.error");
}

for (let field of fields) {
  field.addEventListener("invalid", event => {
    event.preventDefault();
    customValidation(event);
  });
  field.addEventListener("blur", customValidation);
}

document.querySelector("form").addEventListener("submit", event => {
  console.log("enviado o form");
  event.preventDefault(); //não envia o formulario
});
