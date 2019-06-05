# Visual Studio Code Extension for Creating Jekyll Posts

This extension makes it easier to create new blog posts for Jekyll-based
websites using the Visual Studio Code editor.

Using this extension, a user can create new post file with pre-filled
"front matter". The template for front matter can either be provided by the
user or the extension will use its built-in template.

## Usage instructions

If a user wants to provide a template file for new posts, they should create
a file: `.post-template` in the Jekyll project root directory.

Here's an example of the template file:

```bash
$ cat $PROJECT_ROOT/.post-template
---
layout: post
title: This is a new article
author: User
summary: Summary of the article
---
```

If no template is provided, the extension will use its built-in template for
new posts. The default template is as follows:

```
---
layout: post,
title: This is a new article
date: YYYY-MM-DD HH:MM
category: Category
author: User
tags: [tag1, tag2]
summary: Summary of the article
---
```

To create a new post, a user must right click on a directory in the explorer
menu and select the "New Post" option. Then, a dialog box prompts the user
to provide the name of the file.

## Features

- Adds a new explorer context menu option to create new blog posts
- Sets up the file name automatically in the format expected by Jekyll
  (`YYY-mm-dd-*.*`)
- Ability to provide a template file for new posts in the Jekyll project root
  directory
- If no template file is provided, the extension uses a pre-defined template
  for new posts. The `Tab` key can be used to move between and edit
  the different attributes/fields in the front matter.

## Requirements

This has only been tested on the latest release (v.1.34.0) of Visual Studio
Code. It may or may not work on earlier releases.

## Extension Settings

There are no extension-specific settings for now.

## Todo

* [ ] Location and name of post template file should be configurable
* [ ] Tab-based navigation with user-provided post template
