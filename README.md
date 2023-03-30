# FUT Employee Demo - Web
A small project demonstrating the use of the [eHealth Infrastructure](https://ehealth-dk.atlassian.net/wiki/spaces/EDTW/overview) for retrieving Episodes of Care, Patients, Tasks, creating consent, creating CarePlans, among other things. This is the frontend for the [FUT Employee Demo - BFF](https://github.com/KvalitetsIT/fut-medarbejder-bff) project.

# Try it out
Two options:
1. Spin up the web app using the react development server.    
    1. Go to the `react-app` folder,
    2. Install dependencies: `npm install`.
    3. Use `npm run start`.
2. Or build and run the Dockerfile.
    1. `docker build -t fut-patient-web .`
    2. `docker run -d -p 80:80 fut-patient-web`
    3. Open browser on [localhost:80](http://localhost:80).

# Requirements
You need either Docker or nodejs to run the app. 

You need to point the web app at the [FUT Employee BFF](https://github.com/KvalitetsIT/fut-medarbejder-bff) server. You can either set the `REACT_APP_API_BASEURL` environment variable in the build environment or set it directly in  `src/redux/BaseQuerySettings.tsx` during development and testing. Default URL is `http://localhost:8080/v1/`.

# Known issues
Login and security is currently not implemented in this demo application. All authentication is handled in the BFF project.

# Tech used in the project

- TypeScript
- Redux Toolkit / RTK Query
- Formik
- Yup
- MUI
