//  getting hold of all html nodes
document.addEventListener("DOMContentLoaded", function () {
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const searchInput = document.getElementById("search");
  const nameElement = document.getElementById("name");
  const designationElement = document.getElementById("designation");
  const personalInfoElement = document.querySelector(".personal-info");
  const techSkillsElement = document.querySelector(".tech-skills");
  const hobbiesElement = document.querySelector(".hobbies");
  const resumepageEl = document.querySelector(".resume-page");
  const workEl = document.querySelector("#work");
  const projectEl = document.querySelector("#project");
  const educationEl = document.querySelector("#education");
  const InternshipEl = document.querySelector("#internship");
  const achievementEl = document.querySelector("#achivements");
  const popUpElement = document.querySelector(".no-results");

 // storing json data in variable
  const baseUrl = "../data.json";
  let applicantsData = [];
  let filteredApplicants = [];
  let currentIndex = 0;

  // Fetching the data from the JSON file using Fetch API
  fetch(baseUrl)
    .then((response) => response.json())
    .then((data) => {
      applicantsData = data.resume;
      filteredApplicants = applicantsData;
      updateResume(currentIndex);
    })
    .catch((error) => console.error("Error fetching data:", error));

   // This will update the resume page data when navigating through buttons
  function updateResume(index) {
    const applicant = filteredApplicants[index];
    if (!applicant) return;

    nameElement.textContent = applicant.basics.name;
    designationElement.textContent = `Applied For: ${applicant.basics.AppliedFor}`;

    personalInfoElement.innerHTML = `<h5 class="title">Personal Information</h5>
      <p class="info">${applicant.basics.phone}</p>
      <p class="info">${applicant.basics.email}</p>
      <a href="${applicant.basics.profiles.url}" class="info">${applicant.basics.profiles.network}</a>`;

    techSkillsElement.innerHTML = `<h5 class="title">Technical Skills</h5>
      ${applicant.skills.keywords
        .map((skill) => `<p class="info">${skill}</p>`)
        .join("")}`;

    hobbiesElement.innerHTML = `<h5 class="title">Hobbies</h5>
      ${applicant.interests.hobbies
        .map((hobby) => `<p class="info">${hobby}</p>`)
        .join("")}`;

    workEl.innerHTML = `<div id="work">
        <h4 class="heading">Work Experience in previous company</h4>
        <p class="content"><b>Company Name : </b>${applicant.work["Company Name"]}</p>
        <p class="content"><b>Position : </b>${applicant.work.Position}</p>
        <p class="content"><b>Start Date : </b>${applicant.work["Start Date"]}</p>
        <p class="content"><b>End Date : </b>${applicant.work["End Date"]}</p>
        <p class="content"><b>Summary : </b>${applicant.work.Summary}</p>
      </div>`

    projectEl.innerHTML = `<div id="project">
        <h4 class="heading">Projects</h4>
        <p class="content"><b>${applicant.projects.name} : </b>${applicant.projects.description}</p>
       </div>`

    educationEl.innerHTML = `<div id="education">
        <h4 class="heading">Education</h4>
        <ul> <li class="content"><b>UG : </b>${applicant.education.UG.institute}, ${applicant.education.UG.course}, ${applicant.education.UG["Start Date"]} to ${applicant.education.UG["End Date"]}, cgpa -${applicant.education.UG.cgpa}</li>
        <li class="content"><b>Senior Secondary : </b>${applicant.education["Senior Secondary"].institute}, cgpa -${applicant.education["Senior Secondary"].cgpa}</li>
        <li class="content"><b>High School : </b>${applicant.education["High School"].institute}, cgpa -${applicant.education["High School"].cgpa}</li></ul>
      </div>`

    InternshipEl.innerHTML = `<div id="internship">
        <h4 class="heading">Internship</h4>
        <ul><li class="content"><b>Company Name : </b>${applicant.Internship["Company Name"]}</li>
        <li class="content"><b>Position : </b>${applicant.Internship.Position}</li>
        <li class="content"><b>Start Date : </b>${applicant.Internship["Start Date"]}</li>
        <li class="content"><b>End Date : </b>${applicant.Internship["End Date"]}</li>
        <li class="content"><b>Summary : </b>${applicant.Internship.Summary}</p></ul>
      </div>`

    achievementEl.innerHTML = `<div id="achivements">
        <h4 class="heading">Achievements</h4>
        <ul class="content">
            <li>${applicant.achievements.Summary}</li>
        </ul>
      </div>`;

    const isFirstApplicant = index === 0;
    const isLastApplicant = index === filteredApplicants.length - 1;

    // Hiding or showing previous and next buttons based on the current applicant position
    if (isFirstApplicant) {
      prevBtn.style.visibility = 'hidden';
    } else {
      prevBtn.style.visibility = 'visible';
    }

    if (isLastApplicant) {
      nextBtn.style.visibility = 'hidden';
    } else {
      nextBtn.style.visibility = 'visible';
    }
  }

  // checking for the keyword entered in the search in available applicants data 
  function searchByJob(keyword) {
    const searchTerm = keyword.toLowerCase();
    filteredApplicants = applicantsData.filter(
      (applicant) =>
        applicant.basics.AppliedFor.toLowerCase().includes(searchTerm)
    );

    currentIndex = 0;

    if (filteredApplicants.length === 0) {
      popUpElement.style.display = "block";
      resumepageEl.style.display = "none";
      prevBtn.style.display = "none";
      nextBtn.style.display = "none";
    } else {
      popUpElement.style.display = "none";
      updateResume(currentIndex);
    }
  }
  
  // Previous button functionality 
  prevBtn.addEventListener("click", function () {
    if (currentIndex > 0) {
      currentIndex--;
      updateResume(currentIndex);
    }
  });

   // Next button functionality 
  nextBtn.addEventListener("click", function () {
    if (currentIndex < applicantsData.length - 1) {
      currentIndex++;
      updateResume(currentIndex);
    }
  });

  // Search functionality
  searchInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      searchByJob(searchInput.value);
    }
  });

});
         

