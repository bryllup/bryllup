
#
# Environment
#

SHELL:=/bin/bash
PATH:=node_modules/.bin:$(PATH)
ENV?=development


#
# Preferences
#

OUT_DIR?=build


#
# Sources
#

CSS:=$(wildcard lib/**/*.css)
JS:=$(wildcard lib/**/*.js)
SRC:=$(CSS) $(JS)

#
# Targets
#

all: $(OUT_DIR)

$(OUT_DIR): node_modules dirs $(OUT_DIR)/index.html $(OUT_DIR)/build.js $(OUT_DIR)/build.css

$(OUT_DIR)/index.html: lib/index.html
	handlebars package.json < $< | sed -e 's@%OUT_DIR%@$(OUT_DIR)@' > $@

dirs:
	mkdir -p $(OUT_DIR)

lib/boot/environment.js:
	echo "module.exports = '$(ENV)';" > $@

$(OUT_DIR)/build.js: lib/boot/index.js lib/boot/environment.js $(JS)
	duo $< > $@

$(OUT_DIR)/build.css: lib/index.css $(CSS)
	duo --use duo-myth $< > $@

node_modules: package.json
	npm install

clean:
	rm -fr $(OUT_DIR) components lib/boot/environment.js

serve: all
	browser-sync start \
		--files="**/*.{js,css,html,md}" \
		--https --server $(OUT_DIR)

.PHONY: all dirs clean serve lib/boot/environment.js

