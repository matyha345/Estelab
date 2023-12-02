document.addEventListener("DOMContentLoaded", () => {
  const windowsForm = document.querySelector(".main__form");
  const exitWindowsForm = document.querySelector(".main__form-exit");
  const openWindowsFrom = document.querySelector(".main__open--form");

  if (windowsForm && exitWindowsForm && openWindowsFrom) {
    exitWindowsForm.addEventListener("click", () => {
      windowsForm.classList.add("remove");
      openWindowsFrom.classList.remove("remove");
    });

    openWindowsFrom.addEventListener("click", () => {
      windowsForm.classList.remove("remove");
      openWindowsFrom.classList.add("remove");
    });
  }

  const nameInput = document.getElementById("name");
  const textInput = document.getElementById("text");
  const telInput = document.getElementById("tel");
  const massInputs = [nameInput, textInput, telInput];

  telInput.addEventListener("focus", function () {
    if (!this.value.trim()) {
      this.value = "+";
    }
  });
  telInput.addEventListener("blur", function () {
    if (this.value.trim().length === 1) {
      this.value = "";
    }
  });
  telInput.addEventListener("keypress", function () {
    if (this.value.length === 18) {
      this.value = this.value + " ";
    }
  });
  telInput.addEventListener("keypress", function () {
    if (this.value.length === 2) {
      this.value = this.value + " (";
    }
  });
  telInput.addEventListener("keypress", function () {
    if (this.value.length === 7) {
      this.value = this.value + ") ";
    }
  });
  telInput.addEventListener("keypress", function () {
    if (this.value.length === 12 || this.value.length === 15) {
      this.value = this.value + "-";
    }
  });

  for (let index in massInputs) {
    massInputs[index].addEventListener("blur", function () {
      if (this.value.trim()) {
        hangListenerOnInput(this.value.trim(), index);
      }
    });
    massInputs[index].addEventListener("keyup", function () {
      if (massInputs[index].parentNode.querySelector(".myForm__form-error")) {
        hangListenerOnInput(this.value.trim(), index);
      }
    });
  }

  const hangListenerOnInput = (value, index) => {
    switch (index) {
      case "0":
        manageErrorElement(errorsInName(value), index);
        break;
      case "1":
        manageErrorElement(errorsInText(value), index);
        break;
      case "2":
        manageErrorElement(errorsInTel(value), index);
        break;
    }
  };

  const manageErrorElement = (error, index) => {
    if (error) {
      if (massInputs[index].parentNode.querySelector(".myForm__form-error")) {
        massInputs[index].parentNode
          .querySelector(".myForm__form-error")
          .classList.remove("remove");
        massInputs[index].parentNode.querySelector(
          ".myForm__form-error"
        ).innerHTML = error;
      } else {
        let textError = document.createElement("span");
        textError.classList.add("myForm__form-error");
        textError.innerHTML = error;
        massInputs[index].parentNode.append(textError);
      }
      massInputs[index].classList.add("myForm__form--input--wrong");
    } else {
      if (massInputs[index].parentNode.querySelector(".myForm__form-error")) {
        massInputs[index].parentNode
          .querySelector(".myForm__form-error")
          .classList.add("remove");
        massInputs[index].classList.remove("myForm__form--input--wrong");
      }
    }
  };

  const errorsInName = (name) => {
    let textErrorName = "";
    if (!name) {
      textErrorName = "Укажите имя";
    } else if (/[^a-z]/i.test(name) && /[^а-я]/i.test(name)) {
      textErrorName = "Имя может содержать только буквы";
    }
    return textErrorName;
  };

  const errorsInTel = (tel) => {
    let textErrorTel = "";
    if (!tel) {
      textErrorTel = "Укажите номер телефона";
    } else if (!validateTel(tel)) {
      textErrorTel = "Формат: +7 (000) 000-00-00";
    }
    return textErrorTel;
  };

  const errorsInText = (text) => {
    let textErrorText = "";
    if (!text) {
      textErrorText = "Укажите какой у Вас вопрос?";
    }
    return textErrorText;
  };

  const validateTel = (tel) => {
    return tel.match(
      /^[+][0-9][\s][(][0-9]{3}[)][\s][0-9]{3}[-][0-9]{2}[-][0-9]{2}$/
    );
  };

  const changePlaceholderWidth = () => {
    const changeInput = document.querySelector(".myForm__form-textarea--inner");
    window.innerWidth < 766
      ? (changeInput.placeholder = "Какой у Вас вопрос?")
      : (changeInput.placeholder = "Напишите, какой у Вас вопрос?");
  };
  window.addEventListener("resize", changePlaceholderWidth);

  changePlaceholderWidth();



  document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault();

    let isValid = true;

    massInputs.forEach((input, index) => {
      const value = input.value.trim();
      switch (index) {
        case 0:
          manageErrorElement(errorsInName(value), index);
          break;
        case 1:
          manageErrorElement(errorsInText(value), index);
          break;
        case 2:
          manageErrorElement(errorsInTel(value), index);
          break;
      }
      if (input.parentNode.querySelector(".myForm__form-error")) {
        isValid = false;
      }
    });

    if (
      !massInputs.some((input) =>
        input.parentNode.querySelector(".myForm__form-error")
      )
    ) {
      isValid = true;
    }

    const successMessage = document.getElementById("successMessage");

    if (isValid) {
      successMessage.style.display = "flex";
      setTimeout(function () {
        successMessage.style.display = "none";
      }, 6000);

      setTimeout(() => {
        localStorage.setItem("formSubmitted", "true");
      }, 500);

      const isFormSubmitted = localStorage.getItem("formSubmitted");

      if (isFormSubmitted === "true") {
        if (successMessage) {
          const innerSuccessMessage = successMessage.querySelector("p");
          if (innerSuccessMessage) {
            innerSuccessMessage.textContent =
              "Отправлять форму можно не более одного раза";
            innerSuccessMessage.classList.add("error");
          }
        }
      }
    }

    console.log(isValid);
  });
});

