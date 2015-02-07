
build: dirs component.json build/build.js build/build.css test/index.html

dirs:
	mkdir -p build

build/build.css: timeline-view.css
	@duo --use duo-myth $< > $@

build/test.css: test/test.css timeline-view.css
	@duo --use duo-myth $< > $@

build/build.js: index.js
	@duo $< > $@

build/test.js: test/test.js
	@duo --development $< > $@

clean:
	rm -fr build components

test: dirs build/test.css build/test.js
	open test/index.html

.PHONY: clean dirs test

