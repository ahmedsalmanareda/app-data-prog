document.addEventListener('DOMContentLoaded', function() {
    // بيانات الموقع
    const grades = [
        {
            name: 'الصف الأول الإعدادي',
            terms: [
                { name: 'الترم الأول', isReview: false },
                { name: 'الترم الثاني', isReview: false },
                { name: 'مراجعات الترم الأول', isReview: true },
                { name: 'مراجعات الترم الثاني', isReview: true }
            ],
            type: 'middle',
            tracks: null
        },
        {
            name: 'الصف الثاني الإعدادي',
            terms: [
                { name: 'الترم الأول', isReview: false },
                { name: 'الترم الثاني', isReview: false },
                { name: 'مراجعات الترم الأول', isReview: true },
                { name: 'مراجعات الترم الثاني', isReview: true }
            ],
            type: 'middle',
            tracks: null
        },
        {
            name: 'الصف الثالث الإعدادي',
            terms: [
                { name: 'الترم الأول', isReview: false },
                { name: 'الترم الثاني', isReview: false },
                { name: 'مراجعات الترم الأول', isReview: true },
                { name: 'مراجعات الترم الثاني', isReview: true }
            ],
            type: 'middle',
            tracks: null
        },
        {
            name: 'الصف الثاني الثانوي',
            terms: [
                { name: 'الترم الأول', isReview: false },
                { name: 'الترم الثاني', isReview: false }
            ],
            type: 'secondary',
            tracks: [
                {
                    name: 'علمي',
                    subjects: ['عربي', 'إنجليزي', 'فرنساوي', 'رياضيات', 'كيمياء', 'فيزياء', 'أحياء']
                },
                {
                    name: 'أدبي',
                    subjects: ['عربي', 'إنجليزي', 'فرنساوي', 'جغرافيا', 'تاريخ', 'فلسفة', 'علم نفس']
                }
            ]
        }
    ];

    const tasks = ['فيديوهات', 'كتب'];

    // ألوان لكل صف
    const gradeColors = {
        'الصف الأول الإعدادي': 'linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%)',
        'الصف الثاني الإعدادي': 'linear-gradient(135deg, #7209b7 0%, #560bad 100%)',
        'الصف الثالث الإعدادي': 'linear-gradient(135deg, #f72585 0%, #b5179e 100%)',
        'الصف الثاني الثانوي': 'linear-gradient(135deg, #4cc9f0 0%, #4895ef 100%)'
    };

    // بيانات المستخدم
    const userData = {
        name: "أخوك",
        avatar: "👨‍🎓",
        points: 0,
        dailyProgress: [],
        badges: []
    };

    // تحميل بيانات المستخدم من localStorage
    function loadUserData() {
        const savedData = localStorage.getItem('userData');
        if (savedData) {
            Object.assign(userData, JSON.parse(savedData));
        }
        updateUserInfo();
    }

    // حفظ بيانات المستخدم
    function saveUserData() {
        localStorage.setItem('userData', JSON.stringify(userData));
    }

    // تحديث واجهة المستخدم
    function updateUserInfo() {
        document.getElementById('userAvatar').textContent = userData.avatar;
        document.getElementById('userPoints').textContent = userData.points;
    }

    // إضافة رسالة تشجيعية
    function showEncouragement(message) {
        const msgElement = document.getElementById('encouragementMessage');
        msgElement.innerHTML = `<i class="fas fa-thumbs-up"></i> ${message}`;
        msgElement.classList.add('show');
        
        setTimeout(() => {
            msgElement.classList.remove('show');
        }, 3000);
    }

    // عرض أيقونات احتفالية
    function showCelebration() {
        const celebration = document.getElementById('celebration');
        celebration.style.display = 'flex';
        celebration.style.opacity = '1';
        
        setTimeout(() => {
            celebration.style.opacity = '0';
            setTimeout(() => {
                celebration.style.display = 'none';
            }, 500);
        }, 2000);
    }

    // إضافة نقاط وإنجازات
    function addPoints(amount, reason) {
        userData.points += amount;
        
        // تسجيل التقدم اليومي
        const today = new Date().toLocaleDateString();
        userData.dailyProgress.push({
            date: today,
            points: amount,
            reason: reason
        });
        
        // التحقق من الإنجازات
        checkAchievements();
        
        saveUserData();
        updateUserInfo();
        showEncouragement(["أحسنت!", "رائع!", "استمر في التقدم!", "إنجاز ممتاز!"][Math.floor(Math.random() * 4)]);
        showCelebration();
        
        // تغيير الخلفية عند 100 نقطة
        if (userData.points >= 100 && !document.body.classList.contains('achievement-unlocked')) {
            document.body.classList.add('achievement-unlocked');
            showEncouragement("لقد وصلت إلى 100 نقطة! أنت مذهل!");
        }
    }

    // التحقق من الإنجازات
    function checkAchievements() {
        const achievements = [
            { points: 50, badge: "مبتدئ", icon: "fa-star" },
            { points: 100, badge: "متوسط", icon: "fa-medal" },
            { points: 200, badge: "محترف", icon: "fa-trophy" }
        ];
        
        achievements.forEach(ach => {
            if (userData.points >= ach.points && !userData.badges.includes(ach.badge)) {
                userData.badges.push(ach.badge);
                showEncouragement(`تهانينا! لقد كسبت شارة ${ach.badge}`);
                updateBadges();
            }
        });
    }

    // تحديث شارات الإنجازات
    function updateBadges() {
        const badgesContainer = document.getElementById('badgesContainer');
        badgesContainer.innerHTML = '';
        
        const achievements = [
            { points: 50, badge: "مبتدئ", icon: "fa-star" },
            { points: 100, badge: "متوسط", icon: "fa-medal" },
            { points: 200, badge: "محترف", icon: "fa-trophy" }
        ];
        
        userData.badges.forEach(badge => {
            const achievement = achievements.find(a => a.badge === badge);
            if (achievement) {
                const badgeElement = document.createElement('div');
                badgeElement.className = 'badge';
                badgeElement.innerHTML = `<i class="fas ${achievement.icon}"></i> ${badge}`;
                badgesContainer.appendChild(badgeElement);
            }
        });
    }

    // تحديث التقدم لكل مادة
    function updateSubjectProgress() {
        document.querySelectorAll('.subject').forEach(subject => {
            const subjectId = subject.querySelector('.subject-header').textContent;
            const tasks = subject.querySelectorAll('.task');
            const completed = subject.querySelectorAll('.task.completed').length;
            const progress = tasks.length > 0 ? (completed / tasks.length) * 100 : 0;
            
            let progressBar = subject.querySelector('.progress-bar-small');
            if (!progressBar) {
                const progressContainer = document.createElement('div');
                progressContainer.className = 'subject-progress';
                progressContainer.innerHTML = `
                    <div class="progress-label">
                        <span>التقدم</span>
                        <span>${Math.round(progress)}%</span>
                    </div>
                    <div class="progress-bar-small">
                        <div class="progress-fill-small" style="width: ${progress}%"></div>
                    </div>
                `;
                subject.appendChild(progressContainer);
            } else {
                const fill = progressBar.querySelector('.progress-fill-small');
                fill.style.width = `${progress}%`;
                progressBar.previousElementSibling.querySelector('span:last-child').textContent = `${Math.round(progress)}%`;
            }
        });
    }

    // إنشاء رسم بياني للتقدم اليومي
    function renderDailyProgressChart() {
        const chartContainer = document.getElementById('dailyProgressChart');
        if (!chartContainer) return;
        
        // تجميع البيانات حسب اليوم
        const progressByDay = {};
        userData.dailyProgress.forEach(entry => {
            if (!progressByDay[entry.date]) {
                progressByDay[entry.date] = 0;
            }
            progressByDay[entry.date] += entry.points;
        });
        
        const dates = Object.keys(progressByDay).reverse().slice(0, 7); // آخر 7 أيام
        const points = dates.map(date => progressByDay[date]);
        const maxPoints = Math.max(...points, 1);
        
        // إنشاء رسم بياني بسيط
        chartContainer.innerHTML = `
            <div class="chart-bars" style="display: flex; height: 200px; align-items: flex-end; gap: 10px; margin-top: 20px;">
                ${dates.map((date, i) => `
                    <div style="flex: 1; display: flex; flex-direction: column; align-items: center;">
                        <div style="background: linear-gradient(to top, var(--primary-color), var(--accent-color)); 
                                    width: 30px; 
                                    height: ${(points[i] / maxPoints) * 100}%; 
                                    border-radius: 5px 5px 0 0;"
                                    title="${date}: ${points[i]} نقطة">
                        </div>
                        <div style="margin-top: 5px; font-size: 0.8rem;">${date.split('/')[0]}/${date.split('/')[1]}</div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // تأثير إكمال المهمة
    function animateTaskCompletion(taskElement) {
        gsap.from(taskElement, {
            duration: 0.5,
            scale: 1.2,
            backgroundColor: "#4cc9f0",
            ease: "elastic.out(1, 0.5)"
        });
    }

    // إنشاء واجهة الموقع
    const gradesContainer = document.querySelector('.grades-container');
    
    grades.forEach((grade, gradeIndex) => {
        const gradeElement = document.createElement('div');
        gradeElement.className = 'grade';
        gradeElement.style.animationDelay = `${gradeIndex * 0.1}s`;
        
        const gradeHeader = document.createElement('div');
        gradeHeader.className = 'grade-header';
        gradeHeader.style.background = gradeColors[grade.name] || gradeColors['الصف الأول الإعدادي'];
        
        const gradeTitle = document.createElement('h2');
        gradeTitle.textContent = grade.name;
        
        const gradeToggle = document.createElement('i');
        gradeToggle.className = 'fas fa-chevron-down';
        
        gradeHeader.appendChild(gradeTitle);
        gradeHeader.appendChild(gradeToggle);
        
        const gradeContent = document.createElement('div');
        gradeContent.className = 'grade-content';
        
        grade.terms.forEach(term => {
            const termElement = document.createElement('div');
            termElement.className = 'term';
            
            const termHeader = document.createElement('div');
            termHeader.className = `term-header ${term.isReview ? 'review' : ''}`;
            
            const termTitle = document.createElement('h3');
            termTitle.textContent = term.name;
            
            const termToggle = document.createElement('i');
            termToggle.className = 'fas fa-chevron-down';
            
            termHeader.appendChild(termTitle);
            termHeader.appendChild(termToggle);
            
            const termContent = document.createElement('div');
            termContent.className = 'term-content';
            termContent.style.display = 'none';
            
            if (grade.type === 'middle') {
                // المواد الإعدادية
                const middleSubjects = ['عربي', 'إنجليزي', 'رياضيات', 'دراسات', 'علوم'];
                
                middleSubjects.forEach(subject => {
                    const subjectElement = document.createElement('div');
                    subjectElement.className = 'subject';
                    
                    const subjectHeader = document.createElement('div');
                    subjectHeader.className = 'subject-header';
                    subjectHeader.textContent = subject;
                    
                    subjectElement.appendChild(subjectHeader);
                    
                    tasks.forEach(task => {
                        const taskId = `${grade.name}-${term.name}-${subject}-${task}`.replace(/\s+/g, '-');
                        
                        const taskElement = createTaskElement(taskId, task);
                        subjectElement.appendChild(taskElement);
                    });
                    
                    termContent.appendChild(subjectElement);
                });
            } else if (grade.type === 'secondary') {
                // المواد الثانوية
                const trackContainer = document.createElement('div');
                trackContainer.className = 'tracks-container';
                
                grade.tracks.forEach(track => {
                    const trackElement = document.createElement('div');
                    trackElement.className = 'track';
                    
                    const trackHeader = document.createElement('div');
                    trackHeader.className = 'track-header';
                    trackHeader.textContent = track.name;
                    
                    trackElement.appendChild(trackHeader);
                    
                    track.subjects.forEach(subject => {
                        const subjectElement = document.createElement('div');
                        subjectElement.className = 'subject';
                        
                        const subjectHeader = document.createElement('div');
                        subjectHeader.className = 'subject-header';
                        subjectHeader.textContent = subject;
                        
                        subjectElement.appendChild(subjectHeader);
                        
                        tasks.forEach(task => {
                            const taskId = `${grade.name}-${track.name}-${term.name}-${subject}-${task}`.replace(/\s+/g, '-');
                            
                            const taskElement = createTaskElement(taskId, task);
                            subjectElement.appendChild(taskElement);
                        });
                        
                        trackElement.appendChild(subjectElement);
                    });
                    
                    trackContainer.appendChild(trackElement);
                });
                
                termContent.appendChild(trackContainer);
            }
            
            termElement.appendChild(termHeader);
            termElement.appendChild(termContent);
            gradeContent.appendChild(termElement);
            
            // إضافة حدث النقر لرأس الترم
            termHeader.addEventListener('click', function() {
                termContent.style.display = termContent.style.display === 'none' ? 'block' : 'none';
                termToggle.classList.toggle('fa-chevron-down');
                termToggle.classList.toggle('fa-chevron-up');
                termHeader.classList.toggle('active');
                
                // تأثير اهتزاز عند الفتح
                if (termContent.style.display === 'block') {
                    gsap.from(termContent, {
                        duration: 0.5,
                        height: 0,
                        opacity: 0,
                        ease: "power2.out"
                    });
                }
            });
        });
        
        gradeElement.appendChild(gradeHeader);
        gradeElement.appendChild(gradeContent);
        gradesContainer.appendChild(gradeElement);
        
        // إضافة حدث النقر لرأس الصف
        gradeHeader.addEventListener('click', function() {
            gradeContent.classList.toggle('show');
            gradeToggle.classList.toggle('fa-chevron-down');
            gradeToggle.classList.toggle('fa-chevron-up');
            gradeHeader.classList.toggle('active');
            
            // تأثير اهتزاز عند الفتح
            if (gradeContent.classList.contains('show')) {
                gsap.from(gradeContent, {
                    duration: 0.5,
                    opacity: 0,
                    y: -20,
                    ease: "back.out"
                });
            }
        });
    });
    
    // دالة مساعدة لإنشاء عناصر المهام
    function createTaskElement(taskId, taskName) {
        const taskElement = document.createElement('div');
        taskElement.className = 'task';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = taskId;
        
        // تحميل الحالة المحفوظة
        const savedState = localStorage.getItem(taskId);
        if (savedState === 'true') {
            checkbox.checked = true;
            taskElement.classList.add('completed');
        }
        
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                taskElement.classList.add('completed');
                animateTaskCompletion(taskElement);
                addPoints(10, `إكمال مهمة ${taskName}`);
            } else {
                taskElement.classList.remove('completed');
            }
            localStorage.setItem(taskId, this.checked);
            updateProgress();
            updateSubjectProgress();
        });
        
        const label = document.createElement('label');
        label.htmlFor = taskId;
        label.textContent = taskName;
        
        // إضافة زر للفيديوهات
        if (taskName === 'فيديوهات') {
            const videoButton = document.createElement('button');
            videoButton.className = 'video-button';
            videoButton.innerHTML = '<i class="fas fa-external-link-alt"></i>';
            videoButton.title = 'فتح موقع الفيديوهات';
        
            videoButton.addEventListener('click', function(e) {
                e.stopPropagation();
                const newTab = window.open('https://ahmedsalmanareda.github.io/Ytube-xlsx/', '_blank');
        
                // تحقق كل ثانية إذا أغلقت الصفحة
                const checkCompletion = setInterval(() => {
                    if (newTab.closed) {
                        clearInterval(checkCompletion);
                        // عرض البطاقة المنبثقة
                        const popup = document.getElementById('videoCompletionPopup');
                        popup.style.display = 'flex';
        
                        // تأكيد الإكمال
                        document.getElementById('popupConfirm').addEventListener('click', () => {
                            if (!checkbox.checked) {
                                checkbox.checked = true;
                                taskElement.classList.add('completed');
                                animateTaskCompletion(taskElement);
                                localStorage.setItem(taskId, true);
                                updateProgress();
                                updateSubjectProgress();
                                addPoints(10, `إكمال مهمة ${taskName}`);
                            }
                            popup.style.display = 'none';
                        });
        
                        // إلغاء
                        document.getElementById('popupCancel').addEventListener('click', () => {
                            popup.style.display = 'none';
                        });
                    }
                }, 1000);
            });
        
            taskElement.appendChild(videoButton);
        }
        
        taskElement.appendChild(checkbox);
        taskElement.appendChild(label);
        
        return taskElement;
    }
    
    // حساب التقدم
    function updateProgress() {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        const total = checkboxes.length;
        let completed = 0;
        
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) completed++;
        });
        
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
        
        // تحديث شريط التقدم
        gsap.to('.progress-fill', {
            width: `${percentage}%`,
            duration: 1,
            ease: "elastic.out(1, 0.5)"
        });
        
        document.querySelector('.progress-text').textContent = `${percentage}% مكتمل`;
        
        // تأثير النص عند التغيير
        gsap.from('.progress-text', {
            duration: 0.5,
            scale: 1.2,
            y: -10,
            ease: "back.out"
        });
        
        // إذا اكتمل كل شيء
        if (percentage === 100) {
            createConfetti();
            
            // تأثير النص عند الإكمال الكامل
            gsap.to('.progress-text', {
                duration: 1,
                color: '#f72585',
                scale: 1.3,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut"
            });
        }
    }
    
    // تأثير الكونفيتي
    function createConfetti() {
        const colors = ['#4361ee', '#3a0ca3', '#f72585', '#4cc9f0', '#4895ef', '#7209b7'];
        const container = document.querySelector('.confetti-container');
        container.innerHTML = '';
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.top = '-10px';
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            confetti.style.opacity = '1';
            
            const animationDuration = Math.random() * 3 + 2;
            
            gsap.to(confetti, {
                y: '100vh',
                x: `${(Math.random() - 0.5) * 200}px`,
                rotation: Math.random() * 360,
                duration: animationDuration,
                ease: "power1.out",
                onComplete: () => {
                    confetti.remove();
                }
            });
            
            container.appendChild(confetti);
        }
    }
    
    // إنشاء عناصر واجهة المستخدم الجديدة
    const userInfoElement = document.createElement('div');
    userInfoElement.className = 'user-info';
    userInfoElement.innerHTML = `
        <div class="avatar" id="userAvatar">👨‍🎓</div>
        <div class="points">النقاط: <span id="userPoints">0</span></div>
    `;
    document.querySelector('header').appendChild(userInfoElement);

    const statsContainer = document.querySelector('.stats');
    statsContainer.innerHTML = `
        <div class="progress-container">
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
            <div class="progress-text">0% مكتمل</div>
        </div>
        <div class="confetti-container"></div>
        
        <div class="stats-container">
            <div class="chart-container">
                <div class="chart-title">التقدم اليومي</div>
                <div id="dailyProgressChart"></div>
            </div>
            <div class="chart-container">
                <div class="chart-title">الإنجازات</div>
                <div id="badgesContainer" class="badges-container"></div>
            </div>
        </div>
    `;

    // تحميل البيانات وتحديث الواجهة
    loadUserData();
    updateProgress();
    updateSubjectProgress();
    renderDailyProgressChart();
    
    // تأثيرات دخول الصفحة
    gsap.from('header', {
        duration: 1,
        y: -50,
        opacity: 0,
        ease: "power2.out"
    });
    
    gsap.from('.stats', {
        duration: 1,
        y: 50,
        opacity: 0,
        delay: 0.5,
        ease: "power2.out"
    });
});