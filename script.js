function convertImageToText() {
    const input = document.getElementById('imageInput');
    const outputText = document.getElementById('outputText');

    const file = input.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.src = e.target.result;

            Tesseract.recognize(
                img,
                'eng', // language code (English in this case)
                {
                    logger: info => {
                        if (info.status === 'recognizing text') {
                            outputText.textContent = 'Recognizing...';
                        }
                    }
                }
            ).then(({ data: { text } }) => {
                outputText.textContent = text;
            });
        };
        reader.readAsDataURL(file);
    } else {
        outputText.textContent = 'No image selected';
    }
}
