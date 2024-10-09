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
    } catch (error) {
        console.log(error, "This is the error that occured")
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