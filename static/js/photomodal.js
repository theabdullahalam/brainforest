function main(){
    addListeners()
}

function addListeners(){
    // photos
    const photos = document.querySelectorAll(".photograph")
    for (const photo of photos){
        photo.addEventListener("click", onPhotoClick)
    }

    // close button
    const closeButton = document.querySelector("#close-button")
    closeButton.addEventListener("click", hideModal)
}

function onPhotoClick(e){
    showModal()
    const imgNode = e.target
}

function showModal(){
    const modalDiv = document.querySelector("#photomodal")
    modalDiv.classList.remove("hidden")
}

function hideModal(){
    const modalDiv = document.querySelector("#photomodal")
    modalDiv.classList.add("hidden")
}

main()