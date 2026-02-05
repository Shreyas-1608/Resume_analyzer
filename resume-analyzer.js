// Resume Analyzer - Advanced AI-Powered Analysis Engine
// © 2026 ResumeMatch

// ==================== Job Role Definitions ====================
const JOB_ROLES = {
    'software-engineer': {
        name: 'Software Engineer',
        keywords: {
            critical: ['javascript', 'python', 'java', 'c++', 'algorithms', 'data structures', 'git', 'api', 'debugging', 'testing'],
            important: ['react', 'angular', 'vue', 'node.js', 'sql', 'nosql', 'mongodb', 'postgresql', 'docker', 'kubernetes', 'ci/cd', 'agile', 'scrum', 'rest', 'graphql'],
            nice: ['typescript', 'webpack', 'jenkins', 'aws', 'azure', 'gcp', 'microservices', 'tdd', 'unit testing', 'integration testing']
        },
        skills: ['Programming Languages', 'Web Development', 'Database Management', 'Version Control', 'DevOps', 'Problem Solving', 'Code Review', 'System Design'],
        experience: { min: 0, ideal: 3, senior: 5 }
    },
    'data-scientist': {
        name: 'Data Scientist',
        keywords: {
            critical: ['python', 'r', 'machine learning', 'statistics', 'data analysis', 'sql', 'pandas', 'numpy', 'scikit-learn'],
            important: ['tensorflow', 'pytorch', 'keras', 'deep learning', 'nlp', 'computer vision', 'jupyter', 'matplotlib', 'seaborn', 'big data', 'hadoop', 'spark'],
            nice: ['tableau', 'power bi', 'aws sagemaker', 'mlops', 'feature engineering', 'a/b testing', 'bayesian statistics', 'time series']
        },
        skills: ['Machine Learning', 'Statistical Analysis', 'Data Visualization', 'Big Data Technologies', 'Programming', 'Model Deployment', 'Business Intelligence'],
        experience: { min: 1, ideal: 3, senior: 5 }
    },
    'product-manager': {
        name: 'Product Manager',
        keywords: {
            critical: ['product strategy', 'roadmap', 'stakeholder management', 'user research', 'agile', 'scrum', 'requirements', 'prioritization'],
            important: ['product lifecycle', 'go-to-market', 'user stories', 'kpis', 'metrics', 'analytics', 'a/b testing', 'mvp', 'product vision', 'cross-functional'],
            nice: ['jira', 'confluence', 'figma', 'sql', 'data analysis', 'competitive analysis', 'market research', 'wireframing']
        },
        skills: ['Product Strategy', 'Leadership', 'Communication', 'Data Analysis', 'User Experience', 'Project Management', 'Market Research'],
        experience: { min: 2, ideal: 4, senior: 7 }
    },
    'devops-engineer': {
        name: 'DevOps Engineer',
        keywords: {
            critical: ['ci/cd', 'docker', 'kubernetes', 'jenkins', 'git', 'linux', 'automation', 'scripting', 'monitoring'],
            important: ['aws', 'azure', 'gcp', 'terraform', 'ansible', 'chef', 'puppet', 'prometheus', 'grafana', 'elk stack', 'nginx', 'apache'],
            nice: ['istio', 'helm', 'vault', 'consul', 'python', 'bash', 'powershell', 'infrastructure as code', 'security']
        },
        skills: ['Cloud Platforms', 'Container Orchestration', 'Infrastructure Automation', 'Monitoring & Logging', 'Security', 'Scripting', 'System Administration'],
        experience: { min: 2, ideal: 4, senior: 6 }
    },
    'ui-ux-designer': {
        name: 'UI/UX Designer',
        keywords: {
            critical: ['figma', 'sketch', 'adobe xd', 'user research', 'wireframing', 'prototyping', 'user testing', 'design systems', 'ui design', 'ux design'],
            important: ['design thinking', 'user personas', 'user flows', 'information architecture', 'responsive design', 'accessibility', 'usability testing', 'interaction design'],
            nice: ['html', 'css', 'javascript', 'after effects', 'principle', 'framer', 'invision', 'zeplin', 'user interviews', 'analytics']
        },
        skills: ['User Research', 'Visual Design', 'Prototyping', 'Interaction Design', 'Design Tools', 'Accessibility', 'Design Systems'],
        experience: { min: 1, ideal: 3, senior: 5 }
    },
    'cybersecurity': {
        name: 'Cybersecurity Specialist',
        keywords: {
            critical: ['security', 'penetration testing', 'vulnerability assessment', 'network security', 'encryption', 'firewall', 'intrusion detection', 'incident response'],
            important: ['siem', 'soc', 'threat intelligence', 'malware analysis', 'risk assessment', 'compliance', 'iso 27001', 'nist', 'owasp', 'ethical hacking'],
            nice: ['burp suite', 'metasploit', 'wireshark', 'kali linux', 'python', 'scripting', 'cloud security', 'zero trust', 'devsecops']
        },
        skills: ['Network Security', 'Threat Analysis', 'Security Auditing', 'Compliance', 'Risk Management', 'Incident Response', 'Security Tools'],
        experience: { min: 2, ideal: 4, senior: 6 }
    }
};

// ==================== State Management ====================
let selectedRole = null;
let analysisResults = null;

// ==================== DOM Elements ====================
// ==================== DOM Elements ====================
let elements = {};

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ DOM Content Loaded');
    initializeElements();
    attachEventListeners();
});

function initializeElements() {
    elements = {
        roleCards: document.querySelectorAll('.role-card'),
        resumeInput: document.getElementById('resumeInput'),
        charCount: document.getElementById('charCount'),
        analyzeBtn: document.getElementById('analyzeBtn'),
        clearBtn: document.getElementById('clearBtn'),
        backBtn: document.getElementById('backBtn'),
        helpBtn: document.getElementById('helpBtn'),
        exportBtn: document.getElementById('exportBtn'),
        inputSection: document.getElementById('inputSection'),
        resultsSection: document.getElementById('resultsSection'),
        loadingOverlay: document.getElementById('loadingOverlay'),
        pdfUpload: document.getElementById('pdfUpload'),
        uploadBox: document.querySelector('.upload-box'),
        uploadStatus: document.getElementById('uploadStatus'),
        fileName: document.getElementById('fileName'),
        removeFile: document.getElementById('removeFile')
    };
    console.log('✅ Elements Initialized:', elements);
}

// ==================== Event Listeners ====================
function attachEventListeners() {
    if (elements.roleCards.length > 0) {
        elements.roleCards.forEach(card => {
            card.addEventListener('click', () => selectRole(card));
        });
    }

    if (elements.resumeInput) elements.resumeInput.addEventListener('input', updateCharCount);
    if (elements.analyzeBtn) {
        elements.analyzeBtn.addEventListener('click', analyzeResume);
        console.log('✅ Analyze Button Listener Attached');
    } else {
        console.error('❌ Analyze Button NOT FOUND');
    }

    if (elements.clearBtn) elements.clearBtn.addEventListener('click', clearForm);
    if (elements.backBtn) elements.backBtn.addEventListener('click', resetToInput);
    if (elements.helpBtn) elements.helpBtn.addEventListener('click', showHelp);
    if (elements.exportBtn) elements.exportBtn.addEventListener('click', exportReport);

    // PDF Upload Events
    if (elements.pdfUpload) {
        elements.pdfUpload.addEventListener('change', handlePDFUpload);
    }

    if (elements.removeFile) elements.removeFile.addEventListener('click', clearPDFUpload);
}

// ==================== Core Functions ====================

function selectRole(card) {
    const roleKey = card.dataset.role;
    const isCurrentlySelected = card.classList.contains('selected');

    elements.roleCards.forEach(c => {
        c.classList.remove('selected', 'active');
        const existingPopup = c.querySelector('.role-skills-popup');
        if (existingPopup) existingPopup.remove();
    });

    if (!isCurrentlySelected) {
        card.classList.add('selected', 'active');
        selectedRole = roleKey;

        const role = JOB_ROLES[roleKey];
        const popup = document.createElement('div');
        popup.className = 'role-skills-popup';

        const skillsHtml = `
            <div class="skills-popup-header" style="font-weight:bold; color:var(--neon-blue); margin-bottom:1rem;">✨ Required Skills</div>
            <div class="skills-list" style="display:flex; flex-wrap:wrap; gap:0.5rem;">
                ${role.skills.map(skill => `<span class="skill-tag" style="background:rgba(0,240,255,0.1); padding:4px 8px; border-radius:4px; font-size:0.8rem;">${skill}</span>`).join('')}
            </div>
        `;

        popup.innerHTML = skillsHtml;
        card.appendChild(popup);
    } else {
        selectedRole = null;
    }

    updateAnalyzeButton();
}

function updateCharCount() {
    if (!elements.resumeInput) return;
    const count = elements.resumeInput.value.length;
    if (elements.charCount) elements.charCount.textContent = count.toLocaleString();
    updateAnalyzeButton();
}

function updateAnalyzeButton() {
    if (!elements.analyzeBtn || !elements.resumeInput) return;
    const hasText = elements.resumeInput.value.trim().length > 10;
    const hasRole = selectedRole !== null;

    console.log(`Update Button State | Text: ${hasText} | Role: ${hasRole} (${selectedRole})`);

    if (hasText && hasRole) {
        elements.analyzeBtn.disabled = false;
        elements.analyzeBtn.style.opacity = '1';
        elements.analyzeBtn.style.cursor = 'pointer';
    } else {
        elements.analyzeBtn.disabled = true;
        elements.analyzeBtn.style.opacity = '0.5';
        elements.analyzeBtn.style.cursor = 'not-allowed';
    }
}

function clearForm() {
    if (elements.resumeInput) elements.resumeInput.value = '';
    updateCharCount();
    updateAnalyzeButton();
}

function resetToInput() {
    if (elements.resultsSection) elements.resultsSection.classList.add('hidden');
    if (elements.inputSection) elements.inputSection.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function analyzeResume() {
    if (!selectedRole || !elements.resumeInput.value.trim()) return;
    if (elements.loadingOverlay) elements.loadingOverlay.classList.remove('hidden');

    await new Promise(resolve => setTimeout(resolve, 2000));

    const resumeText = elements.resumeInput.value.toLowerCase();
    const role = JOB_ROLES[selectedRole];
    analysisResults = performAnalysis(resumeText, role);

    displayResults(analysisResults, role);

    if (elements.loadingOverlay) elements.loadingOverlay.classList.add('hidden');
    if (elements.inputSection) elements.inputSection.classList.add('hidden');
    if (elements.resultsSection) elements.resultsSection.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==================== Analysis Engine ====================

function performAnalysis(resumeText, role) {
    const keywords = analyzeKeywords(resumeText, role.keywords);
    const skills = analyzeSkills(resumeText, role.skills);
    const experience = analyzeExperience(resumeText, role.experience);
    const quality = analyzeQuality(resumeText);

    const weightedScore = (
        keywords.score * 0.40 +
        skills.score * 0.25 +
        experience.score * 0.20 +
        quality.score * 0.15
    );

    return {
        overallScore: Math.round(weightedScore),
        keywords,
        skills,
        experience,
        quality,
        recommendations: generateRecommendations(keywords, skills, experience, quality)
    };
}

function analyzeKeywords(text, keywords) {
    const matched = [];
    const missing = [];
    let totalWeight = 0;
    let matchedWeight = 0;

    keywords.critical.forEach(keyword => {
        totalWeight += 3;
        if (text.includes(keyword.toLowerCase())) {
            matched.push({ keyword, type: 'critical', weight: 3 });
            matchedWeight += 3;
        } else {
            missing.push({ keyword, type: 'critical', weight: 3 });
        }
    });

    keywords.important.forEach(keyword => {
        totalWeight += 2;
        if (text.includes(keyword.toLowerCase())) {
            matched.push({ keyword, type: 'important', weight: 2 });
            matchedWeight += 2;
        } else {
            missing.push({ keyword, type: 'important', weight: 2 });
        }
    });

    const score = totalWeight > 0 ? (matchedWeight / totalWeight) * 100 : 0;
    return {
        score: Math.round(score),
        matched, missing, matchedCount: matched.length, missingCount: missing.length, totalCount: matched.length + missing.length
    };
}

function analyzeSkills(text, requiredSkills) {
    const foundSkills = requiredSkills.filter(skill => text.includes(skill.toLowerCase()));
    const score = (foundSkills.length / requiredSkills.length) * 100;
    return {
        score: Math.round(score), found: foundSkills.length, total: requiredSkills.length,
        foundSkills, missingSkills: requiredSkills.filter(skill => !foundSkills.includes(skill))
    };
}

function analyzeExperience(text, expRequirements) {
    const yearPatterns = [/(\d+)\+?\s*years?/gi, /(\d+)\s*yrs?/gi, /experience:\s*(\d+)/gi];
    let maxYears = 0;
    yearPatterns.forEach(pattern => {
        const matches = text.matchAll(pattern);
        for (const match of matches) {
            const years = parseInt(match[1]);
            if (years > maxYears) maxYears = years;
        }
    });

    let score = maxYears >= expRequirements.senior ? 100 : maxYears >= expRequirements.ideal ? 90 : maxYears >= expRequirements.min ? 75 : 40;
    let level = maxYears >= expRequirements.senior ? 'Senior' : maxYears >= expRequirements.ideal ? 'Mid-Senior' : 'Junior';

    return { score, years: maxYears, level, recommendation: maxYears < expRequirements.ideal ? `Gain ${expRequirements.ideal - maxYears} more years` : 'Excellent level' };
}

function analyzeQuality(text) {
    let score = 50;
    const wordCount = text.split(/\s+/).length;
    if (wordCount > 300) score += 20;
    const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(text);
    if (hasEmail) score += 10;
    const hasProjects = /(project|developed|built|created|implemented)/i.test(text);
    if (hasProjects) score += 20;

    return { score: Math.min(score, 100), level: score >= 80 ? 'Excellent' : 'Good', hasProjects };
}

function generateRecommendations(keywords, skills, experience, quality) {
    const recommendations = [];
    if (keywords.score < 50) recommendations.push({ icon: '🎯', title: 'Add Keywords', description: 'Missing critical markers.' });
    if (skills.score < 60) recommendations.push({ icon: '⚡', title: 'Highlight Skills', description: 'Showcase your core stack.' });
    if (!quality.hasProjects) recommendations.push({ icon: '🚀', title: 'Add Projects', description: 'Show hands-on experience.' });
    return recommendations;
}

function displayResults(results, role) {
    displayOverallScore(results.overallScore);
    displayAnalysisMetrics(results);
    displayKeywords(results.keywords);
    displayRecommendations(results.recommendations);
}

function displayOverallScore(score) {
    const scoreValue = document.getElementById('scoreValue');
    const scoreCircle = document.getElementById('scoreCircle');
    if (scoreValue) scoreValue.textContent = score;
    if (scoreCircle) {
        const offset = 690 - (score / 100) * 690;
        scoreCircle.style.strokeDashoffset = offset;
    }
}

function displayAnalysisMetrics(results) {
    const map = {
        'keywordPercentage': results.keywords.score + '%',
        'matchedCount': results.keywords.matchedCount,
        'missingCount': results.keywords.missingCount,
        'skillsPercentage': results.skills.score + '%',
        'skillsFound': results.skills.found,
        'experiencePercentage': results.experience.score + '%',
        'experienceLevel': results.experience.level,
        'qualityPercentage': results.quality.score + '%',
        'qualityLevel': results.quality.level
    };
    Object.keys(map).forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = map[id];
    });
}

function displayKeywords(keywords) {
    const matched = document.getElementById('matchedKeywords');
    const missing = document.getElementById('missingKeywords');
    if (matched) matched.innerHTML = keywords.matched.map(k => `<span class="keyword-tag matched" style="background:#00FF9420; color:#00FF94; border:1px solid #00FF9440; padding:4px 10px; border-radius:100px;">✓ ${k.keyword}</span>`).join('');
    if (missing) missing.innerHTML = keywords.missing.map(k => `<span class="keyword-tag missing" style="background:#FF00E520; color:#FF00E5; border:1px solid #FF00E540; padding:4px 10px; border-radius:100px;">⚠ ${k.keyword}</span>`).join('');
}

function displayRecommendations(recs) {
    const container = document.getElementById('recommendationsList');
    if (container) container.innerHTML = recs.map(r => `
        <div class="recommendation-item" style="background:rgba(255,255,255,0.05); padding:1.5rem; border-radius:12px; margin-bottom:1rem; border-left:4px solid var(--neon-blue);">
            <div style="display:flex; align-items:center; gap:1rem;">
                <div style="font-size:2rem;">${r.icon}</div>
                <div>
                    <h4 style="margin:0; color:var(--neon-blue);">${r.title}</h4>
                    <p style="margin:0.2rem 0 0; opacity:0.8;">${r.description}</p>
                </div>
            </div>
        </div>`).join('');
}

function showHelp() { alert('Review match score and recommendations to optimize your resume.'); }

function exportReport() {
    if (!analysisResults) {
        alert('Please analyze a resume first!');
        return;
    }

    const role = JOB_ROLES[selectedRole];
    const htmlReport = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resume Analysis Report</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 1000px; margin: 40px auto; padding: 20px; background: #f5f5f5; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px; border-radius: 12px; text-align: center; box-shadow: 0 4px 20px rgba(0,0,0,0.2); }
        .header h1 { margin: 0; font-size: 3rem; letter-spacing: 2px; }
        .header p {margin: 15px 0 0 0; font-size: 1.1rem; opacity: 0.95; }
        .score-section { background: white; padding: 40px; margin: 30px 0; border-radius: 12px; box-shadow: 0 2px 15px rgba(0,0,0,0.1); text-align: center; }
        .score-big { font-size: 6rem; font-weight: bold; background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 20px 0; }
        .metrics { display: grid; grid-template-columns: repeat(4, 1fr); gap: 25px; margin: 40px 0; }
        .metric-card { background: white; padding: 30px 20px; border-radius: 12px; box-shadow: 0 2px 15px rgba(0,0,0,0.1); text-align: center; transition: transform 0.3s; }
        .metric-card:hover { transform: translateY(-5px); box-shadow: 0 4px 20px rgba(0,0,0,0.15); }
        .metric-card h3 { color: #667eea; margin: 0 0 15px 0; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; }
        .metric-card .value { font-size: 2.5rem; font-weight: bold; color: #333; margin: 10px 0; }
        .metric-card .sub { color: #666; font-size: 0.9rem; margin-top: 10px; }
        .keywords-section { background: white; padding: 35px; margin: 30px 0; border-radius: 12px; box-shadow: 0 2px 15px rgba(0,0,0,0.1); }
        .keywords-section h2 { color: #667eea; border-bottom: 3px solid #667eea; padding-bottom: 15px; margin: 0 0 25px 0; font-size: 1.8rem; }
        .keyword-tag { display: inline-block; padding: 10px 18px; margin: 6px; border-radius: 25px; font-size: 0.95rem; font-weight: 500; transition: transform 0.2s; }
        .keyword-tag:hover { transform: scale(1.05); }
        .matched { background: linear-gradient(135deg, #e8f5e9, #c8e6c9); color: #2e7d32; border: 2px solid #2e7d32; }
        .missing { background: linear-gradient(135deg, #ffebee, #ffcdd2); color: #c62828; border: 2px solid #c62828; }
        .recommendations { background: white; padding: 35px; margin: 30px 0; border-radius: 12px; box-shadow: 0 2px 15px rgba(0,0,0,0.1); }
        .rec-item { padding: 20px; margin: 15px 0; background: linear-gradient(135deg, #f5f5f5, #e0e0e0); border-left: 5px solid #667eea; border-radius: 8px; transition: transform 0.3s; }
        .rec-item:hover { transform: translateX(10px); }
        .rec-item .icon { font-size: 2rem; margin-bottom: 10px; }
        .rec-item h3 { margin: 10px 0 8px 0; color: #333; font-size: 1.3rem; }
        .rec-item p { margin: 0; color: #666; line-height: 1.6; }
        .footer { text-align: center; color: #666; margin-top: 50px; padding: 30px; background: white; border-radius: 12px; box-shadow: 0 2px 15px rgba(0,0,0,0.1); }
        .footer p { margin: 8px 0; }
        .print-btn { background: #667eea; color: white; padding: 12px 30px; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; margin-top: 20px; }
        .print-btn:hover { background: #5568d3; }
        @media print { .print-btn { display: none; } }
    </style>
</head>
<body>
    <div class="header">
        <h1>📊 Resume Analysis Report</h1>
        <p>Generated by CyberResume AI • ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</p>
    </div>

    <div class="score-section">
        <h2 style="color: #667eea; margin-top: 0; font-size: 1.5rem;">Overall Match Score</h2>
        <div class="score-big">${analysisResults.overallScore}%</div>
        <p style="color: #666; font-size: 1.1rem;">Target Role: <strong>${role.name}</strong></p>
        <button class="print-btn" onclick="window.print()">🖨️ Print / Save as PDF</button>
    </div>

    <div class="metrics">
        <div class="metric-card">
            <h3>Keywords</h3>
            <div class="value">${analysisResults.keywords.score}%</div>
            <div class="sub">Matched: ${analysisResults.keywords.matchedCount} | Missing: ${analysisResults.keywords.missingCount}</div>
        </div>
        <div class="metric-card">
            <h3>Skills</h3>
            <div class="value">${analysisResults.skills.score}%</div>
            <div class="sub">Found: ${analysisResults.skills.found} / ${analysisResults.skills.total}</div>
        </div>
        <div class="metric-card">
            <h3>Experience</h3>
            <div class="value">${analysisResults.experience.level}</div>
            <div class="sub">Score: ${analysisResults.experience.score}%</div>
        </div>
        <div class="metric-card">
            <h3>Quality</h3>
            <div class="value">${analysisResults.quality.level}</div>
            <div class="sub">Score: ${analysisResults.quality.score}%</div>
        </div>
    </div>

    <div class="keywords-section">
        <h2>✓ Matched Keywords</h2>
        <div>
            ${analysisResults.keywords.matched.map(k => `<span class="keyword-tag matched">✓ ${k.keyword}</span>`).join('')}
        </div>
    </div>

    <div class="keywords-section">
        <h2>⚠ Missing Keywords (Top Priority)</h2>
        <div>
            ${analysisResults.keywords.missing.slice(0, 25).map(k => `<span class="keyword-tag missing">⚠ ${k.keyword}</span>`).join('')}
        </div>
    </div>

    <div class="recommendations">
        <h2 style="color: #667eea; border-bottom: 3px solid #667eea; padding-bottom: 15px; margin: 0 0 25px 0; font-size: 1.8rem;">💡 AI-Powered Recommendations</h2>
        ${analysisResults.recommendations.map(r => `
            <div class="rec-item">
                <div class="icon">${r.icon}</div>
                <h3>${r.title}</h3>
                <p>${r.description}</p>
            </div>
        `).join('')}
    </div>

    <div class="footer">
        <p><strong>CyberResume AI v2.0.4</strong></p>
        <p>Advanced AI-Powered Resume Analysis</p>
        <p style="margin-top: 20px; font-size: 0.9rem;">This report is confidential and generated for personal use only.</p>
    </div>
</body>
</html>`;

    const blob = new Blob([htmlReport], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resume-analysis-${new Date().getTime()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Show success message
    setTimeout(() => {
        alert('✅ Report downloaded successfully! Open the HTML file to view or print your detailed analysis.');
    }, 100);
}

async function handlePDFUpload(e) {
    const file = e.target.files[0];
    if (file) await processPDFFile(file);
}

async function processPDFFile(file) {
    if (elements.loadingOverlay) elements.loadingOverlay.classList.remove('hidden');
    const text = await extractTextFromPDF(file);
    if (text) {
        elements.resumeInput.value = text;
        updateCharCount();
    }
    if (elements.loadingOverlay) elements.loadingOverlay.classList.add('hidden');
}

function extractTextFromPDF(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = async function () {
            const pdfjsLib = window['pdfjs-dist/build/pdf'];
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
            const pdf = await pdfjsLib.getDocument(new Uint8Array(this.result)).promise;
            let text = '';
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const content = await page.getTextContent();
                text += content.items.map(item => item.str).join(' ') + '\n';
            }
            resolve(text);
        };
        reader.readAsArrayBuffer(file);
    });
}

function clearPDFUpload() {
    if (elements.pdfUpload) elements.pdfUpload.value = '';
}

// ==================== Feature Box Navigation Functions ====================

function scrollToAssessment() {
    const assessmentSection = document.getElementById('assessmentSection');
    if (assessmentSection) {
        assessmentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function scrollToUpload() {
    const uploadSection = document.getElementById('uploadSection');
    if (uploadSection) {
        uploadSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function showRecommendationsInfo() {
    alert('AI Recommendations analyze your resume for Keyword Gaps, Skills Alignment, and Impact Metrics.');
}

// ==================== ANIMATED BACKGROUND ENGINE ====================
function initCyberBackground() {
    const canvas = document.createElement('canvas');
    canvas.id = 'cyber-bg';
    canvas.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; pointer-events: none; opacity: 0.5;';
    document.body.prepend(canvas);
    const ctx = canvas.getContext('2d');
    let w, h;
    const resize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener('resize', resize); resize();
    const particles = Array.from({ length: 60 }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: Math.random() - 0.5, vy: Math.random() - 0.5 }));
    function animate() {
        ctx.clearRect(0, 0, w, h);
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
        particles.forEach((p, i) => {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0 || p.x > w) p.vx *= -1;
            if (p.y < 0 || p.y > h) p.vy *= -1;
            for (let j = i + 1; j < particles.length; j++) {
                const dist = Math.hypot(p.x - particles[j].x, p.y - particles[j].y);
                if (dist < 150) {
                    ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.globalAlpha = 1 - dist / 150; ctx.stroke();
                }
            }
        });
        requestAnimationFrame(animate);
    } animate();
}

document.addEventListener('DOMContentLoaded', initCyberBackground);

// ==================== RESUME TOOLS ENGINE V4 ====================

function openResumeTool(type) {
    const existing = document.querySelector('.tool-modal');
    if (existing) existing.remove();

    const config = getToolConfig(type);
    const modal = document.createElement('div');
    modal.className = 'tool-modal';
    modal.style.cssText = 'position: fixed; inset: 0; background: rgba(0,0,10,0.95); backdrop-filter: blur(15px); display: flex; justify-content: center; align-items: center; z-index: 99999;';

    modal.innerHTML = `
        <div style="background: rgba(10, 20, 45, 0.98); border: 2px solid ${config.color}; border-radius: 24px; padding: 2.5rem; width: 1000px; max-width: 90vw; height: 85vh; display: flex; flex-direction: column; position: relative;">
            <button class="close-modal" style="position: absolute; top: 1.5rem; right: 1.5rem; background: transparent; border: 1px solid #fff3; border-radius: 50%; width: 40px; height: 40px; color: #fff; cursor: pointer;">✕</button>
            <div style="text-align: center; margin-bottom: 2rem;">
                <div style="font-size: 3rem; margin-bottom: 0.5rem; filter: drop-shadow(0 0 10px ${config.color});">${config.icon}</div>
                <h2 style="font-family: Orbitron; color: ${config.color}; letter-spacing: 4px;">${config.title}</h2>
            </div>
            <div style="flex: 1; overflow-y: auto; padding: 1rem;">${config.body}</div>
        </div>`;

    modal.addEventListener('click', (e) => { if (e.target === modal || e.target.classList.contains('close-modal')) modal.remove(); });
    document.body.appendChild(modal);

    if (type === 'builder') attachBuilder(modal);
    if (type === 'cover') attachCover(modal);
    if (type === 'keywords') attachKeywords(modal);
    if (type === 'ats') attachATS(modal);
    if (type === 'templates') attachTemplates(modal);
}

function getToolConfig(type) {
    const data = {
        'builder': {
            title: 'NEURAL_BUILDER', icon: '📝', color: '#00F0FF',
            body: `
                <div style="display: grid; grid-template-columns: 1fr 1.2fr; gap: 2rem; height: 100%;">
                    <div style="background: rgba(0,0,0,0.3); padding: 1.5rem; border-radius: 12px; border: 1px solid #00F0FF30;">
                        <input id="rb-name" placeholder="FULL NAME" style="width:100%; padding: 12px; margin-bottom: 1rem; background: #0008; border: 1px solid #00F0FF50; color: #fff; border-radius: 8px;">
                        <input id="rb-role" placeholder="TARGET ROLE" style="width:100%; padding: 12px; margin-bottom: 1rem; background: #0008; border: 1px solid #00F0FF50; color: #fff; border-radius: 8px;">
                        <textarea id="rb-sum" placeholder="SUMMARY" rows="4" style="width:100%; padding: 12px; margin-bottom: 1rem; background: #0008; border: 1px solid #00F0FF50; color: #fff; border-radius: 8px;"></textarea>
                        <textarea id="rb-exp" placeholder="EXPERIENCE" rows="6" style="width:100%; padding: 12px; background: #0008; border: 1px solid #00F0FF50; color: #fff; border-radius: 8px;"></textarea>
                    </div>
                    <div id="p-preview" style="background: white; color: black; padding: 3rem; border-radius: 4px; overflow-y: auto; height: 100%;">
                        <h1 id="p-name" style="text-align: center; border-bottom: 2px solid #000; font-size: 2rem; margin: 0 auto; width: fit-content; padding-bottom: 5px;">[ NAME ]</h1>
                        <p id="p-role" style="text-align: center; font-weight: bold; margin-top: 5px;">[ ROLE ]</p>
                        <div style="margin-top: 1.5rem;"><h4 style="border-bottom: 1px solid #ddd; padding-bottom: 3px; font-size: 0.9rem;">SUMMARY</h4><p id="p-sum" style="font-size: 0.85rem; line-height: 1.4;">...</p></div>
                        <div style="margin-top: 1.5rem;"><h4 style="border-bottom: 1px solid #ddd; padding-bottom: 3px; font-size: 0.9rem;">EXPERIENCE</h4><p id="p-exp" style="font-size: 0.85rem; line-height: 1.4; white-space: pre-line;">...</p></div>
                    </div>
                </div>`
        },
        'ats': {
            title: 'ATS_SCANNER', icon: '🎯', color: '#00FF94',
            body: `
                <div style="padding: 2rem;">
                    <div style="text-align: center; margin-bottom: 3rem;">
                        <div id="ats-score" style="font-size: 8rem; font-weight: 900; color: #00FF94; font-family: Orbitron; text-shadow: 0 0 30px rgba(0, 255, 148, 0.8);">--</div>
                        <p style="color: #fff; font-size: 1.5rem; font-family: Orbitron; letter-spacing: 3px;">ATS_COMPATIBILITY_INDEX</p>
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-bottom: 2rem;">
                        <div style="background: rgba(0, 255, 148, 0.1); border: 1px solid #00FF94; border-radius: 12px; padding: 1.5rem; text-align: center;">
                            <div style="font-size: 2rem; color: #00FF94; font-weight: bold;" id="ats-format">--</div>
                            <div style="color: #fff; font-size: 0.9rem; margin-top: 0.5rem;">FORMAT_SCORE</div>
                        </div>
                        <div style="background: rgba(0, 255, 148, 0.1); border: 1px solid #00FF94; border-radius: 12px; padding: 1.5rem; text-align: center;">
                            <div style="font-size: 2rem; color: #00FF94; font-weight: bold;" id="ats-keywords">--</div>
                            <div style="color: #fff; font-size: 0.9rem; margin-top: 0.5rem;">KEYWORD_DENSITY</div>
                        </div>
                        <div style="background: rgba(0, 255, 148, 0.1); border: 1px solid #00FF94; border-radius: 12px; padding: 1.5rem; text-align: center;">
                            <div style="font-size: 2rem; color: #00FF94; font-weight: bold;" id="ats-readability">--</div>
                            <div style="color: #fff; font-size: 0.9rem; margin-top: 0.5rem;">READABILITY</div>
                        </div>
                    </div>
                    <div id="ats-details" style="background: rgba(0,0,0,0.3); border: 1px solid #00FF9440; border-radius: 12px; padding: 2rem; color: #fff;">
                        <div style="font-family: Orbitron; color: #00FF94; margin-bottom: 1rem; font-size: 1.2rem;">[ ANALYSIS_REPORT ]</div>
                        <div id="ats-report">Upload a resume and select a role to generate ATS compatibility report...</div>
                    </div>
                    <button id="ats-regenerate" style="width:100%; margin-top: 2rem; padding: 1.5rem; background: #00FF94; color: #000; border: none; cursor: pointer; font-family: Orbitron; font-weight: bold; border-radius: 12px; font-size: 1.1rem;">REGENERATE_SCAN</button>
                </div>`
        },
        'cover': {
            title: 'COGNITIVE_CL', icon: '✉️', color: '#B026FF',
            body: `
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                    <div style="background: rgba(0,0,0,0.3); padding: 1.5rem; border-radius: 12px;">
                        <input id="cl-comp" placeholder="COMPANY" style="width:100%; padding: 12px; margin-bottom: 1rem; background: #000; border: 1px solid #B026FF; color: #fff; border-radius: 8px;">
                        <textarea id="cl-jd" placeholder="JOB DESCRIPTION" rows="12" style="width:100%; padding: 12px; background: #000; border: 1px solid #B026FF; color: #fff; border-radius: 8px;"></textarea>
                        <button id="cl-btn" style="width:100%; margin-top: 1rem; padding: 1rem; background: #B026FF; color: #fff; border: none; cursor: pointer; font-family: Orbitron; border-radius: 8px;">GENERATE</button>
                    </div>
                    <div id="cl-out" style="background: white; color: black; padding: 2rem; border-radius: 4px; font-family: serif; line-height: 1.6;">[ RESULT_WILL_APPEAR_HERE ]</div>
                </div>`
        },
        'templates': {
            title: 'UI_CORES', icon: '🎨', color: '#FFB800',
            body: `
                <div style="padding: 2rem;">
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-bottom: 3rem;">
                        <div onclick="selectTemplate('professional')" style="cursor: pointer; height: 350px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: 4px solid #FFB800; border-radius: 12px; padding: 1.5rem; position: relative; overflow: hidden; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                            <div style="color: white; font-family: Orbitron; font-size: 1.2rem; margin-bottom: 1rem;">⚡ PROFESSIONAL</div>
                            <div style="background: rgba(255,255,255,0.95); padding: 1rem; border-radius: 8px; height: 250px; color: #333; font-size: 0.75rem;">
                                <div style="text-align: center; border-bottom: 3px solid #667eea; padding-bottom: 10px; font-weight: bold; font-size: 1.1rem;">JOHN DOE</div>
                                <div style="text-align: center; color: #667eea; margin: 5px 0; font-weight: bold;">Software Engineer</div>
                                <div style="margin-top: 10px; font-size: 0.7rem;">Email • Phone • LinkedIn</div>
                                <div style="margin-top: 15px; font-weight: bold; border-bottom: 2px solid #ddd;">EXPERIENCE</div>
                                <div style="margin-top: 8px; line-height: 1.3;">• Senior Developer at Tech Corp<br>• Led team of 5 engineers<br>• Built scalable systems</div>
                            </div>
                        </div>
                        
                        <div onclick="selectTemplate('modern')" style="cursor: pointer; height: 350px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border: 4px solid #FFB800; border-radius: 12px; padding: 1.5rem; position: relative; overflow: hidden; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                            <div style="color: white; font-family: Orbitron; font-size: 1.2rem; margin-bottom: 1rem;">🎯 MODERN</div>
                            <div style="background: rgba(255,255,255,0.95); padding: 1rem; border-radius: 8px; height: 250px; color: #333; display: grid; grid-template-columns: 1fr 2fr; gap: 10px; font-size: 0.7rem;">
                                <div style="background: #f5576c; color: white; padding: 10px; border-radius: 4px;">
                                    <div style="font-weight: bold; margin-bottom: 10px; font-size: 0.9rem;">SKILLS</div>
                                    <div style="font-size: 0.65rem; line-height: 1.4;">• Python<br>• React<br>• Node.js<br>• Docker<br>• AWS</div>
                                </div>
                                <div>
                                    <div style="font-size: 1.3rem; font-weight: bold; color: #f5576c;">JANE SMITH</div>
                                    <div style="color: #666; margin: 5px 0;">Full Stack Developer</div>
                                    <div style="margin-top: 10px; font-size: 0.65rem; line-height: 1.3;">Passionate developer with 5+ years building modern web applications using cutting-edge technologies.</div>
                                </div>
                            </div>
                        </div>
                        
                        <div onclick="selectTemplate('creative')" style="cursor: pointer; height: 350px; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); border: 4px solid #FFB800; border-radius: 12px; padding: 1.5rem; position: relative; overflow: hidden; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                            <div style="color: white; font-family: Orbitron; font-size: 1.2rem; margin-bottom: 1rem;">🚀 CREATIVE</div>
                            <div style="background: rgba(255,255,255,0.95); padding: 1rem; border-radius: 8px; height: 250px; color: #333; font-size: 0.7rem;">
                                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                                    <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #4facfe, #00f2fe); border-radius: 50%;"></div>
                                    <div>
                                        <div style="font-size: 1.2rem; font-weight: bold;">ALEX KIM</div>
                                        <div style="color: #4facfe; font-weight: bold;">UX Designer</div>
                                    </div>
                                </div>
                                <div style="background: #f0f0f0; padding: 10px; border-left: 4px solid #4facfe; margin: 10px 0; border-radius: 4px; font-size: 0.65rem; line-height: 1.3;">Creative designer specializing in user-centered design solutions for digital products.</div>
                                <div style="margin-top: 10px; font-size: 0.65rem;"><strong>PORTFOLIO:</strong> alexkim.design</div>
                            </div>
                        </div>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem;">
                        <div onclick="selectTemplate('minimal')" style="cursor: pointer; height: 350px; background: linear-gradient(135deg, #434343 0%, #000000 100%); border: 4px solid #FFB800; border-radius: 12px; padding: 1.5rem; position: relative; overflow: hidden; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                            <div style="color: white; font-family: Orbitron; font-size: 1.2rem; margin-bottom: 1rem;">✨ MINIMAL</div>
                            <div style="background: rgba(255,255,255,0.95); padding: 1.5rem; border-radius: 8px; height: 250px; color: #333; font-size: 0.75rem;">
                                <div style="font-size: 1.8rem; font-weight: 200; margin-bottom: 5px;">SARAH JONES</div>
                                <div style="font-size: 0.9rem; color: #666; margin-bottom: 20px;">Product Manager</div>
                                <div style="width: 50px; height: 2px; background: #000; margin-bottom: 20px;"></div>
                                <div style="font-size: 0.7rem; line-height: 1.6; color: #555;">Strategic product leader with 8+ years driving product vision, roadmap, and execution for B2B SaaS platforms.</div>
                            </div>
                        </div>
                        
                        <div onclick="selectTemplate('executive')" style="cursor: pointer; height: 350px; background: linear-gradient(135deg, #134e5e 0%, #71b280 100%); border: 4px solid #FFB800; border-radius: 12px; padding: 1.5rem; position: relative; overflow: hidden; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                            <div style="color: white; font-family: Orbitron; font-size: 1.2rem; margin-bottom: 1rem;">💼 EXECUTIVE</div>
                            <div style="background: rgba(255,255,255,0.95); padding: 1.5rem; border-radius: 8px; height: 250px; color: #333; font-size: 0.75rem;">
                                <div style="background: #134e5e; color: white; padding: 15px; margin: -1.5rem -1.5rem 15px -1.5rem; border-radius: 8px 8px 0 0;">
                                    <div style="font-size: 1.5rem; font-weight: bold;">MICHAEL CHEN</div>
                                    <div style="font-size: 0.9rem;">VP of Engineering</div>
                                </div>
                                <div style="font-size: 0.7rem; line-height: 1.5;"><strong>EXECUTIVE SUMMARY</strong><br>Transformational technology leader with 15+ years building and scaling engineering organizations from 10 to 200+ engineers.</div>
                            </div>
                        </div>
                    </div>
                    
                    <div style="margin-top: 2rem; text-align: center; color: #FFB800; font-family: Orbitron; font-size: 0.9rem;">Click any template to preview full version</div>
                </div>`
        },
        'cognitive': {
            title: 'COGNITIVE_LOGS', icon: '💡', color: '#00F0FF',
            body: `
                <div style="padding: 2rem;">
                    <div style="background: linear-gradient(135deg, rgba(0,240,255,0.2), rgba(176,38,255,0.2)); border: 2px solid #00F0FF; border-radius: 16px; padding: 2rem; margin-bottom: 2rem;">
                        <div style="font-family: Orbitron; color: #00F0FF; font-size: 1.5rem; margin-bottom: 1rem; text-align: center;">🧠 AI CAREER INTELLIGENCE SYSTEM</div>
                        <div style="color: #fff; text-align: center; font-size: 0.9rem; opacity: 0.8;">Advanced neural analysis for career trajectory optimization</div>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; margin-bottom: 2rem;">
                        <div style="background: rgba(0, 255, 148, 0.1); border-left: 4px solid #00FF94; padding: 1.5rem; border-radius: 8px;">
                            <div style="color: #00FF94; font-family: Orbitron; font-size: 1.1rem; margin-bottom: 0.5rem;">📊 MARKET ALIGNMENT</div>
                            <div style="color: #fff; font-size: 0.85rem; line-height: 1.6;">Your skills match <strong>87%</strong> of current market demands for your target role. Top trending skills in your field: Cloud Architecture, AI/ML Integration, Microservices.</div>
                        </div>
                        
                        <div style="background: rgba(176, 38, 255, 0.1); border-left: 4px solid #B026FF; padding: 1.5rem; border-radius: 8px;">
                            <div style="color: #B026FF; font-family: Orbitron; font-size: 1.1rem; margin-bottom: 0.5rem;">🎯 OPTIMIZATION SCORE</div>
                            <div style="color: #fff; font-size: 0.85rem; line-height: 1.6;">Resume optimization potential: <strong>+23%</strong>. Adding 3-5 more project outcomes and quantifiable metrics could boost ATS score significantly.</div>
                        </div>
                        
                        <div style="background: rgba(255, 184, 0, 0.1); border-left: 4px solid #FFB800; padding: 1.5rem; border-radius: 8px;">
                            <div style="color: #FFB800; font-family: Orbitron; font-size: 1.1rem; margin-bottom: 0.5rem;">💼 SALARY INSIGHTS</div>
                            <div style="color: #fff; font-size: 0.85rem; line-height: 1.6;">Based on your experience level, expected salary range: <strong>$95K - $145K</strong>. Top 10% in your role earn: <strong>$180K+</strong>.</div>
                        </div>
                        
                        <div style="background: rgba(255, 0, 229, 0.1); border-left: 4px solid #FF00E5; padding: 1.5rem; border-radius: 8px;">
                            <div style="color: #FF00E5; font-family: Orbitron; font-size: 1.1rem; margin-bottom: 0.5rem;">🚀 GROWTH TRAJECTORY</div>
                            <div style="color: #fff; font-size: 0.85rem; line-height: 1.6;">Predicted career path: Mid-Level → Senior (18 months) → Lead (3 years). Key skills to acquire: System Design, Team Leadership, Architecture.</div>
                        </div>
                    </div>
                    
                    <div style="background: rgba(0,0,0,0.4); border: 1px solid rgba(0,240,255,0.3); border-radius: 12px; padding: 2rem;">
                        <div style="font-family: Orbitron; color: #00F0FF; font-size: 1.2rem; margin-bottom: 1.5rem;">[ PERSONALIZED RECOMMENDATIONS ]</div>
                        
                        <div style="margin-bottom: 1.5rem; padding: 1rem; background: rgba(0,255,148,0.05); border-radius: 8px; border: 1px solid rgba(0,255,148,0.2);">
                            <div style="color: #00FF94; font-weight: bold; margin-bottom: 0.5rem;">✓ IMMEDIATE ACTIONS</div>
                            <div style="color: #fff; font-size: 0.85rem; line-height: 1.8;">
                                • Add measurable impact metrics to each role (e.g., "Reduced load time by 40%")<br>
                                • Include 2-3 GitHub projects showcasing your best work<br>
                                • Align keywords with your target job descriptions<br>
                                • Add certifications: AWS Solutions Architect, Kubernetes CKA
                            </div>
                        </div>
                        
                        <div style="margin-bottom: 1.5rem; padding: 1rem; background: rgba(176,38,255,0.05); border-radius: 8px; border: 1px solid rgba(176,38,255,0.2);">
                            <div style="color: #B026FF; font-weight: bold; margin-bottom: 0.5rem;">⚡ SKILL GAPS TO FILL</div>
                            <div style="color: #fff; font-size: 0.85rem; line-height: 1.8;">
                                • <strong>High Priority:</strong> GraphQL, TypeScript, CI/CD Pipelines<br>
                                • <strong>Medium Priority:</strong> Redis, Message Queues, Monitoring Tools<br>
                                • <strong>Nice to Have:</strong> Terraform, gRPC, WebSockets
                            </div>
                        </div>
                        
                        <div style="padding: 1rem; background: rgba(255,184,0,0.05); border-radius: 8px; border: 1px solid rgba(255,184,0,0.2);">
                            <div style="color: #FFB800; font-weight: bold; margin-bottom: 0.5rem;">🎓 LEARNING PATH</div>
                            <div style="color: #fff; font-size: 0.85rem; line-height: 1.8;">
                                Week 1-4: Master System Design fundamentals<br>
                                Week 5-8: Build 2 full-stack projects with modern architecture<br>
                                Week 9-12: Study behavioral interview patterns & practice mock interviews<br>
                                Week 13+: Network with industry professionals, attend tech meetups
                            </div>
                        </div>
                    </div>
                    
                    <div style="margin-top: 2rem; padding: 1.5rem; background: linear-gradient(90deg, rgba(0,240,255,0.1), rgba(176,38,255,0.1)); border: 2px solid rgba(0,240,255,0.5); border-radius: 12px; text-align: center;">
                        <div style="color: #00F0FF; font-family: Orbitron; font-size: 1.1rem; margin-bottom: 0.5rem;">⚡ NEXT CAREER CHECKPOINT</div>
                        <div style="color: #fff; font-size: 0.9rem;">Your resume is <strong>68% optimized</strong>. Complete the recommendations above to reach <strong>95%+ optimization</strong> and 3x your interview callback rate.</div>
                    </div>
                </div>`
        },
        'keywords': {
            title: 'SPECTRAL_SCAN', icon: '🔍', color: '#FF00E5',
            body: `
                <div style="padding: 1rem;">
                    <textarea id="kw-in" placeholder="PASTE JOB DESCRIPTION TO EXTRACT KEYWORDS..." style="width:100%; height: 200px; background: #000; border: 1px solid #FF00E5; color: #fff; padding: 1.2rem; font-family: Rajdhani; border-radius: 8px;"></textarea>
                    <button id="kw-btn" style="width:100%; margin-top: 1rem; padding: 1rem; background: #FF00E5; border: none; color: #fff; font-family: Orbitron; cursor: pointer; border-radius: 8px;">SCAN_FOR_KEYWORDS</button>
                    <div id="kw-out" style="margin-top: 2rem; display: flex; gap: 10px; flex-wrap: wrap;"></div>
                </div>`
        },
        'interview': {
            title: 'NEURAL_BOT', icon: '🎤', color: '#00C2FF',
            body: '<div style="text-align: center; padding: 5rem;"><h2 style="color: #fff; font-family: Orbitron;">How do you optimize React performance?</h2><div style="margin: 3rem 0; height: 80px; border: 2px dashed #00C2FF; color: #00C2FF; display: flex; align-items: center; justify-content: center; font-family: Orbitron; border-radius: 20px; background: rgba(0, 194, 255, 0.05);">[ RECORDING_PROTOCOL_ACTIVE ]</div><button style="background: #00C2FF; color: #000; padding: 1rem 2rem; border: none; border-radius: 8px; font-family: Orbitron; cursor: pointer;">STOP_RECORDING</button></div>'
        },
        'projects': {
            title: 'STRATEGIC_LOGS', icon: '🚀', color: '#FFA500',
            body: '<div style="display: flex; flex-direction: column; gap: 2rem;"><div style="border-left: 4px solid #FFA500; padding: 1.5rem; background: rgba(255, 165, 0, 0.05); border-radius: 0 12px 12px 0;"><h4 style="color: #FFA500; margin: 0 0 0.5rem 0; font-family: Orbitron;">API_MESH_CONSTRUCTOR</h4><p style="color: #ccc; margin: 0;">Build a high-performance gRPC system with Kubernetes orchestration and Prometheus monitoring.</p></div><div style="border-left: 4px solid #FFA500; padding: 1.5rem; background: rgba(255, 165, 0, 0.05); border-radius: 0 12px 12px 0;"><h4 style="color: #FFA500; margin: 0 0 0.5rem 0; font-family: Orbitron;">NEURAL_DATA_PIPELINE</h4><p style="color: #ccc; margin: 0;">Construct a real-time data streaming pipeline using Apache Kafka and Spark for sentiment analysis.</p></div></div>'
        }
    };
    return data[type] || { title: 'MODULE', body: '', icon: '⚠️', color: '#fff' };
}

function attachBuilder(modal) {
    const inputs = ['rb-name', 'rb-role', 'rb-sum', 'rb-exp'];
    inputs.forEach(id => {
        const el = modal.querySelector('#' + id);
        if (el) el.oninput = () => {
            const previewId = id.replace('rb-', 'p-');
            const target = modal.querySelector('#' + previewId);
            if (target) {
                target.innerText = el.value || (id === 'rb-name' ? '[ NAME ]' : id === 'rb-role' ? '[ ROLE ]' : '...');
            }
        };
    });

    // Add download and preview buttons
    const previewContainer = modal.querySelector('#p-preview');
    if (previewContainer && !modal.querySelector('#download-resume-btn')) {
        const buttonContainer = document.createElement('div');
        buttonContainer.style.cssText = 'position: absolute; bottom: 10px; right: 10px; display: flex; gap: 10px; z-index: 1000;';

        const downloadBtn = document.createElement('button');
        downloadBtn.id = 'download-resume-btn';
        downloadBtn.innerHTML = '📥 DOWNLOAD';
        downloadBtn.style.cssText = 'padding: 10px 20px; background: #00F0FF; color: #000; border: none; border-radius: 8px; cursor: pointer; font-family: Orbitron; font-weight: bold;';
        downloadBtn.onclick = () => {
            const resumeHTML = generateResumeHTML(modal);
            const blob = new Blob([resumeHTML], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `resume-${Date.now()}.html`;
            a.click();
            URL.revokeObjectURL(url);
            alert('✅ Resume downloaded! Open the HTML file and print it as PDF from your browser.');
        };

        const previewBtn = document.createElement('button');
        previewBtn.id = 'preview-resume-btn';
        previewBtn.innerHTML = '👁️ PREVIEW';
        previewBtn.style.cssText = 'padding: 10px 20px; background: #B026FF; color: #fff; border: none; border-radius: 8px; cursor: pointer; font-family: Orbitron; font-weight: bold;';
        previewBtn.onclick = () => {
            const resumeHTML = generateResumeHTML(modal);
            const previewWindow = window.open('', 'ResumePreview', 'width=900,height=1100');
            previewWindow.document.write(resumeHTML);
            previewWindow.document.close();
        };

        buttonContainer.appendChild(previewBtn);
        buttonContainer.appendChild(downloadBtn);
        previewContainer.parentElement.style.position = 'relative';
        previewContainer.parentElement.appendChild(buttonContainer);
    }
}

function generateResumeHTML(modal) {
    const name = modal.querySelector('#rb-name')?.value || 'Your Name';
    const role = modal.querySelector('#rb-role')?.value || 'Your Role';
    const summary = modal.querySelector('#rb-sum')?.value || 'Your professional summary...';
    const experience = modal.querySelector('#rb-exp')?.value || 'Your experience...';

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resume - ${name}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');
        
        body { font-family: 'Roboto', Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 60px 40px; background: white; color: #333; line-height: 1.6; }
        h1 { text-align: center; border-bottom: 3px solid #000; padding-bottom: 15px; font-size: 2.5rem; margin: 0 0 10px 0; letter-spacing: 2px; }
        .role { text-align: center; font-weight: bold; font-size: 1.3rem; color: #555; margin: 10px 0 40px 0; }
        .section { margin: 35px 0; }
        .section h2 { border-bottom: 22px solid #ddd; padding-bottom: 8px; font-size: 1.5rem; color: #333; margin-bottom: 15px; }
        .section p { margin: 15px 0; white-space: pre-line; }
        .buttons { position: fixed; top: 20px; right: 20px; display: flex; gap: 10px; }
        .btn { padding: 12px 25px; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 1rem; transition: transform 0.2s; }
        .btn:hover { transform: scale(1.05); }
        .btn-print { background: #667eea; color: white; }
        .btn-close { background: #f44336; color: white; }
        @media print { .buttons { display: none; } body { padding: 40px; } }
    </style>
</head>
<body>
    <div class="buttons">
        <button class="btn btn-print" onclick="window.print()">🖨️ Print / Save as PDF</button>
        <button class="btn btn-close" onclick="window.close()">✕ Close</button>
    </div>
    
    <h1>${name}</h1>
    <div class="role">${role}</div>
    
    <div class="section">
        <h2>Professional Summary</h2>
        <p>${summary}</p>
    </div>
    
    <div class="section">
        <h2>Experience</h2>
        <p>${experience}</p>
    </div>
    
    <div style="margin-top: 60px; text-align: center; color: #999; font-size: 0.9rem;">
        Generated by CyberResume AI | ${new Date().toLocaleDateString()}
    </div>
</body>
</html>`;
}

function attachCover(modal) {
    modal.querySelector('#cl-btn').onclick = () => {
        const comp = modal.querySelector('#cl-comp').value || 'Entity';
        modal.querySelector('#cl-out').innerHTML = `<p>Dear Hiring Team at <strong>${comp}</strong>,</p><p>I am writing to express my strong interest in the technical position advertised. My background in developing scalable solutions and my passion for cutting-edge technologies makes me a perfect fit for your innovative team.</p><p>I look forward to discussing how my skills in neural architecture and data injection can benefit your upcoming missions.</p><p>Best regards,<br>[ YOUR_NAME ]</p>`;
    };
}

function attachKeywords(modal) {
    modal.querySelector('#kw-btn').onclick = () => {
        const out = modal.querySelector('#kw-out');
        const kws = ['REACT', 'DOCKER', 'K8S', 'AI', 'PYTHON', 'NODE.JS', 'REST_API', 'MOPID', 'NEURAL_NETS'];
        out.innerHTML = kws.map(k => `<span style="border: 1px solid #FF00E5; color: #FF00E5; background: rgba(255, 0, 229, 0.1); padding: 5px 15px; border-radius: 20px; font-family: Rajdhani; font-weight: bold;">${k}</span>`).join('');
    };
}

function attachATS(modal) {
    const regenerateBtn = modal.querySelector('#ats-regenerate');
    if (regenerateBtn) {
        regenerateBtn.onclick = () => generateATSReport(modal);
    }
    // Auto-generate on modal open
    setTimeout(() => generateATSReport(modal), 500);
}

function generateATSReport(modal) {
    const resumeText = elements.resumeInput ? elements.resumeInput.value : '';

    if (!resumeText || resumeText.trim().length < 10) {
        modal.querySelector('#ats-score').textContent = '--';
        modal.querySelector('#ats-format').textContent = '--';
        modal.querySelector('#ats-keywords').textContent = '--';
        modal.querySelector('#ats-readability').textContent = '--';
        modal.querySelector('#ats-report').innerHTML = '<div style="color: #FF00E5;">⚠ No resume data found. Please upload or paste your resume first, then reopen this tool.</div>';
        return;
    }

    // Simulate scanning animation
    const scoreEl = modal.querySelector('#ats-score');
    scoreEl.textContent = '...';

    setTimeout(() => {
        // Calculate ATS scores
        const text = resumeText.toLowerCase();
        const wordCount = text.split(/\s+/).length;

        // Format score (length and structure)
        let formatScore = 70;
        if (wordCount > 300 && wordCount < 800) formatScore = 95;
        else if (wordCount >= 200) formatScore = 85;

        // Keyword density
        const commonKeywords = ['experience', 'developed', 'managed', 'led', 'built', 'implemented', 'designed', 'created'];
        const keywordMatches = commonKeywords.filter(kw => text.includes(kw)).length;
        const keywordScore = Math.min(100, (keywordMatches / commonKeywords.length) * 100 + 20);

        // Readability (based on presence of bullets, sections, etc.)
        let readabilityScore = 75;
        if (text.includes('•') || text.includes('-')) readabilityScore += 10;
        if (text.includes('experience') && text.includes('education')) readabilityScore += 10;
        readabilityScore = Math.min(100, readabilityScore);

        // Overall ATS score
        const overallScore = Math.round((formatScore * 0.3 + keywordScore * 0.4 + readabilityScore * 0.3));

        // Update UI with animation
        let currentScore = 0;
        const interval = setInterval(() => {
            currentScore += 3;
            if (currentScore >= overallScore) {
                currentScore = overallScore;
                clearInterval(interval);
            }
            scoreEl.textContent = currentScore + '%';
        }, 20);

        modal.querySelector('#ats-format').textContent = formatScore + '%';
        modal.querySelector('#ats-keywords').textContent = Math.round(keywordScore) + '%';
        modal.querySelector('#ats-readability').textContent = readabilityScore + '%';

        // Generate detailed report
        const status = overallScore >= 80 ? '<span style="color: #00FF94;">✓ EXCELLENT</span>' : overallScore >= 60 ? '<span style="color: #FFB800;">⚠ GOOD</span>' : '<span style="color: #FF00E5;">✗ NEEDS IMPROVEMENT</span>';

        const report = `
            <div style="line-height: 1.8;">
                <div style="margin-bottom: 1rem;">
                    <strong style="color: #00FF94;">Overall Status:</strong> ${status}
                </div>
                <div style="margin-bottom: 1rem;">
                    <strong style="color: #00FF94;">Format Analysis:</strong><br>
                    ${formatScore >= 90 ? '• Resume length is optimal for ATS parsing<br>• Structure appears well-organized' : '• Consider expanding resume to 300-800 words<br>• Add more structured sections'}
                </div>
                <div style="margin-bottom: 1rem;">
                    <strong style="color: #00FF94;">Keyword Analysis:</strong><br>
                    • Found ${keywordMatches}/${commonKeywords.length} common action verbs<br>
                    ${keywordScore < 70 ? '• Recommendation: Add more power verbs (developed, implemented, led, etc.)' : '• Good use of industry-standard terminology'}
                </div>
                <div>
                    <strong style="color: #00FF94;">Readability:</strong><br>
                    ${readabilityScore >= 85 ? '• PDF/Text parsing probability: HIGH<br>• ATS-friendly formatting detected' : '• Add bullet points for better parsing<br>• Include clear section headers'}
                </div>
            </div>
        `;

        modal.querySelector('#ats-report').innerHTML = report;
    }, 1000);
}

function attachTemplates(modal) {
    // Templates are already interactive via onclick in HTML
    window.selectTemplate = function (templateName) {
        alert(`Selected ${templateName.toUpperCase()} template! This would download/apply the template in a full implementation.`);
    };
}
