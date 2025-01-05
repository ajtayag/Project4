// Jose Alberto Tayag, 000907201
// march 21, 2024
// wait until the window is fully loaded.
window.addEventListener("load", function () {
  // Retrieve elements
  const rollButton = document.getElementById("rollButton");
  const totalScore = document.getElementById("totalScore");
  const reset = document.getElementById("resetButton");
  const dice1 = document.getElementById("dice1");
  const dice2 = document.getElementById("dice2");
  // Event listener for rolling the dice
  rollButton.addEventListener("click", () => {
    rollDice();
    changeDiceColorOnHover(dice1);
    changeDiceColorOnHover(dice2);
  });
  // Event listeners for changing dice color on mouse enter
  dice1.addEventListener("mouseenter", () => changeDiceColorOnHover(dice1));
  dice2.addEventListener("mouseenter", () => changeDiceColorOnHover(dice2));

  // Event listener for resetting the game
  reset.addEventListener("click", () => {
    totalScore.textContent = 0;
    updateDice(1, dice1);
    updateDice(1, dice2);
  });
  // Keyboard event to roll the dice when spacebar is pressed
  document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      event.preventDefault();
      rollDice();
      changeDiceColorOnHover(dice1);
      changeDiceColorOnHover(dice2);
    }
  });

  // Function to change the background color of a dice
  function changeDiceColorOnHover(diceElement) {
    const colors = ["red", "blue", "green", "yellow"];

    // Generate a random color from the array
    function getRandomColor() {
      const randomIndex = Math.floor(Math.random() * colors.length);
      return colors[randomIndex];
    }
    const color = getRandomColor();
    diceElement.style.backgroundColor = color;
  }
  // Function to simulate rolling the dice
  function rollDice() {
    dice1.classList.add("dice-rolling");
    dice2.classList.add("dice-rolling");

    setTimeout(() => {
      const dice1Value = randomDice();
      const dice2Value = randomDice();
      updateDice(dice1Value, dice1);
      updateDice(dice2Value, dice2);
      totalScore.textContent =
        parseInt(totalScore.textContent) + dice1Value + dice2Value;

      dice1.classList.remove("dice-rolling");
      dice2.classList.remove("dice-rolling");
    }, 600);

    // Generate a random dice roll between 1 and 6
    function randomDice() {
      return Math.floor(Math.random() * 6) + 1;
    }

    // Update the SVG representation of the dice based on its roll
    function updateDice(dieNumber, svgElement) {
      while (svgElement.firstChild) {
        svgElement.removeChild(svgElement.firstChild);
      }

      function createCircle(x, y) {
        const circle = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "circle"
        );
        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);
        circle.setAttribute("r", "10");
        circle.setAttribute("fill", "black");
        return circle;
      }

      const positions = {
        1: [[50, 50]],
        2: [
          [30, 30],
          [70, 70],
        ],
        3: [
          [30, 30],
          [50, 50],
          [70, 70],
        ],
        4: [
          [30, 30],
          [30, 70],
          [70, 30],
          [70, 70],
        ],
        5: [
          [30, 30],
          [30, 70],
          [50, 50],
          [70, 30],
          [70, 70],
        ],
        6: [
          [30, 30],
          [30, 50],
          [30, 70],
          [70, 30],
          [70, 50],
          [70, 70],
        ],
      };

      positions[dieNumber].forEach(([x, y]) => {
        svgElement.appendChild(createCircle(x, y));
      });
    }
  }
});
