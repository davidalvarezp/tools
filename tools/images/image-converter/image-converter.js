document.addEventListener('DOMContentLoaded', () => {

    const dropArea = document.getElementById('dropArea');
    const fileInput = document.getElementById('fileInput');
    const imagesGrid = document.getElementById('images');
    const formatSelect = document.getElementById('formatSelect');
    const convertBtn = document.getElementById('convertBtn');
    const downloadAllBtn = document.getElementById('downloadAllBtn');
    const clearBtn = document.getElementById('clearBtn');
    const imageCount = document.getElementById('imageCount');

    if (!dropArea) {
        console.error('Image converter DOM not loaded');
        return;
    }

    let files = [];
    let converted = [];

    /* ===== Drop handling ===== */
    dropArea.addEventListener('click', () => fileInput.click());

    dropArea.addEventListener('dragover', e => {
        e.preventDefault();
        dropArea.classList.add('hover');
    });

    dropArea.addEventListener('dragleave', () => {
        dropArea.classList.remove('hover');
    });

    dropArea.addEventListener('drop', e => {
        e.preventDefault();
        dropArea.classList.remove('hover');
        addFiles(e.dataTransfer.files);
    });

    fileInput.addEventListener('change', () => addFiles(fileInput.files));

    function addFiles(fileList) {
        Array.from(fileList).forEach(file => {
            if (file.type.startsWith('image/')) {
                files.push(file);
            }
        });
        updateState();
    }

    function updateState() {
        imageCount.textContent = `${files.length} images loaded`;
        convertBtn.disabled = files.length === 0;
    }

    /* ===== Convert ===== */
    convertBtn.addEventListener('click', () => {
        imagesGrid.innerHTML = '';
        converted = [];
        downloadAllBtn.disabled = true;

        files.forEach(file => convertImage(file));
    });

    function convertImage(file) {
        const reader = new FileReader();

        reader.onload = e => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                canvas.getContext('2d').drawImage(img, 0, 0);

                canvas.toBlob(blob => {
                    const url = URL.createObjectURL(blob);
                    converted.push({ file, url });

                    renderCard(file, url);
                    downloadAllBtn.disabled = false;
                }, formatSelect.value);
            };
            img.src = e.target.result;
        };

        reader.readAsDataURL(file);
    }

    /* ===== UI helpers ===== */
    function renderCard(file, url) {
        const card = document.createElement('div');
        card.className = 'image-card';

        const img = document.createElement('img');
        img.src = url;

        const btn = document.createElement('button');
        btn.textContent = 'Download';
        btn.addEventListener('click', () => downloadFile(file, url));

        card.appendChild(img);
        card.appendChild(btn);
        imagesGrid.appendChild(card);
    }

    function downloadFile(file, url) {
        const a = document.createElement('a');
        const ext = formatSelect.value.split('/')[1];
        a.href = url;
        a.download = `${file.name.replace(/\.[^/.]+$/, '')}.${ext}`;
        a.click();
    }

    /* ===== Download all ===== */
    downloadAllBtn.addEventListener('click', () => {
        converted.forEach(item => downloadFile(item.file, item.url));
    });

    /* ===== Clear ===== */
    clearBtn.addEventListener('click', () => {
        files = [];
        converted = [];
        imagesGrid.innerHTML = '';
        updateState();
        downloadAllBtn.disabled = true;
    });

});
