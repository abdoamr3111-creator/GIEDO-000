// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Progress Bar
window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    document.getElementById('progressBar').style.width = scrolled + '%';
});

// Sticky Navigation
const mainNav = document.getElementById('mainNav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 100) {
        mainNav.style.boxShadow = '0 4px 20px var(--shadow-lg)';
    } else {
        mainNav.style.boxShadow = '0 2px 10px var(--shadow)';
    }
    
    lastScroll = currentScroll;
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Code Copy Functionality
function setupCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const codeBlock = btn.nextElementSibling.querySelector('code');
            const text = codeBlock.textContent;
            
            navigator.clipboard.writeText(text).then(() => {
                const originalHTML = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-check"></i> تم النسخ';
                btn.classList.add('copied');
                
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.classList.remove('copied');
                }, 2000);
            });
        });
    });
}

// Code Navigation
const codeNavBtns = document.querySelectorAll('.code-nav-btn');
const codeFiles = document.querySelectorAll('.code-file');

codeNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const fileId = btn.getAttribute('data-file');
        
        // Update active button
        codeNavBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Show corresponding file
        codeFiles.forEach(file => {
            file.classList.remove('active');
            if (file.id === `code-${fileId}`) {
                file.classList.add('active');
            }
        });
    });
});

// Deploy Tabs
const deployTabs = document.querySelectorAll('.deploy-tab');
const deployPanels = document.querySelectorAll('.deploy-panel');

deployTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const panelId = tab.getAttribute('data-tab');
        
        // Update active tab
        deployTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Show corresponding panel
        deployPanels.forEach(panel => {
            panel.classList.remove('active');
            if (panel.id === `deploy-${panelId}`) {
                panel.classList.add('active');
            }
        });
    });
});

// Download Function
function downloadAllCode() {
    // في التطبيق الحقيقي، سيتم تنزيل ملف ZIP
    alert('سيتم تحميل الكود الكامل بصيغة ZIP...\n\nفي النسخة النهائية، سيتم توفير رابط تحميل مباشر.');
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.feature-card, .firebase-step, .code-file').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupCopyButtons();
    loadCodeContent();
    loadDeployContent();
});

// Load Code Content
function loadCodeContent() {
    const codeContent = document.getElementById('codeContent');
    
    // Use external code data
    if (typeof window.codeData === 'undefined') {
        codeContent.innerHTML = '<p style="text-align: center; padding: 40px;">يتم تحميل الكود...</p>';
        return;
    }
    
    const files = Object.entries(window.codeData).map(([id, data]) => ({
        id,
        ...data
    }));
    
    codeContent.innerHTML = files.map((file, index) => `
        <div id="code-${file.id}" class="code-file ${index === 0 ? 'active' : ''}">
            <h3><i class="fas fa-file-code"></i> ${file.title}</h3>
            <p class="file-path">${file.path}</p>
            <p style="color: var(--text-light); margin-bottom: 15px; font-size: 14px;">${file.description}</p>
            <div class="code-block">
                <button class="copy-btn"><i class="fas fa-copy"></i> نسخ</button>
                <pre><code>${escapeHtml(file.code)}</code></pre>
            </div>
        </div>
    `).join('');
    
    setupCopyButtons();
}

// Load Deploy Content
function loadDeployContent() {
    const deployContent = document.getElementById('deployContent');
    
    deployContent.innerHTML = `
        <div id="deploy-build" class="deploy-panel active">
            <h3><i class="fas fa-hammer"></i> بناء ملف APK و App Bundle</h3>
            <p>استخدم الأوامر التالية لبناء التطبيق:</p>
            <div class="code-block">
                <button class="copy-btn"><i class="fas fa-copy"></i> نسخ</button>
                <pre><code># 1. تنظيف المشروع
flutter clean && flutter pub get

# 2. بناء APK للتجربة
flutter build apk --release
# النتيجة: build/app/outputs/flutter-apk/app-release.apk

# 3. بناء App Bundle للنشر على Google Play
flutter build appbundle --release
# النتيجة: build/app/outputs/bundle/release/app-release.aab</code></pre>
            </div>
        </div>
        
        <div id="deploy-android" class="deploy-panel">
            <h3><i class="fas fa-android"></i> إعداد ملفات Android</h3>
            <h4>1. AndroidManifest.xml</h4>
            <div class="code-block">
                <button class="copy-btn"><i class="fas fa-copy"></i> نسخ</button>
                <pre><code>&lt;manifest xmlns:android="http://schemas.android.com/apk/res/android"&gt;
    &lt;uses-permission android:name="android.permission.INTERNET"/&gt;
    &lt;uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/&gt;
    
    &lt;application
        android:label="Giedo Digital Mall"
        android:icon="@mipmap/ic_launcher"&gt;
    &lt;/application&gt;
&lt;/manifest&gt;</code></pre>
            </div>
            
            <h4>2. إنشاء Keystore</h4>
            <div class="code-block">
                <button class="copy-btn"><i class="fas fa-copy"></i> نسخ</button>
                <pre><code>keytool -genkey -v -keystore ~/giedo-key.jks \\
  -keyalg RSA -keysize 2048 -validity 10000 \\
  -alias giedo-key</code></pre>
            </div>
        </div>
        
        <div id="deploy-publish" class="deploy-panel">
            <h3><i class="fas fa-upload"></i> النشر على Google Play</h3>
            <ol style="line-height: 2; color: var(--text-light);">
                <li>إنشاء حساب مطور على <a href="https://play.google.com/console" target="_blank">Google Play Console</a> ($25 مرة واحدة)</li>
                <li>إنشاء تطبيق جديد "Giedo Digital Mall"</li>
                <li>رفع ملف app-release.aab في قسم Production</li>
                <li>تعبئة Store Listing (الوصف، الأيقونة، الصور)</li>
                <li>إكمال Content Rating و Privacy Policy</li>
                <li>إرسال للمراجعة (1-3 أيام)</li>
            </ol>
        </div>
        
        <div id="deploy-tips" class="deploy-panel">
            <h3><i class="fas fa-lightbulb"></i> نصائح ما بعد النشر</h3>
            <ul style="line-height: 2.5; color: var(--text-light);">
                <li><i class="fas fa-check-circle" style="color: var(--success);"></i> مراقبة Firebase Analytics للإحصائيات</li>
                <li><i class="fas fa-check-circle" style="color: var(--success);"></i> Firebase Crashlytics لتتبع الأخطاء</li>
                <li><i class="fas fa-check-circle" style="color: var(--success);"></i> إرسال Push Notifications</li>
                <li><i class="fas fa-check-circle" style="color: var(--success);"></i> تحديث الإصدار كل شهر</li>
                <li><i class="fas fa-check-circle" style="color: var(--success);"></i> الرد على تقييمات المستخدمين</li>
                <li><i class="fas fa-check-circle" style="color: var(--success);"></i> A/B Testing للتصميم</li>
                <li><i class="fas fa-check-circle" style="color: var(--success);"></i> تحسين ASO (App Store Optimization)</li>
            </ul>
        </div>
    `;
    
    setupCopyButtons();
}

// Escape HTML
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}