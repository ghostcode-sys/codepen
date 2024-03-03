const changeClass = (num) => {
    const activeEle = document.getElementsByClassName("active");
    activeEle[0].classList.remove("active");

    const divEle = document.getElementsByClassName("btnDiv");

    divEle[num].classList.add("active");
}   