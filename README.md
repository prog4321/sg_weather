## A simple website to provide a 24-hour weather forecast in Singapore

Please try out the webpage here: https://sg-weather.onrender.com

#### NB: The initial load of the webpage may take a little while as I am on the free tier of render.com.

It uses Node.js/Express.js/Axios to retrieve information via the following realtime API on data.gov.sg:<br>
<a href="https://data.gov.sg/datasets?formats=API&sort=relevancy&page=1&resultId=d_ce2eb1e307bda31993c533285834ef2b">24-hour weather forecast</a>

(The weather information is provided by the National Environment Agency (NEA) in Singapore.)

On the front-end, an EJS file (views/index.ejs) is used, with a CSS file (public/styles/main.css) to take care of formatting.

The server-side code can be found on "index.js" in the root directory.

I have designed the webpage for some responsiveness, and it should render fairly well on a variety of screen resolutions.

The overall architecture is loosely based on what I've learnt in Dr Angela Yu's course, "The Complete Full-Stack Web Development Bootcamp". Fantastic course, by the way!

Please include a credit under my GitHub moniker 'prog4321' if you wish to use/modify the code for your own projects. Thank you.
