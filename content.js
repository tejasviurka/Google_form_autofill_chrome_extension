console.log("✅ Content script loaded for Google Form Auto-Filler");

function fillForm() {
    console.log("🔹 Auto-filling Google Form...");

    const formData = {
        "Full Name":["name" , "Full name" ],
        "Phone Number": ["phone number", "mobile", "contact number"],
        "Email": ["email", "email address"],
        "Address": ["address", "location"],
        "10th Percentage": ["10th percentage", "10th marks", "ssc marks"],
        "12th Percentage": ["12th percentage", "hsc marks", "intermediate marks"],
        "Overall CGPA": ["cgpa", "overall cgpa", "cumulative gpa"],
        "LinkedIn Profile": ["linkedin", "linkedin profile"],
        "GitHub Profile": ["github", "github profile"]
    };

    const userData = {
        "Full Name": "Tejasvi Urkande",
        "Phone Number": "9699733259",
        "Email": "tejasviurkande@gmail.com",
        "Address": "Sewagram, Wardha",
        "10th Percentage": "81.40",
        "12th Percentage": "92.00",
        "Overall CGPA": "7.22",
        "LinkedIn Profile": "https://www.linkedin.com/in/tejasvi-urkande/",
        "GitHub Profile": "https://github.com/tejasviurka"
    };

    let filledFields = 0;

    document.querySelectorAll(".Qr7Oae").forEach((questionContainer) => {
        const labelText = questionContainer.innerText.toLowerCase();

        for (let key in formData) {
            if (formData[key].some(alias => labelText.includes(alias))) {
                const inputField = questionContainer.querySelector("input, textarea");

                if (inputField) {
                    inputField.value = userData[key];

                    // Trigger events to simulate user input
                    inputField.dispatchEvent(new Event("input", { bubbles: true }));
                    inputField.dispatchEvent(new Event("change", { bubbles: true }));

                    console.log(`✅ Filled: ${key} -> ${userData[key]}`);
                    filledFields++;
                }
                break;
            }
        }
    });

    if (filledFields > 0) {
        console.log(`✅ Successfully filled ${filledFields} fields.`);
    } else {
        console.warn("⚠️ No matching fields found! Check field labels or structure.");
    }
}

// **Wait for Google Form to fully load using MutationObserver**
const observer = new MutationObserver(() => {
    if (document.querySelector(".Qr7Oae")) {
        console.log("✅ Google Form detected, filling form...");
        fillForm();
        observer.disconnect(); // Stop observing once form is found
    }
});

// Start observing document changes
observer.observe(document.body, { childList: true, subtree: true });

// **Listen for messages from popup.js**
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "fillForm") {
        fillForm();
        sendResponse({ status: "success" });
    }
});
