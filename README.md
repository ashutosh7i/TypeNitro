# TypeNitro
TypeNitro is a typing speed test application built with React. It allows users to test their typing speed by completing a given challenge within a specified time limit.

## How It Works
1. Upon loading the application, a challenge is fetched from the Short Stories API and displayed on the screen.
2. The user types the challenge in the provided textarea.
3. As the user types, the application provides real-time feedback by highlighting each character in green if it matches the challenge, or in red if it doesn't.
4. A timer starts as soon as the user starts typing. The user must complete the challenge within the given time limit.
5. Once the user completes the challenge, the application displays the results, including the time taken, words per minute (WPM), and whether the challenge was completed successfully.

## Installation and Usage
1. Clone the repository: `git clone https://github.com/ashutosh7i/TypeNitro.git`
2. Navigate to the project directory: `cd TypeNitro`
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`
5. Open your browser and visit `http://localhost:5173` to access the application.

## How to Contribute
Contributions are welcome! If you'd like to contribute to TypeNitro, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b my-feature-branch`
3. Make your changes and commit them: `git commit -m "Add some feature"`
4. Push to the branch: `git push origin my-feature-branch`
5. Open a pull request on GitHub.

## License
This project is licensed under the [MIT License](LICENSE).
