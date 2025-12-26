
document.addEventListener('DOMContentLoaded', function() {

    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
 
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-menu') && 
            !e.target.closest('.mobile-menu-toggle') &&
            navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (menuToggle) {
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
    
   
    const newsImages = document.querySelectorAll('.news-img');
    newsImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
   
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (!confirm('Вы уверены, что хотите удалить эту заявку?')) {
                e.preventDefault();
            }
        });
    });
    

    const statusFilter = document.getElementById('status-filter');
    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
           
            const status = this.value;
            const requests = document.querySelectorAll('.request-card');
            
            requests.forEach(request => {
                const requestStatus = request.getAttribute('data-status');
                
                if (status === 'all' || requestStatus === status) {
                    request.style.display = 'block';
                    setTimeout(() => {
                        request.style.opacity = '1';
                        request.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    request.style.opacity = '0';
                    request.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        request.style.display = 'none';
                    }, 300);
                }
            });
        });
    }
    
   
    animateNumbers();
});


function animateNumbers() {
    const counters = document.querySelectorAll('.count-animate');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count')) || 0;
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    });
}