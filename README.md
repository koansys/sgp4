SGP4
----

[![Build Status](https://travis-ci.org/koansys/sgp4.svg?branch=develop)](http://travis-ci.org/koansys/isat)
[![Sauce Test Status](https://saucelabs.com/buildstatus/koansys-oss)](https://saucelabs.com/u/koansys-oss)


[![Sauce Test Status](https://saucelabs.com/browser-matrix/koansys-oss.svg)](https://saucelabs.com/u/koansys-oss)

[![Kanban ready](https://badge.waffle.io/koansys/isat.png?label=ready&title=Ready)](https://waffle.io/koansys/isat)
[![Kanban in progress](https://badge.waffle.io/koansys/isat.png?label=in+progress&title=In+Progress)](https://waffle.io/koansys/isat)

describe here -- copy over appropriate stuff from the original port

This really needs some info

History
=======

Simplified General Perturbations (SGP) models 

This code began as a port of the MATLAB SGP4 code included with [Nicolas Miura's Thesis CD](http://digitalcommons.calpoly.edu/cgi/viewcontent.cgi?filename=0&article=1094&context=theses&type=additional). The CD contains supplementary files to Miura's Thesis, [*Comparison And Design Of Simplified General Perturbation Models (Sgp4) And Code For Nasa Johnson Space Center, Orbital Debris Program Office*](http://digitalcommons.calpoly.edu/cgi/viewcontent.cgi?article=1094&context=theses). The overview page at [calpoly is here](http://digitalcommons.calpoly.edu/theses/86/i). You can read more about the history of the code and the giants shoulder on which we stand in Miura's excellent paper linked above. 

[We](http://bit.ly/plus-koansys) originally ported the SGP4 code to Javascript in order to replace a legacy Java satellite tracking applet with a browser based WebGL implementation. [Chris Shenton](https://plus.google.com/+ChrisShenton) did the initial transliteration from MATLAB to Javascript for [iSat](https://github.com/koansys/isat) and  [I](https://plus.google.com/+ReedOBrien) extracted that to modulerize the code and tests. `sgp4` is uses Asyncronous Module Definition (AMD) and Jasmine to accomplish said modularization. 

Javascript isn't my first language so there are likely some better ways to accomplish what I have done. Constructive suggestions are welcome. However, pull requests with tests and documentation are more likely to get action than suggestions:) 

Usage
=====

TODO. Example of loading the lib with requirejs

Hacking
=======

TODO: Installing and using nvm, r.js, docco, grunt etc...

TODO: describe how to write jasmine tests with requirejs
