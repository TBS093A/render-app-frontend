import React from 'react'
import Particles from 'react-particles-js'


const CanvasBackgroundAnimation = () => {

    let particleColor = '#008000'
    let darkGreen = '#005e00'
    let menuColor = '#161c1d'

    let params = {
        particles: {
            number: { value: 120, density: { enable: true, value_area: 800 } },
            color: { value: particleColor },
            shape: {
              type: "circle",
              stroke: { width: 0, color: darkGreen },
              polygon: { nb_sides: 5 }
            },
            opacity: {
              value: 1,
              random: false,
              anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
            },
            size: {
              value: 3,
              random: true,
              anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: darkGreen,
              opacity: 0.4,
              width: 1
            },
            move: {
              enable: true,
              speed: 6,
              direction: "none",
              random: false,
              straight: false,
              out_mode: "out",
              bounce: false,
              attract: { enable: false, rotateX: 600, rotateY: 1200 }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
              onhover: { enable: true, mode: "repulse" },
              onclick: { enable: true, mode: "push" },
              resize: true
            },
        },
        modes: {
            grab: { 
                distance: 400, 
                line_linked: { 
                    opacity: 1 
                } 
            },
            bubble: { 
                distance: 400, 
                size: 40, 
                duration: 2, 
                opacity: 8, 
                speed: 3 
            },
            repulse: { 
                distance: 200,
                duration: 0.4 
            },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 }
        }
    }

    return (
        <Particles 
            params={ params }
            style={
                {
                    width: '100%',
                    height: '100%',
                    zIndex: '-100',
                }
            }
        />
    )

}

export default CanvasBackgroundAnimation