const viewDetailsButton = document.querySelector("#viewDetailsButton");

viewDetailsButton.addEventListener("click", () => {
    const passedList = document.querySelector("#viewDetails")
    let list = passedList.innerHTML.split(",")
    passedList.innerHTML = ""

    const ol = document.createElement('ol')
    

    for(i=0; i<list.length; i++) {
        const li = document.createElement('li')

        console.log(list[i])
        li.append(list[i])
        ol.appendChild(li)
    }
    
    passedList.append(ol);

    passedList.style.display = "block";
    viewDetailsButton.style.display = "none";

})