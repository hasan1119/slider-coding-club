const inputField = document.getElementById('input-field')
const container = document.getElementById('photo-container')
const header = document.getElementById('header')
const sliderCreator = document.getElementById('slider-creator')
const sliderImg = document.getElementById('slider-image')
const slider = document.getElementById('slider')
const time = document.getElementById('input-time')


inputField.addEventListener('keyup', function (e) {
    if (e.key == "Enter") {
        const inputValue = inputField.value;
        inputField.value = '';
        getData(inputValue)
        header.classList.replace('d-none', 'd-flex')
    }
})


function getData(name) {
    const api = `https://pixabay.com/api/?key=23278526-ccebb0144e3fe9e60ffa4a455&q=${name}`
    fetch(api)
        .then(res => res.json())
        .then(data => showData(data))
}

function showData(data) {
    const photos = data.hits;
    container.innerHTML = ''
    photos.forEach(photo => {
        const div = document.createElement('div')
        div.innerHTML = `        
        <div class="card overflow-hidden mb-4 cal mx-2 border" style="width:260px; height:200px">
            <img onclick="selectImage(event , '${photo.largeImageURL}')" src="${photo.largeImageURL}" class="img-fluid card-img-top">
        </div>`
        container.appendChild(div)
    })

}

const selectedImage = []

function selectImage(event, url) {
    event.target.parentElement.classList.add('selection')
    selectedImage.push(url)
}

sliderCreator.addEventListener('click', sliderImage)



function sliderImage() {
    let duration = Number(time.value) || 1000;
    let len = 0;
    setInterval(() => {
        container.innerHTML = ''
        slider.classList.replace('d-none', 'd-block')
        sliderImg.src = selectedImage[len]
        if (len == selectedImage.length - 1) {
            len = 0
        } else {
            len++
        }
    }, duration)
}