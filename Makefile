PROTO_DIR := proto
PROTO_FILES := $(PROTO_DIR)/property/v1/property.proto
GO_MODULE := github.com/emersonary/spencer-ting/api
VIA_JERI_ROOT ?= ../via-jeri
POSTS_ROOT ?= ../posts

.PHONY: proto proto-go proto-ts proto-install sync-protos

proto: sync-protos proto-go proto-ts

sync-protos:
	node scripts/sync-account-proto.mjs ../via-jeri .
	node scripts/sync-blog-proto.mjs ../posts .

proto-go: sync-protos
	protoc -I $(PROTO_DIR) \
		--go_out=api --go_opt=module=$(GO_MODULE) \
		--go-grpc_out=api --go-grpc_opt=module=$(GO_MODULE) \
		--connect-go_out=api --connect-go_opt=module=$(GO_MODULE) \
		$(PROTO_FILES)

proto-ts:
	cd web && npm run generate:proto

proto-install:
	go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
	go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
	go install connectrpc.com/connect/cmd/protoc-gen-connect-go@latest
