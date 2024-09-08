// Get references to HTML elements by their IDs
let start_resume = document.getElementById("start-action") as HTMLButtonElement;
let edit_resume = document.getElementById("edit-action") as HTMLButtonElement;
let download_resume = document.getElementById("download-action") as HTMLButtonElement;
let resume_form_container = document.getElementById("resume-form-container") as HTMLElement;
let action_buttons = document.getElementById("action-buttons") as HTMLElement;
let resume_display = document.getElementById("resume-display") as HTMLElement;


// Interface for Resume object
interface Resume {
    fullname: string;
    Email: string;
    Phone: number;
    Address: string;
    Profile_summary: string;
    Skills: string[];
    Work_exp: string;
    Education: string;
}

// Show the resume form when the start button is clicked
function startResume() {
    resume_form_container.style.display = "inline-block";
    action_buttons.style.display = "none";
    resume_display.style.display = "none";
    edit_resume.disabled = true;
    download_resume.disabled = true;
    clearInputFields(); // Clear input fields when showing the form
}

// Show the resume form for editing
function editResume() {
    resume_form_container.style.display = "inline-block";
    action_buttons.style.display = "none";
    resume_display.style.display = "none";
}

// Clear all input fields
function clearInputFields(): void {
    if (fullName) fullName.value = '';
    if (email) email.value = '';
    if (phone) phone.value = '';
    if (address) address.value = '';
    if (skills) skills.value = '';
    if (profile_summary) profile_summary.value = '';
    if (work) work.value = '';
    if (education) education.value = '';
}

// Validate input fields and show alerts for any missing information
function validateInputFields(): boolean {
    let isValid = true;

    if (!fullName.value.trim()) {
        alert("Full name is required!");
        isValid = false;
    }
    if (!email.value.trim()) {
        alert("Email is required!");
        isValid = false;
    }
    if (!phone.value.trim()) {
        alert("Phone number is required!");
        isValid = false;
    }
    if (!address.value.trim()) {
        alert("Address is required!");
        isValid = false;
    }
    if (!profile_summary.value.trim()) {
        alert("Profile summary is required!");
        isValid = false;
    }
    if (!work.value.trim()) {
        alert("Work experience is required!");
        isValid = false;
    }
    if (!education.value.trim()) {
        alert("Education details are required!");
        isValid = false;
    }

    return isValid;
}


// Get references to HTML input fields
let fullName = document.getElementById('full-name') as HTMLInputElement;
let email = document.getElementById('email-address') as HTMLInputElement;
let phone = document.getElementById('phone-number') as HTMLInputElement;
let address = document.getElementById('home-address') as HTMLInputElement;
let profile_summary = document.getElementById('profile-summary') as HTMLInputElement;
let skills = document.getElementById('skills') as HTMLInputElement;
let work = document.getElementById('work-experience') as HTMLInputElement;
let education = document.getElementById('education-background') as HTMLInputElement;
let submit_btn = document.getElementById('generate-btn') as HTMLInputElement;

// Declare a variable to hold resume data
let resume: Resume;


// Get references to HTML elements where resume data will be displayed
let table_name = document.getElementById('resume-name') as HTMLElement;
let table_email = document.getElementById('resume-email') as HTMLElement;
let table_phone = document.getElementById('resume-phone') as HTMLElement;
let table_address = document.getElementById('resume-address') as HTMLElement;
let table_profile_summary = document.getElementById('resume-summary') as HTMLElement;
let table_skills = document.getElementById('resume-skills') as HTMLElement;
let table_work_exp = document.getElementById('resume-work') as HTMLElement;
let table_education = document.getElementById('resume-education') as HTMLElement;


// Handle the form submission and display the resume
function submitForm() {
    if (validateInputFields()) {
        action_buttons.style.display = "block";
        resume_form_container.style.display = "none";
        resume_display.style.display = "inline-block";
        edit_resume.removeAttribute('disabled');
        download_resume.removeAttribute('disabled');

        // Recalculate skill_splitted based on the skill input
        let skill_split = skills.value;
        let skill_splitted = skill_split.split(',').map(s => s.trim()).filter(s => s.length > 0);

        // Create a resume object with the input data
        resume = {
            fullname: fullName.value,
            Email: email.value,
            Phone: Number(phone.value),
            Address: address.value,
            Profile_summary: profile_summary.value,
            Skills: skill_splitted,
            Work_exp: work.value,
            Education: education.value
        };

        // Populate the resume result section with the data
        table_name.textContent = `${resume.fullname}`;
        table_email.textContent = `Email: ${resume.Email}`;
        table_phone.textContent = `Phone No.: ${resume.Phone}`;
        table_address.textContent = `Address: ${resume.Address}`;
        table_profile_summary.textContent = `${resume.Profile_summary}`;
        table_skills.innerHTML = ''; // Clear previous skills
        table_skills.appendChild(createUnorderedList(resume.Skills));
        table_work_exp.textContent = `${resume.Work_exp}`;
        table_education.textContent = `${resume.Education}`;
    }
}

// Create an unordered list from an array of strings
function createUnorderedList(array: string[]) {
    const ul = document.createElement('ul');

    array.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        ul.appendChild(li);
    });

    return ul;
}

// Event listeners for buttons
start_resume.addEventListener('click', startResume);
edit_resume.addEventListener('click', editResume);
submit_btn.addEventListener('click', submitForm);
