function saveCurrentLesson() {
    const currentPage = window.location.pathname.split('/').pop();
    const lessonId = currentPage.split('.')[0];
    localStorage.setItem('currentLesson', lessonId);
}
function getCurrentLesson() {
    return localStorage.getItem('currentLesson') || 'les1';
}
function goToCurrentLesson() {
    const lessonId = getCurrentLesson();
    window.location.href = lessonId + '.html';
}

function homepageCapterLink() {
    // Hide the link if the current page is chap1.html
    if (currentLesson === 'les1') {
        currentLessonLink.style.display = 'none';
    } else {
        // Otherwise, make sure it's visible and points to the right place
        currentLessonLink.style.display = 'inline';
    }
}
function lessonsCapterLink() {
    if (currentLesson === 'les1') {
        this.innerHTML = 'Start Lessons &rarr;';
    } else {
        this.innerHTML = 'Continue Lessons';
    }
}
