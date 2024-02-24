let toMove = true;

const translateOneStep = (circle, side) => {
  if (circle.classList.contains("moveleft")) {
    circle.classList.remove("moveleft");
    circle.style.transform = "translateX(-300px)";
  }

  if (circle.classList.contains("icon-active")) {
    circle.classList.remove("icon-active");
  }

  if (circle.classList.contains("moveright")) {
    circle.classList.remove("moveright");
    circle.style.transform = "translateX(300px)";
  }

  let allStyles = window.getComputedStyle(circle);
  let transformStyle = allStyles.transform;
  let leftindex = transformStyle.indexOf("(");
  let rightindex = transformStyle.indexOf(")");
  let transformValue = transformStyle.substring(leftindex + 1, rightindex);
  let transformValueArr = transformValue.split(",");
  let translate = parseInt(transformValueArr[4].trim());

  if (side == "right") {
    translate += 150;
  } else {
    translate -= 150;
  }

  if (translate >= 450 && side == "right") {
    circle.classList.add("moveleft");
  } else if (translate <= -450 && side == "left") {
    circle.classList.add("moveright");
  } else if (translate == 0) {
    circle.classList.add("icon-active");
    circle.style.transform = `translateX(${translate}px) translateY(-20px)`;
  } else {
    circle.style.transform = `translateX(${translate}px)`;
  }
};

const findSide = (circle) => {
  let allStyles = window.getComputedStyle(circle);
  let transformStyle = allStyles.transform;
  let leftindex = transformStyle.indexOf("(");
  let rightindex = transformStyle.indexOf(")");
  let transformValue = transformStyle.substring(leftindex + 1, rightindex);
  let transformValueArr = transformValue.split(",");
  let translate = parseInt(transformValueArr[4].trim());

  if (translate < 0) {
    if (translate < -150) return { move: 2, side: "right" };
    return { move: 1, side: "right" };
  } else if (translate > 0) {
    if (translate > 150) return { move: 2, side: "left" };
    return { move: 1, side: "left" };
  } else {
    return { move: 0, side: "nomove" };
  }
};

const moveCircles = (num) => {
  if (toMove === false) return;
  const circles = document.getElementsByClassName("circle");
  const { move, side } = findSide(circles[num]);
  if (side == "nomove") return;
  for (let j = 0; j < move; j++) {
    if (j === 0) {
      toMove = false;
      for (let i = 0; i < 5; i++) {
        translateOneStep(circles[i], side);
        setTimeout(() => {
          toMove = true;
        }, 1000);
      }
    } else {
      toMove = false;
      setTimeout(() => {
        for (let i = 0; i < 5; i++) {
          translateOneStep(circles[i], side);
          toMove = true;
        }
      }, 1600);
    }
  }
};
