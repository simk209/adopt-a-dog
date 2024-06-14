# Adopt a Dog

## Description
This project is a website designed to help users search for and get matched with shelter dogs. Users have the ability to filter dogs by breed or zipcode, and they can sort search results alphabetically by breed in ascending or descending order. Additionally, users can mark dogs as favorites and then generate a match from that list of favorites.
 

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
While this app should meet basic requirements, it would greatly benefit from other UX-focused features, including:

- Improved pagination with the ability to skip to a specific page number.
- A more user-friendly filter that shows all filters applied and allows users to clear individual filters rather than resetting all filters.
- The ability to reset favorites.
- A display of the favorites list (Currently the list is stored as a state variable but not shown to the user. They can only see the match generated from the favorites list)
- Improved accessibility

Additionally, it would benefit from comprehensive testing and improved responsiveness. Currently, the grid displaying dog objects changes depending on the screen size; however, filtering should also adapt, perhaps rendering a filtering icon that opens into a modal for smaller screens.
