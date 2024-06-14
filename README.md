# Adopt a Dog

## Description
This project is a website designed to help users search for and get matched with shelter dogs. Users have the ability to filter dogs by breed or zipcode, and they can sort search results alphabetically by breed in ascending or descending order. Additionally, users can mark dogs as favorites and then generate a match based on their preferences.
 

## Installation
To run the site locally, follow these steps:

1. Clone the repository:
```bash
git clone https://github.com/simk209/adopt-a-dog.git
```

2. Navigate to the project directory:
```bash
cd adopt-a-dog
```

3. Install project dependencies:
```bash
npm install
```
## Usage
After installing dependencies, you can run the development server using:

```bash
npm run dev
```

## Additional Scripts
- `npm run build`: Builds the project for production after TypeScript compilation.
- `npm run lint`: Lints the TypeScript and TypeScript React files in the project.
- `npm run preview`: Previews the production build locally.

## Future Considerations
While this app should meet basic requirements, it would greatly benefit from other UX focused features (including more detailed paginaton showing users current page and total results, and the abiity to skip pages, a more user-friendly filter that shows all fitlers applied and allows you to clear individual filters rather than reseting all filters, the ability to reset favorites, etc)
Additioally, it would benefit from testing. Other areas for improvement include makingthe site more resposnsive. Currently the grid displayng dog objects does change depending on the screensize, however filtering should change as well, perhaps rendering a filtering icon that opens up inot a modal for smaller screens.  