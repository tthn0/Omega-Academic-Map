# About

This is a simple Vue 3 application that generates a degree map based some data. The app is designed to be used with both fake data and real data, depending on the environment. It uses a `FakeDataFetcher` for local development with fake data and an `OmegaDataFetcher` for fetching real data from the Omega 365 Framework.

# Screenshot

![Screenshot](./Images/Screenshot.jpg)

# Setup Instructions

### 🛠️ Local Development (With Fake Data)

1. Run the following commands:

   ```sh
   cd Source
   npm i
   npm run dev
   ```

2. Visit the local server at and append the following to the URL: `/?Degree_ID=10007`.

### 🌀 Omega 365 Framework (With Real Data)

1. Copy all files in `./Source/src` over to the `Files` section of the Omega 365 Framework Appdesigner.
2. Comment out all uncommented imports and uncomment the commented imports below.
3. Inside of `Source/src/components/App.vue`, swap out the `new FakeDataFetcher()` with `new OmegaDataFetcher()` on line 4.
4. Preview the app and append the following to the URL: `/?Degree_ID=10007` (and make sure that `Degree_ID` already exists).

# Notes

- As of now, the app is not fully functional with semesters other than Fall and Spring because they are hardcoded in the `YearRow.vue` component.
