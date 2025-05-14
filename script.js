document.addEventListener('DOMContentLoaded', function() {
    // ========== Event Handling ========== //
    
    // 1. Click Event
    const clickBox = document.getElementById('click-box');
    clickBox.addEventListener('click', function() {
        this.classList.toggle('active');
        this.textContent = this.classList.contains('active') ? 
            "I've been clicked!" : "Click me!";
    });
    
    // 2. Hover Event
    const hoverBox = document.getElementById('hover-box');
    hoverBox.addEventListener('mouseenter', function() {
        this.classList.add('hovered');
        this.textContent = "You're hovering!";
    });
    hoverBox.addEventListener('mouseleave', function() {
        this.classList.remove('hovered');
        this.textContent = "Hover over me!";
    });
    
    // 3. Keypress Event
    const keypressBox = document.getElementById('keypress-box');
    keypressBox.setAttribute('tabindex', '0'); // Make it focusable
    
    keypressBox.addEventListener('keydown', function(e) {
        this.classList.add('keypressed');
        this.textContent = `You pressed: ${e.key}`;
        
        setTimeout(() => {
            this.classList.remove('keypressed');
            this.textContent = "Press any key (focus me first)";
        }, 1000);
    });
    
    // 4. Secret Actions (Double click and long press)
    const secretBox = document.getElementById('secret-box');
    let pressTimer;
    
    // Double click
    secretBox.addEventListener('dblclick', function() {
        activateSecret();
    });
    
    // Long press
    secretBox.addEventListener('mousedown', function() {
        pressTimer = setTimeout(() => {
            activateSecret();
        }, 1000);
    });
    
    secretBox.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
    });
    
    secretBox.addEventListener('mouseleave', function() {
        clearTimeout(pressTimer);
    });
    
    function activateSecret() {
        secretBox.classList.add('secret-activated');
        secretBox.textContent = "You found the secret! 🎉";
        
        setTimeout(() => {
            secretBox.classList.remove('secret-activated');
            secretBox.textContent = "Double click or long press me for a secret!";
        }, 2000);
    }
    
    // ========== Interactive Elements ========== //
    
    // 1. Color Changing Button
    const colorBtn = document.getElementById('color-btn');
    const colorText = document.getElementById('color-text');
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#FF33F3'];
    
    colorBtn.addEventListener('click', function() {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        colorText.style.color = randomColor;
        colorText.style.fontSize = `${Math.random() * 1 + 0.8}em`;
        colorText.textContent = `Now I'm ${randomColor}!`;
    });
    
    // 2. Image Gallery
    const galleryImages = document.querySelectorAll('.gallery-container img');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentImage = 0;
    
    function showImage(index) {
        galleryImages.forEach(img => img.classList.remove('active'));
        galleryImages[index].classList.add('active');
    }
    
    prevBtn.addEventListener('click', function() {
        currentImage = (currentImage - 1 + galleryImages.length) % galleryImages.length;
        showImage(currentImage);
    });
    
    nextBtn.addEventListener('click', function() {
        currentImage = (currentImage + 1) % galleryImages.length;
        showImage(currentImage);
    });
    
    // Auto-advance gallery every 3 seconds
    setInterval(() => {
        currentImage = (currentImage + 1) % galleryImages.length;
        showImage(currentImage);
    }, 3000);
    
    // 3. Tab Component
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update panes
            tabPanes.forEach(pane => pane.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // ========== Form Validation ========== //
    const form = document.getElementById('validation-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const strengthMeter = document.querySelector('.strength-meter');
    const strengthText = document.querySelector('.strength-text');
    
    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isNameValid && isEmailValid && isPasswordValid) {
            alert('Form submitted successfully!');
            form.reset();
            clearErrors();
        } else {
            alert('Please fix the errors before submitting.');
        }
    });
    
    function validateName() {
        if (nameInput.value.trim() === '') {
            showError(nameInput, nameError, 'Name is required');
            return false;
        } else {
            clearError(nameInput, nameError);
            return true;
        }
    }
    
    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailInput.value.trim() === '') {
            clearError(emailInput, emailError);
            return true; // Email is optional in this example
        } else if (!emailRegex.test(emailInput.value)) {
            showError(emailInput, emailError, 'Please enter a valid email');
            return false;
        } else {
            clearError(emailInput, emailError);
            return true;
        }
    }
    
    function validatePassword() {
        if (passwordInput.value.length === 0) {
            clearError(passwordInput, passwordError);
            updatePasswordStrength(0);
            return false;
        } else if (passwordInput.value.length < 8) {
            showError(passwordInput, passwordError, 'Password must be at least 8 characters');
            updatePasswordStrength(passwordInput.value.length / 8);
            return false;
        } else {
            clearError(passwordInput, passwordError);
            updatePasswordStrength(1);
            return true;
        }
    }
    
    function updatePasswordStrength(strength) {
        const meter = strengthMeter.querySelector('::after') || strengthMeter;
        const percent = Math.min(strength * 100, 100);
        
        // Update meter width
        strengthMeter.style.setProperty('--width', `${percent}%`);
        
        // Update meter color and text
        if (strength < 0.3) {
            strengthMeter.style.backgroundColor = '#f44336';
            strengthText.textContent = 'Weak';
        } else if (strength < 0.7) {
            strengthMeter.style.backgroundColor = '#ff9800';
            strengthText.textContent = 'Medium';
        } else {
            strengthMeter.style.backgroundColor = '#4caf50';
            strengthText.textContent = 'Strong';
        }
    }
    
    function showError(input, errorElement, message) {
        input.classList.add('error');
        errorElement.textContent = message;
    }
    
    function clearError(input, errorElement) {
        input.classList.remove('error');
        errorElement.textContent = '';
    }
    
    function clearErrors() {
        [nameInput, emailInput, passwordInput].forEach(input => input.classList.remove('error'));
        [nameError, emailError, passwordError].forEach(error => error.textContent = '');
    }
});
