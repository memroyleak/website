---
layout: default
title: "art"
nav_title: art
nav_order: 3
permalink: /pages/art/
scripts:
    - carousel
---

# art!

an assortment of art i've made!

<div id="carousel-container" class="carousel">
    <div id="carousel" class="carousel-display"></div>
    <div class="carousel-controls">
        <button id="prev-btn" class="carousel-btn prev">&lt;</button>
        <button id="next-btn" class="carousel-btn next">&gt;</button>
    </div>
</div>

<style>
    .carousel {
        max-width: 600px;
        margin: 2rem auto;
        text-align: center;
    }

    .carousel-display {
        display: flex;
        align-items: center;
        justify-content: center;
        max-height: 600px;
        margin-bottom: 1rem;
        overflow: hidden;
    }

    .carousel-display figure {
        margin: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    .carousel-display img {
        margin-top: 1rem;
        align-items: center;
        justify-content: center;
        max-width: 100%;
        max-height: 600px;
        object-fit: contain;
    }

    .carousel-display figcaption {
        font-size: 14pt;
        margin-top: 1rem;
        flex-shrink: 0;
    }

    .carousel-controls {
        display: flex;
        gap: 2rem;
        justify-content: center;
    }

    .carousel-btn {
        font-family: "Determination"
        padding: 0.5rem 1rem;
        font-size: 1.2rem;
        background: #000;
        color: #fff;
        outline: 2px solid #fff;
        cursor: pointer;
        transition: background 0.2s;
    }

    .carousel-btn:hover {
        background: #444;
    }
</style>