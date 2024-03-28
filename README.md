# Browsertrix Behaviors

This is a fork of [browsertrix-behaviors](https://github.com/webrecorder/browsertrix-behaviors), with added functionality for harvesting special features of Luxembourgish websites. In this repository, we have included the following behavior:

  * *Woodee* : dynamic flipbook/brochure page flipping and harvesting.

For building/injecting the behaviors into Browsertrix Crawler, please refer to the [original README](original_README.md).


# Compiling

You need `yarn` compile the behaviors into a package. This package will be created in the `dist` folder and is called `behaviors.js`. 

Go to the root folder of the project and run:

    yarn run build

Now go to the Browsertrix Crawler folder, and copy the file `behaviors.js` into the root folder:

    cp ../browsertrix-behaviors/dist/behaviors.js .

Now change the user to `webcrawler`. Then recompile the crawler and tag it:

    podman build -t webrecorder/browsertrix-crawler:local .
    podman tag <image_id> localhost:5000/webrecorder/browsertrix-crawler:local
    
Finally, push it to the registry:

    podman push localhost:5000/webrecorder/browsertrix-crawler:local
    
No need to restart podman as Browserrtix Cloud will automnatically spawn the next crawlers from the regidstry with the `local` tag.


# Testing

Copy the contents of the compiled `behaviors.js` file to the browser's dev tools console, then execute:

    self.__bx_behaviors.run();
    


