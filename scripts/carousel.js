let images = [];
let currentIndex = 0;

function preloadImages() {
    const total = images.length;
    const mid = Math.ceil(total / 2);
    const order = [];

    for (let i = 0; i < mid; i++) {
        order.push(i);
        const mirror = total - 1 - i;
        if (mirror !== i) order.push(mirror);
    }

    order.forEach(index => {
        const img = new Image();
        img.src = images[index].src;
    });
}

async function loadImages() {
    images = [];

    try {
        const response = await fetch("/images/art/metadata.json");

        if (!response.ok) {
            throw new Error(`Failed to load image metadata: ${response.status}`);
        }

        images = await response.json();

        if (images.length === 0) {
            throw new Error('No images found in metadata');
        }
    } catch (error) {
        throw new Error(`Failed to get images: ${error.message}`);
        return;
    }

    currentIndex = 0;
    showImage();
    preloadImages();
}

function showImage() {
    if (images.length === 0)
        return;

    const display = document.getElementById('carousel');
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    const caption = document.createElement('figcaption');
    img.src = images[currentIndex].src;
    caption.textContent = images[currentIndex].caption;

    figure.innerHTML = '';
    display.innerHTML = '';

    figure.appendChild(img);
    figure.appendChild(caption);
    display.appendChild(figure);
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage();
}

function previousImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage();
}

document.addEventListener("DOMContentLoaded", function() {
    loadImages();
    document.getElementById('prev-btn')?.addEventListener('click', previousImage);
    document.getElementById('next-btn')?.addEventListener('click', nextImage);
})