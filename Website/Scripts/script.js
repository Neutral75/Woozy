function halloweenMode() {
    const checkbox = document.getElementById('checkbox');
    if (checkbox.checked == true) {
        document.documentElement.style.cssText = '--primary: #EB6123';
        document.getElementById('main-logo').src = '../Assets/woozy-orange.png';
    } else {
        document.documentElement.style.cssText = '--primary: #45AC5B';
        document.getElementById('main-logo').src = '../Assets/woozy.png';
    }
}