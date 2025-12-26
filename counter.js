
class VisitorCounter {
    constructor() {
        this.counterElement = document.getElementById('visitor-count');
        if (!this.counterElement) return;
        
        this.currentCount = parseInt(this.counterElement.textContent.replace(/,/g, '')) || 0;
        this.isAnimating = false;
        
        this.init();
    }
    
    init() {

        setInterval(() => this.updateCounter(), 5000);
        
        // Первое обновление
        setTimeout(() => this.updateCounter(), 1000);
    }
    
    updateCounter() {
        if (this.isAnimating) return;
        

        const newCount = this.currentCount + Math.floor(Math.random() * 10) + 1;
        
        // Анимация изменения
        this.animateCounter(this.currentCount, newCount);
        this.currentCount = newCount;
    }
    
    animateCounter(oldValue, newValue) {
        this.isAnimating = true;
        const duration = 1000;
        const steps = 60;
        const increment = (newValue - oldValue) / steps;
        let currentStep = 0;
        
        const animateStep = () => {
            currentStep++;
            const displayValue = Math.round(oldValue + (increment * currentStep));
            this.counterElement.textContent = displayValue.toLocaleString();
            
           
            this.counterElement.style.animation = 'none';
            setTimeout(() => {
                this.counterElement.style.animation = 'countUp 0.3s ease';
            }, 10);
            
            if (currentStep < steps) {
                requestAnimationFrame(animateStep);
            } else {
                this.counterElement.textContent = newValue.toLocaleString();
                this.isAnimating = false;
            }
        };
        
        animateStep();
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new VisitorCounter();
});