# Blueprint

An agent skill that explains a subject as a blueprint sheet: one HTML file in the white-on-blue technical drawing style.

Give it a system, a module, a process or a general concept. The agent does the research, draws the sheet and examines a render of it before it shows you the result.

<!-- Examples: add two or three screenshots of real sheets here before the first release. -->

## What is on a sheet

- A main drawing of the structure, with group frames, numbered balloons and Lucide icons on the boxes.
- A sequence panel that explains each number.
- An index of the parts and their roles.
- Three detail views, each of one mechanism at a larger scale.
- A table of key dimensions, with real quantities only.
- Notes with the rules and limits that a reader must know.
- Scroll zoom, drag to pan and double-click to fit.

The sheet is landscape, near 16:9, so that it fills a monitor. The main drawing and the detail views are in the main column. The other panels are in three side columns.

The file contains all its styles, drawings and scripts. It loads no fonts, scripts or images from the network.

## Install

### Claude Code plugin

```
/plugin marketplace add omerlehrer/blueprint-skill
/plugin install blueprint@omer-lehrer
```

### Manual

The skill uses the Agent Skills format (`SKILL.md`), so it works in each agent that reads that format.

```sh
git clone https://github.com/omerlehrer/blueprint-skill
cp -r blueprint-skill/skills/blueprint ~/.claude/skills/blueprint
```

For one project only, copy the directory to `.claude/skills/blueprint` in that project.

## Use

```
/blueprint the request path through our API gateway
/blueprint how a B-tree splits a node
```

You can also ask in plain words, for example "make a blueprint sheet of the auth module".

The agent writes `<subject-slug>-blueprint.html` to a scratch directory, unless you name a path. When the subject is one document, such as a plan or a PRD, the agent writes `blueprint.html` next to that document.

## How it works

- For code, the agent reads the source and takes each name and number from it.
- For a general subject, the agent chooses one small concrete example and calculates its numbers.
- The agent copies `template.html`, replaces the sample content and plans each SVG coordinate.
- The agent renders the file with a headless browser and corrects overlaps, clipped text and lines that cross a box.

All text on a sheet is in ASD-STE100 Simplified Technical English: active voice, one fact in each sentence, one word for one meaning.

## Requirements

- An agent that can read and write files.
- Chrome, Chromium or Edge for the render step. Without a browser, the agent tells you that it did not render the sheet.
- Node.js 18 or later for the icon script. The script reads the icons from `lucide-react` in your project, or from `unpkg.com` when the project does not have it.

## License

MIT. Copyright (c) 2026 Omer Lehrer.

The template and the sheets contain icon shapes from [Lucide](https://lucide.dev), which has the ISC License. Copyright (c) Lucide Contributors.
