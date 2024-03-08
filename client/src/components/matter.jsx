import React, { PureComponent, useEffect, useRef } from 'react'
import Matter from 'matter-js'

export default function Matterjs() {

    const sceneRef = useRef(null)

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
                element: sceneRef.current,
                engine: engine,
                options: {
                    width: 1800,
                    height: 800,
                    wireframes: false
                }
            });

            //define bitfields
            const defaultCategory = 0x0001
            const characterCategory = 0x0002
            const arrowCategory = 0x0004
            const selectDiv = document.querySelector('.App')

            // create two boxes and a ground
            //     let boxA = Bodies.rectangle(400, 200, 80, 80);
            //    let boxB = Bodies.rectangle(450, 50, 80, 80);
            let ground = Bodies.rectangle(1200, 500, 300, 20, { isStatic: true });
            let floor = Bodies.rectangle(900, 700, 1800, 20, { isStatic: true })

            let mouse = Matter.Mouse.create(render.canvas)
            let mouseConstraint = Matter.MouseConstraint.create(engine, {
                mouse: mouse,

                collisionFilter: {
                    mask: defaultCategory | arrowCategory
                }
            });
            render.mouse = mouse;



            // const floorOptions = {
            //     isStatic: true,
            //     render: {
            //         sprite: {
            //             texture: 'path',
            //             xScale: 1, sprite scale on x-axis
            //             yScale: 1 sprite scale on y-axis
            //         }
            //     }
            // }
            //place a brick sprite every 20 pixels from x=0 to x=WIDTH
            // for(let a=1; a<WIDTH+2; a=a+20) {
            // x, y, width, height, options
            //     Composite.add(engine.world, Bodies.rectangle(a, 400, 25, 25, wallOptions))
            // }

            const arrowOptions = {
                render: {
                    sprite: {
                        texture: '../../src/assets/sprites/arrow_cropped.png',
                        xScale: 1,
                        yScale: 1
                    }
                },
                collisionFilter: {
                    category: arrowCategory,
                    mask: defaultCategory
                }
            }

            const characterOptions = {
                render: {
                    sprite: {
                        texture: '../../src/assets/sprites/character_resized.png',
                        xScale: 1,
                        yScale: 1
                    }
                },
                collisionFilter: {
                    category: characterCategory,
                    mask: defaultCategory
                },
            }

            const polygonOptions = {
                render: {
                    sprite: {
                        texture: '../../src/assets/sprites/enemy.png',
                        xScale: 1.3,
                        yScale: 1.3
                    }
                }
            }


            let character = Bodies.rectangle(300, 600, 100, 200, characterOptions)
            Matter.Body.setInertia(character, Infinity)
            let arrow = Bodies.rectangle(300, 600, 100, 20, arrowOptions)
            let arrow2 = Bodies.rectangle(300, 600, 100, 20, arrowOptions)
            let arrow3 = Bodies.rectangle(300, 600, 100, 20, arrowOptions)
            let arrow4 = Bodies.rectangle(300, 600, 100, 20, arrowOptions)
            let arrow5 = Bodies.rectangle(300, 600, 100, 20, arrowOptions)

            // let shoot = (projectile, force) => {
            //     Matter.Body.applyForce(projectile, projectile.position, force);
            // };

            let arrows = [arrow, arrow2, arrow3, arrow4, arrow5]
            let currentArrow = 0
            arrows.forEach(arrow => {
                arrow.isShot = false;
            })

            // Click event to select the arrow
            // selectDiv.addEventListener('click', (e) => {
            //     selectedArrow = selectedArrow === arrow ? arrow2 : (selectedArrow === arrow2 ? arrow3 : (selectedArrow === arrow3 ? arrow4 : (selectedArrow === arrow4 ? arrow5 : arrow)))
            // })

            Matter.Events.on(engine, 'beforeUpdate', () => {
                arrows.forEach(arrow => {
                    if (!arrow.isShot) {
                        Matter.Body.setPosition(arrow, {
                            x: character.position.x,
                            y: character.position.y - 30
                        })
                    }
                })
            })

            

            selectDiv.addEventListener('click', (e) => {
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

            selectDiv.addEventListener('keydown', (e) => {
                if (e.code === 'Space') {
                    e.preventDefault()
                    Matter.Body.applyForce(character, character.position, { x: 0, y: -0.8 })
                } else if (e.code === 'KeyD' || e.code === 'ArrowRight') {
                    Matter.Body.setVelocity(character, { x: 5, y: character.velocity.y })
                } else if (e.code === 'KeyA' || e.code === 'ArrowLeft') {
                    Matter.Body.setVelocity(character, { x: -5, y: character.velocity.y })
                } else {
                    return
                }
            })

            // selectDiv.addEventListener('keydown', (e) => {
            //     e.preventDefault()
            //     if (e.code === 'd') {
            //         Matter.Body.setVelocity(character, { x: 5, y: character.velocity.y })
            //     }
            // })


            // let sling = Matter.Constraint.create({
            //     bodyA: character,
            //     pointA: { x: 49, y: -20 },
            //     bodyB: arrow5,

            //     stiffness: 0.10,
            //     length: 0.1
            // });

            // let bow = Matter.Constraint.create({
            //     pointA: sling,
            //     bodyB: character,
            //     stiffness: 1
            // });

            let stack = Matter.Composites.stack(1100, 270, 4, 4, 0, 0, function (x, y) {
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
            Composite.add(engine.world, [stack, arrow, arrow2, arrow3, arrow4, arrow5, ground, mouseConstraint, character, floor]);


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
                selectDiv.removeEventListener('click',  (e) => {
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

        <div className='App' tabIndex='0' ref={sceneRef}>

        </div>

    )
}


