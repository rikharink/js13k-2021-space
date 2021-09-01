# TODO

## Should Have

- [ ] regain launches after some time
- [ ] Draw UI
  - [ ] current hole
  - [ ] total number of launches
  - [ ] average launches per hole
  - [ ] amount of slowmotion power left
- [ ] bounce physics (prevent "weird" backwards bounce)
- [ ] try decoupling launch vector from player position
- [ ] visualize ball position when OOB
- [ ] debug collisions (seems it might be possible to kill moon speed with collision and it seems to be possible to pass through the moon without colliding)
- [ ] level generation
- [ ] Add moons
- [ ] bounce particles
- [ ] visualize ball position when OOB
- [ ] bounce physics (prevent "weird" backwards bounce)
- [ ] sfx

## Nice to have

- [ ] Better GFX
- [ ] Add stars that kill you
- [ ] Music
- [ ] Pimp UI
  - [ ] General looks
  - [ ] current hole
  - [ ] average launches per hole

## Stretch goals

- [ ] decentralization
- [ ] achievements
- [ ] shareable hole replay
- [ ] hole editor
- [ ] Restructure gamestate
  - [ ] model player as a celestial body and specifiy id(s) that can be controlled?
  - [ ] move player input to input manager and apply impulse to controlled bodies?

## Level Generation TODO

- [ ] Place spawn planet at same Y height as goal planet previous level
- [ ] Place spawn planet at left of the screen and goal planet at the right?
- [ ] Generate moons
- [ ] Generate more interesting obstacles depending on current level (more planets in the way (with moons) the higher level)
  - [ ] heuristic number of planets that collide with the line between spawn and goal planet?
- [ ] Pan camera to next level instead of jerky level swap
