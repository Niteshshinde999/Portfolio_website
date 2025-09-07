document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('resumeModal');
    const btn = document.getElementById('resumePreviewBtn');
    const close = document.getElementById('closeResume');
    const pdfViewer = document.getElementById('resumeFrame'); // keep same id

    if(!btn) return;

    const url = btn.dataset.pdfUrl;

    btn.addEventListener('click', () => {
        modal.style.display = 'block';
        pdfViewer.innerHTML = ''; // clear previous render

        const pdfjsLib = window['pdfjs-dist/build/pdf'];
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

        pdfjsLib.getDocument(url).promise.then(pdf => {
            for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
                pdf.getPage(pageNumber).then(page => {
                    const scale = 1.5; // increase scale for better resolution
                    const viewport = page.getViewport({ scale });
                    
                    const canvas = document.createElement('canvas');
                    pdfViewer.appendChild(canvas);
                    canvas.style.display = 'block';
                    canvas.style.margin = '10px auto';

                    const context = canvas.getContext('2d');
                    const outputScale = window.devicePixelRatio || 1;

                    // set canvas size with device pixel ratio for sharpness
                    canvas.width = Math.floor(viewport.width * outputScale);
                    canvas.height = Math.floor(viewport.height * outputScale);
                    canvas.style.width = viewport.width + 'px';
                    canvas.style.height = viewport.height + 'px';

                    const renderContext = {
                        canvasContext: context,
                        viewport: viewport,
                        transform: [outputScale, 0, 0, outputScale, 0, 0]
                    };
                    page.render(renderContext);
                });
            }
        }).catch(err => {
            pdfViewer.innerHTML = `<p>Unable to load PDF. <a href="${url}" download>Download Resume</a></p>`;
            console.error(err);
        });
    });

    close.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (event) => {
        if(event.target.classList.contains('modal-overlay')) modal.style.display = 'none';
    });
});
