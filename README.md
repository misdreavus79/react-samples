# hubspot-exercise
Code exercise for HubSpot. It displays three different modules, one with plain text, another which grabs data from an API, and a third with filterable content.

A few notes on the assignment:
* I used ejs to build the bare index.html, but usedI React components (Bonus Points No. 4) for the partials.
* React Components were named similarly to the provided ejs partials, but with UpperCamelCase instead of hypens. As such, Main.jsx became the entry point for the partials instead of index.ejs (which now serves to create a bare html file, see above).
    * Due to Requirements Nos. 1 and 2, markup for these components remained intact. Any new functionality was added in new components in order to inject the provided data into the partials.
        * Furthermore, Titles for each module were included in the Main.jsx component, as they are not part of the modules.
    * Provided ejs templates were left in the project for reference.
    * Gulp tasks that referenced any unused part of the code (e.g the 'ejs' and 'html' tasks) were also left in the project for reference.
