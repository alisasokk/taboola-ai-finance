// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards for animations
const animatedElements = document.querySelectorAll('.challenge-card, .solution-primary, .solution-secondary, .metric-card, .use-case, .challenge-item');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Add active state to nav links based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Counter animation for metrics
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16); // 60fps

    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.ceil(start) + (element.dataset.suffix || '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (element.dataset.suffix || '');
        }
    };

    updateCounter();
};

// Observe metric cards and animate on view
const metricObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const valueElement = entry.target.querySelector('.metric-value');
            if (valueElement && !valueElement.classList.contains('animated')) {
                const text = valueElement.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                const suffix = text.replace(/[\d]/g, '');
                valueElement.dataset.suffix = suffix;
                valueElement.textContent = '0' + suffix;
                animateCounter(valueElement, number, 2000);
                valueElement.classList.add('animated');
            }
            metricObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.metric-card').forEach(card => {
    metricObserver.observe(card);
});

// Add hover effect for interactive elements
document.querySelectorAll('.challenge-card, .benefit-card, .use-case').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Log page load for analytics (placeholder)
console.log('AI Financial Intelligence Platform loaded');
console.log('Powered by Claude AI');

// Add copy functionality for code examples
document.querySelectorAll('.query-box, .step-example').forEach(box => {
    box.style.cursor = 'pointer';
    box.title = 'Click to copy';

    box.addEventListener('click', function() {
        const text = this.textContent;
        navigator.clipboard.writeText(text).then(() => {
            const originalText = this.textContent;
            this.textContent = '✓ Copied!';
            this.style.color = 'var(--success)';
            setTimeout(() => {
                this.textContent = originalText;
                this.style.color = '';
            }, 1500);
        });
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Press 'h' to go to top
    if (e.key === 'h' || e.key === 'H') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// Add loading class removal
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Hero section - no parallax effect (navbar remains sticky)

// Interactive Demo
const demoMessages = [
    {
        type: 'user',
        text: 'What were our top 5 expenses last quarter?',
        delay: 800
    },
    {
        type: 'typing',
        delay: 2000
    },
    {
        type: 'ai',
        text: 'Here are your top 5 expenses for Q4 2025:',
        chart: {
            type: 'bar',
            data: [
                { label: 'Marketing', value: 450, percent: 100 },
                { label: 'R&D', value: 380, percent: 84 },
                { label: 'Operations', value: 320, percent: 71 },
                { label: 'Sales', value: 280, percent: 62 },
                { label: 'IT Infrastructure', value: 240, percent: 53 }
            ]
        },
        metadata: {
            confidence: '98%',
            source: 'NetSuite Expense Records',
            records: '1,247 transactions analyzed'
        },
        showWork: true,
        delay: 2500
    },
    {
        type: 'user',
        text: 'How did you calculate this?',
        delay: 3500
    },
    {
        type: 'typing',
        delay: 1800
    },
    {
        type: 'ai',
        text: '<strong>Here\'s how I calculated this:</strong><br><br><span class="workflow-step">1. Queried NetSuite Expense module</span><br><span class="workflow-step">2. Filtered for Q4 2025 (Oct 1 - Dec 31)</span><br><span class="workflow-step">3. Grouped by expense category</span><br><span class="workflow-step">4. Aggregated totals using SUM function</span><br><span class="workflow-step">5. Sorted by amount (descending) and returned top 5</span><br><br>You can <a href="#" class="verify-link">verify this in NetSuite →</a>',
        delay: 2800
    },
    {
        type: 'user',
        text: 'Show me revenue by office for the past 6 months',
        delay: 3500
    },
    {
        type: 'typing',
        delay: 2000
    },
    {
        type: 'ai',
        text: '⚠️ <strong>Anomaly Detected:</strong> I found something unusual in the data.<br><br>Here\'s the revenue breakdown by office:',
        table: [
            ['New York', '$2.4M', '+15%'],
            ['London', '$1.8M', '+22%'],
            ['Tel Aviv', '$1.2M', '+35%'],
            ['Berlin', '$0.6M', '+8%']
        ],
        flag: {
            title: 'Flagged for Review',
            message: 'Tel Aviv office revenue jumped 35% - significantly higher than the 12% average growth. This might indicate a data entry error or a major new contract. Recommend verification with the Tel Aviv team.'
        },
        metadata: {
            confidence: '92%',
            source: 'NetSuite Revenue Recognition',
            timestamp: 'Data as of Feb 13, 2026 10:45 AM'
        },
        delay: 2800
    },
    {
        type: 'user',
        text: 'Compare Q1 marketing spend to budget',
        delay: 4000
    },
    {
        type: 'typing',
        delay: 2000
    },
    {
        type: 'ai',
        text: '<strong>Q1 2026 Marketing Analysis:</strong><br><br>• <strong>Budget:</strong> $500K<br>• <strong>Actual Spend:</strong> $487K<br>• <strong>Variance:</strong> -$13K (2.6% under budget) ✅<br>• <strong>Forecast for Q2:</strong> $520K (based on current trends)<br><br>💡 <strong>Insight:</strong> You\'re on track. Current spending pace suggests you\'ll end the year 3% under the annual marketing budget.',
        metadata: {
            confidence: '95%',
            source: 'NetSuite Budget vs Actuals Report',
            records: 'Based on 342 transactions'
        },
        delay: 2800
    },
    {
        type: 'user',
        text: 'Which vendors have invoices pending over 30 days?',
        delay: 3500
    },
    {
        type: 'typing',
        delay: 2000
    },
    {
        type: 'ai',
        text: 'I found <strong>3 vendors</strong> with invoices pending over 30 days:<br><br>• <strong>TechCorp Solutions</strong> - Invoice #12453 (42 days, $15,400)<br>• <strong>Global Services Inc</strong> - Invoice #12489 (38 days, $8,200)<br>• <strong>Cloud Infrastructure LLC</strong> - Invoice #12501 (35 days, $22,100)<br><br>📊 Total outstanding: <strong>$45,700</strong><br><br>⚠️ <strong>Note:</strong> TechCorp invoice is approaching 45-day payment terms limit. Consider prioritizing this payment to maintain vendor relationship.',
        metadata: {
            confidence: '100%',
            source: 'NetSuite AP Aging Report',
            timestamp: 'Real-time data'
        },
        delay: 2800
    }
];

let demoTimeout;
let isPlaying = false;

function createMessageElement(message) {
    const div = document.createElement('div');
    div.className = 'chat-message';

    if (message.type === 'user') {
        div.classList.add('message-user');
        div.innerHTML = `<div class="message-bubble">${message.text}</div>`;
    } else if (message.type === 'typing') {
        div.classList.add('message-ai');
        div.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <div class="message-bubble typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
    } else if (message.type === 'ai') {
        div.classList.add('message-ai');
        let content = `<div class="message-bubble">${message.text}`;

        if (message.chart) {
            content += `
                <div class="chart-container">
                    <div class="chart-title">Top 5 Expenses (in thousands)</div>
                    <div class="chart-bars">
            `;
            message.chart.data.forEach(item => {
                content += `
                    <div class="chart-bar">
                        <div class="bar-label">${item.label}</div>
                        <div class="bar-track">
                            <div class="bar-fill" style="width: ${item.percent}%">$${item.value}K</div>
                        </div>
                    </div>
                `;
            });
            content += `</div></div>`;
        }

        if (message.table) {
            content += `
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Office</th>
                            <th>Revenue</th>
                            <th>Growth</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            message.table.forEach(row => {
                content += `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`;
            });
            content += `</tbody></table>`;
        }

        // Add flag if present
        if (message.flag) {
            content += `
                <div class="flag-box">
                    <div class="flag-header">
                        <span class="flag-icon">🚩</span>
                        <strong>${message.flag.title}</strong>
                    </div>
                    <div class="flag-message">${message.flag.message}</div>
                </div>
            `;
        }

        // Add metadata if present
        if (message.metadata) {
            content += `
                <div class="message-metadata">
                    <div class="metadata-item">
                        <span class="metadata-label">Confidence:</span>
                        <span class="metadata-value confidence">${message.metadata.confidence}</span>
                    </div>
                    <div class="metadata-item">
                        <span class="metadata-label">Source:</span>
                        <span class="metadata-value">${message.metadata.source}</span>
                    </div>
                    ${message.metadata.records ? `
                        <div class="metadata-item">
                            <span class="metadata-label">${message.metadata.records}</span>
                        </div>
                    ` : ''}
                    ${message.metadata.timestamp ? `
                        <div class="metadata-item">
                            <span class="metadata-label">${message.metadata.timestamp}</span>
                        </div>
                    ` : ''}
                </div>
            `;
        }

        content += `</div>`;
        div.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">${content}</div>
        `;
    }

    return div;
}

function playDemo() {
    if (isPlaying) return;
    isPlaying = true;

    const container = document.getElementById('chatContainer');
    container.innerHTML = '';

    let totalDelay = 0;

    demoMessages.forEach((message, index) => {
        totalDelay += message.delay;

        demoTimeout = setTimeout(() => {
            // Remove typing indicator if present
            const typingIndicator = container.querySelector('.typing-indicator');
            if (typingIndicator && message.type !== 'typing') {
                typingIndicator.closest('.chat-message').remove();
            }

            const messageEl = createMessageElement(message);
            container.appendChild(messageEl);
            container.scrollTop = container.scrollHeight;

            if (index === demoMessages.length - 1) {
                isPlaying = false;
            }
        }, totalDelay);
    });
}

// Play button
document.getElementById('playDemoButton')?.addEventListener('click', () => {
    const overlay = document.getElementById('playOverlay');
    overlay.classList.add('hidden');
    playDemo();
});

// End Demo button
document.getElementById('endDemoButton')?.addEventListener('click', () => {
    clearTimeout(demoTimeout);
    isPlaying = false;
    const container = document.getElementById('chatContainer');
    container.innerHTML = '';

    // Re-add the play overlay
    const overlay = `
        <div class="play-demo-overlay" id="playOverlay">
            <button class="play-demo-button" id="playDemoButton">
                <span class="play-icon">▶</span>
                <span>Play Demo</span>
            </button>
            <p class="play-subtitle">See the AI assistant in action</p>
        </div>
    `;
    container.innerHTML = overlay;

    // Re-attach the play button event
    document.getElementById('playDemoButton')?.addEventListener('click', () => {
        const newOverlay = document.getElementById('playOverlay');
        newOverlay.classList.add('hidden');
        playDemo();
    });
});

// Hero section - no parallax effect (navbar remains sticky)
