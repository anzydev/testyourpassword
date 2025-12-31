const input = document.getElementById('password');
const meter = document.getElementById('meter');
const statusText = document.getElementById('status');
const toggleBtn = document.getElementById('toggle-visibility');
const copyBtn = document.getElementById('copy-password');
const toast = document.getElementById('toast');
const reqs = {
    length: document.getElementById('req-length'),
    upper: document.getElementById('req-upper'),
    number: document.getElementById('req-number'),
    special: document.getElementById('req-special')
};

input.addEventListener('input', () => {
    const val = input.value;
    
    const checks = {
        length: val.length >= 8,
        upper: /[A-Z]/.test(val),
        number: /[0-9]/.test(val),
        special: /[^A-Za-z0-9]/.test(val)
    };

    Object.keys(checks).forEach(key => {
        if (checks[key]) {
            reqs[key].classList.add('valid');
        } else {
            reqs[key].classList.remove('valid');
        }
    });

    const score = Object.values(checks).filter(Boolean).length;
    
    let strength = 'Weak';
    let color = '#ef4444';
    let percent = '33%';

    if (val.length === 0) {
        statusText.innerText = 'Enter a password';
        statusText.style.color = '#a1a1aa';
        meter.style.setProperty('--strength', '0%');
        return;
    }

    if (score === 4) {
        strength = 'Strong';
        color = '#22c55e';
        percent = '100%';
    } else if (score >= 2) {
        strength = 'Medium';
        color = '#eab308';
        percent = '66%';
    }

    statusText.innerText = strength;
    statusText.style.color = color;
    meter.style.setProperty('--strength', percent);
    meter.style.setProperty('--color', color);
});

toggleBtn.addEventListener('click', () => {
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    toggleBtn.innerHTML = isPassword 
        ? '<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>'
        : '<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
});

copyBtn.addEventListener('click', () => {
    if (!input.value) return;
    navigator.clipboard.writeText(input.value).then(() => {
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
    });
});