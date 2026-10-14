/* =========================
   INITIALISE FIREBASE
========================= */

const firebaseConfig = {
    apiKey: "AIzaSyDFckOiOWW7ny1xR9syGvrveZDGq5BpgWk",
    authDomain: "green-fork-contacts.firebaseapp.com",
    databaseURL: "https://green-fork-contacts-default-rtdb.firebaseio.com/",
    projectId: "green-fork-contacts",
    storageBucket: "green-fork-contacts.firebasestorage.app",
    messagingSenderId: "950653651058",
    appId: "1:950653651058:web:14ba68d8d42e93d1b11aeb"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();
const messagesRef = db.ref("messages");


/* =========================
   INITIALISE EMAILJS
========================= */

emailjs.init({
    publicKey: "K4mGb3bYWsSe7VDkB"
});

const serviceID = "GreenForkGmail";
const templateID = "template_bsa49ac";


/* =========================
   SUBMIT CONTACT FORM
========================= */

document.getElementById("contactForm").addEventListener(
    "submit",
    submitForm
);

async function submitForm(e) {
    e.preventDefault();

    // Get form values
    const name = getInputVal("name");
    const subject = getInputVal("subject");
    const email = getInputVal("email");
    const phone = getInputVal("phone");
    const message = getInputVal("message");

    const form = document.getElementById("contactForm");
    const status = document.getElementById("form-status");
    const button = form.querySelector('button[type="submit"]');

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    button.disabled = true;

    if (status) {
        status.textContent = "Sending your message...";
    }

    // Email details
    const templateParams = {
        name: name,
        subject: subject,
        email: email,
        phone: phone,
        message: message
    };

    try {
        // Send email and save to Firebase
        const results = await Promise.allSettled([
            emailjs.send(serviceID, templateID, templateParams),

            messagesRef.push({
                name: name,
                subject: subject,
                email: email,
                phone: phone,
                message: message
            })
        ]);

        const emailSent = results[0].status === "fulfilled";
        const saved = results[1].status === "fulfilled";

        if (emailSent && saved) {
            document.querySelector(".alert").style.display = "block";

            if (status) {
                status.textContent = "Your message has been sent successfully!";
            }

            form.reset();

            setTimeout(function () {
                document.querySelector(".alert").style.display = "none";
            }, 5000);

        } else {
            console.error("EmailJS result:", results[0]);
            console.error("Firebase result:", results[1]);

            if (status) {
                status.textContent = emailSent
                    ? "Email sent, but saving to the database failed."
                    : saved
                    ? "Message saved, but the email could not be sent."
                    : "Sorry, your message could not be sent. Please try again.";
            } else {
                alert("There was a problem sending your message.");
            }
        }

    } catch (error) {
        console.error("Contact form error:", error);

        if (status) {
            status.textContent = "Something went wrong. Please try again.";
        }

    } finally {
        button.disabled = false;
    }
}


/* =========================
   GET FORM VALUES
========================= */

function getInputVal(id) {
    return document.getElementById(id).value.trim();
}


