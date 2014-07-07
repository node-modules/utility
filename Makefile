TESTS = test/*.test.js
REPORTER = spec
TIMEOUT = 1000
MOCHA_OPTS =

install:
	@npm install --registry=http://registry.cnpmjs.org

jshint: install
	@./node_modules/.bin/jshint .

test: install
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--timeout $(TIMEOUT) \
		$(MOCHA_OPTS) \
		$(TESTS)

test-cov cov:
	@rm -f coverage.html
	@$(MAKE) test MOCHA_OPTS='--require blanket' REPORTER=html-cov > coverage.html
	@$(MAKE) test MOCHA_OPTS='--require blanket' REPORTER=travis-cov
	@ls -lh coverage.html

test-coveralls:
	@$(MAKE) test
	@echo TRAVIS_JOB_ID $(TRAVIS_JOB_ID)
	@-$(MAKE) test MOCHA_OPTS='--require blanket' \
		REPORTER=mocha-lcov-reporter | ./node_modules/.bin/coveralls

test-all: jshint test test-cov

contributors: install
	@./node_modules/.bin/contributors -f plain -o AUTHORS

autod: install
	@./node_modules/.bin/autod -w --prefix "~" -e benchmark
	@$(MAKE) install

.PHONY: test
