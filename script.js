const outputElement = document.getElementById("output");
const inputElement = document.getElementById("input");
const inputButton = document.getElementById("input-button");
let currentScene = "pre-ep-name";
let username = "";
let birth = "";
let silent = 0;
inputElement.setAttribute("placeholder", "이름");

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
        "(흐렸던 시아가 보이기 시작한다.)",
        "color: red; font-weight: bold;"
      );

      setTimeout(
        () =>
          displayMessageWithTyping(
            "(시발 왜 내 팔이 안움직이지...?)",
            "color: red; font-weight: bold;"
          ),
        3000
      );
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
      setTimeout(
        () =>
          displayMessage(
            `<pre>${asciiArt}</pre>`,
            "color: red; font-weight: bold;"
          ),
        5000
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
      if (userInput.includes("풀기")) {
        currentScene = "ep2";
        displayMessage("여기까지 ^^");
      } else if (userInput.length === 0 && silent === 1) {
        displayMessageWithTyping(
          "(*당신은 아무말도 안했으며 아무일도 일어나지 않았습니다.)",
          "color: white; font-weight: bold;"
        );
      } else {
        displayMessageWithTyping(
          `(*당신은 ${userInput}를 시도하였으나 실패하였습니다.)`,
          "color: white; font-weight: bold;"
        );
        setTimeout(() =>
          displayMessageWithTyping(
            `(*하지만 손에 끈이 약하게 묶여 있어 풀만하다는것을 느꼈습니다.)`,
            "color: white; font-weight: bold;",
            4000
          )
        );
      }
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

// 입력 버튼 클릭 이벤트 처리
inputButton.addEventListener("click", handleInput);
