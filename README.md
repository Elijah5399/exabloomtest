# exabloomtest

Contains frontend and backend for exabloom technical test

DONE:

- [x] Addition of worksheet component, and each worksheet is given its own URL (compulsory)

- [x] Addition of questions in frontend, and implemented a method for fetching questions for backend (compulsory)

- [x] Add migration and seed files for questions (compulsory)

- [x] Prettify the worksheets page a bit (optional)

- [x] Prettify the login page a bit (optional)

- [x] Integrate React Router (optional)

TODO:

- [ ] Prettify the worksheets page (optional)

- [ ] Add positive scenario test cases to frontend and backend, such as logging in with username (optional)

- [ ] Decouple login page and worksheets page into two separate files (done), with their respective URLs (todo). Use either of the following: (optional)

  - Passing of login creds using Redux/URL params

  - Fix session controller in backend to properly persist user session

  - Persist via local storage

- [ ] Enforce data validation on worksheets fetched and update worksheets state types (optional)

- [ ] Add negative scenario test cases to frontend and backend, eg logging in without username (optional)

- [ ] Enforce data validation on backend models (uniqueness, presences, etc) (optional)

- [ ] Replace RESTful API with GraphQL (optional)

- [ ] Replace fetch with axios (optional)

- [ ] Display a bar graph of count of worksheets against loss and profit (optional)

  - A bar with no. of worksheets with -ve profit

  - A bar with no. of worksheets with +ve profit
