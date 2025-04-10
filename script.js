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
            } else {
                taskElement.classList.remove('completed');
            }
            localStorage.setItem(taskId, this.checked);
            updateProgress();
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
    
    function getRandomColor() {
        const colors = ['#4361ee', '#3a0ca3', '#f72585', '#4cc9f0', '#4895ef', '#7209b7'];
        return colors[Math.floor(Math.random() * colors.length)];
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
    
    // تحديث التقدم عند التحميل
    updateProgress();
    
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