function saveCurrentLesson() {
    const currentPage = window.location.pathname.split('/').pop();
    const lessonId = currentPage.split('.')[0];
    const completedLessons = JSON.parse(localStorage.getItem('completedLessons')) || [];

    // Add the current chapter ID to the list if it's not already there
    if (!completedLessons.includes(lessonId)) {
        completedLessons.push(lessonId);
    }

}
function goToCurrentChapter() {
    const completedLessons = JSON.parse(localStorage.getItem('completedLessons')) || [];
    let currentLesson;

    if (completedLessons.length === 0) {
        currentLesson = 'les1.html';
    } else {
        const lastCompletedLesson = completedLessons[completedLessons.length - 1];
        currentLesson = `${lastCompletedLesson}.html`;
    }

    window.location.href = `Lessons/${currentLesson}`;
}
function goToNextLesson() {
    const completedLessons = JSON.parse(localStorage.getItem('completedLessons')) || [];
    let nextLesson;

    if (completedLessons.length === 0) {
        nextLesson = 'les1.html';
    } else {
        const lastCompletedLesson = completedLessons[completedLessons.length - 1];
        const lessonNumber = parseInt(lastCompletedLesson.replace('les', ''), 10);
        nextLesson = `les${lessonNumber + 1}.html`;
    }

    window.location.href = `Lessons/${nextLesson}`;
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
