# Generate icon font
To rebuild the LorylistIcon.js component please run the following command after you updated the lorylist-icon-font.ttf file.
Note: You also need the css file for the icon font. For example: lorylist-icon-font.css

## Run in icons directory
fontcustom watch ./ -n "lorylist-icon-font"
cp ./lorylist-icon-font/lorylist-icon-font.css ~/Code/lorylist-app/src/assets/fonts/lorylist-icon-font.css
cp ./lorylist-icon-font/*.ttf ~/Code/lorylist-app/src/assets/fonts/lorylist-icon-font.ttf

## Run in app root directory
./node_modules/.bin/generate-icon src/assets/fonts/lorylist-icon-font.css --componentName=LorylistIcon --fontFamily=lorylist-icon-font > src/Components/LorylistIcon.js
react-native link
react-native run-ios