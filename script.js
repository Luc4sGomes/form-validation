const fields = document.querySelectorAll("[required]"); //procurando todas as tagas que tem o atributo required

function validateField(field) {
  function verifyErrors() {
    let foundError = false;

    for (let error in field.validity) {
      if (field.validity[error] && !field.validity.valid) {
        foundError = error;
      }
    }

    return foundError;
  }

  function customMessage(typeError) {
    const messages = {
      text: {
        valueMissing: "Por Favor preencha este campo"
      },
      email: {
        valueMissing: "Email é obrigatorio",
        typeMismatch: "Por favor, preencha um email válido"
      }
    };

    return messages[field.type][typeError];
  }

  function setCustomMessage(message) {
    const spanError = field.parentNode.querySelector("span.error");

    if (message) {
      spanError.classList.add("active");
      spanError.innerHTML = message;
    } else {
      spanError.classList.remove("active");
      spanError.innerHTML = "";
    }
  }

  return function () {
    const error = verifyErrors();

    if (verifyErrors()) {
      const message = customMessage(error);

      field.style.borderColor = "red";
      setCustomMessage(message);
    } else {
      field.style.borderColor = "green";
      setCustomMessage();
    }
  };
}

function customValidation(event) {
  //eliminar o bubble

  const field = event.target;
  const validation = validateField(field);

  validation();

  //logica para verificar se existem erros

  function verifyErrors() {
    let foundError = false;

    for (let error in field.validity) {
      if (field.validity[error] && !field.validity.valid) {
        foundError = error;
      }
    }

    return foundError;
  }
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
