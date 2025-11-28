const getColors = require('get-image-colors')
const path = require('path')

const imagePath = path.join(__dirname, 'public/logo.jpg')

getColors(imagePath).then(colors => {
    console.log('Dominant Colors:')
    colors.map(color => console.log(color.hex()))
}).catch(err => {
    console.error('Error:', err)
})
