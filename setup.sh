#!/bin/bash

# install node dependencies on each module
(cd common; npm ci)
(cd ta-gui; npm ci)
(cd ta-server; npm ci)
(cd tests-acceptance; npm ci)