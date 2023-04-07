const breedContainer = document.getElementById('breed-container');
const breedName = document.getElementById('breed-name');
const breedImage = document.getElementById('breed-image');
const nextButton = document.getElementById('next-button');
const commentContainer = document.getElementById('comment-container');
const commentForm = document.getElementById('comment-form');
const commentInput = document.getElementById('comment-input');

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
  let newBreed = currentBreed;
  // Keep fetching new breeds until we get one that is different from the current breed
  while (newBreed === currentBreed) {
    const breeds = await fetchAllBreeds();
    newBreed = breeds[Math.floor(Math.random() * breeds.length)];
  }
  currentBreed = newBreed;
  breedName.innerText = currentBreed;
  breedImage.src = await fetchBreedImage();
}

// Function to display a new comment
function displayNewComment(comment) {
  const commentElement = document.createElement('p');
  commentElement.innerText = comment;
  commentContainer.appendChild(commentElement);
}

// Event listener for the next button
nextButton.addEventListener('click', displayNewBreed);

// Event listener for the comment form
commentForm.addEventListener('submit', event => {
  event.preventDefault();
  const comment = commentInput.value;
  displayNewComment(comment);
  commentInput.value = '';
});

// Display the initial dog breed image and name
displayNewBreed();
