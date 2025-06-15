const scriptURL = 'https://script.google.com/macros/s/AKfycbwRf8KtsKd-7gCGsr6GcoqdaytlAV1SxvU1n6D69y1QyMxRiTwK3kUIKktmOn53KJgd/exec'
const form = document.forms['contact-form']
form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Thank you! your form is submitted successfully." ))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
})