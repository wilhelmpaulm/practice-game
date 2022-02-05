# practice-game

## details
- this is based on @Juriy 's tutorial at https://www.youtube.com/watch?v=NvkM1immvWo&t=701s 
- repo: https://github.com/Juriy/game-demo/tree/rec
- the purpose of this practice is to take a youtube tutorial and slowly modify and scale it from scratch
  - basically try to unnecessarily scale it


## todo
- [ ] finish the tutorial
- [ ] create a log file for tracking the changes
- [ ] create a new game concept
  - [ ] document the process
  - [ ] document the new game idea
  - [ ] break down the following
    - [ ] entities
    - [ ] use-cases
    - [ ] helpers
    - [ ] libraries
    - [ ] storage
    - [ ] routes, controllers, actions
- [ ] create a kanban board to map out the features
  - [ ] track progress
  - [ ] add tests
  - [ ] create a working release
  - [ ] identify tech debts
- [ ] slowly scale the practice game
  - [ ] separate the frontend from the backend
    - [ ] migrate the frontend to react
      - [ ] identify the components
      - [ ] add components to the backlog
    - [ ] release the mvp for the frontend migration
  - [ ] create integration tests
  - [ ] make the app stateless and scalable
    - [ ] add the ability to handle dropped connections
    - [ ] wrap the app in containers
    - [ ] kube the app
  - [ ] make the storage scalable
    - [ ] add caching