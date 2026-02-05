
// ==================== GOD LEVEL RESUME TOOLS V2 ====================

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

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('close-modal')) {
            modal.remove();
        }
    });

    document.body.appendChild(modal);

    // Attach listeners
    if (toolType === 'builder') attachBuilderListenersV2(modal);
    if (toolType === 'keywords') attachKeywordListenersV2(modal);
    if (toolType === 'interview') attachInterviewListeners(modal); // Existing
    if (toolType === 'cover') attachCoverLetterListeners(modal); // New
    if (toolType === 'templates') attachTemplateListeners(modal); // New
}

function getToolContent(type) {
    switch (type) {
        case 'builder':
            return {
                title: 'Resume Builder Pro',
                icon: '📝',
                color: 'var(--neon-blue)',
                body: `
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; height: 100%;">
                        <div class="builder-form" style="overflow-y: auto; padding-right: 10px;">
                            <h3 style="color: var(--white); margin-bottom: 1rem;">1. Enter Your Details</h3>
                            <div style="display: flex; flex-direction: column; gap: 1rem;">
                                <input id="rb-name" placeholder="Full Name" style="padding: 1rem; background: var(--bg-darker); border: 1px solid var(--neon-blue); color: white; border-radius: 8px;">
                                <input id="rb-role" placeholder="Target Role" style="padding: 1rem; background: var(--bg-darker); border: 1px solid var(--neon-blue); color: white; border-radius: 8px;">
                                <div style="display: flex; gap: 1rem;">
                                    <input id="rb-email" placeholder="Email" style="padding: 1rem; background: var(--bg-darker); border: 1px solid var(--neon-blue); color: white; border-radius: 8px; flex: 1;">
                                    <input id="rb-phone" placeholder="Phone" style="padding: 1rem; background: var(--bg-darker); border: 1px solid var(--neon-blue); color: white; border-radius: 8px; flex: 1;">
                                </div>
                                <textarea id="rb-summary" placeholder="Professional Summary" rows="4" style="padding: 1rem; background: var(--bg-darker); border: 1px solid var(--neon-blue); color: white; border-radius: 8px;"></textarea>
                                <textarea id="rb-skills" placeholder="Skills (comma separated)" rows="3" style="padding: 1rem; background: var(--bg-darker); border: 1px solid var(--neon-blue); color: white; border-radius: 8px;"></textarea>
                                <textarea id="rb-exp" placeholder="Experience (Paste detailed experience)" rows="6" style="padding: 1rem; background: var(--bg-darker); border: 1px solid var(--neon-blue); color: white; border-radius: 8px;"></textarea>
                                <textarea id="rb-edu" placeholder="Education" rows="3" style="padding: 1rem; background: var(--bg-darker); border: 1px solid var(--neon-blue); color: white; border-radius: 8px;"></textarea>
                                
                                <button id="btn-update-preview" style="padding: 1rem; background: rgba(0, 240, 255, 0.2); border: 1px solid var(--neon-blue); border-radius: 8px; color: var(--neon-blue); font-weight: bold; cursor: pointer;">↻ Update Preview</button>
                            </div>
                        </div>
                        <div class="builder-preview-container" style="display: flex; flex-direction: column; gap: 1rem;">
                            <div class="builder-preview" id="resume-preview-area" style="background: white; color: black; padding: 2.5rem; border-radius: 4px; overflow-y: auto; flex: 1; font-family: 'Times New Roman', serif; box-shadow: 0 0 20px rgba(0,0,0,0.5);">
                                <h1 id="p-name" style="margin:0; font-size: 24px; text-transform: uppercase; border-bottom: 2px solid black; padding-bottom: 10px;">Your Name</h1>
                                <p style="margin: 5px 0; font-size: 14px;">
                                    <span id="p-email">email@example.com</span> • <span id="p-phone">123-456-7890</span>
                                </p>
                                <p id="p-role" style="font-size: 18px; color: #333; margin: 10px 0; font-weight: bold;">Target Role</p>
                                
                                <div style="margin-top: 15px;">
                                    <h4 style="margin: 0 0 5px 0; border-bottom: 1px solid #ccc; text-transform: uppercase;">Professional Summary</h4>
                                    <p id="p-summary" style="font-size: 14px; line-height: 1.4;">Your summary will appear here...</p>
                                </div>
                                
                                <div style="margin-top: 15px;">
                                    <h4 style="margin: 0 0 5px 0; border-bottom: 1px solid #ccc; text-transform: uppercase;">Skills</h4>
                                    <p id="p-skills" style="font-size: 14px; line-height: 1.4;">Your skills...</p>
                                </div>
                                
                                <div style="margin-top: 15px;">
                                    <h4 style="margin: 0 0 5px 0; border-bottom: 1px solid #ccc; text-transform: uppercase;">Experience</h4>
                                    <div id="p-exp" style="font-size: 14px; line-height: 1.4;">Your experience...</div>
                                </div>

                                <div style="margin-top: 15px;">
                                    <h4 style="margin: 0 0 5px 0; border-bottom: 1px solid #ccc; text-transform: uppercase;">Education</h4>
                                    <div id="p-edu" style="font-size: 14px; line-height: 1.4;">Your education...</div>
                                </div>
                            </div>
                            <button id="btn-download-resume" style="padding: 1rem; background: var(--gradient-primary); border: none; border-radius: 8px; color: white; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem; box-shadow: 0 0 20px rgba(0, 240, 255, 0.4);">
                                📥 Download PDF
                            </button>
                        </div>
                    </div>
                `
            };
        case 'cover':
            return {
                title: 'Cover Letter AI',
                icon: '✉️',
                color: 'var(--neon-purple)',
                body: `
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; height: 100%;">
                        <div class="cl-form">
                            <p style="color: var(--gray-300); margin-bottom: 1rem;">Generate a tailored cover letter in seconds.</p>
                            <div style="display: flex; flex-direction: column; gap: 1rem;">
                                <input id="cl-name" placeholder="Your Name" style="padding: 1rem; background: var(--bg-darker); border: 1px solid var(--neon-purple); color: white; border-radius: 8px;">
                                <input id="cl-company" placeholder="Company Name" style="padding: 1rem; background: var(--bg-darker); border: 1px solid var(--neon-purple); color: white; border-radius: 8px;">
                                <input id="cl-role" placeholder="Job Title" style="padding: 1rem; background: var(--bg-darker); border: 1px solid var(--neon-purple); color: white; border-radius: 8px;">
                                <textarea id="cl-desc" placeholder="Paste Job Description (Optional keywords)" rows="6" style="padding: 1rem; background: var(--bg-darker); border: 1px solid var(--neon-purple); color: white; border-radius: 8px;"></textarea>
                                <button id="btn-generate-cl" style="padding: 1rem; background: var(--gradient-secondary); border: none; border-radius: 8px; color: white; font-weight: bold; cursor: pointer;">✨ Generate Letter</button>
                            </div>
                        </div>
                        <div class="cl-preview" style="background: white; color: black; padding: 2rem; border-radius: 8px; overflow-y: auto; font-family: 'Georgia', serif;">
                            <div id="cl-content">
                                <p style="color: #666; text-align: center; margin-top: 50%;">Your cover letter will appear here...</p>
                            </div>
                        </div>
                    </div>
                `
            };
        case 'templates':
            return {
                title: 'Resume Templates',
                icon: '🎨',
                color: '#FFB800',
                body: `
                    <p style="color: var(--gray-300); margin-bottom: 2rem; text-align: center;">Select a template to launch the Resume Builder</p>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;">
                        <div class="template-card" onclick="openResumeTool('builder')" style="cursor: pointer; transition: transform 0.2s;">
                            <div style="height: 200px; background: white; border: 4px solid #333; border-radius: 8px; margin-bottom: 1rem; position: relative; overflow: hidden;">
                                <div style="height: 20px; background: #333; margin-bottom: 10px;"></div>
                                <div style="width: 60%; height: 10px; background: #ddd; margin: 10px auto;"></div>
                                <div style="padding: 10px;">
                                    <div style="width: 100%; height: 2px; background: #eee; margin-bottom: 5px;"></div>
                                    <div style="width: 100%; height: 2px; background: #eee; margin-bottom: 5px;"></div>
                                    <div style="width: 100%; height: 2px; background: #eee; margin-bottom: 5px;"></div>
                                </div>
                            </div>
                            <h4 style="color: white; text-align: center;">Minimalist</h4>
                        </div>
                         <div class="template-card" onclick="openResumeTool('builder')" style="cursor: pointer; transition: transform 0.2s;">
                            <div style="height: 200px; background: white; border: 4px solid var(--neon-blue); border-radius: 8px; margin-bottom: 1rem; position: relative; overflow: hidden;">
                                <div style="width: 30%; height: 100%; background: #f0f0f0; position: absolute; left: 0; top: 0;"></div>
                                <div style="margin-left: 35%; padding-top: 20px;">
                                    <div style="width: 80%; height: 8px; background: #333; margin-bottom: 10px;"></div>
                                    <div style="width: 100%; height: 2px; background: #999; margin-bottom: 5px;"></div>
                                </div>
                            </div>
                            <h4 style="color: white; text-align: center;">Modern Tech</h4>
                        </div>
                         <div class="template-card" onclick="openResumeTool('builder')" style="cursor: pointer; transition: transform 0.2s;">
                            <div style="height: 200px; background: white; border: 4px solid var(--neon-purple); border-radius: 8px; margin-bottom: 1rem; position: relative; overflow: hidden;">
                                <div style="text-align: center; padding-top: 20px;">
                                    <div style="width: 40px; height: 40px; background: #ddd; border-radius: 50%; margin: 0 auto 10px;"></div>
                                    <div style="width: 60%; height: 6px; background: #333; margin: 0 auto 5px;"></div>
                                </div>
                            </div>
                            <h4 style="color: white; text-align: center;">Creative</h4>
                        </div>
                    </div>
                `
            };
        case 'keywords':
            return {
                title: 'Super Keyword Optimizer',
                icon: '🔍',
                color: 'var(--neon-pink)',
                body: `
                    <div class="keyword-tool">
                        <p style="color: var(--gray-300); margin-bottom: 1rem;">Advanced extraction engine with phrase detection and frequency analysis.</p>
                        <textarea id="jd-input" placeholder="Paste Job Description Here..." rows="8" style="width: 100%; padding: 1rem; background: var(--bg-darker); border: 1px solid var(--neon-pink); color: white; border-radius: 8px; margin-bottom: 1rem;"></textarea>
                        <button id="btn-extract-keywords" style="width: 100%; padding: 1rem; background: var(--gradient-secondary); border: none; border-radius: 8px; color: white; font-weight: bold; cursor: pointer; margin-bottom: 2rem;">🚀 Super Extract</button>
                        
                        <div id="keywords-result" style="display: none;">
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                                <div>
                                    <h3 style="color: var(--neon-blue); margin-bottom: 1rem;">Top Keywords</h3>
                                    <div id="extracted-tags" style="display: flex; flex-wrap: wrap; gap: 0.5rem;"></div>
                                </div>
                                <div>
                                    <h3 style="color: var(--neon-purple); margin-bottom: 1rem;">Key Phrases (Bigrams)</h3>
                                    <div id="extracted-phrases" style="display: flex; flex-wrap: wrap; gap: 0.5rem;"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            };
        case 'ats': // Reuse existing
            return {
                title: 'ATS Score Generator',
                icon: '🎯',
                color: 'var(--neon-green)',
                body: `
                    <div style="text-align: center; padding: 2rem;">
                         <h3 style="color: var(--white); margin-bottom: 1.5rem;">Analyze Resume Match Score</h3>
                         <div style="margin: 2rem 0;">
                            <div class="score-circle" style="width: 150px; height: 150px; border-radius: 50%; border: 10px solid var(--neon-green); margin: 0 auto; display: flex; align-items: center; justify-content: center; font-size: 3rem; color: var(--neon-green); text-shadow: 0 0 20px var(--neon-green);">
                                95%
                            </div>
                            <p style="margin-top: 1rem; color: var(--gray-300);">Based on typical ATS algorithms</p>
                         </div>
                         <button onclick="document.querySelector('.tool-modal').remove(); scrollToUpload();" style="padding: 1rem 3rem; background: var(--gradient-success); border: none; border-radius: 50px; font-weight: bold; cursor: pointer;">Analyze New Resume</button>
                    </div>
                `
            };
        case 'interview': // Reuse existing
            return {
                title: 'Interview Prep',
                icon: '🎤',
                color: 'var(--neon-blue)',
                body: `
                    <div class="interview-tool">
                        <p style="color: var(--gray-300); margin-bottom: 2rem; text-align: center;">Practice with top questions for <strong>${selectedRole ? JOB_ROLES[selectedRole].name : 'General Roles'}</strong></p>
                        <div id="interview-cards" style="display: grid; gap: 1rem;"></div>
                    </div>
                `
            };
        default: return { title: 'Tool', body: '' };
    }
}

// ==================== LISTENER FUNCTIONS V2 ====================

function attachBuilderListenersV2(modal) {
    const updateBtn = modal.querySelector('#btn-update-preview');
    const downloadBtn = modal.querySelector('#btn-download-resume');

    const update = () => {
        const fields = ['name', 'role', 'email', 'phone', 'summary', 'skills', 'exp', 'edu'];
        fields.forEach(f => {
            const val = modal.querySelector('#rb-' + f).value;
            const el = modal.querySelector('#p-' + f);
            if (el) {
                if (f === 'exp' || f === 'edu') el.innerHTML = val.replace(/\n/g, '<br>');
                else el.textContent = val;
            }
        });
    };

    updateBtn.onclick = update;

    // Auto update on input
    modal.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', update);
    });

    // Download Functionality (God Level: Print Specific Div)
    downloadBtn.onclick = () => {
        const content = modal.querySelector('#resume-preview-area').innerHTML;
        const win = window.open('', '', 'height=700,width=900');
        win.document.write('<html><head><title>Resume</title>');
        win.document.write('</head><body style="padding: 2rem; font-family: serif;">');
        win.document.write(content);
        win.document.write('</body></html>');
        win.document.close();
        win.print();
    };
}

function attachCoverLetterListeners(modal) {
    const btn = modal.querySelector('#btn-generate-cl');
    btn.onclick = () => {
        const name = modal.querySelector('#cl-name').value || "[Your Name]";
        const company = modal.querySelector('#cl-company').value || "[Company Name]";
        const role = modal.querySelector('#cl-role').value || "[Job Title]";

        const letter = `
            <div style="line-height: 1.6;">
                <p><strong>${name}</strong><br>Candidate</p>
                <br>
                <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                <br>
                <p><strong>Hiring Manager</strong><br>${company}</p>
                <br>
                <p>Dear Hiring Team,</p>
                <p>I am writing to express my strong interest in the <strong>${role}</strong> position at <strong>${company}</strong>. With my background in technology and my passion for innovation, I believe I would be a valuable asset to your team.</p>
                <p>My experience matches the requirements you are looking for. I am eager to bring my skills to ${company} and contribute to your success.</p>
                <p>Thank you for considering my application. I look forward to the possibility of discussing this exciting opportunity with you.</p>
                <br>
                <p>Sincerely,</p>
                <p>${name}</p>
            </div>
        `;

        modal.querySelector('#cl-content').innerHTML = letter;
    };
}

function attachKeywordListenersV2(modal) {
    const btn = modal.querySelector('#btn-extract-keywords');
    btn.onclick = () => {
        const text = modal.querySelector('#jd-input').value;
        const stopwords = new Set(['the', 'and', 'to', 'of', 'a', 'in', 'for', 'is', 'on', 'that', 'by', 'this', 'with', 'i', 'you', 'it', 'not', 'or', 'be', 'are', 'from', 'at', 'as', 'your', 'all', 'have', 'new', 'more', 'an', 'was', 'we', 'can', 'us', 'if', 'will', 'but']);

        const words = text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);

        // Single words
        const freq = {};
        words.forEach(w => {
            if (w.length > 3 && !stopwords.has(w)) freq[w] = (freq[w] || 0) + 1;
        });

        // Bigrams (Phrases)
        const phrases = {};
        for (let i = 0; i < words.length - 1; i++) {
            const w1 = words[i];
            const w2 = words[i + 1];
            if (!stopwords.has(w1) && !stopwords.has(w2) && w1.length > 2 && w2.length > 2) {
                const p = w1 + ' ' + w2;
                phrases[p] = (phrases[p] || 0) + 1;
            }
        }

        const sortedWords = Object.keys(freq).sort((a, b) => freq[b] - freq[a]).slice(0, 10);
        const sortedPhrases = Object.keys(phrases).sort((a, b) => phrases[b] - phrases[a]).slice(0, 8);

        const tagsContainer = modal.querySelector('#extracted-tags');
        const phrasesContainer = modal.querySelector('#extracted-phrases');

        tagsContainer.innerHTML = sortedWords.map(w => `<span style="padding: 0.5rem 1rem; background: rgba(0, 240, 255, 0.1); border: 1px solid var(--neon-blue); border-radius: 20px; color: var(--neon-blue);">${w}</span>`).join('');
        phrasesContainer.innerHTML = sortedPhrases.map(w => `<span style="padding: 0.5rem 1rem; background: rgba(176, 38, 255, 0.1); border: 1px solid var(--neon-purple); border-radius: 20px; color: var(--neon-purple);">${w}</span>`).join('');

        modal.querySelector('#keywords-result').style.display = 'block';
    };
}

function attachTemplateListeners(modal) {
    // Just simple visual feedback
}

// Re-attach Interview listeners (Copy of V1 logic)
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
        'ui-ux-designer': [
            "Enumerate the design thinking process steps.",
            "How do you hand off designs to developers?",
            "Explain the difference between UX and UI.",
            "How do you conduct user research?"
        ],
        'cybersecurity': [
            "Explain the CIA Triad.",
            "How do you prevent SQL Injection?",
            "What is a DDoS attack and how to mitigate it?",
            "Explain public vs private key encryption."
        ]
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
