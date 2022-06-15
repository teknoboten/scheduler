# Interview Scheduler 📆

Interview scheduler is a small front-end client written in React. It allows users to book interviews with a list of staff members provided by an API. It was written as an assignment for the Lighthouse Labs Web Development Bootcamp, boilerplate and CSS cloned from (here)[https://github.com/lighthouse-labs/scheduler].

![screen1](https://github.com/teknoboten/scheduler/blob/main/public/images/screen1.png?raw=true)
![screen2](https://github.com/teknoboten/scheduler/blob/main/public/images/screen2.png?raw=true)



## Key Features

- Users can book, edit, and cancel interviews
- Appointment component automatically transitions between various visual modes depending on state
- An error message is displayed if a save / delete action fails
- *Day* and *Interviewer* components are automatically generated based on data served by the API
- *Spots remaining* adjusts as interviews are booked / deleted (this seems like an insignificant feature but it took me a whole day of feeling like an absolute failure to implement, so it gets a mention)



## Key Learning

**React** 
This is it, I know everything there is to know about React now. 

Just kidding. This was my first project using React and thinking in terms of props, state and hooks is definitly going to take a lot more practice. So far, it has been a roller coaster of "I got it!!", "...I don't got it" from one minute to the next. Good news is, I like roller coasters. 🎢 

**Hooks**
Scheduler utilizes useState and useEffect to manage both the API data and visual mode of it's components. You can find code for those implementations [here](https://github.com/teknoboten/scheduler/tree/main/src/hooks) if you'd like.

**Testing**
Unit and integration tests were performed using *Jest*, which you can find [here](https://github.com/teknoboten/scheduler/tree/main/src/components/__tests__).

For E2E testing, we set up *Cypress*, which I found extremely cool. Ideally we should just write code that doesn't have any errors, but sometimes us silly mortals need to debug, and being able to easily track state / props via code wormhoes sure helps. Cypress tests [here](https://github.com/teknoboten/scheduler/tree/main/cypress/e2e).


**Storybook**
Before we started writing our app, we built [stories](https://github.com/teknoboten/scheduler/blob/main/stories/index.js) for how our components would interact using *Storybook*. 



## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## API server

You will need to run the API server locally. Available [here](https://github.com/lighthouse-labs/scheduler-api).

