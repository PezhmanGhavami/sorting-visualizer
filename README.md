An app to visualize different sorting algorithms with the ability to rewind them to better understand how each algorithm works.

Since there are a lot of re-renderings happening, optimization was an important aspect of development, by leveraging the useCallback hook I managed to create smoother re-renders, specially when rewinding through the results.

You can checkout the live version [here](https://sortingvisualizer.pezhman.io/)

To run locally:

> 1 - `npm i`
>
> 2 - `npm run dev`
