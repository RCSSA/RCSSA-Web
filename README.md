# RCSSA Website

This is the source tree of RCSSA official website.


## How to Build the Website

### Requirements

* (Stronlgy Recommeneded) [Bundler](https://bundler.io/) will automatically help you configure the right versions of the dependencies. 
* Otherwise, if you really want to build the web on your own, `Jekyll` is required for compiling the web.  **Important**: You should use `jekyll 3.9.0` to build this website.  Newer `jekyll` versions may cause errors.

### Build: Use Bunlder (Recommended)
#### Install Bundler
1. Install [Ruby](https://rubyinstaller.org/downloads/)
  
    1.1 To double check you have ruby installed, run 
    ```bash
    gem -v
    ``` 
1. Install bundlder

    ```bash
    gem install bundler
    ``` 
    1.1 To double check you have bundler installed, run
    ```bash
    bundler -v
    ```

1. Let bundler install the dependencies.

    ```bash
    bundle install
    ```

1. Run Jekyll

    ```bash
    bundle exec jekyll serve
    ```

There you go!

### Build: Use your own Jekyll

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