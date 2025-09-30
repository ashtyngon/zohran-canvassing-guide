@import url('https://fonts.cdnfonts.com/css/gotham');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

/* Note: Gotham is a commercial font. Using Montserrat as fallback which has similar geometric qualities */
body {
  margin: 0;
  font-family: 'Gotham', 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Headlines use Gotham Bold / Montserrat Bold */
h1, h2, h3, h4, h5, h6, .font-bold {
  font-family: 'Gotham', 'Montserrat', sans-serif;
  font-weight: 700;
}

/* Medium weight for semi-bold text */
.font-medium, .font-semibold {
  font-family: 'Gotham', 'Montserrat', sans-serif;
  font-weight: 500;
}

/* Body text uses Gotham Book (400 weight) */
p, li, span, div {
  font-family: 'Gotham', 'Montserrat', sans-serif;
  font-weight: 400;
}
