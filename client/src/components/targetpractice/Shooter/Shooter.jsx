
import styles from './styles.module.css'
import React, { PureComponent, useEffect, useRef, useState } from 'react'
import Matter from 'matter-js'
import Shoot from '../../../assets/sounds/shoot.ogg'
import Ouch from '../../../assets/sounds/gruntsound.wav'
import Jonathon from '../../../assets/images/sprites/enemy.png'
import Arrow from '../../../assets/images/sprites/arrow_cropped.png'
import Floor from '../../../assets/images/sprites/tiled_stone_wall.png'
import Wall from '../../../assets/images/sprites/tiled_stone_wall_side.png'
import Character from '../../../assets/images/sprites/archer_no_background_resized.png'
import Target from '../../../assets/images/sprites/archery_target_resized.png'
import Background from '../../../assets/images/sprites/brick_background.png'
import { useDispatch } from 'react-redux';

export default function Shooter({ onScoreUpdate }) {

    const sceneRef = useRef(null)

    const dispatch = useDispatch();

    const [shootingScore, setShootingScore] = useState(0);

    useEffect(() => {
        dispatch({ type: 'SET_SHOOTERSCORE', payload: shootingScore })
        onScoreUpdate(shootingScore)
    }, [shootingScore])

    useEffect(() => {

        const canvas = sceneRef.current
        const selectDiv = document.querySelector("#App")

        if (canvas) {
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
                canvas: canvas,
                element: document.querySelector('#App'),
                engine: engine,

                options: {
                    width: 1920,
                    height: 900,
                    wireframes: false,
                    background: Background
                }
            });

            //define bitfields
            const defaultCategory = 0x0001
            const characterCategory = 0x0002
            const arrowCategory = 0x0004
            const targetCategory = 0x0008


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
            const rightWallOptions = {
                isStatic: true,
                render: {
                    sprite: {
                        texture: Wall,
                        xScale: 1,
                        yScale: 1
                    }
                }
            }

            const leftWallOptions = {
                isStatic: true,
                render: {
                    sprite: {
                        texture: Wall,
                        xScale: 1,
                        yScale: 1
                    }
                }
            }

            //create the floor
            let floor = Bodies.rectangle(900, 880, 1800, 50, floorOptions)
            let leftWall = Bodies.rectangle(0, 450, 40, 900, leftWallOptions)
            let rightWall = Bodies.rectangle(1920, 450, 40, 900, rightWallOptions)
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
                    mask: defaultCategory | targetCategory
                },
            }

            const characterOptions = {
                render: {
                    sprite: {
                        texture: Character,
                        xScale: 0.6,
                        yScale: 0.6
                    }
                },
                collisionFilter: {
                    category: characterCategory,
                    mask: defaultCategory | targetCategory
                },
            }

            const targetOptions = {
                render: {
                    sprite: {
                        texture: Target,
                        xScale: 0.6,
                        yScale: 0.6
                    }
                },
                collisionFilter: {
                    category: targetCategory,
                    mask: defaultCategory | arrowCategory | characterCategory
                },
                isStatic: true
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

            let target = Bodies.rectangle(1500, 750, 50, 200, targetOptions)
            let character = Bodies.rectangle(300, 800, 50, 200, characterOptions)
            Matter.Body.setInertia(character, Infinity)
            Matter.Body.setInertia(target, Infinity)
            let arrow = Bodies.rectangle(350, 600, 100, 20, arrowOptions)
            Matter.Body.setInertia(arrow, Infinity)
            Matter.Body.setAngularVelocity(arrow, 0);
            // Matter.Body.setInertia(villain, Infinity)
            // Matter.Body.setInertia(villainArrow, Infinity)

            //setup arrow position for firing logic
            let shootingArrow = arrow;

            //make character arrow always be at the character location
            Matter.Events.on(engine, 'beforeUpdate', () => {
                if (!shootingArrow.isShot) {
                    Matter.Body.setPosition(shootingArrow, {
                        x: character.position.x,
                        y: character.position.y - 30
                    });
                }
            })

            //add listeners for touch and click
            selectDiv.addEventListener('click', shootArrow)
            selectDiv.addEventListener('touchstart', shootArrow)

            //add listener for click to shoot arrow
            function shootArrow(e) {
                const shootSound = new Audio(Shoot)
                if (!shootingArrow.isShot) {
                    const angle = 6
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
            };

            //listen for collision between arrow and villain
            Matter.Events.on(engine, 'collisionStart', event => {
                const ouchSound = new Audio(Ouch)
                const pairs = event.pairs
                pairs.forEach(pair => {
                    if ((pair.bodyA === arrow && pair.bodyB === target && Math.abs(character.position.x - arrow.position.x) > 15) || (pair.bodyA === target && pair.bodyB === arrow && Math.abs(character.position.x - arrow.position.x) > 15)) {
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

            // add all of the bodies to the world
            Composite.add(engine.world, [stack, arrow, mouseConstraint, character, target, leftWall, rightWall, floor]);

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
                selectDiv.removeEventListener('click', shootArrow);
                selectDiv.removeEventListener('touchstart', shootArrow);
            };
        }
    }, [])

    return (
        // <div className={styles.backgroundContainer}>          
        <div className={styles.App} id='App' tabIndex='0' >
            <canvas ref={sceneRef} />
        </div>
        // {/* </div> */}
    )
}


