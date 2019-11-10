let app = new PIXI.Application({
    antialias: true,
    transparent: false,
    resolution: 1
})

app.renderer.backgroundColor = 0x0

document.addEventListener('DOMContentLoaded', 
    () => {
        document.body.appendChild(app.view)
    }

)
let guy, textures, counter = 1, orientation = 1;

app.loader.add('images/guy.json').load(
    (loader, resources) => {
        resource = resources
        textures = resources["images/guy.json"].textures
        guy = new PIXI.Sprite(textures["guy1.png"])
        app.stage.addChild(guy)
        app.ticker.add(delta => gameLoop(delta))
    }
)

let 
    left = keyboard("ArrowLeft"),
    right = keyboard("ArrowRight")

right.press = () => {orientation = 1; guy.position.x -= 32}
left.press = () => {orientation = -1; guy.position.x += 32}



function gameLoop(delta) {

    let 
        frameId = Math.floor(counter) % 7 + 1,
        frame = 'guy' + frameId + '.png' 

    console.log(guy.position.x)
    guy.scale.set(2 * orientation, 2)
    guy.position.x += 4 * orientation 
    guy.texture = textures[frame]
    app.renderer.render(app.stage)
    counter += 0.25
    if (guy.position.x > 832) {guy.position.x = -32; guy.position.y += 64}
    else if (guy.position.x < -32) {guy.position.x = 832; guy.position.y -= 64}

    if (guy.position.y < 0) guy.position.y = 568
    else if (guy.position.y > 568) guy.position.y = 0
        
}
