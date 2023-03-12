const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const timerEl = document.querySelector("span");

let previusTimer;

const createTimerAnimator = () => {
  return (seconds) => {
    if (previusTimer) {
      clearInterval(previusTimer);
    }
    changeElementsStatus(true,'Stop','hh:mm:ss')
    const timerId = updateTimer(seconds);
    previusTimer = timerId;
  };
};

const changeElementsStatus = (status,text,message) => {
  inputEl.disabled = status
  buttonEl.textContent = text
  timerEl.textContent = message
}

const stopTimer = (timerId, message) => {
  changeElementsStatus(false,'Start',message)
  clearInterval(timerId);
  
};

const formatTime = (seconds) => {
  const hour = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, "0");
  const min = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const sec = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${hour} час, ${min} минут, ${sec} секунд`;
};

const updateTimer = (seconds) => {
  return setInterval(() => {
    console.log(seconds)
    if (seconds < 0) {
      return stopTimer(previusTimer, "Время вышло!");
    }
    timerEl.textContent = formatTime(seconds);
    seconds--;
  }, 1000);
};

const  validInputHandler = (e) => {
  const value = e.target.value;
  const numberOfValue = parseInt(value.replace(/\D/g, ""));
  if (isNaN(numberOfValue)) {
    e.target.value = "";
  } else {
    e.target.value = numberOfValue;
  }
}

const buttonClickHandler = () => {
  const value = inputEl.value;
  if (isNaN(value) || value == "") {
    stopTimer(previusTimer, "hh:mm:ss");
    return;
  }
  animateTimer(+value);
  inputEl.value = "";
};

const animateTimer = createTimerAnimator();
inputEl.addEventListener("input", (e) => validInputHandler(e));
buttonEl.addEventListener("click", buttonClickHandler);
