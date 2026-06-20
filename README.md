# StarSundae Character Hub

A responsive GitHub Pages character hub with editable character profiles and galleries.

## How to use

1. Upload this folder to a GitHub repository.
2. In the repository settings, enable GitHub Pages.
3. Edit `data/characters.json` to add or change characters.
4. Upload character art into the `images` folder.
5. Paste the image path into each character's `avatar`, `heroImage`, or `gallery` list.

## Add a character

Copy one character object inside `data/characters.json`, paste it below the others, and change:

- `id`
- `name`
- `species`
- `role`
- `profile`
- `gallery`

The character page link will be:

`character.html?id=your-character-id`

## Gallery images

Example path:

`images/sabrina/ref-sheet.png`

Then add it to the gallery like this:

```json
{"src": "images/sabrina/ref-sheet.png", "title": "Reference Sheet", "credit": "Art by StarSundae"}
```

## Important

GitHub Pages does not include a private upload dashboard. To add images, upload them to the GitHub repository or connect an outside image service later.
