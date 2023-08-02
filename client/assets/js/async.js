// FUNCTION THAT FETCHES COUNTRY IMAGES FROM THE API
async function fetchQuestion(questionType) {
    const url = `http://localhost:3000/countries/random/${questionType}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const image = data.imageUrl;
      const correctCountry = data.country;

      // DISPLAYS THE IMAGE IN THE MODAL
      const modalImage = document.getElementById('modal-image');
      modalImage.src = image;
      const modal = document.getElementById('modal');
      modal.style.display = 'block';

      // REMOVE THE EVENT LISTENER TO PREVENT ACCUMULATION (THIS WAS A FIX FOR THE MODAL NOT LEAVING THE SCREEN)
      if (submitButtonListener) {
        submitButton.removeEventListener('click', submitButtonListener)
      }

      submitButtonListener = function () {
        handleSubmitAnswer(correctCountry)
      }
      submitButton.addEventListener('click', submitButtonListener)

      } catch (error) {
        console.error('Error fetching data from the API:', error);
      }
  }