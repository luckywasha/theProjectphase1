# theProjectphase1
Dog Breeds App
This is a simple web application that displays random dog breeds with their images and allows users to leave comments about them. It was built using HTML, CSS, and JavaScript.

Getting Started
To run the app, simply open the index.html file in a web browser. The app uses the Dog API (https://dog.ceo/dog-api/) to fetch random dog breed images and a list of all dog breeds.

Usage
When the app is loaded, it displays a random dog breed image and name. Users can click the "Next" button to display a new random dog breed. The app also allows users to leave comments about the displayed dog breed. Users can enter their comments in the input field and click the "Submit" button to add their comment to the comment section.

Files
The app consists of three files:

index.html: contains the HTML code for the app
index.css: contains the CSS code for the app
index.js: contains the JavaScript code for the app
Acknowledgements
This app was built using the Dog API (https://dog.ceo/dog-api/), which provides free access to a large database of dog images and breeds. Thanks to the creators of the Dog API for making this app possible.

// Select the necessary elements from the HTML code
const breedContainer = document.getElementById('breed-container');
const breedName = document.getElementById('breed-name');
const breedImage = document.getElementById('breed-image');
const nextButton = document.getElementById('next-button');
const commentContainer = document.getElementById('comment-container');
const commentForm = document.getElementById('comment-form');
const commentInput = document.getElementById('comment-input');

// Initialize the current breed to null
let currentBreed = null;

// Function to fetch a random dog breed image
async function fetchBreedImage() {
  const response = await fetch('https://dog.ceo/api/breeds/image/random');
  const data = await response.json();
  return data.message;
}

// Function to fetch a list of all dog breeds
async function fetchAllBreeds() {
  const response = await fetch('https://dog.ceo/api/breeds/list/all');
  const data = await response.json();
  return Object.keys(data.message);
}

// Function to display a new dog breed image and name
async function displayNewBreed() {
  // Initialize the new breed to the current breed
  let newBreed = currentBreed;
  // Keep fetching new breeds until we get one that is different from the current breed
  while (newBreed === currentBreed) {
    const breeds = await fetchAllBreeds();
    newBreed = breeds[Math.floor(Math.random() * breeds.length)];
  }
  // Set the current breed to the new breed
  currentBreed = newBreed;
  // Set the breed name and image to the new breed's name and image
  breedName.innerText = currentBreed;
  breedImage.src = await fetchBreedImage();
}

// Function to display a new comment
function displayNewComment(comment) {
  // Create a new paragraph element for the comment
  const commentElement = document.createElement('p');
  // Set the text of the comment element to the comment text
  commentElement.innerText = comment;
  // Add the comment element to the comment container
  commentContainer.appendChild(commentElement);
}

// Event listener for the next button
nextButton.addEventListener('click', displayNewBreed);

// Event listener for the comment form
commentForm.addEventListener('submit', event => {
  // Prevent the form from submitting normally
  event.preventDefault();
  // Get the value of the comment input
  const comment = commentInput.value;
  // Display the new comment
  displayNewComment(comment);
  // Clear the comment input field
  commentInput.value = '';
});

// Display the initial dog breed image and name
displayNewBreed();
