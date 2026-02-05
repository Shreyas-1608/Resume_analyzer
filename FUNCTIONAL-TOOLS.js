
// ==================== FUNCTIONAL RESUME TOOLS ====================

function openResumeTool(toolType) {
    const modalContent = getToolContent(toolType);

    // Remove existing modal if any
    const existingModal = document.querySelector('.tool-modal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.className = 'tool-modal';
    modal.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(10, 14, 39, 0.95);
        backdrop-filter: blur(10px);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 99999;
        animation: fadeIn 0.3s ease-out;
        padding: 2rem;
    `;

    modal.innerHTML = `
        <div style="
            background: var(--bg-card);
            border: 2px solid ${modalContent.color};
            border-radius: 20px;
            padding: 2rem;
            width: 900px;
            max-width: 95vw;
            height: 85vh;
            display: flex;
            flex-direction: column;
            box-shadow: 0 0 50px ${modalContent.color}40, var(--shadow-xl);
            animation: slideInUp 0.3s ease-out;
            position: relative;
        ">
            <button class="close-modal" style="
                position: absolute;
                top: 1.5rem;
                right: 1.5rem;
                background: transparent;
                border: none;
                color: var(--gray-400);
                font-size: 1.5rem;
                cursor: pointer;
                transition: color 0.2s;
            ">✕</button>

            <div class="modal-header" style="text-align: center; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1);">
                <div style="font-size: 3rem; margin-bottom: 0.5rem;">${modalContent.icon}</div>
                <h2 style="
                    font-family: var(--font-heading);
                    font-size: 2rem;
                    color: ${modalContent.color};
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    text-shadow: 0 0 15px ${modalContent.color}80;
                    margin: 0;
                ">${modalContent.title}</h2>
            </div>
            
            <div class="modal-body" style="flex: 1; overflow-y: auto; padding-right: 1rem;">
                ${modalContent.body}
            </div>
        </div>
    `;

    // Event Delegation for close
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('close-modal')) {
            modal.remove();
        }
    });

    document.body.appendChild(modal);

    // Attach listeners for dynamic forms
    if (toolType === 'builder') attachBuilderListeners(modal);
    if (toolType === 'keywords') attachKeywordListeners(modal);
    if (toolType === 'interview') attachInterviewListeners(modal);
}

function getToolContent(type) {
    switch (type) {
        case 'builder':
            return {
                title: 'Resume Builder',
                icon: '📝',
                color: 'var(--neon-blue)',
                body: `
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                        <div class="builder-form">
                            <h3 style="color: var(--white); margin-bottom: 1rem;">1. Enter Your Details</h3>
                            <div style="display: flex; flex-direction: column; gap: 1rem;">
                                <input id="rb-name" placeholder="Full Name" style="padding: 1rem; background: var(--bg-darker); border: 1px solid var(--neon-blue); color: white; border-radius: 8px;">
                                <input id="rb-role" placeholder="Target Role (e.g. Software Engineer)" style="padding: 1rem; background: var(--bg-darker); border: 1px solid var(--neon-blue); color: white; border-radius: 8px;">
                                <textarea id="rb-summary" placeholder="Professional Summary" rows="4" style="padding: 1rem; background: var(--bg-darker); border: 1px solid var(--neon-blue); color: white; border-radius: 8px;"></textarea>
                                <textarea id="rb-skills" placeholder="Skills (comma separated)" rows="3" style="padding: 1rem; background: var(--bg-darker); border: 1px solid var(--neon-blue); color: white; border-radius: 8px;"></textarea>
                                <textarea id="rb-exp" placeholder="Experience (Paste detailed experience)" rows="6" style="padding: 1rem; background: var(--bg-darker); border: 1px solid var(--neon-blue); color: white; border-radius: 8px;"></textarea>
                                <button id="btn-generate-resume" style="padding: 1rem; background: var(--gradient-primary); border: none; border-radius: 8px; color: white; font-weight: bold; cursor: pointer;">✨ Generate Preview</button>
                            </div>
                        </div>
                        <div class="builder-preview" style="background: white; color: black; padding: 2rem; border-radius: 8px; overflow-y: auto;">
                            <div id="resume-preview-area" style="font-family: 'Times New Roman', serif;">
                                <h1 id="p-name" style="margin:0; border-bottom: 2px solid black;">Your Name</h1>
                                <p id="p-role" style="font-size: 1.2rem; color: #444; margin: 0.5rem 0;">Target Role</p>
                                <div style="margin-top: 1rem;"><strong>SUMMARY</strong><p id="p-summary">Your summary will appear here...</p></div>
                                <div style="margin-top: 1rem;"><strong>SKILLS</strong><p id="p-skills">Your skills...</p></div>
                                <div style="margin-top: 1rem;"><strong>EXPERIENCE</strong><p id="p-exp">Your experience...</p></div>
                            </div>
                        </div>
                    </div>
                `
            };
        case 'ats':
            return {
                title: 'ATS Score Generator',
                icon: '🎯',
                color: 'var(--neon-green)',
                body: `
                    <div style="text-align: center; padding: 2rem;">
                        <h3 style="color: var(--white); margin-bottom: 1.5rem;">Ready to check your score?</h3>
                        <p style="color: var(--gray-300); margin-bottom: 2rem; font-size: 1.2rem;">Our main analyzer tool functions as a professional ATS Score Generator. It checks keywords, formatting, and content relevance.</p>
                        
                        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                            <div style="padding: 2rem; background: rgba(0,255,148,0.1); border-radius: 12px; border: 1px solid var(--neon-green);">
                                <div style="font-size: 2rem; margin-bottom: 0.5rem;">92%</div>
                                <div>Keyword Match</div>
                            </div>
                            <div style="padding: 2rem; background: rgba(0,255,148,0.1); border-radius: 12px; border: 1px solid var(--neon-green);">
                                <div style="font-size: 2rem; margin-bottom: 0.5rem;">85%</div>
                                <div>Format Score</div>
                            </div>
                        </div>

                        <button onclick="document.querySelector('.tool-modal').remove(); scrollToUpload();" style="margin-top: 3rem; padding: 1.5rem 3rem; background: var(--gradient-success); border: none; border-radius: 50px; color: black; font-weight: 900; font-size: 1.2rem; cursor: pointer; text-transform: uppercase; box-shadow: 0 0 30px var(--neon-green);">
                            🚀 Run ATS Scan Now
                        </button>
                    </div>
                `
            };
        case 'keywords':
            return {
                title: 'Keyword Optimizer',
                icon: '🔍',
                color: 'var(--neon-pink)',
                body: `
                    <div class="keyword-tool">
                        <p style="color: var(--gray-300); margin-bottom: 1rem;">Paste relevance Job Description below to extract high-value ATS keywords.</p>
                        <textarea id="jd-input" placeholder="Paste Job Description Here..." rows="8" style="width: 100%; padding: 1rem; background: var(--bg-darker); border: 1px solid var(--neon-pink); color: white; border-radius: 8px; margin-bottom: 1rem;"></textarea>
                        <button id="btn-extract-keywords" style="width: 100%; padding: 1rem; background: var(--gradient-secondary); border: none; border-radius: 8px; color: white; font-weight: bold; cursor: pointer; margin-bottom: 2rem;">🔍 Extract Keywords</button>
                        
                        <div id="keywords-result" style="display: none;">
                            <h3 style="color: var(--white); margin-bottom: 1rem;">Top Detected Keywords:</h3>
                            <div id="extracted-tags" style="display: flex; flex-wrap: wrap; gap: 0.5rem;"></div>
                        </div>
                    </div>
                `
            };
        case 'interview':
            return {
                title: 'Interview Prep',
                icon: '🎤',
                color: 'var(--neon-blue)',
                body: `
                    <div class="interview-tool">
                        <p style="color: var(--gray-300); margin-bottom: 2rem; text-align: center;">Practice with top questions for <strong>${selectedRole ? JOB_ROLES[selectedRole].name : 'General Roles'}</strong></p>
                        
                        <div id="interview-cards" style="display: grid; gap: 1rem;">
                            <!-- Questions injection point -->
                        </div>
                    </div>
                `
            };
        default:
            return { title: 'Coming Soon', icon: '🚧', color: 'gray', body: '<p>Tool under construction</p>' };
    }
}

// Helper Listeners
function attachBuilderListeners(modal) {
    const btn = modal.querySelector('#btn-generate-resume');
    btn.onclick = () => {
        const name = modal.querySelector('#rb-name').value || "Your Name";
        const role = modal.querySelector('#rb-role').value || "Target Role";
        const summary = modal.querySelector('#rb-summary').value || "Summary...";
        const skills = modal.querySelector('#rb-skills').value || "No skills listed";
        const exp = modal.querySelector('#rb-exp').value || "Experience...";

        modal.querySelector('#p-name').textContent = name;
        modal.querySelector('#p-role').textContent = role;
        modal.querySelector('#p-summary').textContent = summary;
        modal.querySelector('#p-skills').textContent = skills;
        // Convert newlines to breaks for exp
        modal.querySelector('#p-exp').innerHTML = exp.replace(/\n/g, '<br>');
    };
}

function attachKeywordListeners(modal) {
    const btn = modal.querySelector('#btn-extract-keywords');
    btn.onclick = () => {
        const text = modal.querySelector('#jd-input').value;
        const stopwords = ['the', 'and', 'to', 'of', 'a', 'in', 'for', 'is', 'on', 'that', 'by', 'this', 'with', 'i', 'you', 'it', 'not', 'or', 'be', 'are', 'from', 'at', 'as', 'your', 'all', 'have', 'new', 'more', 'an', 'was', 'we'];

        // Simple extraction
        const words = text.toLowerCase().match(/\b[a-z]{4,}\b/g) || [];
        const freq = {};
        words.forEach(w => {
            if (!stopwords.includes(w)) freq[w] = (freq[w] || 0) + 1;
        });

        const sorted = Object.keys(freq).sort((a, b) => freq[b] - freq[a]).slice(0, 15);

        const container = modal.querySelector('#extracted-tags');
        container.innerHTML = sorted.map(w => `<span style="padding: 0.5rem 1rem; background: rgba(255, 0, 110, 0.2); border: 1px solid var(--neon-pink); border-radius: 20px; color: white;">${w} (${freq[w]})</span>`).join('');
        modal.querySelector('#keywords-result').style.display = 'block';
    };
}

function attachInterviewListeners(modal) {
    const container = modal.querySelector('#interview-cards');
    const roleKey = selectedRole || 'software-engineer';

    // Generic questions if role not found
    const questions = {
        'software-engineer': [
            "Explain the difference between aggressive and defensive programming.",
            "How do you handle technical debt?",
            "Describe a challenging bug you fixed.",
            "Explain RESTful API design principles."
        ],
        'data-scientist': [
            "Explain Overfitting vs Underfitting.",
            "How do you handle missing data?",
            "Explain the bias-variance tradeoff.",
            "What is your process for feature selection?"
        ],
        // Default fallbacks...
    };

    const qs = questions[roleKey] || [
        "Tell me about yourself.",
        "What are your greatest strengths?",
        "Why do you want this job?",
        "Describe a challenge you overcame."
    ];

    container.innerHTML = qs.map((q, i) => `
        <div style="background: var(--bg-darker); padding: 1.5rem; border-radius: 12px; border-left: 4px solid var(--neon-blue);">
            <strong style="color: var(--neon-blue); display: block; margin-bottom: 0.5rem;">Question ${i + 1}</strong>
            <p style="color: white; font-size: 1.1rem;">${q}</p>
        </div>
    `).join('');
}
