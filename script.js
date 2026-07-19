document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('qr-input');
    const generateBtn = document.getElementById('generate-btn');
    const qrOutputContainer = document.getElementById('qr-output-container');
    const qrcodeDiv = document.getElementById('qrcode');
    const downloadBtn = document.getElementById('download-btn');
    const resetBtn = document.getElementById('reset-btn');

    // Enable/Disable button based on input
    input.addEventListener('input', () => {
        if (input.value.trim().length > 0) {
            generateBtn.classList.add('active');
            generateBtn.disabled = false;
        } else {
            generateBtn.classList.remove('active');
            generateBtn.disabled = true;
        }
    });

    generateBtn.addEventListener('click', () => {
        const text = input.value.trim();
        if (!text) return;

        // Clear previous QR code
        qrcodeDiv.innerHTML = '';

        // Generate new QR code
        new QRCode(qrcodeDiv, {
            text: text,
            width: 256,
            height: 256,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        // Hide input area, show QR output
        input.parentElement.style.display = 'none';
        generateBtn.style.display = 'none';
        qrOutputContainer.style.display = 'flex';

        // Setup Download button after a slight delay to ensure canvas is rendered
        setTimeout(() => {
            const canvas = qrcodeDiv.querySelector('canvas');
            if (canvas) {
                const imageURL = canvas.toDataURL("image/png");
                downloadBtn.href = imageURL;
                downloadBtn.download = `qrcode_${Date.now()}.png`;
            }
        }, 100);
    });

    // Reset UI
    resetBtn.addEventListener('click', () => {
        input.value = '';
        input.parentElement.style.display = 'block';
        generateBtn.style.display = 'block';
        generateBtn.classList.remove('active');
        generateBtn.disabled = true;
        qrOutputContainer.style.display = 'none';
        input.focus();
    });
});