
#
# Preferences
#

OUT_DIR?=build


#
# Environment
#

SHELL:=/bin/bash
PATH:=node_modules/.bin:$(PATH)
ENV?=development


#
# Sources
#

CSS:=$(wildcard lib/**/*.myth)
SRC:=$(shell find -E lib -regex '^.*(html|md|js)$$') $(CSS:%.myth=%.css)
PKG:=component.json $(wildcard lib/**/component.json)


#
# Targets
#

all: $(OUT_DIR)

$(OUT_DIR): lib/index.html node_modules components lib/boot/environment.js $(SRC)
	component build --copy --use component-autoboot --out $@
	handlebars package.json < $< > $@/$(<F)

lib/boot/environment.js:
	echo "module.exports = '$(ENV)';" > $@

components: $(PKG)
	component install

node_modules: package.json
	npm install

%.css: %.myth
	myth $< $@

clean:
	rm -fr $(OUT_DIR) components lib/boot/environment.js

serve: all
	browser-sync start \
		--files="$(OUT_DIR)/*" \
		--https --server $(OUT_DIR)

.PHONY: all clean serve

