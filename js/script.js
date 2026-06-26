let images = [
    {
        id: 1,
        title: "Mountain Sunrise",
        category: "Nature",
        src: "https://plus.unsplash.com/premium_photo-1676320526001-07b75bd19ae3?w=800&q=80",
        alt: "Mountain Sunrise"
    },
    {
        id: 2,
        title: "Forest Path",
        category: "Nature",
        src: "https://images.unsplash.com/photo-1623967680551-3e4694e2c9ad?q=80&w=687",
        alt: "Forest Path"
    },
    {
        id: 3,
        title: "City Skyline",
        category: "Architecture",
        src: "https://images.unsplash.com/photo-1541423408854-5df732b6f6d1?q=80&w=1170",
        alt: "City Skyline"
    },
    {
        id: 4,
        title: "Glass Tower",
        category: "Architecture",
        src: "https://images.unsplash.com/photo-1675754965318-5d31291657d4?q=80&w=735",
        alt: "Glass Tower"
    },
    {
        id: 5,
        title: "Santorini",
        category: "Travel",
        src: "https://plus.unsplash.com/premium_photo-1697729900945-598459160f7b?w=800&q=80",
        alt: "Santorini"
    },
    {
        id: 6,
        title: "Tokyo Streets",
        category: "Travel",
        src: "https://images.unsplash.com/photo-1573455494057-12684d151bf4?q=80&w=662",
        alt: "Tokyo Streets"
    },
    {
        id: 7,
        title: "Color Burst",
        category: "Abstract",
        src: "https://plus.unsplash.com/premium_photo-1675092841518-34b3dd44d981?q=80&w=880",
        alt: "Color Burst"
    },
    {
        id: 8,
        title: "Neon Waves",
        category: "Abstract",
        src: "https://images.unsplash.com/photo-1635614017406-7c192d832072?q=80&w=687",
        alt: "Neon Waves"
    },
    {
        id: 9,
        title: "Autumn Lake",
        category: "Nature",
        src: "https://images.unsplash.com/photo-1470748085385-5fbb3018c796?q=80&w=1124",
        alt: "Autumn Lake"
    },
    {
        id: 10,
        title: "Desert Dunes",
        category: "Travel",
        src: "https://images.unsplash.com/photo-1542401886-65d6c61db217?q=80&w=1170",
        alt: "Desert Dunes"
    },
    {
        id: 11,
        title: "Old Bridge",
        category: "Architecture",
        src: "https://images.unsplash.com/photo-1694084854989-24693f767f98?q=80&w=1331",
        alt: "Old Bridge"
    },
    {
        id: 12,
        title: "Fluid Art",
        category: "Abstract",
        src: "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=687",
        alt: "Fluid Art"
    }
];

const galleryGrid = document.getElementById('gallery-grid');
const filterButtons = document.getElementById('filter-buttons');
const searchInput = document.getElementById('search-input');

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxCategory = document.getElementById("lightbox-category");
const currentIndexEl = document.getElementById("current-index");
const totalImagesEl = document.getElementById("total-images");
const closeBtn = document.getElementById("close-lightbox");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const openFullImageBtn = document.getElementById("download-btn");

let currentIndex = 0;
let activeImages = [];

const renderGallery = (filteredImages) => {
    galleryGrid.innerHTML = "";
    filteredImages.forEach(image => {
        let div = document.createElement("div");
        div.innerHTML = `
            <div class="gallery-card" data-id="${image.id}">
                <img src="${image.src}" alt="${image.alt}">
                <div class="card-overlay">
                    <h3>${image.title}</h3>
                    <span class="category-tag">${image.category}</span>
                </div>
            </div>
        `;
        galleryGrid.appendChild(div.firstElementChild);
    });

    // Adding a click event listener to each card for opening the lightbox
    galleryGrid.childNodes.forEach((card, idx) => {
        card.addEventListener("click", (e) => {
            openLightbox(idx);
        });
    });
}

const renderFilters = () => {
    let defCategories = images.map(img => img.category);
    let uniqueCategories = new Set(defCategories);

    let categories = ["All", ...uniqueCategories];

    categories.forEach((category, idx) => {
        let btn = document.createElement("button");
        btn.classList.add("filter-btn");
        if (category === "All") {
            btn.classList.add("active");
        }
        btn.dataset.category = `${category}`;
        btn.textContent = category;

        filterButtons.append(btn);
    });
}

const filterAndSearch = () => {
    const allBtns = filterButtons.querySelectorAll(".filter-btn");
    const activeBtn = document.querySelector(".filter-btn.active");
    const activeBtnCategory = activeBtn.dataset.category;

    console.log(activeBtnCategory);
    let searchVal = searchInput.value.toLowerCase();

    let filteredImages = images.filter((image, idx) => {
        return (activeBtnCategory === "All" || image.category === activeBtnCategory) && image.title.toLowerCase().includes(searchVal);
    });
    renderGallery(filteredImages);
    activeImages = filteredImages;
}

const openLightbox = (index) => {
    currentIndex = index;
    activeImages = images;
    updateLightbox();
    lightbox.classList.add("active");
}

const updateLightbox = () => {
    lightboxImage.src = activeImages[currentIndex].src;
    lightboxTitle.textContent = activeImages[currentIndex].title;
    lightboxCategory.textContent = activeImages[currentIndex].category;

    currentIndexEl.textContent = currentIndex + 1;
    totalImagesEl.textContent = activeImages.length;
}

const closeLightbox = () => {
    lightbox.classList.remove("active");
    lightboxImage.src = "";
}

const navigateLightbox = (direction) => {
    currentIndex = (currentIndex + direction + activeImages.length) % activeImages.length;
    updateLightbox();
}

function main() {
    renderFilters();
    renderGallery(images);

    // Adding a click event listener to filter buttons
    filterButtons.addEventListener("click", (e) => {
        const allBtns = filterButtons.querySelectorAll(".filter-btn");

        allBtns.forEach((btn) => {
            btn.classList.remove("active");
        });
        if (e.target.classList.contains("filter-btn")) {
            e.target.classList.add("active");
            filterAndSearch();
        }
    });

    // Adding an input event listener to searchBox
    searchInput.addEventListener("input", (e) => {
        filterAndSearch();
    });


    // Adding click event listeners to close, prev and next buttons:
    closeBtn.addEventListener("click", closeLightbox);
    prevBtn.addEventListener("click", (e) => {
        navigateLightbox(-1);
    });
    nextBtn.addEventListener("click", (e) => {
        navigateLightbox(1);
    });

    // Keyboard Support
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeLightbox();
        }

        if (e.key === "ArrowLeft") {
            navigateLightbox(-1);
        }

        if (e.key === "ArrowRight") {
            navigateLightbox(1);
        }
    });

    // Event listener for Open Full Image button
    openFullImageBtn.addEventListener("click", (e) => {
        window.open(activeImages[currentIndex].src, "_blank");
    });
}

main();