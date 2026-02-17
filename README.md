

###	A simple Node.js + TypeScript API that resizes images using Sharp. You can request any image with custom width and height through the /api/images endpoint.


**Installation:**

	 1. *git clone *https://github.com/RobertLogos32/finalProjectBackendDevUdacity.gitcd**
	 2. *cd finalProjectBackendDevUdacity*
	 3. *npm install*

**Scripts:**

	 - npm start      # starts server on port 3000
	 - npm run build  # compiles TypeScript into dist/
	 - npm test       # builds and runs Jasmine tests
	 - npm run lint   # runs ESLint
	 - npm run format # formats code with PrettierMostra più linee

**API Endpoint:**

*GET /api/images*

**Query parameters:**

 - filename → image name inside assets/images/ (without .jpg)
 - width → positive number
 - height → positive number

Example:
  *http://localhost:3000/api/images?filename=icelandwaterfall&width=300&height=200*



**Tests:**

Tests are written in Jasmine.
Included tests:

 - Resize works with valid width & height
 - Returns 400 for invalid width/height
 - Returns 404 if image does not exist
 - Endpoint tests (200 / 400 / 404)

**Run all tests:**

	*npm test*




**How to Use:**

Put your .jpg images inside:

*assets/images/*


**Request:**

*/api/images?filename=<name>&width=<w>&height=<h>*


The resized image will be saved automatically in:

*assets/thumbs/*
