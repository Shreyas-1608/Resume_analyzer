
// ==================== LISTENER REPAIRS (GOD LEVEL) ====================

// Fix Interview Listeners to NOT overwrite High-Level questions
function attachInterviewListeners(modal) {
    const btn = modal.querySelector('button');
    if (btn && btn.textContent.includes('Generate')) {
        btn.onclick = () => {
            // Simply rotate questions for visual effect or random
            const cards = modal.querySelectorAll('.q-card');
            cards.forEach(card => {
                card.style.opacity = '0.5';
                setTimeout(() => card.style.opacity = '1', 200);
            });
            // In a real hackathon, we'd fetch new ones. For now, we keep the high-level ones static to ensure quality.
            btn.innerHTML = 'Refreshed!';
            setTimeout(() => btn.innerHTML = 'Generate New Questions', 1000);
        };
    }

    // Toggle answer hints
    const cards = modal.querySelectorAll('.q-card');
    cards.forEach(card => {
        card.onclick = () => {
            const answer = card.querySelector('.answer-box');
            if (answer) {
                const isHidden = answer.classList.contains('hidden');
                if (isHidden) {
                    answer.classList.remove('hidden');
                    answer.style.display = 'block';
                } else {
                    answer.classList.add('hidden');
                    answer.style.display = 'none';
                }
            }
        };
    });
}

// Ensure Builder Listeners are active
function attachBuilderListenersV2(modal) {
    const updateBtn = modal.querySelector('#btn-update-preview');
    const downloadBtn = modal.querySelector('#btn-download-resume');

    const update = () => {
        // Safe mapping
        const map = {
            'rb-name': 'p-name',
            'rb-email': 'p-email',
            'rb-phone': 'p-phone',
            'rb-role': 'p-role',
            'rb-summary': 'p-summary',
            'rb-skills': 'p-skills',
            'rb-exp': 'p-exp',
            'rb-edu': 'p-edu'
        };

        Object.keys(map).forEach(id => {
            const input = modal.querySelector('#' + id);
            const target = modal.querySelector('#' + map[id]);
            if (input && target) {
                const val = input.value;
                if (id === 'rb-exp' || id === 'rb-edu') {
                    target.innerHTML = val.replace(/\n/g, '<br>');
                } else {
                    target.textContent = val;
                }
            }
        });
    };

    if (updateBtn) updateBtn.onclick = update;

    // Auto update
    modal.querySelectorAll('input, textarea').forEach(el => {
        el.addEventListener('input', update);
    });

    if (downloadBtn) {
        downloadBtn.onclick = () => {
            const content = modal.querySelector('#resume-preview-area').innerHTML;
            const win = window.open('', '', 'height=800,width=800');
            win.document.write('<html><head><title>Resume</title></head><body style="font-family: serif; padding: 2rem;">');
            win.document.write(content);
            win.document.write('</body></html>');
            win.document.close();
            win.print();
        };
    }
}

// Ensure Cover Letter Listeners are active
function attachCoverLetterListeners(modal) {
    const btn = modal.querySelector('#btn-generate-cl');
    if (btn) {
        btn.onclick = () => {
            const name = modal.querySelector('#cl-name').value || "Candidate Name";
            const role = modal.querySelector('#cl-role').value || "Target Role";
            const company = modal.querySelector('#cl-company').value || "Company Name";

            const content = modal.querySelector('#cl-content');
            content.innerHTML = `
                <div style="line-height: 1.6;">
                    <p><strong>${name}</strong></p>
                    <p>${new Date().toLocaleDateString()}</p>
                    <br>
                    <p>Hiring Manager<br>${company}</p>
                    <br>
                    <p>Dear Hiring Team,</p>
                    <p>I am excited to apply for the <strong>${role}</strong> position at <strong>${company}</strong>. 
                    Based on the job description, my skills in technology and problem-solving align perfectly with your needs.</p>
                    <p>I am confident that my experience will allow me to contribute immediately to your team's success.</p>
                    <br>
                    <p>Sincerely,</p>
                    <p>${name}</p>
                </div>
            `;
        };
    }
}

// Navigation Helpers (Just in case)
function scrollToAssessment() {
    const section = document.getElementById('inputSection');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
}

function scrollToUpload() {
    const section = document.getElementById('uploadSection');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
}
