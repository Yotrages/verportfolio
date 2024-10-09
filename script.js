// Get all input fields and submit button
const nameElement = document.querySelector("#name")
const emailElement = document.querySelector("#email")
const subjectElement = document.querySelector("#subject")
const messageElement = document.querySelector("#message")
const submitBtn = document.querySelector("#send-button")

// function to listen to click event and execute

const handleSendDataToBackend = async (dataToBackend) => {
    try {
        const response = await axios.post("https://portfolio-be-22oq.onrender.com", dataToBackend)
        console.log(response.data, response.status, "This is the response from the backend")
        if (response.status === 200) {
            showToast("Form submitted successfully!", 'success'); // Custom toast function
            nameElement.value = ""
            emailElement.value = ""
            subjectElement.value = ""
            messageElement.value = ""
        } else {
            showToast("An error occurred!", 'error'); // Custom toast function
        }
    } catch (error) {
        showToast("An error occurred while submitting the form!", 'error'); // Custom toast function
        console.log(error, "This is the error that occurred")
    }
}

submitBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const dataToBackend = {
        name: nameElement.value,
        email: emailElement.value,
        subject: subjectElement.value,
        message: messageElement.value
    }
    console.log(dataToBackend, "This is the data to send to backend")
    handleSendDataToBackend(dataToBackend)
})

function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toast-container');
    
    // Create a new toast element
    const toast = document.createElement('div');
    toast.classList.add('toast', type);
    toast.innerText = message;
  
    // Append the toast to the container
    toastContainer.appendChild(toast);
  
    // Trigger the show animation
    setTimeout(() => {
      toast.classList.add('show');
    }, 100);
  
    // Remove the toast after 3 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 300); // wait for the hide transition
    }, 3000);
  }
  