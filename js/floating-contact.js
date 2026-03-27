// Floating Contact Button - Appears on all pages (Aqua Marine Theme)
(function() {
    // Create floating button element
    const floatingBtn = document.createElement('div');
    floatingBtn.className = 'floating-contact-btn';
    floatingBtn.innerHTML = `
        <a href="contact.html" class="floating-contact-link">
            <i class="fas fa-headset"></i>
            <span class="contact-tooltip">Contact Us</span>
        </a>
    `;
    
    // Add styles with Aqua Marine colors
    const styles = `
        .floating-contact-btn {
            position: fixed;
            bottom: 100px;
            right: 30px;
            z-index: 9999;
            cursor: pointer;
        }
        
        .floating-contact-link {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #20FFB5, #00E69C);
            border-radius: 50%;
            box-shadow: 0 4px 15px rgba(32, 255, 181, 0.4);
            transition: all 0.3s ease;
            text-decoration: none;
            animation: pulse 2s infinite;
        }
        
        .floating-contact-link i {
            font-size: 1.8rem;
            color: #0a0c12;
            transition: all 0.3s ease;
        }
        
        .floating-contact-link:hover {
            transform: scale(1.1);
            box-shadow: 0 8px 25px rgba(32, 255, 181, 0.5);
        }
        
        .floating-contact-link:hover i {
            transform: rotate(5deg);
        }
        
        .contact-tooltip {
            position: absolute;
            right: 70px;
            background: #1a1a1a;
            color: #ffffff;
            padding: 8px 16px;
            border-radius: 40px;
            font-size: 0.85rem;
            font-weight: 500;
            white-space: nowrap;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            pointer-events: none;
        }
        
        .contact-tooltip::after {
            content: '';
            position: absolute;
            right: -6px;
            top: 50%;
            transform: translateY(-50%);
            border-width: 6px 0 6px 6px;
            border-style: solid;
            border-color: transparent transparent transparent #1a1a1a;
        }
        
        .floating-contact-btn:hover .contact-tooltip {
            opacity: 1;
            visibility: visible;
            right: 80px;
        }
        
        @keyframes pulse {
            0% {
                box-shadow: 0 0 0 0 rgba(32, 255, 181, 0.4);
            }
            70% {
                box-shadow: 0 0 0 15px rgba(32, 255, 181, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(32, 255, 181, 0);
            }
        }
        
        @media (max-width: 768px) {
            .floating-contact-btn {
                bottom: 20px;
                right: 20px;
            }
            
            .floating-contact-link {
                width: 50px;
                height: 50px;
            }
            
            .floating-contact-link i {
                font-size: 1.5rem;
            }
            
            .contact-tooltip {
                display: none;
            }
        }
    `;
    
    // Add styles to head
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
    
    // Add button to body
    document.body.appendChild(floatingBtn);
})();