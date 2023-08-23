const outputElement = document.getElementById("output");
const inputElement = document.getElementById("input");
const inputButton = document.getElementById("input-button");
let currentScene = "pre-ep-name";
let username = "";
let birth = "";
let silent = 0;
inputElement.setAttribute("placeholder", "이름");

function changeBackgroundColor(color) {
  document.body.style.backgroundColor = color;
}

function displayAsciiArt(asciiArt) {
  const asciiElement = document.createElement("pre");
  asciiElement.innerHTML = asciiArt;
  asciiElement.style.color = "black";
  asciiElement.style.fontWeight = "bold";
  outputElement.appendChild(asciiElement);
}
function playBulbSound() {
  const bulbSound = document.getElementById("bulb-sound");
  bulbSound.currentTime = 0;
  bulbSound.play();
}

function playButtonSound() {
  const buttonSound = document.getElementById("button-sound");
  buttonSound.currentTime = 0; // Reset the sound to the beginning
  buttonSound.play();
}

function displayShakingMessage(message, style = "") {
  const shakingMessage = document.createElement("p");
  shakingMessage.innerHTML = message;
  shakingMessage.style = style;
  shakingMessage.classList.add("shake-animation"); // Add the shaking class
  outputElement.appendChild(shakingMessage);
}
function displayMessageWithTyping(message, style = "") {
  const typingDelay = 25;
  const displayText = message.replace(/ /g, "&nbsp;"); // 공백 문자 처리

  let currentIndex = 0;
  const displayInterval = setInterval(() => {
    outputElement.innerHTML = `<p style="${style}">${displayText.substring(
      0,
      currentIndex
    )}</p>`;
    currentIndex++;

    if (currentIndex > displayText.length) {
      clearInterval(displayInterval);
    }
  }, typingDelay);
}

function displayMessage(message, style = "") {
  outputElement.innerHTML += `<p style="${style}">${message}</p>`;
}

function clearOutput() {
  outputElement.innerHTML = "";
}

function mbd() {
  inputElement.style.display = "none";
  inputButton.style.display = "none";
}

function mbe() {
  inputButton.style.display = "block";
  inputElement.style.display = "block";
}

function handleInput() {
  const userInput = inputElement.value;
  inputElement.value = "";

  switch (currentScene) {
    case "pre-ep-name":
      if (userInput.length > 1) {
        clearOutput();
        username = userInput;
        currentScene = "pre-ep-birthday";
        displayMessageWithTyping(
          "오늘은 내 생일일텐데.. 내 생일이 몇일이였지....",
          "color: white; font-weight: bold;"
        );
        inputElement.setAttribute("placeholder", "생년월일(6글자)");
      } else {
        clearOutput();
        displayMessageWithTyping(
          "뭔진 몰라도 그게 아니였던거 같은데....",
          "color: white; font-weight: bold;"
        );
      }
      break;
    case "pre-ep-birthday":
      if (userInput.length === 6) {
        birth = userInput;
        clearOutput();
        inputElement.style.display = "none";
        document.getElementById("input-button").innerText = "👁︎";
        inputButton.style.backgroundColor = "red";
        currentScene = "ep1";
      } else {
        clearOutput();
        displayMessageWithTyping(
          "자세히 기억이 안나도 그건 아니였어....",
          "color: white; font-weight: bold;"
        );
      }
      break;
    case "ep1":
      mbd();
      document.getElementById("input-button").innerText = "기억 시도";
      inputButton.style.backgroundColor = "black";
      clearOutput();

      displayMessageWithTyping(
        "(서서히 정신이 든다.)",
        "color: red; font-weight: bold;"
      );

      setTimeout(
        () =>
          displayShakingMessage(
            "(여기는 어디지...?)",
            "color: red; font-weight: bold;"
          ),
        3000
      );

      setTimeout(() => {
        mbe();
        inputElement.setAttribute("placeholder", "행동");
        document.getElementById("input-button").innerText = "실행";
        silent = 1;
        currentScene = "Scene1";
      }, 5000);
      break;

    case "Scene1":
      clearOutput();
      if (userInput.includes("더듬")) {
        clearOutput();
        inputElement.style.display = "none";
        inputButton.style.backgroundColor = "gray";
        document.getElementById("input-button").innerText = "💡";

        inputButton.style.backgroundColor = "white";
        currentScene = "Scene2";
      } else if (userInput.length === 0 && silent === 1) {
        clearOutput();
        displayMessageWithTyping(
          "(*당신은 아무말도 안했으며 아무일도 일어나지 않았습니다.)",
          "color: white; font-weight: bold;"
        );
      } else {
        clearOutput();
        displayMessage(
          `(*당신은 ${userInput}를 시도하였으나 어두워서 실패하였습니다.)`,
          "color: white; font-weight: bold;"
        );
        displayMessage(
          `(*앞을 더듬어 보면 추가 정보를 얻을수 있을것 같습니다.)`,
          "color: red; font-weight: bold;"
        );
      }
      break;
    case "Scene2":
      const asciiArt = `
    ...:.:.:::::::::::..
    .:^:::^:::^:::^::^^.
    .:^.^::::::::::^.:^.
    .:^.^..........^.:^.
    .:^.^..........^.:^.
    .:^.^..........^.:^.
    .:^.^..........^.:^.
    .:^.^..........^.:^.
    .:^.^..........^.:^.
    .:^.~..........^.:^.
    .:^.:^:........^.:^.
    .:^.??!^.......^.:^.
    .:^.!!^........^.:^.
    .:^.^^:........^.:^.
    .:^.^..........^.:^.
    .:^.^..........^.:^.
    .:^.^..........^.:^.
    .:^.^..........^.:^.
    .:^.^..........^.:^.
    .:^.^::::::::::^.:^.
    .:^..............:^.
     .                ..
    `;
      displayAsciiArt(asciiArt);
      playBulbSound();
      changeBackgroundColor("white");
      displayMessage(
        "네 맞아요 미완이에요  ( ͡^ ͜ʖ ͡^ ) ㅋ",
        "color: black; font-weight: bold;"
      );
      mbd();
      break;
    default:
      displayMessage(
        "잘못된 접근입니다. 새로고침해서 새 게임을 시작하세요. :(",
        "color: red; font-weight: bold;"
      );
      currentScene = "pre-ep-name";
      break;
  }
}

// 초기화
displayMessageWithTyping(
  "... 내 이름이 뭐였지",
  "color: white; font-weight: bold;"
);
inputElement.addEventListener("keydown", (event) => {
  // Check if the Enter key is pressed (keyCode 13) and the button is visible
  if (
    event.keyCode === 13 &&
    inputButton.style.display !== "none" &&
    inputElement.style.display !== "none"
  ) {
    event.preventDefault(); // Prevent the default Enter key behavior

    handleInput(); // Trigger the input handling
    playButtonSound(); // Play the sound effect
  }
});

// Add a click event listener to the input button
inputButton.addEventListener("click", () => {
  handleInput(); // Trigger the input handling
  playButtonSound(); // Play the sound effect
});
