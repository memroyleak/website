let images = [];
let currentIndex = 0;

async function loadImages() {
    const folderUrl = "/images/art";

    images = [];

    try {
        const response = await fetch(folderUrl);

        if (!response.ok) {
            throw new Error(`Failed to get images from folder ${response.status}`);
        }

        const html = await response.text();

        const imageRegex = /href=["']([^"']+\.(jpg|jpeg|png|gif|webp|svg))["']/gi;

        let match;

        while ((match = imageRegex.exec(html)) != null) {
            const file = match[1];
            const separator = folderUrl.endsWith('/') ? '' : '/';
            images.push(folderUrl + separator + file);
        }

        if (images.length === 0) {
            throw new Error('No images found in folder listing');
        }
    } catch (error) {
        throw new Error(`Failed to get images: ${error.message}`);
        return;
    }

    currentIndex = 0;
    showImage();
}

function showImage() {
    if (images.length === 0)
        return;

    const display = document.getElementById('carousel');
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    const caption = document.createElement('figcaption');
    img.src = images[currentIndex];
    let filename = new URL(img.src).pathname.split('/').pop();
    caption.textContent = filename;

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