# RCSSA Website

This is the source tree of RCSSA official website.


## How to Build the Website

### Requirements

* [Bundler](https://bundler.io/) will automatically help you configure the right versions of the dependencies.  If you don't have one, install one following [the instructions](https://bundler.io/).
* Otherwise, if you really want to build the web on your own, `Jekyll` is required for compiling the web.  **Important**: You should use `jekyll 3.9.0` to build this website.  Newer `jekyll` versions causes errors.

#### Build: Use Bunlder (Recommended)


1. Let bundler install the dependencies.

```bash
bundle install
```

2. Run Jekyll

```bash
bundle exec jekyll serve
```

There you go!

#### Build: Use your own Jekyll

*Please skip this step if you use bundler*

You can download and install Jekyll following the instructions here: [Jekyll Official Website](https://jekyllrb.com/docs/installation/).

```bash
jekyll serve
```

### Access the built web

Access 127.0.0.1:4000 in your browser.  (4000 is the default binding port for Jekyll.)

![image](./img/preview.png)

## Demo

[RCSSA Website](https://rcssa.rice.edu/)