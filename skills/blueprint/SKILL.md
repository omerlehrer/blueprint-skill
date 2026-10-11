---
name: blueprint
description: Explain a subject as a blueprint sheet - one local HTML file in the white-on-blue technical drawing style, with a main drawing, numbered sequence, detail views, key dimensions and scroll zoom. Use when the user invokes /blueprint or asks for a blueprint sheet, blueprint diagram or blueprint explainer of a system, a module, a process or a general concept.
---

# Blueprint

Make one HTML file that explains the subject as an engineering drawing sheet. The file must contain all its styles, drawings and scripts. The primary function of the sheet is to explain the subject. The style is secondary.

## Inputs

- The subject: the text after `/blueprint`. The subject can be code in this repository (a package, a module, a flow) or a general subject. Ask only when you cannot identify a subject.
- The output path, when the user names one.
  - When the subject is one document, for example a plan or a PRD, write `blueprint.html` to the folder of that document.
  - For each other subject, write `<subject-slug>-blueprint.html` to the session scratch directory. Use the temporary directory of the system when the session has no scratch directory. Do not put the file in the repository.
  - Do not publish the file unless the user asks.

## Procedure

1. Research the subject before you draw.
   - For repository code, read the source. A README is a guide, not evidence. Verify each claim, name and number in the code.
   - For a general subject, choose one small concrete example as the study object and calculate its numbers.
2. Plan the sheet on these parts. Remove a part only when the subject has nothing true to put in it.
   - Header: date, repo and subject. Do not add other fields.
   - Layout: a landscape sheet (refer to Layout rules).
   - Main drawing: the structure of the subject, with group frames for the parts that belong together.
   - Numbered balloons on the main drawing and a sequence panel that explains each number.
   - Index: the parts and their roles, in the same groups as the drawing.
   - Three detail views (A, B, C) that each show one mechanism at a larger scale.
   - Key dimensions: a table of the real quantities.
   - Notes: the rules and limits a reader must know.
   - One detail drawing with dimension lines.
3. Copy `template.html` from this skill's directory to the output path. Keep its styles, SVG definitions and script. Replace the sample content.
4. Draw. Plan each coordinate in the SVG `viewBox` before you write it.
5. Render the file and examine the picture (refer to Verification). Correct each defect. Render again only if you changed the layout.
6. Open the file for the user. Tell the user the path, the content of each panel and each simplification that you made.

## Style rules

- Paper `#153a93` with the faint drafting grid. Ink `#eef3ff` only. No second color, no gradient, no shadow.
- Thin lines of constant weight. A group frame is the only heavier line.
- Monospaced type. Labels are uppercase with wide letter spacing. Sentences are in sentence case (refer to Language). No external fonts, scripts or images.
- Separate categories with fills, not colors: plain, hatched, cross-hatched, dashed outline. Use four categories at most and put each one in a legend.
- A solid arrow is a request or a call. A dashed arrow is a stream or a return. A line starts and ends on a box edge.
- Lines must not cross a box. Avoid line crossings. Put numbered balloons on the lines and keep long labels in the legend.
- Use a dimension line only for a real quantity: a size, a count, a time, a limit. Put the value above the line and the name in parentheses below it. Write "not to scale" when the lengths do not follow the values.
- Each number on the sheet must be correct for the subject you drew. For code, take the value from the source.

## Icons

Use Lucide icons to identify the boxes of the main drawing. An icon is an aid. The title names the box.

- Copy the shapes of an icon into the sheet as inline SVG. Do not load an icon file or an icon font.
- Do not draw a Lucide icon from memory. Use the script `lucide-icon.mjs` in this skill's directory. It reads the shapes from the `lucide-react` package of the project. When the project does not have the package, it gets the shapes from `unpkg.com/lucide-static`.
- Give the script one placement for each icon: the icon name, the x of the box center, the y of the icon top and the size in px.

  ```sh
  node <skill-directory>/lucide-icon.mjs file-text:160:96:14 database:1065:242:11
  ```

- The script prints one `<g class="ic" ...>` group for each placement. Paste the groups into the main drawing after the boxes. The template has the class `ic` and one sample.
- Find the icon names in `node_modules/lucide-react/dist/esm/icons/` or at `lucide.dev/icons`. The script stops with an error when a name does not exist.
- When the script cannot get the shapes, do not put an icon in the box.
- Put the icon top 6 px below the box top in a box that is 60 px high and 4 px below it in a box that is 45 px high.
- Center the icon above the title of the box. Then move the title and the second line down, so that the three items are centered in the box.
- Use 14 px in a box that is 60 px high and 11 px in a box that is 45 px high. Do not put an icon in a smaller box.
- Use one icon for one meaning. Do not use an icon without a title.

## Header

The header has three fields and no others.

- Date: the date of the sheet, as `YYYY-MM-DD`.
- Repo: the name of the repository that contains the subject. Write `NONE` when the subject is not in a repository.
- Subject: the name of the subject.

## Language

Write all text on the sheet in ASD-STE100 Simplified Technical English. This includes labels, legends, captions, notes and table text. Examine each sentence before you keep it.

- Use the active voice.
- Give one fact or one instruction in each sentence.
- Use 20 words at most in a procedural sentence and 25 words at most in a descriptive sentence.
- Use one word for one meaning. Use the same name for a thing each time.
- Use the simple present tense, the simple past tense or the imperative. Do not use the "-ing" form as a verb.
- Use an article before each noun that needs one. Do not make a cluster of more than three nouns.
- Do not use idioms, figures of speech or marketing words.
- Keep technical names as the source writes them. These include identifiers, file names and product names.
- The sheet shows labels in uppercase: drawing text, panel titles, part names and quantity names. Put the class `code` on an identifier or a file name to keep its case.
- The sheet shows sentences in sentence case: the sequence, the notes, the captions and the role column of the index. Write these with a capital first letter. The template styles keep their case.
- Write a label as a short noun phrase. Write an explanation as a full sentence.

## Fonts

The sheet uses the monospaced font of the operating system and loads no font file. The template sets this stack: `"SF Mono", ui-monospace, Menlo, Consolas, "Courier New", monospace`. Do not add a web font.

## Layout rules

- The sheet is landscape, because a monitor is wider than it is high. It is 2440 px wide. Keep its height at 1350 px or less, which is near 16:9.
- The sheet has four columns. The main column is 1240 px wide and holds the header, the main drawing and the three detail views. Three side columns hold the other panels: sequence and key dimensions, then index, then notes and the detail drawing.
- The main column sets the height of the sheet. When a side column is higher than the main column, shorten its text or move a panel to a shorter side column.
- The main drawing uses `viewBox="0 0 1200 H"` with `H` at 700 or less. Draw the flow from left to right. The small views use `380 x 230`.
- Estimate text width before you place it: character count x 0.7 x font size. Keep 8 px of clearance inside a box.
- Use 10 px type for box titles, 7.8 px for the second line, 9 px in narrow boxes. Do not go below 7.5 px.
- Keep 40 px or more between columns that arrows cross, so that a balloon fits.
- Align the boxes that one arrow connects on the same y or x. Use an elbow path only when alignment is not possible.

## Verification

Render with a headless browser, then read the screenshot. Use Chrome, Chromium or Edge. This is the command on macOS.

```sh
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
  --hide-scrollbars --window-size=2480,1400 --screenshot=shot.png "file://$PWD/<file>.html"
```

- On Linux, the program is `google-chrome` or `chromium`. On Windows, the program is `chrome.exe` in the Chrome installation directory.
- If no browser is available, tell the user that you did not render the sheet.
- A wide window (2480 x 1400) shows the sheet near full size. A monitor window (1920 x 1080) shows the fit view. Add `--force-device-scale-factor=1.5` to examine small text.
- Examine the fit view for a sheet that is higher than the window ratio. Empty bands at the left and the right show this defect.
- Examine each panel for text that overlaps, text that leaves its box, an icon that touches text, arrows that miss a box edge and lines that cross a box.
- Delete the screenshots when you finish.
- The template script supplies the scroll zoom, the drag and the double-click. Tell the user if you did not do a test of them in a browser.
