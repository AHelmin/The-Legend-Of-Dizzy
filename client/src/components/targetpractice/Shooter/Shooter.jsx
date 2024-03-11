
import styles from './styles.module.css'
import React, { PureComponent, useEffect, useRef, useState } from 'react'
import { Timer } from '../../targetpractice'
import Matter from 'matter-js'
import Shoot from '../../../assets/sounds/shoot.ogg'
import Ouch from '../../../assets/sounds/gruntsound.wav'
import Jonathon from '../../../assets/images/sprites/enemy.png'
import Arrow from '../../../assets/images/sprites/arrow_cropped.png'
import Floor from '../../../assets/images/sprites/tiled_stone_wall.png'
import Character from '../../../assets/images/sprites/character_resized.png'

export default function Shooter() {

    const sceneRef = useRef(null)

    const playerStartHealth = 100
    const villainStartHealth = 100
    const [playerHealth, setPlayerHealth] = useState(playerStartHealth);
    const [shootingScore, setShootingScore] = useState(0);

    useEffect(() => {
        console.log(shootingScore)
    }, [shootingScore])

    useEffect(() => {

        if (sceneRef.current) {
            // module aliases
            let Engine = Matter.Engine,
                Render = Matter.Render,
                Runner = Matter.Runner,
                Bodies = Matter.Bodies,
                Composite = Matter.Composite

            // create an engine
            let engine = Engine.create();

            // create a renderer
            let render = Render.create({
                element: document.querySelector('#App'),
                engine: engine,

                options: {
                    width: 1920,
                    height: 950,
                    wireframes: false,
                    background: 'black'
                }
            });

            //define bitfields
            const defaultCategory = 0x0001
            const characterCategory = 0x0002
            const arrowCategory = 0x0004
            const villainCategory = 0x0008
            const villainArrowCategory = 0x0016

            const selectDiv = document.querySelector("#App")

            const floorOptions = {
                isStatic: true,
                render: {
                    sprite: {
                        texture: Floor,
                        xScale: 1,
                        yScale: 1
                    }
                }
            }

            //create the floor
            let floor = Bodies.rectangle(900, 900, 1800, 50, floorOptions)

            let mouse = Matter.Mouse.create(render.canvas)
            let mouseConstraint = Matter.MouseConstraint.create(engine, {
                mouse: mouse,

                collisionFilter: {
                    mask: defaultCategory
                }
            });
            render.mouse = mouse;

            const arrowOptions = {
                render: {
                    sprite: {
                        texture: Arrow,
                        xScale: 1,
                        yScale: 1
                    }
                },
                collisionFilter: {
                    category: arrowCategory,
                    mask: defaultCategory | villainCategory
                },
            }

            const characterOptions = {
                render: {
                    sprite: {
                        texture: Character,
                        xScale: 1,
                        yScale: 1
                    }
                },
                collisionFilter: {
                    category: characterCategory,
                    mask: defaultCategory | villainCategory | villainArrowCategory
                },
            }

            const villainOptions = {
                render: {
                    sprite: {
                        texture: '../src/assets/images/sprites/character_resized.png',
                        xScale: 1,
                        yScale: 1
                    }
                },
                collisionFilter: {
                    category: villainCategory,
                    mask: defaultCategory | arrowCategory | characterCategory
                },
            }

            const polygonOptions = {
                render: {
                    sprite: {
                        texture: Jonathon,
                        xScale: 1.3,
                        yScale: 1.3
                    }
                }
            }

            let target = Bodies.rectangle(1500, 600, 50, 200)
            let character = Bodies.rectangle(300, 800, 50, 200, characterOptions)
            Matter.Body.setInertia(character, Infinity)
            let arrow = Bodies.rectangle(350, 600, 100, 20, arrowOptions)
            // let villainArrow = Bodies.rectangle(1000, 600, 50, 200, villainArrowOptions)
            Matter.Body.setInertia(arrow, Infinity)
            // Matter.Body.setInertia(villain, Infinity)
            // Matter.Body.setInertia(villainArrow, Infinity)

            //setup arrow position for firing logic
            let shootingArrow = arrow;
            // let villainShootingArrow = villainArrow
            // let initialX = character.position.x
            // let initialY = character.position.y - 30
            // let villainInitialX = villain.position.x
            // let villainInitialY = villain.position.y - 30

            //make villain arrow always be at the villain location
            // Matter.Events.on(engine, 'beforeUpdate', () => {
            //     if (!villainShootingArrow.isShot) {
            //         Matter.Body.setPosition(villainShootingArrow, {
            //             x: villain.position.x,
            //             y: villain.position.y - 30
            //         })
            //     }
            // })

            //make character arrow always be at the character location
            Matter.Events.on(engine, 'beforeUpdate', () => {
                if (!shootingArrow.isShot) {
                    Matter.Body.setPosition(shootingArrow, {
                        x: character.position.x,
                        y: character.position.y - 30
                    });
                }
            })

            //add listener for click to shoot arrow
            selectDiv.addEventListener('click', (e) => {
                const shootSound = new Audio(Shoot)
                if (!shootingArrow.isShot) {
                    const angle = 5.8
                    // Determine the force magnitude and calculate the force vector
                    let forceMagnitude = 0.11 * shootingArrow.mass;
                    let forceVector = {
                        x: forceMagnitude * Math.cos(angle),
                        y: forceMagnitude * Math.sin(angle)
                    };

                    // Apply the force to shoot the arrow
                    Matter.Body.applyForce(shootingArrow, shootingArrow.position, forceVector);
                    shootSound.play();

                    // Mark the arrow as shot
                    shootingArrow.isShot = true;

                    // Reset the arrow after a delay or when a certain condition is met
                    setTimeout(() => {
                        // Reset position
                        Matter.Body.setPosition(shootingArrow, { x: character.position.x, y: character.position.y - 30 });
                        // Reset velocity
                        Matter.Body.setVelocity(shootingArrow, { x: 0, y: 0 });
                        // Reset the isShot flag
                        shootingArrow.isShot = false;
                    }, 2000);
                }
            });

            //listen for collision between arrow and villain
            Matter.Events.on(engine, 'collisionStart', event => {
                const ouchSound = new Audio(Ouch)
                const pairs = event.pairs
                pairs.forEach(pair => {
                    if ((pair.bodyA === arrow && pair.bodyB === target && Math.abs(character.position.x - arrow.position.x) > 15) || (pair.bodyA === target && pair.bodyB === arrow && Math.abs(character.position.x - arrow.position.x) > 15)) {
                        console.log('Arrow collided with villain')
                        setShootingScore(newScore => newScore + 5)
                        ouchSound.play()
                    }
                })
            })

            selectDiv.addEventListener('keydown', (e) => {
                if (e.code === 'KeyD' || e.code === 'ArrowRight') {
                    e.preventDefault()
                    Matter.Body.setVelocity(character, { x: 5, y: character.velocity.y })
                } else if (e.code === 'KeyA' || e.code === 'ArrowLeft') {
                    e.preventDefault()
                    Matter.Body.setVelocity(character, { x: -5, y: character.velocity.y })
                } else if (Math.abs(character.position.y - floor.position.y) < 155) {
                    if (e.code === 'Space') {
                        e.preventDefault()
                        Matter.Body.applyForce(character, character.position, { x: 0, y: -0.5 })
                    }
                }
                else {
                    return
                }
            })

            let stack = Matter.Composites.stack(1100, 500, 4, 4, 0, 0, function (x, y) {
                return Bodies.polygon(x, y, 8, 30, polygonOptions)
            });

            // let firing = false;
            // Matter.Events.on(mouseConstraint, 'enddrag', function (e) {
            //     if (e.body === arrow) firing = true;
            // })
            // Matter.Events.on(engine, 'afterUpdate', function () {
            //     if (firing && Math.abs(arrow.position.x - 300) < 20 && Math.abs(arrow.position.y - 600) < 20) {
            //         arrow = Bodies.rectangle(300, 600, 100, 20, arrowOptions)
            //         Matter.Composite.add(engine.world, arrow)
            //         sling.bodyB = arrow
            //         firing = false
            //     }
            // })

            // add all of the bodies to the world
            Composite.add(engine.world, [stack, arrow, mouseConstraint, character, target, floor]);


            // // run the renderer
            Render.run(render);

            // create runner
            var runner = Runner.create();

            // run the engine
            Runner.run(runner, engine);

            // Cleanup function
            return () => {
                Render.stop(render);
                Runner.stop(runner);
                Composite.clear(engine.world);
                Engine.clear(engine);
                render.canvas.remove();
                render.canvas = null;
                render.context = null;
               
                render.textures = {};
                selectDiv.removeEventListener('click', (e) => {
                    let shootingArrow = arrows[currentArrow];
                    console.log("Shooting Arrow: ", currentArrow, shootingArrow);
                    // Ensure the arrow has not been shot already
                    if (!shootingArrow.isShot) {

                        const arrowPosition = shootingArrow.position

                        // Calculate the angle between the arrow and the click position
                        const dx = e.clientX - arrowPosition.x;
                        const dy = e.clientY - arrowPosition.y;
                        const angle = Math.atan2(dy, dx);
                        // Calculate force based on shooting angle
                        let forceMagnitude = 0.10 * shootingArrow.mass;
                        let forceVector = {
                            x: forceMagnitude * Math.cos(angle),
                            y: forceMagnitude * Math.sin(angle)
                        };
                        console.log("Force Vector: ", forceVector);
                        // Apply the force to shoot the arrow
                        Matter.Body.applyForce(shootingArrow, arrowPosition, forceVector);

                        // Mark the arrow as shot
                        shootingArrow.isShot = true;
                    }

                    // Move to the next arrow in the array
                    currentArrow = (currentArrow + 1) % arrows.length;
                });
            };
        }
    }, [])

    return (
        <div className={styles.backgroundContainer}>
            
            <div className={styles.App} id='App' tabIndex='0' ref={sceneRef}>
            <Timer />
                <canvas></canvas>
            </div>
        </div>
    )
}


