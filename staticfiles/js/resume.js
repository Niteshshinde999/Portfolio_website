document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('resumeModal');
    const btn = document.getElementById('resumePreviewBtn');
    const close = document.getElementById('closeResume');
    const pdfViewer = document.getElementById('resumeFrame'); // keep same id

    if (!btn) return; // exit if no resume

    const url = btn.dataset.pdfUrl;

    // PDF.js worker
    const pdfjsLib = window['pdfjs-dist/build/pdf'];
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

    // Open modal and load PDF
    btn.addEventListener('click', () => {
        modal.style.display = 'block';
        pdfViewer.innerHTML = ''; // clear previous render

        pdfjsLib.getDocument(url).promise.then(pdf => {
            for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
                pdf.getPage(pageNumber).then(page => {
                    const scale = 1.5; // higher scale for clarity
                    const viewport = page.getViewport({ scale });

                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');

                    // Device pixel ratio for sharpness
                    const outputScale = window.devicePixelRatio || 1;
                    canvas.width = Math.floor(viewport.width * outputScale);
                    canvas.height = Math.floor(viewport.height * outputScale);
                    canvas.style.width = viewport.width + 'px';
                    canvas.style.height = viewport.height + 'px';

                    pdfViewer.appendChild(canvas);

                    page.render({
                        canvasContext: context,
                        viewport: viewport,
                        transform: [outputScale, 0, 0, outputScale, 0, 0]
                    });
                });
            }
        }).catch(err => {
            pdfViewer.innerHTML = `<p>Unable to load PDF. <a href="${url}" download>Download Resume</a></p>`;
            console.error(err);
        });
    });

    // Close modal and clear PDF
    close.addEventListener('click', () => {
        modal.style.display = 'none';
        pdfViewer.innerHTML = '';
    });

    // Close modal when clicking outside modal content
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal-overlay')) {
            modal.style.display = 'none';
            pdfViewer.innerHTML = '';
        }
    });
});
