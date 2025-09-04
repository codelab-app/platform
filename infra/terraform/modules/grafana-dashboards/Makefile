.PHONY: all build clean

JSONNET_FILES := $(wildcard dashboards/*.jsonnet)
JSON_FILES := $(JSONNET_FILES:.jsonnet=.gen.json)

# Use pre-installed Grafonnet from Packer if vendor doesn't exist
JSONNET_PATH := $(if $(wildcard vendor),vendor,/opt/grafonnet/vendor)

all: build

build: $(JSON_FILES)
	@echo "Dashboard compilation complete"

dashboards/%.gen.json: dashboards/%.jsonnet
	@echo "Compiling $<..."
	@jsonnet -J $(JSONNET_PATH) $< > $@

clean:
	@echo "Cleaning generated files..."
	@rm -f dashboards/*.gen.json